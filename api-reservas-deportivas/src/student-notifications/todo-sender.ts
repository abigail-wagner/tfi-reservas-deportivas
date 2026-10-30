// PARTE 2 DE 2 PARA PROGRAMAR — cómo se mandan las push a Expo.
// Leé docs/NOTIFICATIONS.md. Cuando funcione, `pnpm test:notificaciones` tiene que pasar.
import { ErrorApi } from '../common/errors/error-api.js';
import {
  EnviadorPush,
  type MensajePush,
} from '../common/notifications/ports.js';

interface ExpoMensaje {
  to: string;
  title: string;
  body: string;
  data: Record<string, string>;
}

interface ExpoTicket {
  status: 'ok' | 'error';
  id?: string;
  message?: string;
  details?: {
    error?: string;
    [key: string]: unknown;
  };
}

interface ExpoRespuesta {
  data?: ExpoTicket[];
  errors?: Array<{ message: string; code?: string }>;
}

export class EnviadorPorHacer extends EnviadorPush {
  /** `url` es la dirección de la API de push de Expo (`EXPO_PUSH_URL` en la configuración). */
  constructor(readonly url: string) {
    super();
  }

  // Mandar los mensajes a Expo con `fetch` (POST de JSON a `this.url`).
  // Expo recibe un mensaje por token y acepta hasta 100 por pedido: si hay más, mandalos en
  // tandas. La respuesta trae un "ticket" por mensaje, en el mismo orden: los que dicen
  // `DeviceNotRegistered` son tokens que ya no sirven, y hay que devolverlos en
  // `tokensInvalidos` para que la API los descarte.
  async enviar(mensajes: MensajePush[]): Promise<{ tokensInvalidos: string[] }> {
    if (!mensajes || mensajes.length === 0) {
      return { tokensInvalidos: [] };
    }

    // Aplanar los mensajes por cada token
    const mensajesInd: ExpoMensaje[] = [];
    for (const msg of mensajes) {
      for (const token of msg.tokens) {
        mensajesInd.push({
          to: token,
          title: msg.titulo,
          body: msg.cuerpo,
          data: msg.datos ?? {},
        });
      }
    }

    if (mensajesInd.length === 0) {
      return { tokensInvalidos: [] };
    }

    const tokensInvalidos: string[] = [];
    const tamanoTanda = 100;

    for (let i = 0; i < mensajesInd.length; i += tamanoTanda) {
      const tanda = mensajesInd.slice(i, i + tamanoTanda);
      const respuesta = await fetch(this.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(tanda),
      });

      if (!respuesta.ok) {
        throw new ErrorApi(
          'ERROR_INTERNO',
          `Fallo al comunicar con Expo push: HTTP ${respuesta.status}`,
        );
      }

      const cuerpo = (await respuesta.json()) as ExpoRespuesta;
      const tickets = cuerpo.data;

      if (Array.isArray(tickets)) {
        tickets.forEach((ticket, idx) => {
          if (
            ticket.status === 'error' &&
            ticket.details?.error === 'DeviceNotRegistered'
          ) {
            tokensInvalidos.push(tanda[idx].to);
          }
        });
      }
    }

    return { tokensInvalidos };
  }
}
