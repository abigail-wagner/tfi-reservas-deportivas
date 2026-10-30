// src/utils/__tests__/distancia.test.ts
// Tests unitarios de cálculo de distancia euclidiana/haversine y ordenamiento de cercanía

import { describe, it, expect } from 'vitest';
import {
  calcularDistanciaKm,
  formatearDistancia,
  ordenarEspaciosPorCercania,
} from '../distancia.js';
import { ESPACIOS_MOCK } from '../../mocks/datos.js';

describe('Utilidades de distancia geográfica', () => {
  const centroVillaguay = { latitud: -31.865, longitud: -59.027 };
  const poliVillaguay = { latitud: -31.8631, longitud: -59.0241 };

  it('calcularDistanciaKm calcula la distancia Haversine correctamente', () => {
    const distancia = calcularDistanciaKm(centroVillaguay, poliVillaguay);
    // Polideportivo está a unos 300 - 400 metros del centro de Villaguay
    expect(distancia).toBeGreaterThan(0.2);
    expect(distancia).toBeLessThan(1.0);
  });

  it('calcularDistanciaKm devuelve 0 para el mismo punto', () => {
    const d = calcularDistanciaKm(centroVillaguay, centroVillaguay);
    expect(d).toBeCloseTo(0, 4);
  });

  describe('formatearDistancia', () => {
    it('muestra metros para distancias menores a 1 km', () => {
      expect(formatearDistancia(0.45)).toBe('450 m');
      expect(formatearDistancia(0.08)).toBe('80 m');
    });

    it('muestra kilómetros con 1 decimal para distancias mayores o iguales a 1 km', () => {
      expect(formatearDistancia(1.84)).toBe('1.8 km');
      expect(formatearDistancia(5.0)).toBe('5.0 km');
    });

    it('devuelve guión para valores nulos o indefinidos', () => {
      expect(formatearDistancia(null)).toBe('—');
      expect(formatearDistancia(undefined)).toBe('—');
    });
  });

  describe('ordenarEspaciosPorCercania', () => {
    it('ordena de menor a mayor distancia cuando hay ubicación de usuario', () => {
      const ordenados = ordenarEspaciosPorCercania(ESPACIOS_MOCK, centroVillaguay);
      expect(ordenados.length).toBe(ESPACIOS_MOCK.length);
      expect(ordenados[0].distanciaKm).not.toBeNull();
      expect(ordenados[0].distanciaKm!).toBeLessThanOrEqual(
        ordenados[ordenados.length - 1].distanciaKm!
      );
    });

    it('mantiene la lista y distancia null cuando no hay ubicación de usuario', () => {
      const ordenados = ordenarEspaciosPorCercania(ESPACIOS_MOCK, null);
      expect(ordenados.length).toBe(ESPACIOS_MOCK.length);
      expect(ordenados[0].distanciaKm).toBeNull();
    });
  });
});
