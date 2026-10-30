// src/servicios/gestion.ts
// Servicios para encargados y administradores: check-in por QR, bloqueos por lluvia y reservas fijas

import { clienteHttp } from '../api/cliente';
import type { Bloqueo, Reserva, ReservaFija } from '../tipos/index';
import { hoyString } from '../utils/fechas';
import type { RepositorioOffline } from '../db/repositorio-offline';
import { BLOQUEOS_MOCK, FIJAS_MOCK, RESERVAS_INICIALES_MOCK } from '../mocks/datos';

export class ServicioGestion {
  constructor(private readonly repo?: RepositorioOffline) {}

  /**
   * Procesa el código QR escaneado por el encargado en la puerta
   */
  async registrarIngresoQr(codigoQr: string): Promise<Reserva> {
    const hoy = hoyString();

    try {
      // Intento en API
      const res = await clienteHttp.post<{ datos: Reserva }>('/ingresos', {
        codigoQr,
      });
      if (res.data?.datos) {
        if (this.repo) {
          await this.repo.guardarReserva(res.data.datos);
        }
        return res.data.datos;
      }
    } catch {
      // Modo offline: resolver contra base SQLite o mocks
    }

    let reserva: Reserva | null = null;
    if (this.repo) {
      reserva = await this.repo.buscarPorCodigoQr(codigoQr);
    }
    if (!reserva) {
      reserva = RESERVAS_INICIALES_MOCK.find((r) => r.codigoQr === codigoQr) || null;
    }

    if (!reserva) {
      throw new Error('Código QR inválido. No pertenece a ninguna reserva registrada.');
    }

    if (reserva.estado === 'cancelada') {
      throw new Error('Esta reserva fue cancelada previamente.');
    }

    if (reserva.estado === 'cumplida') {
      throw new Error('El ingreso ya fue registrado para esta reserva.');
    }

    if (reserva.fecha && reserva.fecha !== hoy) {
      throw new Error(`Esta reserva no es para hoy (Fecha del turno: ${reserva.fecha}).`);
    }

    const ahoraIso = new Date().toISOString();
    reserva.estado = 'cumplida';
    reserva.ingresoEn = ahoraIso;

    if (this.repo) {
      await this.repo.actualizarEstadoReserva(reserva.id, 'cumplida', ahoraIso);
    }

    return reserva;
  }

  /**
   * Obtiene los bloqueos activos
   */
  async obtenerBloqueos(espacioId?: string, fecha?: string): Promise<Bloqueo[]> {
    try {
      const res = await clienteHttp.get<{ datos: Bloqueo[] }>('/bloqueos', {
        params: { espacioId, fecha },
      });
      if (res.data?.datos) return res.data.datos;
    } catch {
      // Offline fallback
    }

    if (this.repo) {
      const locales = await this.repo.obtenerBloqueos(espacioId, fecha);
      if (locales.length > 0) return locales;
    }

    return BLOQUEOS_MOCK.filter((b) => {
      if (espacioId && b.espacioId !== espacioId) return false;
      if (fecha && b.fecha !== fecha) return false;
      return true;
    });
  }

  /**
   * Crea un nuevo bloqueo (por lluvia o mantenimiento)
   */
  async crearBloqueo(
    espacioId: string,
    fecha: string,
    inicio: string | null,
    fin: string | null,
    motivo: string
  ): Promise<Bloqueo> {
    const nuevo: Bloqueo = {
      id: `blq-${Date.now()}`,
      espacioId,
      fecha,
      inicio,
      fin,
      motivo,
    };

    try {
      const res = await clienteHttp.post<{ datos: Bloqueo }>('/bloqueos', {
        espacioId,
        fecha,
        inicio,
        fin,
        motivo,
      });
      if (res.data?.datos) return res.data.datos;
    } catch {
      // Guardar local
    }

    if (this.repo) {
      await this.repo.guardarBloqueos([nuevo]);
    }
    return nuevo;
  }

  /**
   * Elimina un bloqueo
   */
  async eliminarBloqueo(id: string): Promise<void> {
    try {
      await clienteHttp.delete(`/bloqueos/${id}`);
    } catch {
      // Ignorar si offline
    }
  }

  /**
   * Obtiene reservas fijas semanales
   */
  async obtenerFijas(espacioId?: string): Promise<ReservaFija[]> {
    try {
      const res = await clienteHttp.get<{ datos: ReservaFija[] }>('/fijas', {
        params: { espacioId },
      });
      if (res.data?.datos) return res.data.datos;
    } catch {
      // Offline fallback
    }

    if (this.repo) {
      const locales = await this.repo.obtenerFijas(espacioId);
      if (locales.length > 0) return locales;
    }

    return FIJAS_MOCK.filter((f) => !espacioId || f.espacioId === espacioId);
  }

  /**
   * Crea una reserva fija semanal
   */
  async crearFija(
    espacioId: string,
    titular: string,
    dia: 0 | 1 | 2 | 3 | 4 | 5 | 6,
    inicio: string,
    fin: string,
    desde: string
  ): Promise<ReservaFija> {
    const nueva: ReservaFija = {
      id: `fij-${Date.now()}`,
      espacioId,
      titular,
      dia,
      inicio,
      fin,
      desde,
      hasta: null,
      activa: true,
    };

    try {
      const res = await clienteHttp.post<{ datos: ReservaFija }>('/fijas', {
        espacioId,
        titular,
        dia,
        inicio,
        fin,
        desde,
      });
      if (res.data?.datos) return res.data.datos;
    } catch {
      // Guardar local
    }

    if (this.repo) {
      await this.repo.guardarFijas([nueva]);
    }
    return nueva;
  }

  /**
   * Actualiza el precio por hora de un espacio (función exclusiva de administración)
   */
  async actualizarPrecio(espacioId: string, nuevoPrecio: number): Promise<void> {
    try {
      await clienteHttp.patch(`/espacios/${espacioId}`, {
        precioPorHora: nuevoPrecio,
      });
    } catch {
      // Local
    }
  }
}
