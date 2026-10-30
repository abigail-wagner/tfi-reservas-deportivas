// src/servicios/reservas.ts
// Lógica de negocio para consulta de espacios, grilla de turnos, reservas y cancelaciones

import { clienteHttp } from '../api/cliente.js';
import {
  DEPORTES_MOCK,
  ESPACIOS_MOCK,
  RESERVAS_INICIALES_MOCK,
  FIJAS_MOCK,
  BLOQUEOS_MOCK,
} from '../mocks/datos.js';
import type { Deporte, Espacio, Reserva, Turno } from '../tipos/index.js';
import {
  calcularCancelableHasta,
  esCancelable,
  sintetizarTurnos,
} from '../utils/fechas.js';
import {
  programarRecordatorio2HorasAntes,
  cancelarRecordatorioReserva,
} from '../notificaciones/avisos-locales.js';
import type { RepositorioOffline } from '../db/repositorio-offline.js';

export class ServicioReservas {
  constructor(private readonly repo?: RepositorioOffline) {}

  /**
   * Obtiene todos los espacios deportivos
   */
  async obtenerEspacios(): Promise<Espacio[]> {
    try {
      const res = await clienteHttp.get<{ datos: Espacio[] }>('/espacios');
      if (res.data?.datos && res.data.datos.length > 0) {
        if (this.repo) await this.repo.guardarEspacios(res.data.datos);
        return res.data.datos;
      }
    } catch {
      // Fallback a SQLite o Mocks
    }

    if (this.repo) {
      const locales = await this.repo.obtenerEspacios();
      if (locales.length > 0) return locales;
    }

    // Si aún no hay nada en SQLite, sembrar los mocks
    if (this.repo) {
      await this.repo.guardarEspacios(ESPACIOS_MOCK);
    }
    return ESPACIOS_MOCK;
  }

  /**
   * Obtiene un espacio por ID
   */
  async obtenerEspacioPorId(id: string): Promise<Espacio | null> {
    const espacios = await this.obtenerEspacios();
    return espacios.find((e) => e.id === id) || null;
  }

  /**
   * Obtiene la lista de deportes disponibles
   */
  async obtenerDeportes(): Promise<Deporte[]> {
    try {
      const res = await clienteHttp.get<{ datos: Deporte[] }>('/deportes');
      if (res.data?.datos) return res.data.datos;
    } catch {
      // Offline fallback
    }
    return DEPORTES_MOCK;
  }

  /**
   * Obtiene la grilla de turnos para un espacio y fecha
   */
  async obtenerTurnos(espacioId: string, fecha: string): Promise<Turno[]> {
    const espacio = await this.obtenerEspacioPorId(espacioId);
    const precioBase = espacio?.precioPorHora || 10000;

    try {
      const res = await clienteHttp.get<{ datos: Turno[] }>(
        `/espacios/${espacioId}/turnos`,
        { params: { fecha } }
      );
      if (res.data?.datos) return res.data.datos;
    } catch {
      // Modo offline: sintetizar localmente con SQLite o mocks
    }

    const reservas = this.repo
      ? await this.repo.obtenerReservas()
      : RESERVAS_INICIALES_MOCK;
    const fijas = this.repo
      ? await this.repo.obtenerFijas(espacioId)
      : FIJAS_MOCK.filter((f) => f.espacioId === espacioId);
    const bloqueos = this.repo
      ? await this.repo.obtenerBloqueos(espacioId, fecha)
      : BLOQUEOS_MOCK.filter((b) => b.espacioId === espacioId && b.fecha === fecha);

    return sintetizarTurnos(
      espacioId,
      fecha,
      precioBase,
      reservas,
      fijas,
      bloqueos
    );
  }

  /**
   * Crea una nueva reserva cumpliendo las reglas de negocio (D2: máximo 3 activas por usuario)
   */
  async crearReserva(
    espacioId: string,
    fecha: string,
    inicio: string,
    cantidadPersonas: number,
    usuarioId: string
  ): Promise<Reserva> {
    const espacio = await this.obtenerEspacioPorId(espacioId);
    if (!espacio) {
      throw new Error('No se encontró el espacio deportivo.');
    }

    if (cantidadPersonas > espacio.capacidad) {
      throw new Error(
        `Capacidad excedida. El máximo para este espacio es de ${espacio.capacidad} personas.`
      );
    }

    // Verificar límite de 3 reservas activas
    const reservasActuales = this.repo
      ? await this.repo.obtenerReservas(usuarioId)
      : RESERVAS_INICIALES_MOCK.filter((r) => r.usuarioId === usuarioId);

    const activas = reservasActuales.filter((r) => r.estado === 'confirmada');
    if (activas.length >= 3) {
      throw new Error(
        'Ya tenés 3 reservas activas. Cancelá o cumplí una para reservar otra.'
      );
    }

    const turnoId = `${espacioId}_${fecha}_${inicio}`;
    const codigoQr = `RES-${Date.now().toString(36).toUpperCase()}-${espacioId}`;
    const cancelableHasta = calcularCancelableHasta(fecha, inicio);

    const nuevaReserva: Reserva = {
      id: `res-${Date.now()}`,
      turnoId,
      espacioId,
      usuarioId,
      cantidadPersonas,
      codigoQr,
      estado: 'confirmada',
      ingresoEn: null,
      creadaEn: new Date().toISOString(),
      cancelableHasta,
      espacioNombre: espacio.nombre,
      complejo: espacio.complejo,
      fecha,
      inicio,
      fin: `${(parseInt(inicio.split(':')[0]) + 1).toString().padStart(2, '0')}:00`,
      precio: espacio.precioPorHora,
    };

    // Intentar sincronizar con backend
    try {
      const res = await clienteHttp.post<{ datos: Reserva }>('/reservas', {
        espacioId,
        fecha,
        inicio,
        cantidadPersonas,
      });
      if (res.data?.datos) {
        Object.assign(nuevaReserva, res.data.datos);
      }
    } catch {
      // Se guarda localmente para sincronizar
    }

    // Guardar en base local SQLite
    if (this.repo) {
      await this.repo.guardarReserva(nuevaReserva);
    }

    // Programar recordatorio local 2 horas antes
    await programarRecordatorio2HorasAntes(nuevaReserva);

    return nuevaReserva;
  }

  /**
   * Cancela una reserva verificando la regla de 4 horas de anticipación (D4)
   */
  async cancelarReserva(reserva: Reserva): Promise<void> {
    if (!reserva.fecha || !reserva.inicio) {
      throw new Error('Datos de turno inválidos para cancelar.');
    }

    if (!esCancelable(reserva.fecha, reserva.inicio)) {
      throw new Error(
        'Faltan menos de 4 horas para el turno. Ya no es posible cancelar desde la app. Por favor avisale al encargado del complejo.'
      );
    }

    if (reserva.estado !== 'confirmada') {
      throw new Error('Esta reserva ya no se puede cancelar.');
    }

    // Cancelar en backend
    try {
      await clienteHttp.delete(`/reservas/${reserva.id}`);
    } catch {
      // Ignorar error de red y aplicar localmente
    }

    // Actualizar local
    if (this.repo) {
      await this.repo.actualizarEstadoReserva(reserva.id, 'cancelada');
    }

    // Cancelar aviso programado
    await cancelarRecordatorioReserva(reserva.id);
  }

  /**
   * Obtiene las reservas del usuario actual (próximas e históricas)
   */
  async obtenerMisReservas(usuarioId: string): Promise<Reserva[]> {
    try {
      const res = await clienteHttp.get<{ datos: Reserva[] }>('/reservas');
      if (res.data?.datos) {
        if (this.repo) {
          for (const r of res.data.datos) {
            await this.repo.guardarReserva(r);
          }
        }
        return res.data.datos;
      }
    } catch {
      // Fallback local
    }

    if (this.repo) {
      const locales = await this.repo.obtenerReservas(usuarioId);
      if (locales.length > 0) return locales;
    }

    return RESERVAS_INICIALES_MOCK.filter((r) => r.usuarioId === usuarioId);
  }
}
