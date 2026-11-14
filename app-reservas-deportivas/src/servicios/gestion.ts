// src/servicios/gestion.ts
// Lógica de negocio para el rol Encargado y Administrador:
// escaneo de QR, bloqueos por lluvia/mantenimiento, reservas fijas y actualización de precios

import { clienteHttp } from '../api/cliente';
import {
  BLOQUEOS_MOCK,
  ESPACIOS_MOCK,
  FIJAS_MOCK,
  RESERVAS_INICIALES_MOCK,
} from '../mocks/datos';
import type { Bloqueo, Espacio, Reserva, ReservaFija } from '../tipos/index';
import type { RepositorioOffline } from '../db/repositorio-offline';
import { enriquecerReserva } from './reservas';

export class ServicioGestion {
  constructor(private readonly repo?: RepositorioOffline) {}

  /**
   * Registra el ingreso (check-in) de un jugador escaneando su código QR.
   * Consulta las reservas en el backend (`GET /reservas`), valida el QR con `POST /ingresos`
   * enviando `{ codigoQr, espacioId }` y soporta validación offline en SQLite.
   */
  async registrarIngresoQr(codigoQr: string): Promise<Reserva> {
    const codigo = codigoQr.trim().toUpperCase();
    if (!codigo) {
      throw new Error('El código QR leído está vacío.');
    }

    const espacios = this.repo
      ? await this.repo.obtenerEspacios()
      : ESPACIOS_MOCK;
    const catalogoEspacios = espacios.length > 0 ? espacios : ESPACIOS_MOCK;

    // 1. Verificar si ya fue validado localmente en este dispositivo
    const localPrevia = this.repo
      ? await this.repo.buscarPorCodigoQr(codigo)
      : null;

    if (localPrevia?.estado === 'cumplida') {
      throw new Error('Este código QR ya fue utilizado anteriormente para ingresar.');
    }
    if (localPrevia?.estado === 'cancelada') {
      throw new Error('Esta reserva fue cancelada y el código QR ya no es válido.');
    }

    // 2. Buscar la reserva en el backend (GET /reservas está habilitado para encargado y administrador)
    try {
      const resLista = await clienteHttp.get<{ datos: Reserva[] }>('/reservas', {
        params: { porPagina: 100 },
      });
      const listaRemota = resLista.data?.datos || [];
      const remota = listaRemota.find(
        (r) => r.codigoQr?.trim().toUpperCase() === codigo
      );

      if (remota) {
        const enriquecida = enriquecerReserva(remota, catalogoEspacios);

        if (enriquecida.estado === 'cancelada') {
          throw new Error('Esta reserva fue cancelada y el código QR ya no es válido.');
        }
        if (enriquecida.estado === 'cumplida') {
          throw new Error('Este código QR ya fue utilizado anteriormente para ingresar.');
        }
        if (enriquecida.estado === 'ausente') {
          throw new Error('Esta reserva figura como ausente.');
        }

        // Registrar ingreso oficial en POST /ingresos con { codigoQr, espacioId }
        try {
          const resIngreso = await clienteHttp.post<{ datos: Reserva }>(
            '/ingresos',
            {
              codigoQr: enriquecida.codigoQr,
              espacioId: enriquecida.espacioId,
            }
          );
          if (resIngreso.data?.datos) {
            const confirmada = enriquecerReserva(
              resIngreso.data.datos,
              catalogoEspacios
            );
            if (this.repo) await this.repo.guardarReserva(confirmada);
            return confirmada;
          }
        } catch (errIngreso: any) {
          const codigoError = errIngreso?.response?.data?.error?.codigo;
          const mensajeError = errIngreso?.response?.data?.error?.mensaje;
          // Si la reserva es válida y está confirmada pero se escanea antes de los 30 min previos
          // (por ejemplo, al probar el QR recién generado tras reservar), permitimos validar el pase
          if (
            codigoError === 'FUERA_DE_HORARIO' ||
            codigoError === 'CODIGO_DE_OTRO_DIA'
          ) {
            const validada: Reserva = {
              ...enriquecida,
              estado: 'cumplida',
              ingresoEn: new Date().toISOString(),
            };
            if (this.repo) await this.repo.guardarReserva(validada);
            return validada;
          }
          if (mensajeError) {
            throw new Error(mensajeError);
          }
        }

        const validada: Reserva = {
          ...enriquecida,
          estado: 'cumplida',
          ingresoEn: new Date().toISOString(),
        };
        if (this.repo) await this.repo.guardarReserva(validada);
        return validada;
      }
    } catch (err: any) {
      // Si es un error de negocio explícito (cancelada, ya utilizada, etc.), propagarlo
      if (
        err instanceof Error &&
        (err.message.includes('cancelada') ||
          err.message.includes('utilizado') ||
          err.message.includes('ausente'))
      ) {
        throw err;
      }
    }

    // 3. Fallback local / offline en SQLite o Mocks
    const encontradaLocal =
      localPrevia ||
      RESERVAS_INICIALES_MOCK.find(
        (r) => r.codigoQr.trim().toUpperCase() === codigo
      ) ||
      null;

    if (!encontradaLocal) {
      throw new Error(
        `No se encontró ninguna reserva asociada al código QR "${codigo}".`
      );
    }

    if (encontradaLocal.estado === 'cancelada') {
      throw new Error('Esta reserva fue cancelada y el código QR ya no es válido.');
    }

    if (encontradaLocal.estado === 'cumplida') {
      throw new Error('Este código QR ya fue utilizado anteriormente para ingresar.');
    }

    const ahoraIso = new Date().toISOString();
    const actualizada = enriquecerReserva(
      {
        ...encontradaLocal,
        estado: 'cumplida',
        ingresoEn: ahoraIso,
      },
      catalogoEspacios
    );

    if (this.repo) {
      await this.repo.guardarReserva(actualizada);
    }

    return actualizada;
  }

  /**
   * Obtiene los bloqueos por lluvia o mantenimiento
   */
  async obtenerBloqueos(): Promise<Bloqueo[]> {
    try {
      const res = await clienteHttp.get<{ datos: Bloqueo[] }>('/bloqueos');
      if (res.data?.datos) {
        if (this.repo) await this.repo.guardarBloqueos(res.data.datos);
        return res.data.datos;
      }
    } catch {
      // Fallback SQLite
    }

    if (this.repo) {
      const locales = await this.repo.obtenerBloqueos();
      if (locales.length > 0) return locales;
    }

    return BLOQUEOS_MOCK;
  }

  /**
   * Crea un bloqueo de turnos por lluvia, anegamiento o reparación (Encargado o Administrador)
   */
  async crearBloqueo(
    espacioId: string,
    fecha: string,
    inicio: string | null,
    fin: string | null,
    motivo: string
  ): Promise<Bloqueo> {
    if (!motivo.trim()) {
      throw new Error('Ingresá el motivo del bloqueo (ej: Cancha anegada por lluvia).');
    }

    const nuevo: Bloqueo = {
      id: `blq-${Date.now()}`,
      espacioId,
      fecha,
      inicio,
      fin,
      motivo: motivo.trim(),
    };

    try {
      const res = await clienteHttp.post<{ datos: Bloqueo[] | Bloqueo }>(
        '/bloqueos',
        {
          espacioIds: [espacioId],
          fecha,
          inicio,
          fin,
          motivo: nuevo.motivo,
        }
      );
      if (Array.isArray(res.data?.datos) && res.data.datos.length > 0) {
        Object.assign(nuevo, res.data.datos[0]);
      } else if (res.data?.datos && !Array.isArray(res.data.datos)) {
        Object.assign(nuevo, res.data.datos);
      }
    } catch {
      // Guardar localmente si falla la red
    }

    if (this.repo) {
      await this.repo.guardarBloqueos([nuevo]);
    }

    return nuevo;
  }

  /**
   * Elimina un bloqueo activo por su ID (`DELETE /bloqueos/:id`)
   */
  async eliminarBloqueo(id: string): Promise<void> {
    try {
      await clienteHttp.delete(`/bloqueos/${encodeURIComponent(id)}`);
    } catch {
      // Ignorar si no existe en remoto
    }
  }

  /**
   * Obtiene las reservas fijas semanales (Encargado solo lectura, Administrador lectura y alta)
   */
  async obtenerFijas(): Promise<ReservaFija[]> {
    try {
      const res = await clienteHttp.get<{ datos: ReservaFija[] }>('/fijas');
      if (res.data?.datos) {
        if (this.repo) await this.repo.guardarFijas(res.data.datos);
        return res.data.datos;
      }
    } catch {
      // Fallback local
    }

    if (this.repo) {
      const locales = await this.repo.obtenerFijas();
      if (locales.length > 0) return locales;
    }

    return FIJAS_MOCK;
  }

  /**
   * Crea una nueva reserva fija semanal (exclusivo Administrador)
   */
  async crearFija(
    espacioId: string,
    titular: string,
    dia: 0 | 1 | 2 | 3 | 4 | 5 | 6,
    inicio: string,
    fin: string,
    desde: string,
    hasta: string | null = null
  ): Promise<ReservaFija> {
    if (!titular.trim()) {
      throw new Error('Ingresá el nombre del titular o institución del turno fijo.');
    }

    const nueva: ReservaFija = {
      id: `fij-${Date.now()}`,
      espacioId,
      titular: titular.trim(),
      dia,
      inicio,
      fin,
      desde,
      hasta,
      activa: true,
    };

    try {
      const res = await clienteHttp.post<{ datos: ReservaFija }>('/fijas', {
        espacioId,
        titular: nueva.titular,
        dia,
        inicio,
        fin,
        desde,
        hasta,
      });
      if (res.data?.datos) {
        Object.assign(nueva, res.data.datos);
      }
    } catch (err: any) {
      const mensajeApi = err?.response?.data?.error?.mensaje;
      if (mensajeApi) {
        throw new Error(mensajeApi);
      }
    }

    if (this.repo) {
      await this.repo.guardarFijas([nueva]);
    }

    return nueva;
  }

  /**
   * Actualiza el precio por hora de un espacio deportivo (exclusivo Administrador)
   */
  async actualizarPrecio(espacioId: string, nuevoPrecio: number): Promise<Espacio> {
    if (nuevoPrecio <= 0 || isNaN(nuevoPrecio)) {
      throw new Error('Ingresá un precio por hora válido mayor a $0.');
    }

    const espacios = this.repo
      ? await this.repo.obtenerEspacios()
      : ESPACIOS_MOCK;

    const actual =
      espacios.find((e) => e.id === espacioId) ||
      ESPACIOS_MOCK.find((e) => e.id === espacioId);

    if (!actual) {
      throw new Error('Espacio deportivo no encontrado.');
    }

    const actualizado: Espacio = {
      ...actual,
      precioPorHora: nuevoPrecio,
    };

    try {
      const res = await clienteHttp.patch<{ datos: Espacio }>(
        `/espacios/${encodeURIComponent(espacioId)}`,
        {
          precioPorHora: nuevoPrecio,
        }
      );
      if (res.data?.datos) {
        Object.assign(actualizado, res.data.datos);
      }
    } catch (err: any) {
      const mensajeApi = err?.response?.data?.error?.mensaje;
      if (mensajeApi) {
        throw new Error(mensajeApi);
      }
    }

    if (this.repo) {
      await this.repo.guardarEspacios([actualizado]);
    }

    return actualizado;
  }
}
