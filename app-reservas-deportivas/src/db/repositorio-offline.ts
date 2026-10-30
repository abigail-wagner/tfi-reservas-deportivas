// src/db/repositorio-offline.ts
// Repositorio de base de datos local SQLite con consultas parametrizadas (?) para funcionamiento offline

import type { SQLiteDatabase } from 'expo-sqlite';
import type { Bloqueo, Espacio, Reserva, ReservaFija } from '../tipos/index.js';

export class RepositorioOffline {
  constructor(private readonly db: SQLiteDatabase) {}

  /**
   * Guarda o actualiza los 11 espacios deportivos en SQLite
   */
  async guardarEspacios(espacios: Espacio[]): Promise<void> {
    const ahora = new Date().toISOString();
    for (const e of espacios) {
      await this.db.runAsync(
        `INSERT OR REPLACE INTO espacios_locales (
          id, nombre, deporteId, complejo, superficie, techado, iluminacion,
          capacidad, precioPorHora, latitud, longitud, imagenes, videoUrl,
          reglas, activo, actualizadoEn
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          e.id,
          e.nombre,
          e.deporteId,
          e.complejo,
          e.superficie,
          e.techado ? 1 : 0,
          e.iluminacion ? 1 : 0,
          e.capacidad,
          e.precioPorHora,
          e.coordenadas.latitud,
          e.coordenadas.longitud,
          JSON.stringify(e.imagenes),
          e.videoUrl,
          e.reglas,
          e.activo ? 1 : 0,
          ahora,
        ]
      );
    }
  }

  /**
   * Recupera todos los espacios desde SQLite
   */
  async obtenerEspacios(): Promise<Espacio[]> {
    const filas = await this.db.getAllAsync<{
      id: string;
      nombre: string;
      deporteId: string;
      complejo: string;
      superficie: string;
      techado: number;
      iluminacion: number;
      capacidad: number;
      precioPorHora: number;
      latitud: number;
      longitud: number;
      imagenes: string;
      videoUrl: string | null;
      reglas: string;
      activo: number;
    }>('SELECT * FROM espacios_locales WHERE activo = 1 ORDER BY id ASC');

    return filas.map((f) => ({
      id: f.id,
      nombre: f.nombre,
      deporteId: f.deporteId,
      complejo: f.complejo,
      superficie: f.superficie,
      techado: f.techado === 1,
      iluminacion: f.iluminacion === 1,
      capacidad: f.capacidad,
      precioPorHora: f.precioPorHora,
      coordenadas: {
        latitud: f.latitud,
        longitud: f.longitud,
      },
      imagenes: JSON.parse(f.imagenes || '[]'),
      videoUrl: f.videoUrl,
      reglas: f.reglas,
      activo: f.activo === 1,
    }));
  }

  /**
   * Guarda o actualiza una reserva localmente
   */
  async guardarReserva(r: Reserva): Promise<void> {
    await this.db.runAsync(
      `INSERT OR REPLACE INTO reservas_locales (
        id, turnoId, espacioId, usuarioId, cantidadPersonas, codigoQr,
        estado, ingresoEn, creadaEn, cancelableHasta, espacioNombre,
        complejo, fecha, inicio, fin, precio
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        r.id,
        r.turnoId,
        r.espacioId,
        r.usuarioId,
        r.cantidadPersonas,
        r.codigoQr,
        r.estado,
        r.ingresoEn,
        r.creadaEn,
        r.cancelableHasta,
        r.espacioNombre || null,
        r.complejo || null,
        r.fecha || null,
        r.inicio || null,
        r.fin || null,
        r.precio || null,
      ]
    );
  }

  /**
   * Obtiene las reservas de un usuario
   */
  async obtenerReservas(usuarioId?: string): Promise<Reserva[]> {
    let sql = 'SELECT * FROM reservas_locales';
    const params: (string | number)[] = [];

    if (usuarioId) {
      sql += ' WHERE usuarioId = ?';
      params.push(usuarioId);
    }
    sql += ' ORDER BY fecha DESC, inicio DESC';

    const filas = await this.db.getAllAsync<any>(sql, params);
    return filas.map((f) => ({
      id: f.id,
      turnoId: f.turnoId,
      espacioId: f.espacioId,
      usuarioId: f.usuarioId,
      cantidadPersonas: f.cantidadPersonas,
      codigoQr: f.codigoQr,
      estado: f.estado,
      ingresoEn: f.ingresoEn,
      creadaEn: f.creadaEn,
      cancelableHasta: f.cancelableHasta,
      espacioNombre: f.espacioNombre,
      complejo: f.complejo,
      fecha: f.fecha,
      inicio: f.inicio,
      fin: f.fin,
      precio: f.precio,
    }));
  }

  /**
   * Busca una reserva por su código QR escaneado (útil para el encargado offline)
   */
  async buscarPorCodigoQr(codigoQr: string): Promise<Reserva | null> {
    const fila = await this.db.getFirstAsync<any>(
      'SELECT * FROM reservas_locales WHERE codigoQr = ?',
      [codigoQr]
    );
    if (!fila) return null;
    return {
      id: fila.id,
      turnoId: fila.turnoId,
      espacioId: fila.espacioId,
      usuarioId: fila.usuarioId,
      cantidadPersonas: fila.cantidadPersonas,
      codigoQr: fila.codigoQr,
      estado: fila.estado,
      ingresoEn: fila.ingresoEn,
      creadaEn: fila.creadaEn,
      cancelableHasta: fila.cancelableHasta,
      espacioNombre: fila.espacioNombre,
      complejo: fila.complejo,
      fecha: fila.fecha,
      inicio: fila.inicio,
      fin: fila.fin,
      precio: fila.precio,
    };
  }

  /**
   * Actualiza el estado de una reserva (ej: check-in realizado o cancelada)
   */
  async actualizarEstadoReserva(
    id: string,
    estado: string,
    ingresoEn: string | null = null
  ): Promise<void> {
    await this.db.runAsync(
      'UPDATE reservas_locales SET estado = ?, ingresoEn = ? WHERE id = ?',
      [estado, ingresoEn, id]
    );
  }

  /**
   * Guarda bloqueos
   */
  async guardarBloqueos(bloqueos: Bloqueo[]): Promise<void> {
    for (const b of bloqueos) {
      await this.db.runAsync(
        'INSERT OR REPLACE INTO bloqueos_locales (id, espacioId, fecha, inicio, fin, motivo) VALUES (?, ?, ?, ?, ?, ?)',
        [b.id, b.espacioId, b.fecha, b.inicio, b.fin, b.motivo]
      );
    }
  }

  /**
   * Obtiene bloqueos
   */
  async obtenerBloqueos(espacioId?: string, fecha?: string): Promise<Bloqueo[]> {
    let sql = 'SELECT * FROM bloqueos_locales WHERE 1=1';
    const params: string[] = [];
    if (espacioId) {
      sql += ' AND espacioId = ?';
      params.push(espacioId);
    }
    if (fecha) {
      sql += ' AND fecha = ?';
      params.push(fecha);
    }
    return await this.db.getAllAsync<Bloqueo>(sql, params);
  }

  /**
   * Guarda reservas fijas
   */
  async guardarFijas(fijas: ReservaFija[]): Promise<void> {
    for (const f of fijas) {
      await this.db.runAsync(
        `INSERT OR REPLACE INTO fijas_locales (
          id, espacioId, titular, dia, inicio, fin, desde, hasta, activa
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [f.id, f.espacioId, f.titular, f.dia, f.inicio, f.fin, f.desde, f.hasta, f.activa ? 1 : 0]
      );
    }
  }

  /**
   * Obtiene reservas fijas
   */
  async obtenerFijas(espacioId?: string): Promise<ReservaFija[]> {
    let sql = 'SELECT * FROM fijas_locales WHERE activa = 1';
    const params: string[] = [];
    if (espacioId) {
      sql += ' AND espacioId = ?';
      params.push(espacioId);
    }
    const filas = await this.db.getAllAsync<any>(sql, params);
    return filas.map((f) => ({
      id: f.id,
      espacioId: f.espacioId,
      titular: f.titular,
      dia: f.dia,
      inicio: f.inicio,
      fin: f.fin,
      desde: f.desde,
      hasta: f.hasta,
      activa: f.activa === 1,
    }));
  }
}
