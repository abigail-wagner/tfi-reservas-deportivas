// Claves de archivo (AGENTS §17.1): <imagenes|audios|videos>/<AAAA>/<MM>/<id>.<ext>,
// generadas por el servidor y nunca reutilizadas.
import { textoAleatorio } from '../ids/ids.js';
import { origenDelPedido } from '../context/request-context.js';
import { CARPETA, type FormatoDetectado } from './file-types.js';

const FORMATO_CLAVE =
  /^(imagenes|audios|videos)\/\d{4}\/\d{2}\/[a-z0-9-]{8,64}\.(jpg|png|webp|m4a|aac|mp3|mp4)$/;

export function nuevaClave(
  formato: FormatoDetectado,
  anio: string,
  mes: string,
): string {
  return `${CARPETA[formato.tipo]}/${anio}/${mes}/${textoAleatorio(20)}.${formato.extension}`;
}

export function esClaveValida(clave: string): boolean {
  return FORMATO_CLAVE.test(clave);
}

/** URL absoluta de un archivo, con el origen del pedido en curso (o URL_PUBLICA). */
export function urlDeArchivo(clave: string): string {
  const origen = origenDelPedido();
  if (origen === null)
    throw new Error('urlDeArchivo se llamó fuera de un pedido.');
  return `${origen}/archivos/${clave}`;
}

/**
 * Clave de una imagen a partir de la URL que devolvió `POST /archivos`.
 * Sólo acepta URLs http(s) de esta API con una clave de imagen válida; el host
 * no se compara porque el mismo archivo puede haberse subido por la LAN y
 * asociado después por el dominio público.
 */
export function claveDeImagenDeUrl(url: string): string | null {
  let ruta: string;
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') return null;
    ruta = parsed.pathname;
  } catch {
    return null;
  }
  const prefijo = '/archivos/';
  if (!ruta.startsWith(prefijo)) return null;
  let clave: string;
  try {
    clave = decodeURIComponent(ruta.slice(prefijo.length));
  } catch {
    return null;
  }
  return clave.startsWith('imagenes/') && esClaveValida(clave) ? clave : null;
}

