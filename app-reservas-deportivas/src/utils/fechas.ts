// src/utils/fechas.ts
// Utilidades de cálculo de turnos, grilla de 7 días, ventanas de cancelación (4 horas) y restricciones horarias

import type { Bloqueo, EstadoTurno, Reserva, ReservaFija, Turno } from '../tipos/index';

export const HORAS_INICIO = [
  '08:00', '09:00', '10:00', '11:00', '12:00', '13:00',
  '14:00', '15:00', '16:00', '17:00', '18:00', '19:00',
  '20:00', '21:00', '22:00', '23:00'
];

/** Suma una hora en formato "HH:00" */
export function sumarUnaHora(hora: string): string {
  const [h] = hora.split(':').map(Number);
  const fin = h + 1;
  return `${fin.toString().padStart(2, '0')}:00`;
}

/** Devuelve la fecha de hoy en formato "AAAA-MM-DD" */
export function hoyString(fechaBase: Date = new Date()): string {
  const anio = fechaBase.getFullYear();
  const mes = (fechaBase.getMonth() + 1).toString().padStart(2, '0');
  const dia = fechaBase.getDate().toString().padStart(2, '0');
  return `${anio}-${mes}-${dia}`;
}

/** Suma N días a una fecha "AAAA-MM-DD" */
export function sumarDiasAFecha(fechaStr: string, dias: number): string {
  const [a, m, d] = fechaStr.split('-').map(Number);
  const fecha = new Date(a, m - 1, d);
  fecha.setDate(fecha.getDate() + dias);
  return hoyString(fecha);
}

/** Devuelve la lista de los próximos 7 días ("AAAA-MM-DD") */
export function obtenerProximos7Dias(fechaInicio: string = hoyString()): string[] {
  const dias: string[] = [];
  for (let i = 0; i < 7; i++) {
    dias.push(sumarDiasAFecha(fechaInicio, i));
  }
  return dias;
}

/** Día de la semana (0 = domingo, 1 = lunes, ..., 6 = sábado) */
export function obtenerDiaSemana(fechaStr: string): number {
  const [a, m, d] = fechaStr.split('-').map(Number);
  return new Date(a, m - 1, d).getDay();
}

/** Devuelve nombre del día ("Hoy", "Mañana", "Lun 2 Nov", etc.) */
export function formatearDiaLegible(fechaStr: string, base: string = hoyString()): string {
  if (fechaStr === base) return 'Hoy';
  if (fechaStr === sumarDiasAFecha(base, 1)) return 'Mañana';
  
  const [a, m, d] = fechaStr.split('-').map(Number);
  const fecha = new Date(a, m - 1, d);
  const nombresDias = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  const nombresMeses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
  return `${nombresDias[fecha.getDay()]} ${fecha.getDate()} ${nombresMeses[fecha.getMonth()]}`;
}

/**
 * Determina si un turno ya pasó en base a la fecha/hora actual
 */
export function esTurnoPasado(fecha: string, inicio: string, ahora: Date = new Date()): boolean {
  const [a, m, d] = fecha.split('-').map(Number);
  const [h, min] = inicio.split(':').map(Number);
  const fechaTurno = new Date(a, m - 1, d, h, min, 0);
  return fechaTurno.getTime() <= ahora.getTime();
}

/**
 * Regla de cancelación: se puede cancelar hasta 4 horas antes del inicio del turno
 */
export function esCancelable(fecha: string, inicio: string, ahora: Date = new Date()): boolean {
  const [a, m, d] = fecha.split('-').map(Number);
  const [h, min] = inicio.split(':').map(Number);
  const fechaTurno = new Date(a, m - 1, d, h, min, 0);
  const limiteCancelacion = fechaTurno.getTime() - 4 * 60 * 60 * 1000;
  return ahora.getTime() < limiteCancelacion;
}

/**
 * Genera el string ISO límite de cancelación (4 horas antes del turno)
 */
export function calcularCancelableHasta(fecha: string, inicio: string): string {
  const [a, m, d] = fecha.split('-').map(Number);
  const [h, min] = inicio.split(':').map(Number);
  const fechaTurno = new Date(a, m - 1, d, h, min, 0);
  const limite = new Date(fechaTurno.getTime() - 4 * 60 * 60 * 1000);
  return limite.toISOString();
}

/**
 * Sintetiza la grilla de turnos para un espacio y una fecha dada cruzando:
 * - 16 turnos base de 1h (08:00 a 24:00)
 * - Reservas existentes
 * - Reservas fijas semanales
 * - Bloqueos climáticos o de mantenimiento
 */
export function sintetizarTurnos(
  espacioId: string,
  fecha: string,
  precioBase: number,
  reservas: Reserva[],
  fijas: ReservaFija[],
  bloqueos: Bloqueo[],
  ahora: Date = new Date()
): Turno[] {
  const diaSemana = obtenerDiaSemana(fecha);

  return HORAS_INICIO.map((inicio) => {
    const fin = sumarUnaHora(inicio);
    const turnoId = `${espacioId}_${fecha}_${inicio}`;

    // 1. Verificar bloqueos (mantenimiento / lluvia)
    const bloqueo = bloqueos.find((b) => {
      if (b.espacioId !== espacioId || b.fecha !== fecha) return false;
      if (!b.inicio && !b.fin) return true; // Bloquea todo el día
      if (b.inicio && b.fin) {
        return inicio >= b.inicio && inicio < b.fin;
      }
      return false;
    });

    if (bloqueo) {
      return {
        id: turnoId,
        espacioId,
        fecha,
        inicio,
        fin,
        estado: 'mantenimiento' as EstadoTurno,
        reservaId: null,
        motivoBloqueo: bloqueo.motivo,
        precio: precioBase,
      };
    }

    // 2. Verificar reservas activas (confirmadas, cumplidas, ausentes)
    const reserva = reservas.find(
      (r) =>
        r.espacioId === espacioId &&
        (r.turnoId === turnoId || (r.fecha === fecha && r.inicio === inicio)) &&
        r.estado !== 'cancelada'
    );

    if (reserva) {
      return {
        id: turnoId,
        espacioId,
        fecha,
        inicio,
        fin,
        estado: 'reservado' as EstadoTurno,
        reservaId: reserva.id,
        motivoBloqueo: null,
        precio: precioBase,
      };
    }

    // 3. Verificar reservas fijas semanales activas
    const fija = fijas.find((f) => {
      if (f.espacioId !== espacioId || !f.activa) return false;
      if (f.dia !== diaSemana) return false;
      if (fecha < f.desde) return false;
      if (f.hasta && fecha > f.hasta) return false;
      return inicio >= f.inicio && inicio < f.fin;
    });

    if (fija) {
      return {
        id: turnoId,
        espacioId,
        fecha,
        inicio,
        fin,
        estado: 'fijo' as EstadoTurno,
        reservaId: null,
        motivoBloqueo: `Fijo: ${fija.titular}`,
        precio: precioBase,
      };
    }

    // 4. Si el turno ya pasó, no se puede reservar
    const pasado = esTurnoPasado(fecha, inicio, ahora);

    return {
      id: turnoId,
      espacioId,
      fecha,
      inicio,
      fin,
      estado: (pasado ? 'mantenimiento' : 'libre') as EstadoTurno,
      reservaId: null,
      motivoBloqueo: pasado ? 'Horario expirado' : null,
      precio: precioBase,
    };
  });
}
