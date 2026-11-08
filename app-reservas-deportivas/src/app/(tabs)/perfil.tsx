// src/app/(tabs)/perfil.tsx
// Perfil de usuario, configuración de biometría, modo oscuro, centro de notificaciones (Google FCM / Local) y selector de cuentas demo

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Switch,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import * as Notifications from 'expo-notifications';
import { useTema } from '../../contexto/tema';
import { useSesion } from '../../contexto/sesion';
import { Icono } from '../../componentes/Icono';
import { USUARIOS_MOCK } from '../../mocks/datos';
import {
  obtenerTokenPushDispositivo,
  enviarNotificacionPruebaLocal,
  programarAvisoPruebaSegundos,
  solicitarPushPruebaServidor,
} from '../../notificaciones/avisos-locales';

export default function PerfilPantalla() {
  const router = useRouter();
  const { colores, esOscuro, preferencia, setPreferencia } = useTema();
  const {
    usuario,
    cerrarSesion,
    biometriaDisponible,
    biometriaHabilitada,
    setBiometriaHabilitada,
    iniciarSesion,
  } = useSesion();

  const [permisoNotif, setPermisoNotif] = useState<boolean | null>(null);
  const [pushToken, setPushToken] = useState<string | null>(null);
  const [cargandoAccion, setCargandoAccion] = useState(false);
  const [mostrarGuiaGoogle, setMostrarGuiaGoogle] = useState(false);

  useEffect(() => {
    async function verificarEstadoNotificaciones() {
      try {
        const { status } = await Notifications.getPermissionsAsync();
        setPermisoNotif(status === 'granted');
        if (status === 'granted') {
          const t = await obtenerTokenPushDispositivo();
          setPushToken(t);
        }
      } catch {
        // En emuladores o entornos sin soporte
      }
    }
    verificarEstadoNotificaciones();
  }, [usuario]);

  const handleCerrarSesion = () => {
    Alert.alert('Cerrar Sesión', '¿Deseás salir de tu cuenta?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Cerrar Sesión',
        style: 'destructive',
        onPress: async () => {
          await cerrarSesion();
          router.replace('/auth/ingreso');
        },
      },
    ]);
  };

  const handleCambiarCuentaDemo = async (email: string) => {
    try {
      await iniciarSesion(email, 'villaguay2026');
      Alert.alert('Sesión cambiada', `Iniciaste como ${email}`);
    } catch {
      //
    }
  };

  const handlePedirPermiso = async () => {
    try {
      const { status } = await Notifications.requestPermissionsAsync();
      const concedido = status === 'granted';
      setPermisoNotif(concedido);
      if (concedido) {
        const t = await obtenerTokenPushDispositivo();
        setPushToken(t);
        Alert.alert('Permiso concedido', '¡Ahora vas a recibir recordatorios y avisos deportivos!');
      } else {
        Alert.alert('Permiso denegado', 'Podés activarlo en los Ajustes del sistema.');
      }
    } catch (e: any) {
      Alert.alert('Error', e?.message || 'No se pudo solicitar el permiso.');
    }
  };

  const handlePruebaLocal = async () => {
    try {
      await enviarNotificacionPruebaLocal();
      Alert.alert('¡Notificación enviada!', 'Revisá la bandeja superior de tu teléfono.');
    } catch (e: any) {
      Alert.alert('Error al emitir notificación', e?.message || 'Ocurrió un error.');
    }
  };

  const handlePruebaProgramada = async () => {
    try {
      await programarAvisoPruebaSegundos(5);
      Alert.alert(
        '⏱️ Aviso programado (5 segundos)',
        '¡Minimizá la aplicación ahora para ver cómo el sistema operativo dibuja el banner de notificación!',
        [{ text: 'Entendido' }]
      );
    } catch (e: any) {
      Alert.alert('Error', e?.message || 'No se pudo programar el aviso.');
    }
  };

  const handlePruebaPushServidor = async () => {
    setCargandoAccion(true);
    try {
      const res = await solicitarPushPruebaServidor();
      if (res.exito) {
        Alert.alert('Respuesta del Servidor (API)', res.mensaje);
      } else {
        Alert.alert('Aviso del Servidor', res.mensaje);
      }
    } finally {
      setCargandoAccion(false);
    }
  };

  return (
    <ScrollView style={[styles.contenedor, { backgroundColor: colores.fondo }]}>
      {/* Tarjeta de usuario */}
      <View
        style={[
          styles.tarjetaPerfil,
          { backgroundColor: colores.tarjeta, borderColor: colores.borde },
        ]}
      >
        <View style={[styles.avatar, { backgroundColor: colores.primario }]}>
          <Text style={styles.avatarTexto}>
            {usuario?.nombre?.substring(0, 2).toUpperCase() || 'VG'}
          </Text>
        </View>

        <Text style={[styles.nombre, { color: colores.texto }]}>
          {usuario?.nombre || 'Emiliano Ruiz'}
        </Text>
        <Text style={[styles.email, { color: colores.textoSecundario }]}>
          {usuario?.email || 'emiliano@mail.com'}
        </Text>

        <View style={styles.estadisticasFila}>
          <View style={styles.statItem}>
            <Text style={[styles.statValor, { color: colores.primario }]}>
              {usuario?.espaciosFavoritos?.length || 0}
            </Text>
            <Text style={[styles.statLabel, { color: colores.textoSecundario }]}>
              Favoritos
            </Text>
          </View>

          <View style={styles.statItem}>
            <Text
              style={[
                styles.statValor,
                {
                  color:
                    (usuario?.cancelacionesTardias || 0) > 0
                      ? colores.advertencia
                      : colores.exito,
                },
              ]}
            >
              {usuario?.cancelacionesTardias || 0}
            </Text>
            <Text style={[styles.statLabel, { color: colores.textoSecundario }]}>
              Canc. Tardías
            </Text>
          </View>

          <View style={styles.statItem}>
            <Text
              style={[
                styles.statValor,
                {
                  color:
                    (usuario?.ausencias || 0) > 0
                      ? colores.peligro
                      : colores.exito,
                },
              ]}
            >
              {usuario?.ausencias || 0}
            </Text>
            <Text style={[styles.statLabel, { color: colores.textoSecundario }]}>
              Ausencias
            </Text>
          </View>
        </View>
      </View>

      {/* Ajustes y Preferencias */}
      <Text style={[styles.seccionTitulo, { color: colores.textoSecundario }]}>
        Preferencias de la Aplicación
      </Text>

      <View
        style={[
          styles.seccionAjustes,
          { backgroundColor: colores.tarjeta, borderColor: colores.borde },
        ]}
      >
        {/* Switch de Biometría */}
        {biometriaDisponible && (
          <View style={[styles.filaAjuste, { borderBottomColor: colores.borde }]}>
            <View style={styles.ajusteIconoTexto}>
              <Icono nombre="finger-print-outline" tamano={22} color={colores.primario} />
              <View>
                <Text style={[styles.ajusteTitulo, { color: colores.texto }]}>
                  Ingreso con Biometría
                </Text>
                <Text style={[styles.ajusteSub, { color: colores.textoSecundario }]}>
                  Huella dactilar o Face ID
                </Text>
              </View>
            </View>
            <Switch
              value={biometriaHabilitada}
              onValueChange={setBiometriaHabilitada}
              trackColor={{ false: '#CBD5E1', true: colores.primario }}
            />
          </View>
        )}

        {/* Switch Modo Oscuro */}
        <View style={styles.filaAjuste}>
          <View style={styles.ajusteIconoTexto}>
            <Icono
              nombre={esOscuro ? 'moon' : 'sunny-outline'}
              tamano={22}
              color={esOscuro ? colores.primario : colores.advertencia}
            />
            <View>
              <Text style={[styles.ajusteTitulo, { color: colores.texto }]}>Modo Oscuro</Text>
              <Text style={[styles.ajusteSub, { color: colores.textoSecundario }]}>
                Tema visual de la interfaz
              </Text>
            </View>
          </View>
          <Switch
            value={esOscuro}
            onValueChange={(activo) => setPreferencia(activo ? 'oscuro' : 'claro')}
            trackColor={{ false: '#CBD5E1', true: colores.primario }}
          />
        </View>
      </View>

      {/* 🔔 CENTRO DE NOTIFICACIONES Y GOOGLE FCM */}
      <Text style={[styles.seccionTitulo, { color: colores.textoSecundario }]}>
        Notificaciones · Google FCM y Locales
      </Text>

      <View
        style={[
          styles.seccionAjustes,
          { backgroundColor: colores.tarjeta, borderColor: colores.borde, padding: 16 },
        ]}
      >
        {/* Estado del permiso */}
        <View style={styles.filaEstadoNotif}>
          <View style={{ flex: 1 }}>
            <Text style={[styles.notifTitulo, { color: colores.texto }]}>
              Estado de Notificaciones
            </Text>
            <Text style={[styles.notifSub, { color: colores.textoSecundario }]}>
              {permisoNotif === true
                ? 'Permiso concedido en este dispositivo.'
                : permisoNotif === false
                ? 'Permiso denegado o pendiente.'
                : 'Comprobando permisos...'}
            </Text>
          </View>

          {permisoNotif ? (
            <View style={[styles.badge, { backgroundColor: esOscuro ? '#064E3B' : '#DCFCE7' }]}>
              <Text style={[styles.badgeTexto, { color: colores.exito }]}>Activo ✅</Text>
            </View>
          ) : (
            <TouchableOpacity
              style={[styles.botonPermiso, { backgroundColor: colores.primario }]}
              onPress={handlePedirPermiso}
            >
              <Text style={styles.botonPermisoTexto}>Activar</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Token FCM / Expo */}
        <View style={[styles.cajaToken, { backgroundColor: colores.fondo, borderColor: colores.borde }]}>
          <Text style={[styles.cajaTokenLabel, { color: colores.textoSecundario }]}>
            Identificador Push (Google FCM / Expo Token):
          </Text>
          <Text
            style={[styles.cajaTokenValor, { color: colores.texto }]}
            numberOfLines={2}
            selectable
          >
            {pushToken ||
              'En Expo Go (Android) las push remotas usan desarrollo; las notificaciones locales están 100% activas.'}
          </Text>
        </View>

        {/* Botones de prueba interactiva */}
        <Text style={[styles.subSeccionTitulo, { color: colores.textoSecundario }]}>
          Acciones de Prueba (Cátedra U04.T03):
        </Text>

        <View style={styles.grupoBotonesPrueba}>
          <TouchableOpacity
            style={[styles.botonAccionNotif, { backgroundColor: colores.primario }]}
            onPress={handlePruebaLocal}
          >
            <Icono nombre="notifications" tamano={18} color="#FFFFFF" />
            <Text style={styles.botonAccionTexto}>Aviso Local Inmediato</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.botonAccionNotif, { backgroundColor: colores.advertencia }]}
            onPress={handlePruebaProgramada}
          >
            <Icono nombre="timer-outline" tamano={18} color="#FFFFFF" />
            <Text style={styles.botonAccionTexto}>Programar en 5 Segundos</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.botonAccionNotif, { backgroundColor: '#4F46E5' }]}
            onPress={handlePruebaPushServidor}
            disabled={cargandoAccion}
          >
            {cargandoAccion ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <>
                <Icono nombre="cloud-upload-outline" tamano={18} color="#FFFFFF" />
                <Text style={styles.botonAccionTexto}>Push desde Servidor (API)</Text>
              </>
            )}
          </TouchableOpacity>
        </View>

        {/* Guía desplegable de Google Cloud / Firebase */}
        <TouchableOpacity
          style={[styles.botonGuiaGoogle, { borderTopColor: colores.borde }]}
          onPress={() => setMostrarGuiaGoogle(!mostrarGuiaGoogle)}
        >
          <Icono nombre="logo-google" tamano={18} color="#EA4335" />
          <Text style={[styles.botonGuiaTexto, { color: colores.primario }]}>
            {mostrarGuiaGoogle ? 'Ocultar guía de Google Firebase FCM ▲' : 'Ver configuración Google Firebase FCM ▼'}
          </Text>
        </TouchableOpacity>

        {mostrarGuiaGoogle && (
          <View style={[styles.panelGuia, { backgroundColor: colores.fondo, borderColor: colores.borde }]}>
            <Text style={[styles.guiaPaso, { color: colores.texto }]}>
              <Text style={{ fontWeight: '700' }}>1. Proyecto Firebase:</Text> Creá un proyecto en Firebase Console (console.firebase.google.com) con tu cuenta de Google.
            </Text>
            <Text style={[styles.guiaPaso, { color: colores.texto }]}>
              <Text style={{ fontWeight: '700' }}>2. Registrar Android:</Text> Usá el paquete exacto <Text style={{ fontFamily: 'monospace' }}>ar.edu.uner.reservasvillaguay</Text>.
            </Text>
            <Text style={[styles.guiaPaso, { color: colores.texto }]}>
              <Text style={{ fontWeight: '700' }}>3. google-services.json:</Text> Ya está configurado y vinculado en app.json. Descargá el tuyo de Firebase y reemplazalo en la raíz de app-reservas-deportivas.
            </Text>
            <Text style={[styles.guiaPaso, { color: colores.texto }]}>
              <Text style={{ fontWeight: '700' }}>4. Clave de Servicio FCM V1:</Text> En Configuración del Proyecto ➔ Cuentas de Servicio ➔ Generar clave privada, y vinculala con <Text style={{ fontFamily: 'monospace' }}>eas credentials</Text>.
            </Text>
          </View>
        )}
      </View>

      {/* Cuentas Demo para Evaluación de Cátedra */}
      <Text style={[styles.seccionTitulo, { color: colores.textoSecundario }]}>
        Cuentas Demo de Cátedra
      </Text>
      <View
        style={[
          styles.seccionAjustes,
          { backgroundColor: colores.tarjeta, borderColor: colores.borde },
        ]}
      >
        {USUARIOS_MOCK.map((u) => {
          const esActual = usuario?.id === u.id;
          return (
            <TouchableOpacity
              key={u.id}
              style={[
                styles.filaDemo,
                { borderBottomColor: colores.borde },
                esActual && { backgroundColor: colores.primarioClaro },
              ]}
              onPress={() => handleCambiarCuentaDemo(u.email)}
            >
              <View style={{ flex: 1 }}>
                <Text
                  style={[
                    styles.demoNombre,
                    { color: esActual ? colores.primario : colores.texto },
                  ]}
                >
                  {u.nombre}
                </Text>
                <Text style={[styles.demoEmail, { color: colores.textoSecundario }]}>
                  {u.email} · Rol: {u.rol.toUpperCase()}
                </Text>
              </View>
              {esActual && (
                <Icono nombre="checkmark-circle" tamano={20} color={colores.primario} />
              )}
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Botón Salir */}
      <TouchableOpacity
        style={[styles.botonCerrarSesion, { borderColor: colores.peligro }]}
        onPress={handleCerrarSesion}
      >
        <Icono nombre="log-out-outline" tamano={20} color={colores.peligro} />
        <Text style={[styles.botonCerrarTexto, { color: colores.peligro }]}>
          Cerrar Sesión
        </Text>
      </TouchableOpacity>

      <Text style={[styles.versionTexto, { color: colores.textoSecundario }]}>
        Reservas Deportivas Villaguay v1.0.0 · UNER 2026
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    padding: 16,
  },
  tarjetaPerfil: {
    alignItems: 'center',
    padding: 24,
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 20,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  avatarTexto: {
    fontSize: 26,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  nombre: {
    fontSize: 20,
    fontWeight: '800',
  },
  email: {
    fontSize: 13,
    marginTop: 2,
  },
  estadisticasFila: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    marginTop: 20,
    paddingTop: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#E2E8F0',
  },
  statItem: {
    alignItems: 'center',
  },
  statValor: {
    fontSize: 18,
    fontWeight: '800',
  },
  statLabel: {
    fontSize: 11,
    marginTop: 2,
  },
  seccionTitulo: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 10,
    marginLeft: 4,
  },
  seccionAjustes: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
    marginBottom: 20,
  },
  filaAjuste: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  ajusteIconoTexto: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  ajusteTitulo: {
    fontSize: 15,
    fontWeight: '600',
  },
  ajusteSub: {
    fontSize: 12,
    marginTop: 1,
  },
  filaEstadoNotif: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  notifTitulo: {
    fontSize: 15,
    fontWeight: '700',
  },
  notifSub: {
    fontSize: 12,
    marginTop: 2,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  badgeTexto: {
    fontSize: 12,
    fontWeight: '700',
  },
  botonPermiso: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 8,
  },
  botonPermisoTexto: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13,
  },
  cajaToken: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 14,
  },
  cajaTokenLabel: {
    fontSize: 11,
    fontWeight: '600',
    marginBottom: 4,
  },
  cajaTokenValor: {
    fontSize: 12,
    fontFamily: 'monospace',
  },
  subSeccionTitulo: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  grupoBotonesPrueba: {
    gap: 8,
    marginBottom: 14,
  },
  botonAccionNotif: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
    gap: 8,
  },
  botonAccionTexto: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  botonGuiaGoogle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingTop: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  botonGuiaTexto: {
    fontSize: 13,
    fontWeight: '600',
  },
  panelGuia: {
    marginTop: 10,
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    gap: 8,
  },
  guiaPaso: {
    fontSize: 12,
    lineHeight: 18,
  },
  filaDemo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  demoNombre: {
    fontSize: 14,
    fontWeight: '700',
  },
  demoEmail: {
    fontSize: 12,
    marginTop: 1,
  },
  botonCerrarSesion: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1.5,
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 8,
    marginBottom: 16,
  },
  botonCerrarTexto: {
    fontSize: 15,
    fontWeight: '700',
  },
  versionTexto: {
    textAlign: 'center',
    fontSize: 11,
    marginBottom: 32,
  },
});
