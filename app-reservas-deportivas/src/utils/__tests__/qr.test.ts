// src/utils/__tests__/qr.test.ts
import { describe, it, expect } from 'vitest';
import { generarMatrizQr } from '../qr';
import { construirIdTurno, desarmarIdTurno, generarCodigoQrLocal } from '../fechas';

describe('Generador QR ISO/IEC 18004 y formato de turnos', () => {
  it('genera una matriz cuadrada válida con patrones de búsqueda 7x7 en las 3 esquinas', () => {
    const codigo = 'VGY-1114-19-A1B2C3';
    const matriz = generarMatrizQr(codigo);
    const n = matriz.length;

    // Versión 2 (25x25) para 18 bytes
    expect(n).toBe(25);
    expect(matriz[0]).toHaveLength(25);

    // Esquina superior izquierda (finder pattern 7x7)
    expect(matriz[0][0]).toBe(true);
    expect(matriz[0][6]).toBe(true);
    expect(matriz[6][0]).toBe(true);
    expect(matriz[6][6]).toBe(true);
    expect(matriz[3][3]).toBe(true);
    expect(matriz[1][1]).toBe(false);

    // Esquina superior derecha
    expect(matriz[0][n - 1]).toBe(true);
    expect(matriz[0][n - 7]).toBe(true);
    expect(matriz[3][n - 4]).toBe(true);

    // Esquina inferior izquierda
    expect(matriz[n - 1][0]).toBe(true);
    expect(matriz[n - 7][0]).toBe(true);
    expect(matriz[n - 4][3]).toBe(true);

    // Módulo oscuro fijo en (size - 8, 8)
    expect(matriz[n - 8][8]).toBe(true);
  });

  it('construye y desarma turnoId compatible con el contrato del backend', () => {
    const id = construirIdTurno('esp-02', '2026-11-14', '19:00');
    expect(id).toBe('tur-esp-02-20261114-19');

    const partes = desarmarIdTurno(id);
    expect(partes).toEqual({
      espacioId: 'esp-02',
      fecha: '2026-11-14',
      inicio: '19:00',
      fin: '20:00',
    });

    const qr = generarCodigoQrLocal('2026-11-14', '19:00');
    expect(qr).toMatch(/^VGY-1114-19-[A-Z0-9]{6}$/);
  });
});
