// src/app/(tabs)/mis-reservas.tsx
// Pantalla de reservas del usuario (próximas e historial) con acceso inmediato al código QR offline

import React, { useCallback, useMemo, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  StyleSheet,
  Alert,
} from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import { useTema } from '../../contexto/tema.js';
import { useSesion } from '../../contexto/sesion.js';
import { ServicioReservas } from '../../servicios/reservas.js';
import { RepositorioOffline } from '../../db/repositorio-offline.js';
import { EstadoPantalla } from '../../componentes/EstadoPantalla.js';
import { Icono } from '../../componentes/Icono.js';
import { esCancelable } from '../../utils/fechas.js';
import type { Reserva } from '../../tipos/index.js';

export default function MisReservasPantalla() {
  const router = useRouter();
  const db = useSQLiteContext();
  const { colores } = useTema();
  const { usuario } = useSesion();

  const repo = useMemo(() => new RepositorioOffline(db), [db]);
  const servicio = useMemo(() => new ServicioReservas(repo), [repo]);

  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [cargando, setCargando] = useState(true);
  const [refrescando, setRefrescando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filtroTab, setFiltroTab] = useState<'proximas' | 'historial'>('proximas');

  const cargarReservas = async () => {
    if (!usuario) {
      setCargando(false);
      return;
    }
    try {
      setError(null);
      const lista = await servicio.obtenerMisReservas(usuario.id);
      setReservas(lista);
    } catch (err: any) {
      setError(err?.message || 'Error al obtener tus reservas.');
    } finally {
      setCargando(false);
      setRefrescando(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      cargarReservas();
    }, [usuario])
  );

  const onRefresh = () => {
    setRefrescando(true);
    cargarReservas();
  };

  const handleCancelar = (reserva: Reserva) => {
    if (!reserva.fecha || !reserva.inicio) return;

    if (!esCancelable(reserva.fecha, reserva.inicio)) {
      Alert.alert(
        'Plazo expirado',
        'Faltan menos de 4 horas para el turno. Por favor contactá al encargado del complejo deportivo para coordinar la cancelación.'
      );
      return;
    }

    Alert.alert(
      '¿Cancelar reserva?',
      `¿Estás seguro de cancelar tu turno en ${reserva.espacioNombre || 'la cancha'} para el día ${reserva.fecha} a las ${reserva.inicio}?`,
      [
        { text: 'No, mantener', style: 'cancel' },
        {
          text: 'Sí, cancelar turno',
          style: 'destructive',
          onPress: async () => {
            try {
              await servicio.cancelarReserva(reserva);
              Alert.alert('Turno cancelado', 'Tu reserva ha sido cancelada correctamente.');
              cargarReservas();
            } catch (err: any) {
              Alert.alert('No se pudo cancelar', err?.message || 'Error al cancelar la reserva.');
            }
          },
        },
      ]
    );
  };

  const reservasFiltradas = useMemo(() => {
    if (filtroTab === 'proximas') {
      return reservas.filter((r) => r.estado === 'confirmada');
    }
    return reservas.filter((r) => r.estado !== 'confirmada');
  }, [reservas, filtroTab]);

  return (
    <View style={[styles.contenedor, { backgroundColor: colores.fondo }]}>
      {/* Selector de pestañas: Próximas vs Historial */}
      <View style={[styles.selectorContenedor, { backgroundColor: colores.tarjeta }]}>
        <TouchableOpacity
          style={[
            styles.selectorTab,
            filtroTab === 'proximas' && {
              backgroundColor: colores.primario,
            },
          ]}
          onPress={() => setFiltroTab('proximas')}
        >
          <Text
            style={[
              styles.selectorTexto,
              { color: filtroTab === 'proximas' ? '#FFFFFF' : colores.textoSecundario },
            ]}
          >
            Próximas Turnos
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.selectorTab,
            filtroTab === 'historial' && {
              backgroundColor: colores.primario,
            },
          ]}
          onPress={() => setFiltroTab('historial')}
        >
          <Text
            style={[
              styles.selectorTexto,
              { color: filtroTab === 'historial' ? '#FFFFFF' : colores.textoSecundario },
            ]}
          >
            Historial
          </Text>
        </TouchableOpacity>
      </View>

      <EstadoPantalla
        cargando={cargando}
        error={error}
        onReintentar={cargarReservas}
        vacio={reservasFiltradas.length === 0}
        mensajeVacio={
          filtroTab === 'proximas'
            ? 'No tenés reservas confirmadas activas. ¡Reservá una cancha en Villaguay!'
            : 'Aún no tenés historial de reservas anteriores.'
        }
        iconoVacio="calendar-outline"
      >
        <FlatList
          data={reservasFiltradas}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listaContenido}
          refreshControl={
            <RefreshControl
              refreshing={refrescando}
              onRefresh={onRefresh}
              tintColor={colores.primario}
            />
          }
          renderItem={({ item }) => {
            const cancelable = item.fecha && item.inicio && esCancelable(item.fecha, item.inicio);
            return (
              <TouchableOpacity
                style={[
                  styles.tarjetaReserva,
                  { backgroundColor: colores.tarjeta, borderColor: colores.borde },
                ]}
                onPress={() => router.push(`/reserva/${item.id}`)}
                activeOpacity={0.85}
              >
                <View style={styles.cabeceraFila}>
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.espacioNombre, { color: colores.texto }]}>
                      {item.espacioNombre || 'Cancha'}
                    </Text>
                    <Text style={[styles.complejoTexto, { color: colores.textoSecundario }]}>
                      {item.complejo || 'Villaguay'}
                    </Text>
                  </View>

                  <View
                    style={[
                      styles.badgeEstado,
                      {
                        backgroundColor:
                          item.estado === 'confirmada'
                            ? colores.grillaLibre
                            : item.estado === 'cumplida'
                            ? colores.chipFondo
                            : colores.grillaReservado,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.badgeTexto,
                        {
                          color:
                            item.estado === 'confirmada'
                              ? colores.exito
                              : item.estado === 'cumplida'
                              ? colores.textoSecundario
                              : colores.peligro,
                        },
                      ]}
                    >
                      {item.estado.toUpperCase()}
                    </Text>
                  </View>
                </View>

                <View style={styles.infoFila}>
                  <View style={styles.itemInfo}>
                    <Icono nombre="calendar-outline" tamano={16} color={colores.primario} />
                    <Text style={[styles.infoTexto, { color: colores.texto }]}>
                      {item.fecha || 'Fecha'}
                    </Text>
                  </View>

                  <View style={styles.itemInfo}>
                    <Icono nombre="time-outline" tamano={16} color={colores.primario} />
                    <Text style={[styles.infoTexto, { color: colores.texto }]}>
                      {item.inicio} hs
                    </Text>
                  </View>

                  <View style={styles.itemInfo}>
                    <Icono nombre="people-outline" tamano={16} color={colores.primario} />
                    <Text style={[styles.infoTexto, { color: colores.texto }]}>
                      {item.cantidadPersonas} pers.
                    </Text>
                  </View>
                </View>

                <View style={[styles.pieTarjeta, { borderTopColor: colores.borde }]}>
                  <View style={styles.qrAcceso}>
                    <Icono nombre="qr-code-outline" tamano={20} color={colores.primario} />
                    <Text style={[styles.codigoQrTexto, { color: colores.primario }]}>
                      {item.codigoQr}
                    </Text>
                  </View>

                  {item.estado === 'confirmada' && (
                    <TouchableOpacity
                      style={[
                        styles.botonCancelar,
                        { borderColor: cancelable ? colores.peligro : colores.borde },
                      ]}
                      onPress={() => handleCancelar(item)}
                    >
                      <Text
                        style={[
                          styles.botonCancelarTexto,
                          { color: cancelable ? colores.peligro : colores.textoSecundario },
                        ]}
                      >
                        Cancelar
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </EstadoPantalla>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
  },
  selectorContenedor: {
    flexDirection: 'row',
    padding: 8,
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 12,
    gap: 8,
  },
  selectorTab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 8,
  },
  selectorTexto: {
    fontSize: 13,
    fontWeight: '700',
  },
  listaContenido: {
    padding: 16,
    paddingBottom: 32,
  },
  tarjetaReserva: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    marginBottom: 14,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  cabeceraFila: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  espacioNombre: {
    fontSize: 16,
    fontWeight: '700',
  },
  complejoTexto: {
    fontSize: 13,
    marginTop: 2,
  },
  badgeEstado: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  badgeTexto: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  infoFila: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 12,
  },
  itemInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  infoTexto: {
    fontSize: 13,
    fontWeight: '600',
  },
  pieTarjeta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 14,
    paddingTop: 10,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  qrAcceso: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  codigoQrTexto: {
    fontSize: 13,
    fontWeight: '700',
  },
  botonCancelar: {
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 6,
    borderWidth: 1,
  },
  botonCancelarTexto: {
    fontSize: 12,
    fontWeight: '700',
  },
});
