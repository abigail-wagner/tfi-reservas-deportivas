// src/app/reserva/[id].tsx
// Pantalla de detalle de la reserva con código QR grande y comprobante de acceso offline

import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Share,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import { useTema } from '../../contexto/tema';
import { ServicioReservas } from '../../servicios/reservas';
import { RepositorioOffline } from '../../db/repositorio-offline';
import { CodigoQrReserva } from '../../componentes/CodigoQrReserva';
import { EstadoPantalla } from '../../componentes/EstadoPantalla';
import { Icono } from '../../componentes/Icono';
import { esCancelable } from '../../utils/fechas';
import type { Reserva } from '../../tipos/index';

export default function DetalleReservaPantalla() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const db = useSQLiteContext();
  const { colores } = useTema();

  const repo = useMemo(() => new RepositorioOffline(db), [db]);
  const servicio = useMemo(() => new ServicioReservas(repo), [repo]);

  const [reserva, setReserva] = useState<Reserva | null>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const cargarReserva = async () => {
    if (!id) return;
    try {
      setCargando(true);
      setError(null);
      const encontrada = await servicio.obtenerReservaPorId(id);
      if (!encontrada) {
        throw new Error('No encontramos la reserva solicitada.');
      }
      setReserva(encontrada);
    } catch (err: any) {
      setError(err?.message || 'Error al obtener los datos de la reserva.');
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarReserva();
  }, [id]);

  const handleCancelar = () => {
    if (!reserva || !reserva.fecha || !reserva.inicio) return;

    if (!esCancelable(reserva.fecha, reserva.inicio)) {
      Alert.alert(
        'Plazo expirado',
        'Faltan menos de 4 horas para el turno. Por favor contactá al encargado del complejo deportivo para coordinar la cancelación.'
      );
      return;
    }

    Alert.alert(
      '¿Cancelar reserva?',
      `¿Estás seguro de cancelar tu reserva para el ${reserva.fecha} a las ${reserva.inicio} hs?`,
      [
        { text: 'Mantener turno', style: 'cancel' },
        {
          text: 'Sí, cancelar',
          style: 'destructive',
          onPress: async () => {
            try {
              await servicio.cancelarReserva(reserva);
              Alert.alert('Reserva Cancelada', 'El turno ha sido liberado.');
              cargarReserva();
            } catch (err: any) {
              Alert.alert('Error', err?.message || 'No se pudo cancelar.');
            }
          },
        },
      ]
    );
  };

  const handleCompartir = async () => {
    if (!reserva) return;
    try {
      await Share.share({
        message: `¡Hola! Tenemos turno en ${reserva.espacioNombre || 'la cancha'} (${reserva.complejo}) el día ${reserva.fecha} a las ${reserva.inicio} hs. Código de ingreso: ${reserva.codigoQr}`,
      });
    } catch {
      //
    }
  };

  const cancelable =
    reserva &&
    reserva.estado === 'confirmada' &&
    reserva.fecha &&
    reserva.inicio &&
    esCancelable(reserva.fecha, reserva.inicio);

  return (
    <EstadoPantalla cargando={cargando} error={error} onReintentar={cargarReserva}>
      {reserva && (
        <ScrollView
          style={[styles.contenedor, { backgroundColor: colores.fondo }]}
          contentContainerStyle={styles.scrollContenido}
        >
          {/* Tarjeta del Código QR */}
          <CodigoQrReserva
            codigoQr={reserva.codigoQr}
            estado={reserva.estado}
            espacioNombre={reserva.espacioNombre}
            fecha={reserva.fecha}
            inicio={reserva.inicio}
          />

          {/* Información del Turno */}
          <View
            style={[
              styles.tarjetaDetalle,
              { backgroundColor: colores.tarjeta, borderColor: colores.borde },
            ]}
          >
            <Text style={[styles.tituloSeccion, { color: colores.texto }]}>
              Detalles del Turno
            </Text>

            <View style={styles.filaDato}>
              <Text style={[styles.etiquetaDato, { color: colores.textoSecundario }]}>
                Cancha:
              </Text>
              <Text style={[styles.valorDato, { color: colores.texto }]}>
                {reserva.espacioNombre || 'Espacio Municipal'}
              </Text>
            </View>

            <View style={styles.filaDato}>
              <Text style={[styles.etiquetaDato, { color: colores.textoSecundario }]}>
                Complejo:
              </Text>
              <Text style={[styles.valorDato, { color: colores.texto }]}>
                {reserva.complejo || 'Villaguay'}
              </Text>
            </View>

            <View style={styles.filaDato}>
              <Text style={[styles.etiquetaDato, { color: colores.textoSecundario }]}>
                Fecha y Horario:
              </Text>
              <Text style={[styles.valorDato, { color: colores.texto }]}>
                {reserva.fecha} · {reserva.inicio} a {reserva.fin} hs
              </Text>
            </View>

            <View style={styles.filaDato}>
              <Text style={[styles.etiquetaDato, { color: colores.textoSecundario }]}>
                Cantidad de personas:
              </Text>
              <Text style={[styles.valorDato, { color: colores.texto }]}>
                {reserva.cantidadPersonas} jugadores
              </Text>
            </View>

            <View style={styles.filaDato}>
              <Text style={[styles.etiquetaDato, { color: colores.textoSecundario }]}>
                Estado:
              </Text>
              <Text
                style={[
                  styles.valorDato,
                  {
                    color:
                      reserva.estado === 'confirmada'
                        ? colores.exito
                        : reserva.estado === 'cumplida'
                        ? colores.primario
                        : colores.peligro,
                  },
                ]}
              >
                {reserva.estado.toUpperCase()}
              </Text>
            </View>

            {reserva.ingresoEn && (
              <View style={styles.filaDato}>
                <Text style={[styles.etiquetaDato, { color: colores.textoSecundario }]}>
                  Ingreso registrado:
                </Text>
                <Text style={[styles.valorDato, { color: colores.texto }]}>
                  {new Date(reserva.ingresoEn).toLocaleTimeString('es-AR', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}{' '}
                  hs
                </Text>
              </View>
            )}
          </View>

          {/* Botones de Acción */}
          <View style={styles.accionesContenedor}>
            <TouchableOpacity
              style={[
                styles.botonAccion,
                { backgroundColor: colores.tarjeta, borderColor: colores.borde },
              ]}
              onPress={handleCompartir}
            >
              <Icono nombre="share-social-outline" tamano={20} color={colores.primario} />
              <Text style={[styles.botonAccionTexto, { color: colores.primario }]}>
                Compartir con el equipo
              </Text>
            </TouchableOpacity>

            {reserva.estado === 'confirmada' && (
              <TouchableOpacity
                style={[
                  styles.botonAccion,
                  {
                    borderColor: cancelable ? colores.peligro : colores.borde,
                    backgroundColor: cancelable ? '#FEF2F2' : colores.tarjeta,
                  },
                ]}
                onPress={handleCancelar}
              >
                <Icono
                  nombre="close-circle-outline"
                  tamano={20}
                  color={cancelable ? colores.peligro : colores.textoSecundario}
                />
                <Text
                  style={[
                    styles.botonAccionTexto,
                    { color: cancelable ? colores.peligro : colores.textoSecundario },
                  ]}
                >
                  {cancelable
                    ? 'Cancelar Reserva (hasta 4h antes)'
                    : 'Cancelación fuera de plazo (avisar al encargado)'}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      )}
    </EstadoPantalla>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
  },
  scrollContenido: {
    padding: 16,
    paddingBottom: 40,
  },
  tarjetaDetalle: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 18,
    marginVertical: 10,
    gap: 12,
  },
  tituloSeccion: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  filaDato: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 2,
  },
  etiquetaDato: {
    fontSize: 13,
  },
  valorDato: {
    fontSize: 14,
    fontWeight: '700',
  },
  accionesContenedor: {
    gap: 12,
    marginTop: 10,
  },
  botonAccion: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1.5,
  },
  botonAccionTexto: {
    fontSize: 14,
    fontWeight: '700',
  },
});
