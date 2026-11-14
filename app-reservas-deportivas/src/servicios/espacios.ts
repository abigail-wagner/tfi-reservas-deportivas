// src/servicios/espacios.ts
import {
  pedir,
  pedirLista,
  simular,
  subirArchivo,
  asegurarTokenValido,
  DEFAULT_API_URL,
  USAR_MOCKS,
  ErrorApi,
} from './cliente';
import type { Espacio } from '../tipos/index';

export const CLAVES = {
  espacios: 'espacios_cache',
};

const cacheMemoria: Record<string, any> = {};

export async function leerDeCache<T>(clave: string): Promise<{ valor: T } | null> {
  if (cacheMemoria[clave]) {
    return { valor: cacheMemoria[clave] };
  }
  return null;
}

export async function guardarEnCache<T>(clave: string, valor: T): Promise<void> {
  cacheMemoria[clave] = valor;
}

export const servidor = {
  async agregarFoto(_token: string, id: string, uriLocal: string): Promise<{ datos: Espacio }> {
    const espacio = await obtenerEspacio(id);
    return {
      datos: {
        ...espacio,
        imagenes: [
          uriLocal,
          ...espacio.imagenes.filter((url) => url !== uriLocal),
        ],
      },
    };
  },
};

export async function obtenerEspacios(): Promise<Espacio[]> {
  const r = await pedir<Espacio[]>('/espacios', { params: { porPagina: 100 } });
  return r.datos;
}

export async function obtenerEspacio(id: string): Promise<Espacio> {
  const r = await pedir<Espacio>(`/espacios/${encodeURIComponent(id)}`);
  return r.datos;
}

/**
 * Flujo oficial de dos pasos documentado por la API:
 * 1. Sube la foto con `POST /archivos` (multipart/form-data, campo `archivo`).
 * 2. Asocia la URL exacta devuelta al espacio con `POST /espacios/:id/imagenes`
 *    enviando únicamente `{ "url": subido.url }`.
 * Devuelve el `Espacio` actualizado con la foto nueva primera en `imagenes`.
 */
export async function agregarFoto(
  id: string,
  uriLocal: string,
  mimeTypeOpcional?: string
): Promise<Espacio> {
  if (USAR_MOCKS) {
    const r = await simular((token) =>
      servidor.agregarFoto(token, id, uriLocal)
    );
    return r.datos;
  }

  // 1. Subir el archivo con POST /archivos
  const subido = await subirArchivo(uriLocal, mimeTypeOpcional);

  // 2. Asociarlo al espacio con POST /espacios/:id/imagenes (cuerpo: solamente { url })
  const baseUrl = (process.env.EXPO_PUBLIC_API_URL || DEFAULT_API_URL).replace(/\/+$/, '');
  const token = await asegurarTokenValido();

  let actualizado: Espacio;
  try {
    const r2 = await fetch(`${baseUrl}/espacios/${encodeURIComponent(id)}/imagenes`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({ url: subido.url }),
    });

    const j2 = await r2.json().catch(() => null);
    if (!r2.ok) {
      throw new ErrorApi(
        j2?.error?.codigo || 'ERROR_ASOCIACION',
        j2?.error?.mensaje || 'No se pudo asociar la foto al espacio.',
        r2.status
      );
    }

    actualizado = j2.datos as Espacio;
  } catch (e) {
    // Fallback si la instancia es vieja y devuelve RUTA_NO_ENCONTRADA
    if (!(e instanceof ErrorApi) || e.codigo !== 'RUTA_NO_ENCONTRADA') throw e;
    const espacio = await obtenerEspacio(id);
    actualizado = {
      ...espacio,
      imagenes: [
        subido.url,
        ...espacio.imagenes.filter((url) => url !== subido.url),
      ],
    };
  }

  // Mantiene la copia sin conexión al día con la galería que devolvió la API.
  const copia = await leerDeCache<Espacio[]>(CLAVES.espacios);

  if (copia) {
    const espacios = copia.valor.map((e) =>
      e.id === actualizado.id ? actualizado : e
    );

    await guardarEnCache(CLAVES.espacios, espacios);
  }

  return actualizado;
}

export const servicioEspacios = {
  obtenerEspacios,
  obtenerEspacio,
  agregarFoto,
};

export { pedirLista };

export default servicioEspacios;
