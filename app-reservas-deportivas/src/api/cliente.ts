// src/api/cliente.ts
// Cliente HTTP centralizado con Axios, autenticación con token Bearer e interceptores

import axios, { AxiosError } from 'axios';
import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import type { Espacio, RespuestaError } from '../tipos/index';

// URL pública del backend de Reservas Deportivas
export const DEFAULT_API_URL = 'https://reservas.tail92fdf5.ts.net';

export const TOKEN_SECURE_KEY = 'villaguay_auth_token';

let tokenEnMemoria: string | null = null;

export async function leerItemSeguro(clave: string): Promise<string | null> {
  try {
    if (Platform.OS === 'web') {
      if (typeof localStorage !== 'undefined') {
        return localStorage.getItem(clave);
      }
      return clave === TOKEN_SECURE_KEY ? tokenEnMemoria : null;
    }
    const val = await SecureStore.getItemAsync(clave);
    if (clave === TOKEN_SECURE_KEY && val) {
      tokenEnMemoria = val;
    }
    return val;
  } catch {
    return clave === TOKEN_SECURE_KEY ? tokenEnMemoria : null;
  }
}

export async function guardarItemSeguro(clave: string, valor: string): Promise<void> {
  if (clave === TOKEN_SECURE_KEY) {
    tokenEnMemoria = valor;
  }
  try {
    if (Platform.OS === 'web') {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(clave, valor);
      }
      return;
    }
    await SecureStore.setItemAsync(clave, valor);
  } catch {
    // Fallback en memoria si falla el almacenamiento seguro
  }
}

export async function borrarItemSeguro(clave: string): Promise<void> {
  if (clave === TOKEN_SECURE_KEY) {
    tokenEnMemoria = null;
  }
  try {
    if (Platform.OS === 'web') {
      if (typeof localStorage !== 'undefined') {
        localStorage.removeItem(clave);
      }
      return;
    }
    await SecureStore.deleteItemAsync(clave);
  } catch {
    // Ignorar error
  }
}

export function normalizarUrlImagen(url: string | undefined | null): string {
  if (!url) return '';
  const limpia = url.trim();
  if (!limpia) return '';
  const base = (process.env.EXPO_PUBLIC_API_URL || DEFAULT_API_URL).replace(/\/+$/, '');
  if (limpia.startsWith('/archivos/')) {
    return `${base}${limpia}`;
  }
  if (limpia.startsWith('imagenes/') || limpia.startsWith('archivos/')) {
    const ruta = limpia.startsWith('archivos/') ? `/${limpia}` : `/archivos/${limpia}`;
    return `${base}${ruta}`;
  }
  try {
    const parsed = new URL(limpia);
    if (
      parsed.pathname.startsWith('/archivos/') &&
      (parsed.hostname === 'localhost' ||
        parsed.hostname === '127.0.0.1' ||
        parsed.hostname === '10.0.2.2' ||
        parsed.hostname.startsWith('192.168.'))
    ) {
      return `${base}${parsed.pathname}`;
    }
  } catch {
    // URI local (file://, content://, data:)
  }
  return limpia;
}

export function normalizarEspacio(espacio: Espacio): Espacio {
  return {
    ...espacio,
    imagenes: Array.isArray(espacio.imagenes)
      ? espacio.imagenes.map((u) => normalizarUrlImagen(u)).filter(Boolean)
      : [],
  };
}

export const clienteHttp = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL || DEFAULT_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Interceptor de envío: agrega Bearer token si existe en almacenamiento seguro o memoria
clienteHttp.interceptors.request.use(async (config) => {
  try {
    const token = await leerItemSeguro(TOKEN_SECURE_KEY);
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch {
    // Si falla el acceso al llavero, continúa sin token
  }
  return config;
});

export class ApiError extends Error {
  codigo: string;
  estado: number;

  constructor(codigo: string, mensaje: string, estado: number = 400) {
    super(mensaje);
    this.name = 'ApiError';
    this.codigo = codigo;
    this.estado = estado;
  }
}

// Interceptor de respuesta: normaliza los errores al contrato estándar { error: { codigo, mensaje } }
clienteHttp.interceptors.response.use(
  (response) => response,
  (error: AxiosError<RespuestaError>) => {
    if (error.response?.data?.error) {
      const { codigo, mensaje } = error.response.data.error;
      return Promise.reject(new ApiError(codigo, mensaje, error.response.status));
    }

    if (!error.response) {
      return Promise.reject(
        new ApiError(
          'RED_NO_DISPONIBLE',
          'No se pudo conectar con el servidor. Revisá tu conexión a internet o el modo sin conexión.',
          0
        )
      );
    }

    return Promise.reject(
      new ApiError(
        'ERROR_DESCONOCIDO',
        error.message || 'Ocurrió un error inesperado al procesar la solicitud.',
        error.response.status
      )
    );
  }
);

export { ApiError as ErrorApi };

export const USAR_MOCKS = false;

export async function simular<T>(
  fn: (token: string) => Promise<{ datos: T; meta?: any } | T>
): Promise<{ datos: T; meta: any }> {
  const token = (await leerItemSeguro(TOKEN_SECURE_KEY)) || '';
  const res = await fn(token);
  if (res && typeof res === 'object' && 'datos' in res) {
    return { datos: (res as any).datos, meta: (res as any).meta ?? null };
  }
  return { datos: res as T, meta: null };
}

export async function pedir<T>(
  ruta: string,
  opciones: { metodo?: string; cuerpo?: any; params?: any } = {}
): Promise<{ datos: T; meta: any }> {
  const metodo = (opciones.metodo || 'GET').toLowerCase();
  const res = await clienteHttp.request<{ datos: T; meta: any }>({
    url: ruta,
    method: metodo,
    data: opciones.cuerpo,
    params: opciones.params,
  });
  return res.data;
}

export async function pedirLista<T>(
  ruta: string,
  params?: any
): Promise<{ datos: T[]; meta: any }> {
  return pedir<T[]>(ruta, { metodo: 'GET', params });
}

export async function subirArchivo(
  uriLocal: string
): Promise<{ url: string; tipo: 'imagen' | 'audio' | 'video'; bytes: number }> {
  const formData = new FormData();
  const limpio = uriLocal.split('?')[0] || 'foto.jpg';
  const ext = (limpio.split('.').pop() || 'jpg').toLowerCase();
  const mime =
    ext === 'png'
      ? 'image/png'
      : ext === 'webp'
      ? 'image/webp'
      : 'image/jpeg';
  const nombre = limpio.split('/').pop() || `foto.${ext === 'png' ? 'png' : 'jpg'}`;

  if (Platform.OS === 'web') {
    const respuestaBlob = await fetch(uriLocal);
    const blob = await respuestaBlob.blob();
    formData.append('archivo', blob, nombre);
  } else {
    // @ts-expect-error FormData de React Native admite objeto con uri, name, type
    formData.append('archivo', {
      uri: uriLocal,
      name: nombre,
      type: mime,
    });
  }

  const token = await leerItemSeguro(TOKEN_SECURE_KEY);
  const baseUrl = (process.env.EXPO_PUBLIC_API_URL || DEFAULT_API_URL).replace(/\/+$/, '');

  const respuesta = await fetch(`${baseUrl}/archivos`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: formData,
  });

  const json = await respuesta.json().catch(() => null);

  if (!respuesta.ok) {
    if (json?.error) {
      throw new ApiError(json.error.codigo, json.error.mensaje, respuesta.status);
    }
    throw new ApiError(
      'ERROR_SUBIDA',
      'No se pudo subir la imagen al servidor.',
      respuesta.status
    );
  }

  return json.datos;
}
