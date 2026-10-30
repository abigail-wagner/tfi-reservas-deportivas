// src/app/espacio/[id]/turnos.tsx
// Grilla de turnos para los próximos 7 días (08:00 a 24:00) y modal de confirmación en dos toques

import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  StyleSheet,
  Alert,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import * as Haptics from 'expo-haptics';
import { useTema } from '../../../contexto/tema';
import { useSesion } from '../../../contexto/sesion';
import { ServicioReservas } from '../../../servicios/reservas';
import { RepositorioOffline } from '../../../db/repositorio-offline';
import { FilaTurno } from '../../../componentes/FilaTurno';
import { EstadoPantalla } from '../../../componentes/EstadoPantalla';
import { Icono } from '../../../componentes/Icono';
import {
  formatearDiaLegible,
  hoyString,
  obtenerProximos7Dias,
} from '../../../utils/fechas';
import type { Espacio, Turno } from '../../../tipos/index';

export default function TurnosEspacioPantalla() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const db = useSQLiteContext();
  const { colores } = useTema();
  const { usuario } = useSesion();

  const repo = useMemo(() => new RepositorioOffline(db), [db]);
  const servicio = useMemo(() => new ServicioReservas(repo), [repo]);

  const proximos7Dias = useMemo(() => obtenerProximos7Dias(hoyString()), []);
  const [diaSeleccionado, setDiaSeleccionado] = useState<string>(proximos7Dias[0]);

  const [espacio, setEspacio] = useState<Espacio | null>(null);
  const [turnos, setTurnos] = useState<Turno[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Modal de confirmación
  const [turnoSeleccionado, setTurnoSeleccionado] = useState<Turno | null>(null);
  const [cantidadPersonas, setCantidadPersonas] = useState('10');
  const [confirmando, setConfirmando] = useState(false);

  useEffect(() => {
    async function cargarEspacio() {
      if (!id) return;
      try {
        const esp = await servicio.obtenerEspacioPorId(id);
        setEspacio(esp);
        if (esp) {
          setCantidadPersonas(Math.min(10, esp.capacidad).toString());
        }
      } catch {
        //
      }
    }
    cargarEspacio();
  }, [id]);

  const cargarTurnosDelDia = async () => {
    if (!id || !diaSeleccionado) return;
    try {
      setCargando(true);
      setError(null);
      const lista = await servicio.obtenerTurnos(id, diaSeleccionado);
      setTurnos(lista);
    } catch (err: any) {
      setError(err?.message || 'Error al obtener la grilla de turnos.');
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarTurnosDelDia();
  }, [id, diaSeleccionado]);

  const handleSeleccionarTurno = (turno: Turno) => {
    setTurnoSeleccionado(turno);
  };

  const handleConfirmarReserva = async () => {
    if (!espacio || !turnoSeleccionado || !usuario) return;

    const personas = parseInt(cantidadPersonas, 10);
    if (isNaN(personas) || personas < 1) {
      Alert.alert('Datos requeridos', 'Ingresá una cantidad de personas válida.');
      return;
    }

    if (personas > espacio.capacidad) {
      Alert.alert(
        'Capacidad superada',
        `Este espacio admite hasta un máximo de ${espacio.capacidad} jugadores.`
      );
      return;
    }

    try {
      setConfirmando(true);
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);

      const nuevaReserva = await servicio.crearReserva(
        espacio.id,
        turnoSeleccionado.fecha,
        turnoSeleccionado.inicio,
        personas,
        usuario.id
      );

      setTurnoSeleccionado(null);
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

      Alert.alert(
        '¡Reserva Confirmada!',
        `Tu turno para ${espacio.nombre} el ${turnoSeleccionado.fecha} a las ${turnoSeleccionado.inicio} hs quedó confirmado. Se programó un aviso 2 horas antes de tu partido.`,
        [
          {
            text: 'Ver Código QR',
            onPress: () => router.replace(`/reserva/${nuevaReserva.id}`),
          },
        ]
      );
    } catch (err: any) {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      Alert.alert('No se pudo reservar', err?.message || 'Error al confirmar la reserva.');
    } finally {
      setConfirmando(false);
    }
  };

  return (
    <View style={[styles.contenedor, { backgroundColor: colores.fondo }]}>
      {/* Selector Horizontal de los 7 Días */}
      <View style={[styles.diasContenedor, { backgroundColor: colores.tarjeta }]}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.diasScroll}
        >
          {proximos7Dias.map((diaStr) => {
            const activo = diaStr === diaSeleccionado;
            const etiqueta = formatearDiaLegible(diaStr);
            return (
              <TouchableOpacity
                key={diaStr}
                style={[
                  styles.tabDia,
                  {
                    backgroundColor: activo ? colores.primario : colores.chipFondo,
                  },
                ]}
                onPress={() => setDiaSeleccionado(diaStr)}
              >
                <Text
                  style={[
                    styles.tabDiaTexto,
                    { color: activo ? '#FFFFFF' : colores.texto },
                  ]}
                >
                  {etiqueta}
                </Text>
                <Text
                  style={[
                    styles.tabDiaFecha,
                    { color: activo ? 'rgba(255,255,255,0.85)' : colores.textoSecundario },
                  ]}
                >
                  {diaStr.split('-').slice(1).join('/')}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Grilla de turnos horarios */}
      <EstadoPantalla cargando={cargando} error={error} onReintentar={cargarTurnosDelDia}>
        <FlatList
          data={turnos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <FilaTurno turno={item} onSeleccionar={handleSeleccionarTurno} />
          )}
          contentContainerStyle={styles.listaContenido}
          ListHeaderComponent={
            espacio ? (
              <View style={styles.encabezadoGrilla}>
                <Text style={[styles.espacioTitulo, { color: colores.texto }]}>
                  {espacio.nombre}
                </Text>
                <Text style={[styles.espacioSub, { color: colores.textoSecundario }]}>
                  Turnos de 1 hora · {formatearDiaLegible(diaSeleccionado)} ({diaSeleccionado})
                </Text>
              </View>
            ) : undefined
          }
        />
      </EstadoPantalla>

      {/* Modal de confirmación de reserva */}
      <Modal
        visible={Boolean(turnoSeleccionado)}
        transparent
        animationType="fade"
        onRequestClose={() => setTurnoSeleccionado(null)}
      >
        <View style={styles.modalFondo}>
          <View style={[styles.modalCard, { backgroundColor: colores.tarjeta }]}>
            <View style={styles.modalHeader}>
              <View style={[styles.iconoModal, { backgroundColor: colores.primarioClaro }]}>
                <Icono nombre="calendar" tamano={24} color={colores.primario} />
              </View>
              <Text style={[styles.modalTitulo, { color: colores.texto }]}>
                Confirmar Reserva
              </Text>
            </View>

            {espacio && turnoSeleccionado && (
              <View style={styles.modalCuerpo}>
                <View style={styles.resumenFila}>
                  <Text style={[styles.resumenEtiqueta, { color: colores.textoSecundario }]}>
                    Cancha:
                  </Text>
                  <Text style={[styles.resumenValor, { color: colores.texto }]}>
                    {espacio.nombre}
                  </Text>
                </View>

                <View style={styles.resumenFila}>
                  <Text style={[styles.resumenEtiqueta, { color: colores.textoSecundario }]}>
                    Fecha:
                  </Text>
                  <Text style={[styles.resumenValor, { color: colores.texto }]}>
                    {formatearDiaLegible(turnoSeleccionado.fecha)} ({turnoSeleccionado.fecha})
                  </Text>
                </View>

                <View style={styles.resumenFila}>
                  <Text style={[styles.resumenEtiqueta, { color: colores.textoSecundario }]}>
                    Horario:
                  </Text>
                  <Text style={[styles.resumenValor, { color: colores.texto }]}>
                    {turnoSeleccionado.inicio} a {turnoSeleccionado.fin} hs (1 hora)
                  </Text>
                </View>

                <View style={styles.resumenFila}>
                  <Text style={[styles.resumenEtiqueta, { color: colores.textoSecundario }]}>
                    Tarifa a abonar:
                  </Text>
                  <Text style={[styles.resumenValor, { color: colores.primario }]}>
                    ${turnoSeleccionado.precio.toLocaleString('es-AR')}
                  </Text>
                </View>

                {/* Input cantidad de personas */}
                <View style={styles.inputContenedor}>
                  <Text style={[styles.inputLabel, { color: colores.texto }]}>
                    Cantidad estimada de jugadores:
                  </Text>
                  <TextInput
                    style={[
                      styles.inputPersonas,
                      {
                        backgroundColor: colores.chipFondo,
                        color: colores.texto,
                        borderColor: colores.borde,
                      },
                    ]}
                    keyboardType="number-pad"
                    value={cantidadPersonas}
                    onChangeText={setCantidadPersonas}
                    maxLength={2}
                  />
                  <Text style={[styles.inputAclaracion, { color: colores.textoSecundario }]}>
                    Capacidad máxima del espacio: {espacio.capacidad} personas
                  </Text>
                </View>
              </View>
            )}

            <View style={styles.modalBotones}>
              <TouchableOpacity
                style={[styles.botonModalCancelar, { borderColor: colores.borde }]}
                onPress={() => setTurnoSeleccionado(null)}
                disabled={confirmando}
              >
                <Text style={{ color: colores.textoSecundario, fontWeight: '700' }}>
                  Atrás
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.botonModalConfirmar, { backgroundColor: colores.primario }]}
                onPress={handleConfirmarReserva}
                disabled={confirmando}
              >
                <Text style={styles.botonModalConfirmarTexto}>
                  {confirmando ? 'Reservando...' : 'Confirmar Turno'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
  },
  diasContenedor: {
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E2E8F0',
  },
  diasScroll: {
    paddingHorizontal: 16,
    gap: 8,
  },
  tabDia: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
    minWidth: 80,
  },
  tabDiaTexto: {
    fontSize: 13,
    fontWeight: '700',
  },
  tabDiaFecha: {
    fontSize: 11,
    marginTop: 2,
  },
  listaContenido: {
    padding: 16,
    paddingBottom: 40,
  },
  encabezadoGrilla: {
    marginBottom: 14,
  },
  espacioTitulo: {
    fontSize: 17,
    fontWeight: '700',
  },
  espacioSub: {
    fontSize: 13,
    marginTop: 2,
  },
  modalFondo: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  modalCard: {
    width: '100%',
    borderRadius: 20,
    padding: 24,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  modalHeader: {
    alignItems: 'center',
    marginBottom: 16,
    gap: 10,
  },
  iconoModal: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalTitulo: {
    fontSize: 19,
    fontWeight: '800',
  },
  modalCuerpo: {
    gap: 10,
  },
  resumenFila: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  resumenEtiqueta: {
    fontSize: 13,
  },
  resumenValor: {
    fontSize: 14,
    fontWeight: '700',
  },
  inputContenedor: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#E2E8F0',
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 6,
  },
  inputPersonas: {
    height: 44,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 12,
    fontSize: 16,
    fontWeight: '700',
  },
  inputAclaracion: {
    fontSize: 11,
    marginTop: 4,
  },
  modalBotones: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
  },
  botonModalCancelar: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
  },
  botonModalConfirmar: {
    flex: 2,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  botonModalConfirmarTexto: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 15,
  },
});
