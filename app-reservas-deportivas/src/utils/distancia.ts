// src/utils/distancia.ts
// Utilidades de geolocalización y cálculo de distancia euclidiana/haversine

import type { Coordenadas, Espacio } from '../tipos/index.js';

/**
 * Radio medio de la Tierra en kilómetros
 */
const RADIO_TIERRA_KM = 6371;

/** Convierte grados a radianes */
function aRadianes(grados: number): number {
  return (grados * Math.PI) / 180;
}

/**
 * Calcula la distancia en kilómetros entre dos coordenadas usando la fórmula de Haversine
 */
export function calcularDistanciaKm(origen: Coordenadas, destino: Coordenadas): number {
  const dLat = aRadianes(destino.latitud - origen.latitud);
  const dLon = aRadianes(destino.longitud - origen.longitud);

  const lat1 = aRadianes(origen.latitud);
  const lat2 = aRadianes(destino.latitud);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return RADIO_TIERRA_KM * c;
}

/**
 * Formatea una distancia en formato legible ("450 m" o "2.3 km")
 */
export function formatearDistancia(km: number | null | undefined): string {
  if (km === null || km === undefined || isNaN(km)) return '—';
  if (km < 1) {
    const metros = Math.round(km * 1000);
    return `${metros} m`;
  }
  return `${km.toFixed(1)} km`;
}

/**
 * Ordena una lista de espacios según cercanía a una coordenada de referencia
 */
export function ordenarEspaciosPorCercania(
  espacios: Espacio[],
  ubicacionUsuario: Coordenadas | null
): Array<Espacio & { distanciaKm: number | null }> {
  return espacios
    .map((e) => {
      const distanciaKm = ubicacionUsuario
        ? calcularDistanciaKm(ubicacionUsuario, e.coordenadas)
        : null;
      return {
        ...e,
        distanciaKm,
      };
    })
    .sort((a, b) => {
      if (a.distanciaKm === null) return 0;
      if (b.distanciaKm === null) return 0;
      return a.distanciaKm - b.distanciaKm;
    });
}
