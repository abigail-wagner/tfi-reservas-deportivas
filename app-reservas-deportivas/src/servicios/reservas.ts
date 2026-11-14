// src/servicios/reservas.ts
// Lógica de negocio para consulta de espacios, grilla de turnos, reservas y cancelaciones

import { clienteHttp, normalizarEspacio } from '../api/cliente';
import {
  DEPORTES_MOCK,
  ESPACIOS_MOCK,
  RESERVAS_INICIALES_MOCK,
  FIJAS_MOCK,
  BLOQUEOS_MOCK,
} from '../mocks/datos';
import type { Deporte, Espacio, Reserva, Turno } from '../tipos/index';
import {
  calcularCancelableHasta,
  construirIdTurno,
  desarmarIdTurno,
  esCancelable,
  generarCodigoQrLocal,
  sintetizarTurnos,
  sumarUnaHora,
} from '../utils/fechas';
import {
  programarRecordatorio2HorasAntes,
  cancelarRecordatorioReserva,
} from '../notificaciones/avisos-locales';
import type { RepositorioOffline } from '../db/repositorio-offline';

/**
 * Completa los campos de presentación (`fecha`, `inicio`, `fin`, `espacioNombre`, `complejo`, `precio`)
 * a partir de `turnoId` y del catálogo de espacios cuando la API devuelve el contrato puro.
 */
export function enriquecerReserva(r: Reserva, espacios: Espacio[] = ESPACIOS_MOCK): Reserva {
  const partes = desarmarIdTurno(r.turnoId);
  const espacio =
    espacios.find((e) => e.id === r.espacioId) ||
    ESPACIOS_MOCK.find((e) => e.id === r.espacioId);

  const fecha = r.fecha || partes?.fecha || '';
  const inicio = r.inicio || partes?.inicio || '';
  const fin = r.fin || partes?.fin || (inicio ? sumarUnaHora(inicio) : '');

  return {
    ...r,
    fecha,
    inicio,
    fin,
    espacioNombre: r.espacioNombre || espacio?.nombre || 'Cancha Deportiva',
    complejo: r.complejo || espacio?.complejo || 'Polideportivo Municipal',
    precio: r.precio ?? espacio?.precioPorHora ?? 10000,
  };
}

export class ServicioReservas {
  constructor(private readonly repo?: RepositorioOffline) {}

  /**
   * Obtiene todos los espacios deportivos
   */
  async obtenerEspacios(): Promise<Espacio[]> {
    try {
      const res = await clienteHttp.get<{ datos: Espacio[] }>('/espacios', {
        params: { porPagina: 100 },
      });
      if (res.data?.datos && res.data.datos.length > 0) {
        const normalizados = res.data.datos.map(normalizarEspacio);
        if (this.repo) await this.repo.guardarEspacios(normalizados);
        return normalizados;
      }
    } catch {
      // Fallback a SQLite o Mocks
    }

    if (this.repo) {
      const locales = await this.repo.obtenerEspacios();
      if (locales.length > 0) return locales.map(normalizarEspacio);
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
    try {
      const res = await clienteHttp.get<{ datos: Espacio }>(
        `/espacios/${encodeURIComponent(id)}`
      );
      if (res.data?.datos) {
        const normalizado = normalizarEspacio(res.data.datos);
        if (this.repo) await this.repo.guardarEspacios([normalizado]);
        return normalizado;
      }
    } catch {
      // Fallback a listado o caché local
    }
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
        `/espacios/${encodeURIComponent(espacioId)}/turnos`,
        { params: { fecha } }
      );
      if (res.data?.datos) {
        return res.data.datos.map((t) => ({
          ...t,
          precio: t.precio ?? precioBase,
        }));
      }
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
   * Crea una nueva reserva cumpliendo el contrato oficial de `POST /reservas` (`{ turnoId, cantidadPersonas }`)
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

    const turnoId = construirIdTurno(espacioId, fecha, inicio);
    const codigoQr = generarCodigoQrLocal(fecha, inicio);
    const cancelableHasta = calcularCancelableHasta(fecha, inicio);

    let nuevaReserva: Reserva = {
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
      fin: sumarUnaHora(inicio),
      precio: espacio.precioPorHora,
    };

    // Sincronizar con backend usando el contrato oficial `{ turnoId, cantidadPersonas }`
    try {
      const res = await clienteHttp.post<{ datos: Reserva }>('/reservas', {
        turnoId,
        cantidadPersonas,
      });
      if (res.data?.datos) {
        nuevaReserva = enriquecerReserva(res.data.datos, [espacio]);
      }
    } catch (err: any) {
      const mensajeApi = err?.response?.data?.error?.mensaje;
      if (mensajeApi) {
        throw new Error(mensajeApi);
      }
      // Si es error de red (modo offline), verificar límite local de 3 reservas activas
      const reservasActuales = this.repo
        ? await this.repo.obtenerReservas(usuarioId)
        : RESERVAS_INICIALES_MOCK.filter((r) => r.usuarioId === usuarioId);
      const activas = reservasActuales.filter((r) => r.estado === 'confirmada');
      if (activas.length >= 3) {
        throw new Error(
          'Ya tenés 3 reservas activas. Cancelá o cumplí una para reservar otra.'
        );
      }
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
   * Endpoint oficial del backend: `POST /reservas/:id/cancelacion`
   */
  async cancelarReserva(reserva: Reserva): Promise<void> {
    const enriquecida = enriquecerReserva(reserva);
    if (!enriquecida.fecha || !enriquecida.inicio) {
      throw new Error('Datos de turno inválidos para cancelar.');
    }

    if (!esCancelable(enriquecida.fecha, enriquecida.inicio)) {
      throw new Error(
        'Faltan menos de 4 horas para el turno. Ya no es posible cancelar desde la app. Por favor avisale al encargado del complejo.'
      );
    }

    if (reserva.estado !== 'confirmada') {
      throw new Error('Esta reserva ya no se puede cancelar.');
    }

    // Cancelar en backend usando el endpoint oficial POST /reservas/:id/cancelacion
    try {
      await clienteHttp.post(
        `/reservas/${encodeURIComponent(reserva.id)}/cancelacion`,
        {}
      );
    } catch (err: any) {
      const mensajeApi = err?.response?.data?.error?.mensaje;
      if (mensajeApi && err?.response?.status !== 404) {
        throw new Error(mensajeApi);
      }
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
   * Endpoint oficial para el jugador: `GET /yo/reservas?cuando=proximas` y `cuando=pasadas`
   */
  async obtenerMisReservas(usuarioId: string): Promise<Reserva[]> {
    const espacios = await this.obtenerEspacios();

    try {
      const [resProximas, resPasadas] = await Promise.all([
        clienteHttp.get<{ datos: Reserva[] }>('/yo/reservas', {
          params: { cuando: 'proximas', porPagina: 50 },
        }),
        clienteHttp.get<{ datos: Reserva[] }>('/yo/reservas', {
          params: { cuando: 'pasadas', porPagina: 50 },
        }),
      ]);

      const remotas = [
        ...(resProximas.data?.datos || []),
        ...(resPasadas.data?.datos || []),
      ].map((r) => enriquecerReserva(r, espacios));

      if (this.repo) {
        for (const r of remotas) {
          await this.repo.guardarReserva(r);
        }
      }

      if (remotas.length > 0) {
        return remotas;
      }
    } catch {
      // Fallback local si no hay conexión
    }

    if (this.repo) {
      const locales = await this.repo.obtenerReservas(usuarioId);
      if (locales.length > 0) {
        return locales.map((r) => enriquecerReserva(r, espacios));
      }
    }

    return RESERVAS_INICIALES_MOCK.filter((r) => r.usuarioId === usuarioId).map(
      (r) => enriquecerReserva(r, espacios)
    );
  }

  /**
   * Obtiene el detalle de una reserva por su ID
   */
  async obtenerReservaPorId(id: string, usuarioId?: string): Promise<Reserva | null> {
    const espacios = await this.obtenerEspacios();

    try {
      const res = await clienteHttp.get<{ datos: Reserva }>(
        `/reservas/${encodeURIComponent(id)}`
      );
      if (res.data?.datos) {
        const enriquecida = enriquecerReserva(res.data.datos, espacios);
        if (this.repo) {
          await this.repo.guardarReserva(enriquecida);
        }
        return enriquecida;
      }
    } catch {
      // Fallback a lista local o misReservas
    }

    if (this.repo) {
      const todasLocales = await this.repo.obtenerReservas();
      const local = todasLocales.find((r) => r.id === id);
      if (local) return enriquecerReserva(local, espacios);
    }

    if (usuarioId) {
      const lista = await this.obtenerMisReservas(usuarioId);
      const encontrada = lista.find((r) => r.id === id);
      if (encontrada) return encontrada;
    }

    const mock = RESERVAS_INICIALES_MOCK.find((r) => r.id === id);
    return mock ? enriquecerReserva(mock, espacios) : null;
  }
}
