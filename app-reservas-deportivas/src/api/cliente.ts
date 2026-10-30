// src/api/cliente.ts
// Cliente HTTP centralizado con Axios, autenticación con token Bearer e interceptores

import axios, { AxiosError } from 'axios';
import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import type { RespuestaError } from '../tipos/index';

// En emulador Android 10.0.2.2 apunta al host local; en iOS/Web localhost
export const DEFAULT_API_URL = Platform.select({
  android: 'http://10.0.2.2:3000',
  default: 'http://localhost:3000',
});

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
