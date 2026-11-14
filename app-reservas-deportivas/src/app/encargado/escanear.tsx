// src/app/encargado/escanear.tsx
// Lector de códigos QR mediante cámara (expo-camera) e ingreso manual para validación de turnos en puerta

import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Platform,
  ScrollView,
} from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as Haptics from 'expo-haptics';
import { useSQLiteContext } from 'expo-sqlite';
import { useTema } from '../../contexto/tema';
import { ServicioGestion } from '../../servicios/gestion';
import { RepositorioOffline } from '../../db/repositorio-offline';
import { Icono } from '../../componentes/Icono';
import type { Reserva } from '../../tipos/index';

export default function EscanearQrPantalla() {
  const db = useSQLiteContext();
  const { colores } = useTema();
  const [permiso, solicitarPermiso] = useCameraPermissions();

  const repo = useMemo(() => new RepositorioOffline(db), [db]);
  const servicio = useMemo(() => new ServicioGestion(repo), [repo]);

  const [escaneado, setEscaneado] = useState(false);
  const [reservaValidada, setReservaValidada] = useState<Reserva | null>(null);
  const [errorQr, setErrorQr] = useState<string | null>(null);
  const [codigoLeido, setCodigoLeido] = useState<string>('');
  const [codigoManual, setCodigoManual] = useState<string>('');
  const [validando, setValidando] = useState(false);

  const procesarQr = async (data: string) => {
    const limpio = data.trim().toUpperCase();
    if (!limpio || validando) return;

    setValidando(true);
    setEscaneado(true);
    setCodigoLeido(limpio);
    setErrorQr(null);
    setReservaValidada(null);

    try {
      const reserva = await servicio.registrarIngresoQr(limpio);
      setReservaValidada(reserva);

      if (Platform.OS !== 'web') {
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }
    } catch (err: any) {
      setErrorQr(err?.message || 'Código QR inválido o no encontrado.');
      if (Platform.OS !== 'web') {
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      }
    } finally {
      setValidando(false);
    }
  };

  const reiniciarEscaneo = () => {
    setEscaneado(false);
    setReservaValidada(null);
    setErrorQr(null);
    setCodigoLeido('');
  };

  if (!permiso) {
    return <View style={[styles.contenedor, { backgroundColor: colores.fondo }]} />;
  }

  return (
    <ScrollView
      style={[styles.contenedor, { backgroundColor: colores.fondo }]}
      contentContainerStyle={{ paddingBottom: 36 }}
      keyboardShouldPersistTaps="handled"
    >
      {/* Visor de Cámara o Solicitud de Permiso */}
      {!escaneado && (
        <>
          {permiso.granted ? (
            <View style={styles.camaraContenedor}>
              <CameraView
                style={styles.camara}
                facing="back"
                barcodeScannerSettings={{
                  barcodeTypes: ['qr'],
                }}
                onBarcodeScanned={({ data }) => {
                  if (!escaneado && data) {
                    procesarQr(data);
                  }
                }}
              />
              <View style={styles.marcoOverlay}>
                <View style={[styles.marcoQr, { borderColor: colores.primario }]} />
                <Text style={styles.instruccionCamara}>
                  Apuntá al código QR de la reserva del jugador
                </Text>
              </View>
            </View>
          ) : (
            <View
              style={[
                styles.permisoCaja,
                { backgroundColor: colores.tarjeta, borderColor: colores.borde },
              ]}
            >
              <Icono nombre="camera-outline" tamano={48} color={colores.primario} />
              <Text style={[styles.permisoTitulo, { color: colores.texto }]}>
                Permiso de Cámara Requerido
              </Text>
              <Text style={[styles.permisoSub, { color: colores.textoSecundario }]}>
                Para escanear el código QR del jugador con la cámara, habilitá el acceso o ingresá el código abajo.
              </Text>
              <TouchableOpacity
                style={[styles.botonPermiso, { backgroundColor: colores.primario }]}
                onPress={solicitarPermiso}
              >
                <Text style={styles.botonPermisoTexto}>Habilitar Cámara</Text>
              </TouchableOpacity>
            </View>
          )}
        </>
      )}

      {/* Resultado del Escaneo */}
      {escaneado && (
        <View style={styles.resultadoContenedor}>
          {reservaValidada ? (
            <View
              style={[
                styles.tarjetaExito,
                { backgroundColor: colores.tarjeta, borderColor: colores.exito },
              ]}
            >
              <View style={[styles.iconoCirculo, { backgroundColor: '#DCFCE7' }]}>
                <Icono nombre="checkmark-circle" tamano={54} color={colores.exito} />
              </View>
              <Text style={[styles.resultadoTitulo, { color: colores.exito }]}>
                ¡Ingreso Validado!
              </Text>
              <Text style={[styles.codigoMostrado, { color: colores.textoSecundario }]}>
                {reservaValidada.codigoQr}
              </Text>

              <View style={[styles.datosCaja, { backgroundColor: colores.fondo }]}>
                <Text style={[styles.datoEspacio, { color: colores.texto }]}>
                  {reservaValidada.espacioNombre || 'Cancha Reservada'}
                </Text>
                <Text style={[styles.datoDetalle, { color: colores.textoSecundario }]}>
                  Complejo: {reservaValidada.complejo || 'Polideportivo Municipal'}
                </Text>
                <Text style={[styles.datoDetalle, { color: colores.textoSecundario }]}>
                  Fecha: {reservaValidada.fecha} • Turno: {reservaValidada.inicio} hs
                </Text>
                <Text style={[styles.datoDetalle, { color: colores.textoSecundario }]}>
                  Asistentes: {reservaValidada.cantidadPersonas} personas
                </Text>
              </View>
            </View>
          ) : (
            <View
              style={[
                styles.tarjetaError,
                { backgroundColor: colores.tarjeta, borderColor: colores.peligro },
              ]}
            >
              <View style={[styles.iconoCirculo, { backgroundColor: '#FEE2E2' }]}>
                <Icono nombre="close-circle" tamano={54} color={colores.peligro} />
              </View>
              <Text style={[styles.resultadoTitulo, { color: colores.peligro }]}>
                Acceso Rechazado
              </Text>
              <Text style={[styles.codigoMostrado, { color: colores.textoSecundario }]}>
                Código leído: {codigoLeido}
              </Text>
              <Text style={[styles.mensajeError, { color: colores.texto }]}>
                {errorQr}
              </Text>
            </View>
          )}

          <TouchableOpacity
            style={[styles.botonNuevoEscaneo, { backgroundColor: colores.primario }]}
            onPress={reiniciarEscaneo}
          >
            <Icono nombre="scan-outline" tamano={20} color="#FFFFFF" />
            <Text style={styles.botonNuevoTexto}>Escanear Otro Código QR</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Ingreso manual del código QR (respaldo si la pantalla del jugador tiene brillo bajo) */}
      <View
        style={[
          styles.panelManual,
          { backgroundColor: colores.tarjeta, borderTopColor: colores.borde },
        ]}
      >
        <Text style={[styles.simuladorTitulo, { color: colores.textoSecundario }]}>
          Ingresar código de reserva manualmente:
        </Text>
        <View style={styles.filaInputManual}>
          <TextInput
            style={[
              styles.inputManual,
              {
                backgroundColor: colores.fondo,
                color: colores.texto,
                borderColor: colores.borde,
              },
            ]}
            placeholder="Ej: VGY-1114-19-A1B2C3"
            placeholderTextColor={colores.textoSecundario}
            autoCapitalize="characters"
            value={codigoManual}
            onChangeText={setCodigoManual}
          />
          <TouchableOpacity
            style={[
              styles.botonValidarManual,
              { backgroundColor: colores.primario },
            ]}
            onPress={() => {
              if (codigoManual.trim()) {
                procesarQr(codigoManual);
              }
            }}
          >
            <Text style={styles.botonValidarManualTexto}>Validar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
  },
  permisoCaja: {
    margin: 20,
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
  },
  permisoTitulo: {
    fontSize: 18,
    fontWeight: '800',
    marginTop: 12,
    textAlign: 'center',
  },
  permisoSub: {
    fontSize: 13,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 20,
    lineHeight: 19,
  },
  botonPermiso: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  botonPermisoTexto: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },
  camaraContenedor: {
    height: 360,
    position: 'relative',
    overflow: 'hidden',
  },
  camara: {
    flex: 1,
  },
  marcoOverlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  marcoQr: {
    width: 220,
    height: 220,
    borderWidth: 3,
    borderRadius: 20,
    backgroundColor: 'transparent',
  },
  instruccionCamara: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
    marginTop: 16,
    backgroundColor: 'rgba(0,0,0,0.65)',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },
  resultadoContenedor: {
    padding: 20,
    justifyContent: 'center',
  },
  tarjetaExito: {
    padding: 22,
    borderRadius: 20,
    borderWidth: 2,
    alignItems: 'center',
  },
  tarjetaError: {
    padding: 22,
    borderRadius: 20,
    borderWidth: 2,
    alignItems: 'center',
  },
  iconoCirculo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  resultadoTitulo: {
    fontSize: 22,
    fontWeight: '800',
  },
  codigoMostrado: {
    fontSize: 14,
    fontWeight: '700',
    marginTop: 4,
    letterSpacing: 1,
  },
  datosCaja: {
    width: '100%',
    padding: 14,
    borderRadius: 12,
    marginTop: 16,
    gap: 4,
  },
  datoEspacio: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  datoDetalle: {
    fontSize: 13,
  },
  mensajeError: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 12,
    lineHeight: 20,
  },
  botonNuevoEscaneo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
    marginTop: 18,
  },
  botonNuevoTexto: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  panelManual: {
    padding: 16,
    borderTopWidth: 1,
    marginTop: 8,
  },
  simuladorTitulo: {
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 10,
  },
  filaInputManual: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  inputManual: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 14,
    fontWeight: '700',
  },
  botonValidarManual: {
    paddingVertical: 11,
    paddingHorizontal: 18,
    borderRadius: 10,
  },
  botonValidarManualTexto: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
});
