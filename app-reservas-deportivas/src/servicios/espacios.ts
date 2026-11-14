// src/servicios/espacios.ts
import { pedir, pedirLista, simular, subirArchivo, USAR_MOCKS, ErrorApi } from './cliente';
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
  const r = await pedir<Espacio[]>('/espacios');
  return r.datos;
}

export async function obtenerEspacio(id: string): Promise<Espacio> {
  const r = await pedir<Espacio>(`/espacios/${encodeURIComponent(id)}`);
  return r.datos;
}

/**
 * Sube una foto del estado de la cancha con POST /archivos y la asocia al
 * espacio con POST /espacios/:id/imagenes. Desde ahí la devuelve la API en
 * cada GET, en cualquier teléfono.
 */
export async function agregarFoto(id: string, uriLocal: string): Promise<Espacio> {
  if (USAR_MOCKS) {
    const r = await simular((token) =>
      servidor.agregarFoto(token, id, uriLocal)
    );
    return r.datos;
  }

  const subido = await subirArchivo(uriLocal);

  let actualizado: Espacio;
  try {
    const r = await pedir<Espacio>(
      `/espacios/${encodeURIComponent(id)}/imagenes`,
      { metodo: 'POST', cuerpo: { url: subido.url } }
    );
    actualizado = r.datos;
  } catch (e) {
    // API vieja sin el endpoint de asociación: la foto queda sólo en este
    // teléfono, como antes, en vez de romper la carga entera.
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
