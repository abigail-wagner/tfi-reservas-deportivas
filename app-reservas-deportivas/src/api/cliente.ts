// src/api/cliente.ts
// Cliente HTTP centralizado con Axios, autenticación con token Bearer e interceptores

import axios, { AxiosError } from 'axios';
import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import type { RespuestaError } from '../tipos/index';

// URL pública del backend de Reservas Deportivas
export const DEFAULT_API_URL = 'https://reservas.tail92fdf5.ts.net';

export const TOKEN_SECURE_KEY = 'villaguay_auth_token';

export const clienteHttp = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL || DEFAULT_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Interceptor de envío: agrega Bearer token si existe en SecureStore
clienteHttp.interceptors.request.use(async (config) => {
  try {
    const token = await SecureStore.getItemAsync(TOKEN_SECURE_KEY);
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
  const token = (await SecureStore.getItemAsync(TOKEN_SECURE_KEY)) || '';
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
  const nombre = uriLocal.split('/').pop() || 'foto.jpg';

  // @ts-expect-error FormData de React Native admite objeto con uri, name, type
  formData.append('archivo', {
    uri: uriLocal,
    name: nombre,
    type: 'image/jpeg',
  });

  const res = await clienteHttp.post<{
    datos: { url: string; tipo: 'imagen' | 'audio' | 'video'; bytes: number };
  }>('/archivos', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return res.data.datos;
}

