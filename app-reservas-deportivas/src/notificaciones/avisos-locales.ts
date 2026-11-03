// src/notificaciones/avisos-locales.ts
// Configuración de notificaciones locales y remotas con expo-notifications y canales Android

import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';
import { clienteHttp } from '../api/cliente';
import type { Reserva } from '../tipos/index';

// Manejador en primer plano
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
    priority: Notifications.AndroidNotificationPriority.HIGH,
  }),
});

/**
 * Configura los canales de notificación requeridos en Android (Android 8.0+)
 */
export async function configurarCanalesNotificacion(): Promise<void> {
  if (Platform.OS === 'android') {
    try {
      await Notifications.setNotificationChannelAsync('reservas', {
        name: 'Recordatorios de Reservas',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#0284C7',
      });

      await Notifications.setNotificationChannelAsync('general', {
        name: 'Avisos Generales y Clima',
        importance: Notifications.AndroidImportance.HIGH,
        vibrationPattern: [0, 200, 200],
        lightColor: '#0284C7',
      });
    } catch (error) {
      console.warn('[Notificaciones] Canales en Expo Go:', error);
    }
  }
}

/**
 * Registra el token de push de Expo en el dispositivo y lo envía a la API
 */
export async function registrarTokenPushEnBackend(): Promise<string | null> {
  if (!Device.isDevice) {
    return null;
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    return null;
  }

  try {
    const tokenData = await Notifications.getExpoPushTokenAsync();
    const token = tokenData.data;

    // Registrar en backend
    await clienteHttp.post('/dispositivos', {
      tokenExpo: token,
      plataforma: Platform.OS === 'ios' ? 'ios' : 'android',
    });

    return token;
  } catch {
    return null;
  }
}

/**
 * Programa un recordatorio local 2 horas antes del inicio del turno de la reserva
 */
export async function programarRecordatorio2HorasAntes(reserva: Reserva): Promise<string | null> {
  try {
    if (!reserva.fecha || !reserva.inicio) return null;

    const [a, m, d] = reserva.fecha.split('-').map(Number);
    const [h, min] = reserva.inicio.split(':').map(Number);
    const fechaTurno = new Date(a, m - 1, d, h, min, 0);

    // 2 horas antes
    const fechaAviso = new Date(fechaTurno.getTime() - 2 * 60 * 60 * 1000);
    const ahora = new Date();

    if (fechaAviso.getTime() <= ahora.getTime()) {
      // Ya pasaron las 2 horas previas
      return null;
    }

    const idNotificacion = await Notifications.scheduleNotificationAsync({
      identifier: `recordatorio_${reserva.id}`,
      content: {
        title: '¡Tu partido comienza en 2 horas!',
        body: `Tenés turno en ${reserva.espacioNombre || 'la cancha'} a las ${reserva.inicio}. Presentá tu QR al ingresar.`,
        data: { reservaId: reserva.id, tipo: 'recordatorio_turno' },
        sound: true,
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DATE,
        date: fechaAviso,
        channelId: 'reservas',
      },
    });

    return idNotificacion;
  } catch {
    return null;
  }
}

/**
 * Cancela el recordatorio local de una reserva si es cancelada
 */
export async function cancelarRecordatorioReserva(reservaId: string): Promise<void> {
  try {
    await Notifications.cancelScheduledNotificationAsync(`recordatorio_${reservaId}`);
  } catch {
    // Si no existía o falló, no rompe
  }
}
