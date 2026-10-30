// src/db/migraciones.ts
// Gestión de migraciones SQLite con PRAGMA user_version según buenas prácticas de la cátedra

import type { SQLiteDatabase } from 'expo-sqlite';

export async function migrarBaseDeDatos(db: SQLiteDatabase): Promise<void> {
  const resultado = await db.getFirstAsync<{ user_version: number }>('PRAGMA user_version');
  const versionActual = resultado?.user_version ?? 0;

  if (versionActual < 1) {
    await db.execAsync(`
      PRAGMA journal_mode = WAL;

      CREATE TABLE IF NOT EXISTS espacios_locales (
        id TEXT PRIMARY KEY NOT NULL,
        nombre TEXT NOT NULL,
        deporteId TEXT NOT NULL,
        complejo TEXT NOT NULL,
        superficie TEXT NOT NULL,
        techado INTEGER NOT NULL,
        iluminacion INTEGER NOT NULL,
        capacidad INTEGER NOT NULL,
        precioPorHora REAL NOT NULL,
        latitud REAL NOT NULL,
        longitud REAL NOT NULL,
        imagenes TEXT NOT NULL,
        videoUrl TEXT,
        reglas TEXT NOT NULL,
        activo INTEGER NOT NULL,
        actualizadoEn TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS reservas_locales (
        id TEXT PRIMARY KEY NOT NULL,
        turnoId TEXT NOT NULL,
        espacioId TEXT NOT NULL,
        usuarioId TEXT NOT NULL,
        cantidadPersonas INTEGER NOT NULL,
        codigoQr TEXT NOT NULL,
        estado TEXT NOT NULL,
        ingresoEn TEXT,
        creadaEn TEXT NOT NULL,
        cancelableHasta TEXT NOT NULL,
        espacioNombre TEXT,
        complejo TEXT,
        fecha TEXT,
        inicio TEXT,
        fin TEXT,
        precio REAL
      );

      CREATE TABLE IF NOT EXISTS turnos_cache (
        id TEXT PRIMARY KEY NOT NULL,
        espacioId TEXT NOT NULL,
        fecha TEXT NOT NULL,
        inicio TEXT NOT NULL,
        fin TEXT NOT NULL,
        estado TEXT NOT NULL,
        reservaId TEXT,
        motivoBloqueo TEXT,
        precio REAL NOT NULL
      );

      CREATE TABLE IF NOT EXISTS fijas_locales (
        id TEXT PRIMARY KEY NOT NULL,
        espacioId TEXT NOT NULL,
        titular TEXT NOT NULL,
        dia INTEGER NOT NULL,
        inicio TEXT NOT NULL,
        fin TEXT NOT NULL,
        desde TEXT NOT NULL,
        hasta TEXT,
        activa INTEGER NOT NULL
      );

      CREATE TABLE IF NOT EXISTS bloqueos_locales (
        id TEXT PRIMARY KEY NOT NULL,
        espacioId TEXT NOT NULL,
        fecha TEXT NOT NULL,
        inicio TEXT,
        fin TEXT,
        motivo TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS pendientes_sync (
        id TEXT PRIMARY KEY NOT NULL,
        tipo TEXT NOT NULL,
        payload TEXT NOT NULL,
        creadoEn TEXT NOT NULL
      );

      PRAGMA user_version = 1;
    `);
  }
}
