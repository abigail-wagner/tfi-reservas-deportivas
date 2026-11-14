// src/api/cliente.ts
// Cliente HTTP centralizado con Axios, autenticación con token Bearer e interceptores

import axios, { AxiosError } from 'axios';
import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import type { Espacio, RespuestaError } from '../tipos/index';

// URL pública del backend de Reservas Deportivas
export const DEFAULT_API_URL = 'https://reservas.tail92fdf5.ts.net';

export const TOKEN_SECURE_KEY = 'villaguay_auth_token';
const USUARIO_SECURE_KEY = 'villaguay_auth_usuario';

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

/**
 * Obtiene el token JWT activo. Si el token guardado era de demostración local (`demo-jwt-*`),
 * solicita automáticamente un JWT real a `POST /auth/ingreso` en la instancia configurada.
 */
export async function asegurarTokenValido(): Promise<string | null> {
  const tokenActual = await leerItemSeguro(TOKEN_SECURE_KEY);
  if (tokenActual && !tokenActual.startsWith('demo-jwt')) {
    return tokenActual;
  }

  try {
    const baseUrl = (process.env.EXPO_PUBLIC_API_URL || DEFAULT_API_URL).replace(/\/+$/, '');
    const usuarioStr = await leerItemSeguro(USUARIO_SECURE_KEY);
    let email = 'emiliano@mail.com';
    if (usuarioStr) {
      const u = JSON.parse(usuarioStr);
      if (u?.email) {
        email =
          u.email.trim().toLowerCase() === 'admin@villaguay.demo.ar'
            ? 'nahuel@villaguay.demo.ar'
            : u.email.trim().toLowerCase();
      }
    }

    const r = await fetch(`${baseUrl}/auth/ingreso`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        email,
        contrasena: 'villaguay2026',
      }),
    });

    if (r.ok) {
      const j = await r.json();
      if (j?.datos?.token) {
        await guardarItemSeguro(TOKEN_SECURE_KEY, j.datos.token);
        if (j?.datos?.usuario) {
          await guardarItemSeguro(USUARIO_SECURE_KEY, JSON.stringify(j.datos.usuario));
        }
        return j.datos.token;
      }
    }
  } catch {
    // Si está sin conexión, devolver el token actual
  }

  return tokenActual;
}

export function normalizarUrlImagen(url: string | undefined | null): string {
  if (!url) return '';
  const limpia = url.trim();
  if (!limpia) return '';
  // Si ya es una URL absoluta (http://, https://) o URI local (file://, content://, data:, blob:),
  // se devuelve tal cual como indica la documentación de la API.
  if (
    limpia.startsWith('http://') ||
    limpia.startsWith('https://') ||
    limpia.startsWith('file://') ||
    limpia.startsWith('content://') ||
    limpia.startsWith('data:') ||
    limpia.startsWith('blob:')
  ) {
    return limpia;
  }
  const base = (process.env.EXPO_PUBLIC_API_URL || DEFAULT_API_URL).replace(/\/+$/, '');
  if (limpia.startsWith('/archivos/')) {
    return `${base}${limpia}`;
  }
  if (limpia.startsWith('imagenes/') || limpia.startsWith('archivos/')) {
    const ruta = limpia.startsWith('archivos/') ? `/${limpia}` : `/archivos/${limpia}`;
    return `${base}${ruta}`;
  }
  return limpia;
}

export function normalizarEspacio(espacio: Espacio): Espacio {
  return {
    ...espacio,
    imagenes: Array.isArray(espacio.imagenes)
      ? espacio.imagenes.map((u) => normalizarUrlImagen(u)).filter(Boolean)
      : [],
    videoUrl: espacio.videoUrl ?? null,
  };
}

export const clienteHttp = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL || DEFAULT_API_URL,
  timeout: 12000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Interceptor de envío: agrega Bearer token válido si existe en almacenamiento seguro o memoria
clienteHttp.interceptors.request.use(async (config) => {
  try {
    const esLogin = config.url?.includes('/auth/ingreso') || config.url?.includes('/auth/registro');
    const token = esLogin
      ? await leerItemSeguro(TOKEN_SECURE_KEY)
      : await asegurarTokenValido();
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
  const token = (await asegurarTokenValido()) || '';
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

/**
 * Paso 1 de subida de fotos: `POST /archivos` (multipart/form-data, campo `archivo`).
 * Devuelve `{ url, tipo, bytes }` donde `url` es la URL absoluta de la imagen en esa instancia.
 */
export async function subirArchivo(
  uriLocal: string,
  mimeTypeOpcional?: string
): Promise<{ url: string; tipo: 'imagen' | 'audio' | 'video'; bytes: number }> {
  const baseUrl = (process.env.EXPO_PUBLIC_API_URL || DEFAULT_API_URL).replace(/\/+$/, '');
  const token = await asegurarTokenValido();

  const limpio = (uriLocal.split('?')[0] || '').toLowerCase();
  const esPng = mimeTypeOpcional === 'image/png' || limpio.endsWith('.png');
  const esWebp = mimeTypeOpcional === 'image/webp' || limpio.endsWith('.webp');
  const type = esPng ? 'image/png' : esWebp ? 'image/webp' : 'image/jpeg';
  const name = esPng ? 'foto.png' : esWebp ? 'foto.webp' : 'foto.jpg';

  const form = new FormData();

  if (Platform.OS === 'web') {
    const respuestaBlob = await fetch(uriLocal);
    const blob = await respuestaBlob.blob();
    form.append('archivo', blob, name);
  } else {
    form.append('archivo', {
      uri: uriLocal,
      name,
      type,
    } as unknown as Blob);
  }

  const r1 = await fetch(`${baseUrl}/archivos`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: form,
  });

  const j1 = await r1.json().catch(() => null);

  if (!r1.ok) {
    if (j1?.error) {
      throw new ApiError(j1.error.codigo, j1.error.mensaje, r1.status);
    }
    throw new ApiError(
      'ERROR_SUBIDA',
      'No se pudo subir la imagen al servidor.',
      r1.status
    );
  }

  return j1.datos;
}
