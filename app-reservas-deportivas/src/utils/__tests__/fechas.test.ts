// src/utils/__tests__/fechas.test.ts
// Tests unitarios de la lógica de fechas, cálculo de turnos y ventana de cancelación de 4 horas

import { describe, it, expect } from 'vitest';
import {
  sumarUnaHora,
  hoyString,
  sumarDiasAFecha,
  obtenerProximos7Dias,
  obtenerDiaSemana,
  formatearDiaLegible,
  esTurnoPasado,
  esCancelable,
  calcularCancelableHasta,
  sintetizarTurnos,
} from '../fechas';
import type { Bloqueo, Reserva, ReservaFija } from '../../tipos/index';

describe('Utilidades de fechas y turnos', () => {
  it('sumarUnaHora incrementa exactamente 1 hora en formato HH:00', () => {
    expect(sumarUnaHora('08:00')).toBe('09:00');
    expect(sumarUnaHora('19:00')).toBe('20:00');
    expect(sumarUnaHora('23:00')).toBe('24:00');
  });

  it('obtenerProximos7Dias devuelve exactamente 7 días consecutivos', () => {
    const base = '2026-10-31';
    const dias = obtenerProximos7Dias(base);
    expect(dias).toHaveLength(7);
    expect(dias[0]).toBe('2026-10-31');
    expect(dias[1]).toBe('2026-11-01');
    expect(dias[6]).toBe('2026-11-06');
  });

  it('formatearDiaLegible identifica Hoy y Mañana', () => {
    const base = '2026-10-31';
    expect(formatearDiaLegible(base, base)).toBe('Hoy');
    expect(formatearDiaLegible('2026-11-01', base)).toBe('Mañana');
    expect(formatearDiaLegible('2026-11-02', base)).toContain('Nov');
  });

  describe('Regla de cancelación de 4 horas (D4)', () => {
    it('permite cancelar con más de 4 horas de anticipación', () => {
      // Turno a las 20:00 del 31/10/2026
      // Ahora son las 15:00 (faltan 5 horas)
      const ahora = new Date(2026, 9, 31, 15, 0, 0);
      expect(esCancelable('2026-10-31', '20:00', ahora)).toBe(true);
    });

    it('rechaza cancelar cuando faltan menos de 4 horas', () => {
      // Turno a las 20:00 del 31/10/2026
      // Ahora son las 16:30 (faltan 3.5 horas)
      const ahora = new Date(2026, 9, 31, 16, 30, 0);
      expect(esCancelable('2026-10-31', '20:00', ahora)).toBe(false);
    });

    it('rechaza cancelar si el turno ya comenzó o pasó', () => {
      // Turno a las 20:00 del 31/10/2026
      // Ahora son las 20:15
      const ahora = new Date(2026, 9, 31, 20, 15, 0);
      expect(esCancelable('2026-10-31', '20:00', ahora)).toBe(false);
    });

    it('calcula cancelableHasta correctamente 4 horas antes', () => {
      const limite = calcularCancelableHasta('2026-10-31', '20:00');
      const fechaLimite = new Date(limite);
      expect(fechaLimite.getHours()).toBe(16);
      expect(fechaLimite.getMinutes()).toBe(0);
    });
  });

  describe('sintetizarTurnos', () => {
    const ahora = new Date(2026, 9, 31, 10, 0, 0); // 31/10/2026 10:00
    const fecha = '2026-10-31';

    it('genera los 16 turnos diarios de 08:00 a 24:00', () => {
      const turnos = sintetizarTurnos('esp-01', fecha, 12000, [], [], [], ahora);
      expect(turnos).toHaveLength(16);
      expect(turnos[0].inicio).toBe('08:00');
      expect(turnos[turnos.length - 1].inicio).toBe('23:00');
    });

    it('marca como mantenimiento los turnos que ya pasaron', () => {
      const turnos = sintetizarTurnos('esp-01', fecha, 12000, [], [], [], ahora);
      // Turno de las 08:00 ya pasó respecto a las 10:00
      const turno8 = turnos.find((t) => t.inicio === '08:00');
      expect(turno8?.estado).toBe('mantenimiento');
      expect(turno8?.motivoBloqueo).toBe('Horario expirado');

      // Turno de las 18:00 está en el futuro
      const turno18 = turnos.find((t) => t.inicio === '18:00');
      expect(turno18?.estado).toBe('libre');
    });

    it('aplica bloqueos por lluvia o mantenimiento en el rango o día entero', () => {
      const bloqueos: Bloqueo[] = [
        {
          id: 'blq-01',
          espacioId: 'esp-01',
          fecha,
          inicio: '14:00',
          fin: '16:00',
          motivo: 'Anegamiento por lluvia',
        },
      ];

      const turnos = sintetizarTurnos('esp-01', fecha, 12000, [], [], bloqueos, ahora);
      const turno14 = turnos.find((t) => t.inicio === '14:00');
      const turno15 = turnos.find((t) => t.inicio === '15:00');
      const turno16 = turnos.find((t) => t.inicio === '16:00');

      expect(turno14?.estado).toBe('mantenimiento');
      expect(turno14?.motivoBloqueo).toBe('Anegamiento por lluvia');
      expect(turno15?.estado).toBe('mantenimiento');
      expect(turno16?.estado).toBe('libre');
    });

    it('aplica reservas confirmadas existentes marcando reservado', () => {
      const reservas: Reserva[] = [
        {
          id: 'res-99',
          turnoId: 'esp-01_2026-10-31_21:00',
          espacioId: 'esp-01',
          usuarioId: 'usr-207',
          cantidadPersonas: 10,
          codigoQr: 'QR-TEST',
          estado: 'confirmada',
          ingresoEn: null,
          creadaEn: ahora.toISOString(),
          cancelableHasta: '2026-10-31T17:00:00Z',
          fecha,
          inicio: '21:00',
        },
      ];

      const turnos = sintetizarTurnos('esp-01', fecha, 12000, reservas, [], [], ahora);
      const turno21 = turnos.find((t) => t.inicio === '21:00');
      expect(turno21?.estado).toBe('reservado');
      expect(turno21?.reservaId).toBe('res-99');
    });

    it('aplica reservas fijas en el día de la semana correspondiente', () => {
      // 31/10/2026 es sábado (día 6)
      const diaSemana = obtenerDiaSemana(fecha);
      const fijas: ReservaFija[] = [
        {
          id: 'fij-01',
          espacioId: 'esp-01',
          titular: 'Torneo Veteranos',
          dia: diaSemana as any,
          inicio: '18:00',
          fin: '20:00',
          desde: '2026-01-01',
          hasta: null,
          activa: true,
        },
      ];

      const turnos = sintetizarTurnos('esp-01', fecha, 12000, [], fijas, [], ahora);
      const turno18 = turnos.find((t) => t.inicio === '18:00');
      const turno19 = turnos.find((t) => t.inicio === '19:00');

      expect(turno18?.estado).toBe('fijo');
      expect(turno18?.motivoBloqueo).toContain('Veteranos');
      expect(turno19?.estado).toBe('fijo');
    });
  });
});
