// src/app/encargado/escanear.tsx
// Escáner de códigos QR para el encargado de cancha con expo-camera, validación de reglas y respuesta háptica

import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Modal,
} from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRouter } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import * as Haptics from 'expo-haptics';
import { useTema } from '../../contexto/tema.js';
import { ServicioGestion } from '../../servicios/gestion.js';
import { RepositorioOffline } from '../../db/repositorio-offline.js';
import { Icono } from '../../componentes/Icono.js';
import type { Reserva } from '../../tipos/index.js';

export default function EscanearQrPantalla() {
  const router = useRouter();
  const db = useSQLiteContext();
  const { colores } = useTema();

  const repo = useMemo(() => new RepositorioOffline(db), [db]);
  const servicio = useMemo(() => new ServicioGestion(repo), [repo]);

  const [permiso, solicitarPermiso] = useCameraPermissions();
  const [escaneando, setEscaneando] = useState(true);
  const [reservaValidada, setReservaValidada] = useState<Reserva | null>(null);

  const procesarCodigo = async (codigo: string) => {
    if (!escaneando) return;
    setEscaneando(false);

    try {
      const res = await servicio.registrarIngresoQr(codigo);
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      setReservaValidada(res);
    } catch (err: any) {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      Alert.alert(
        'Ingreso no autorizado',
        err?.message || 'Código QR no válido para ingreso hoy.',
        [{ text: 'Escanear otro', onPress: () => setEscaneando(true) }]
      );
    }
  };

  if (!permiso) {
    return <View style={[styles.contenedor, { backgroundColor: colores.fondo }]} />;
  }

  if (!permiso.granted) {
    return (
      <View style={[styles.contenedorCentrado, { backgroundColor: colores.fondo }]}>
        <Icono nombre="camera-outline" tamano={56} color={colores.primario} />
        <Text style={[styles.tituloPermiso, { color: colores.texto }]}>
          Permiso de Cámara Requerido
        </Text>
        <Text style={[styles.subtituloPermiso, { color: colores.textoSecundario }]}>
          Para escanear los códigos QR de los turnos en la puerta, la app necesita acceso a la
          cámara.
        </Text>
        <TouchableOpacity
          style={[styles.botonPermiso, { backgroundColor: colores.primario }]}
          onPress={solicitarPermiso}
        >
          <Text style={styles.botonPermisoTexto}>Habilitar Cámara</Text>
        </TouchableOpacity>

        {/* Atajo para emulador */}
        <TouchableOpacity
          style={[styles.botonSimular, { borderColor: colores.borde }]}
          onPress={() => procesarCodigo('RES-VR-101-EMILIANO')}
        >
          <Text style={{ color: colores.textoSecundario, fontSize: 13, fontWeight: '600' }}>
            Simular Escaneo (Emulador)
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.contenedor}>
      <CameraView
        style={StyleSheet.absoluteFill}
        barcodeScannerSettings={{
          barcodeTypes: ['qr'],
        }}
        onBarcodeScanned={
          escaneando
            ? ({ data }) => {
                if (data) procesarCodigo(data);
              }
            : undefined
        }
      />

      {/* Visor superpuesto */}
      <View style={styles.mascara}>
        <View style={styles.marcoEnfoque}>
          <View style={[styles.esquina, styles.esquinaTL, { borderColor: colores.primario }]} />
          <View style={[styles.esquina, styles.esquinaTR, { borderColor: colores.primario }]} />
          <View style={[styles.esquina, styles.esquinaBL, { borderColor: colores.primario }]} />
          <View style={[styles.esquina, styles.esquinaBR, { borderColor: colores.primario }]} />
        </View>
        <Text style={styles.guiaTexto}>Apuntá al código QR del jugador</Text>
      </View>

      {/* Botón flotante para simular en caso de testing sin cámara física */}
      <TouchableOpacity
        style={styles.botonSimularFlotante}
        onPress={() => procesarCodigo('RES-VR-101-EMILIANO')}
      >
        <Text style={styles.botonSimularFlotanteTexto}>Simular QR Demo</Text>
      </TouchableOpacity>

      {/* Modal de Validación Exitosa */}
      <Modal
        visible={Boolean(reservaValidada)}
        transparent
        animationType="slide"
        onRequestClose={() => {
          setReservaValidada(null);
          setEscaneando(true);
        }}
      >
        <View style={styles.modalFondo}>
          <View style={[styles.modalCard, { backgroundColor: colores.tarjeta }]}>
            <View style={[styles.iconoExito, { backgroundColor: colores.grillaLibre }]}>
              <Icono nombre="checkmark-circle" tamano={56} color={colores.exito} />
            </View>

            <Text style={[styles.modalExitoTitulo, { color: colores.texto }]}>
              ¡Ingreso Registrado!
            </Text>
            <Text style={[styles.modalExitoSub, { color: colores.textoSecundario }]}>
              La asistencia quedó confirmada correctamente en el sistema.
            </Text>

            {reservaValidada && (
              <View
                style={[
                  styles.datosReservaCaja,
                  { backgroundColor: colores.chipFondo, borderColor: colores.borde },
                ]}
              >
                <Text style={[styles.datoCancha, { color: colores.texto }]}>
                  {reservaValidada.espacioNombre || 'Cancha'}
                </Text>
                <Text style={[styles.datoComplejo, { color: colores.textoSecundario }]}>
                  {reservaValidada.complejo} · {reservaValidada.fecha} a las{' '}
                  {reservaValidada.inicio} hs
                </Text>
                <Text style={[styles.datoJugadores, { color: colores.primario }]}>
                  {reservaValidada.cantidadPersonas} personas autorizadas
                </Text>
                <Text style={[styles.datoCodigo, { color: colores.textoSecundario }]}>
                  Código: {reservaValidada.codigoQr}
                </Text>
              </View>
            )}

            <TouchableOpacity
              style={[styles.botonContinuar, { backgroundColor: colores.primario }]}
              onPress={() => {
                setReservaValidada(null);
                setEscaneando(true);
              }}
            >
              <Text style={styles.botonContinuarTexto}>Escanear Siguiente</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#000000',
  },
  contenedorCentrado: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    gap: 12,
  },
  tituloPermiso: {
    fontSize: 20,
    fontWeight: '800',
  },
  subtituloPermiso: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 12,
  },
  botonPermiso: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
  },
  botonPermisoTexto: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 15,
  },
  botonSimular: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
  },
  mascara: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  marcoEnfoque: {
    width: 260,
    height: 260,
    position: 'relative',
  },
  esquina: {
    position: 'absolute',
    width: 32,
    height: 32,
  },
  esquinaTL: {
    top: 0,
    left: 0,
    borderTopWidth: 4,
    borderLeftWidth: 4,
  },
  esquinaTR: {
    top: 0,
    right: 0,
    borderTopWidth: 4,
    borderRightWidth: 4,
  },
  esquinaBL: {
    bottom: 0,
    left: 0,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
  },
  esquinaBR: {
    bottom: 0,
    right: 0,
    borderBottomWidth: 4,
    borderRightWidth: 4,
  },
  guiaTexto: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 24,
  },
  botonSimularFlotante: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  botonSimularFlotanteTexto: {
    color: '#0F172A',
    fontWeight: '700',
    fontSize: 13,
  },
  modalFondo: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  modalCard: {
    width: '100%',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
  },
  iconoExito: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  modalExitoTitulo: {
    fontSize: 22,
    fontWeight: '800',
  },
  modalExitoSub: {
    fontSize: 13,
    textAlign: 'center',
    marginTop: 4,
  },
  datosReservaCaja: {
    width: '100%',
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    marginVertical: 18,
    gap: 4,
  },
  datoCancha: {
    fontSize: 16,
    fontWeight: '800',
  },
  datoComplejo: {
    fontSize: 13,
  },
  datoJugadores: {
    fontSize: 14,
    fontWeight: '700',
    marginTop: 4,
  },
  datoCodigo: {
    fontSize: 12,
    marginTop: 4,
    fontVariant: ['tabular-nums'],
  },
  botonContinuar: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  botonContinuarTexto: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
  },
});
