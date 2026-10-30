// src/servicios/archivos.ts
// Gestión de almacenamiento de fotos de evidencia y multimedia usando expo-file-system

import { File, Paths } from 'expo-file-system';
import { clienteHttp } from '../api/cliente.js';
import type { ArchivoSubido } from '../tipos/index.js';

export async function guardarFotoEvidenciaLocal(uriTemporal: string): Promise<string> {
  try {
    const nombreArchivo = `evidencia_${Date.now()}.jpg`;
    const archivoOrigen = new File(uriTemporal);
    const carpetaDestino = Paths.document;
    const archivoDestino = new File(carpetaDestino, nombreArchivo);

    archivoOrigen.copy(archivoDestino);
    return archivoDestino.uri;
  } catch {
    // Si falla la API nueva de File/Paths, devolvemos el URI temporal original
    return uriTemporal;
  }
}

export async function subirFotoEvidencia(uriLocal: string): Promise<ArchivoSubido> {
  try {
    const formData = new FormData();
    const nombre = uriLocal.split('/').pop() || 'foto.jpg';
    
    // @ts-expect-error FormData de React Native admite objeto con uri, name, type
    formData.append('archivo', {
      uri: uriLocal,
      name: nombre,
      type: 'image/jpeg',
    });

    const res = await clienteHttp.post<{ datos: ArchivoSubido }>('/archivos', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return res.data.datos;
  } catch {
    // Modo offline: devolver referencia local
    return {
      url: uriLocal,
      tipo: 'imagen',
      bytes: 1024 * 150,
    };
  }
}
