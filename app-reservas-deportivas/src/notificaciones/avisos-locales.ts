// src/notificaciones/avisos-locales.ts
// Configuración de notificaciones locales y remotas con expo-notifications, Google FCM y canales Android

import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import Constants from 'expo-constants';
import { Platform } from 'react-native';
import { clienteHttp } from '../api/cliente';
import type { Reserva } from '../tipos/index';

// Manejador en primer plano (según apunte de cátedra Unidad 4)
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
 * Solicita permisos de notificación y obtiene el token de Expo / Google FCM
 */
export async function obtenerTokenPushDispositivo(): Promise<string | null> {
  try {
    await configurarCanalesNotificacion();

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      console.warn('[Notificaciones] Permiso de notificaciones denegado por el usuario.');
      return null;
    }

    // EAS Project ID si está configurado
    const projectId =
      Constants.expoConfig?.extra?.eas?.projectId ??
      Constants.easConfig?.projectId;

    const tokenData = await Notifications.getExpoPushTokenAsync(
      projectId ? { projectId } : undefined
    );

    return tokenData.data;
  } catch (error) {
    console.warn('[Notificaciones] Advertencia al obtener token push (normal en Expo Go Android sin build nativo):', error);
    return null;
  }
}

/**
 * Registra el token de push de Expo en el dispositivo y lo envía a la API
 */
export async function registrarTokenPushEnBackend(): Promise<string | null> {
  const token = await obtenerTokenPushDispositivo();
  if (!token) {
    return null;
  }

  try {
    // Registrar en backend (POST /dispositivos)
    await clienteHttp.post('/dispositivos', {
      tokenExpo: token,
      plataforma: Platform.OS === 'ios' ? 'ios' : 'android',
    });
    console.log('[Notificaciones] Token registrado exitosamente en el backend:', token);
    return token;
  } catch (error) {
    console.warn('[Notificaciones] No se pudo enviar el token al backend (verificar sesión activa):', error);
    return token;
  }
}

/**
 * Dispara una notificación de prueba local inmediata
 */
export async function enviarNotificacionPruebaLocal(): Promise<string> {
  await configurarCanalesNotificacion();
  return await Notifications.scheduleNotificationAsync({
    content: {
      title: '¡Notificación Local de Prueba! 🏟️🔔',
      body: 'El sistema de avisos de Reservas Villaguay está funcionando perfectamente.',
      data: { ruta: '/(tabs)/reservas' },
      sound: true,
    },
    trigger: null, // inmediato
  });
}

/**
 * Programa un aviso de prueba con cuenta regresiva (útil para minimizar la app)
 */
export async function programarAvisoPruebaSegundos(segundos: number = 5): Promise<string> {
  await configurarCanalesNotificacion();
  return await Notifications.scheduleNotificationAsync({
    content: {
      title: '⏱️ Aviso Programado (Villaguay Deportes)',
      body: `¡Pasaron ${segundos} segundos! Si minimizaste la app, viste el banner en tu barra de notificaciones.`,
      data: { ruta: '/(tabs)/reservas' },
      sound: true,
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: segundos,
      repeats: false,
      channelId: 'reservas',
    },
  });
}

/**
 * Solicita al backend que envíe una notificación push real a los dispositivos del usuario
 */
export async function solicitarPushPruebaServidor(): Promise<{ exito: boolean; mensaje: string }> {
  try {
    const respuesta = await clienteHttp.post<{ datos: { dispositivos: number } }>('/dispositivos/prueba');
    const cantidad = respuesta.data?.datos?.dispositivos ?? 0;
    return {
      exito: true,
      mensaje: `La API despachó la notificación push a ${cantidad} dispositivo(s) registrados.`,
    };
  } catch (error: any) {
    return {
      exito: false,
      mensaje:
        error?.response?.data?.mensaje ||
        error?.message ||
        'Error al solicitar push al servidor backend.',
    };
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
        data: { reservaId: reserva.id, tipo: 'recordatorio_turno', ruta: `/reserva/${reserva.id}` },
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
