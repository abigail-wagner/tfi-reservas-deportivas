// src/app/encargado/fijas.tsx
// Gestión de reservas fijas semanales (torneos, escuelitas de deporte, veteranos)

import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';
import { useTema } from '../../contexto/tema';
import { ServicioGestion } from '../../servicios/gestion';
import { ServicioReservas } from '../../servicios/reservas';
import { RepositorioOffline } from '../../db/repositorio-offline';
import { Icono } from '../../componentes/Icono';
import { hoyString } from '../../utils/fechas';
import type { Espacio, ReservaFija } from '../../tipos/index';

const DIAS_SEMANA = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

export default function ReservasFijasPantalla() {
  const db = useSQLiteContext();
  const { colores } = useTema();

  const repo = useMemo(() => new RepositorioOffline(db), [db]);
  const gestion = useMemo(() => new ServicioGestion(repo), [repo]);
  const reservas = useMemo(() => new ServicioReservas(repo), [repo]);

  const [espacios, setEspacios] = useState<Espacio[]>([]);
  const [fijas, setFijas] = useState<ReservaFija[]>([]);
  const [espacioIdSeleccionado, setEspacioIdSeleccionado] = useState('esp-01');
  const [titular, setTitular] = useState('');
  const [diaSemana, setDiaSemana] = useState<0 | 1 | 2 | 3 | 4 | 5 | 6>(1);
  const [horaInicio, setHoraInicio] = useState('20:00');
  const [horaFin, setHoraFin] = useState('22:00');
  const [creando, setCreando] = useState(false);

  const cargarDatos = async () => {
    try {
      const [esp, fj] = await Promise.all([
        reservas.obtenerEspacios(),
        gestion.obtenerFijas(),
      ]);
      setEspacios(esp);
      setFijas(fj);
    } catch {
      //
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const handleCrearFija = async () => {
    if (!titular.trim()) {
      Alert.alert('Requerido', 'Ingresá el titular de la reserva fija.');
      return;
    }

    try {
      setCreando(true);
      await gestion.crearFija(
        espacioIdSeleccionado,
        titular,
        diaSemana,
        horaInicio,
        horaFin,
        hoyString()
      );
      Alert.alert('Reserva Fija Creada', 'El horario ha sido asignado semanalmente.');
      setTitular('');
      cargarDatos();
    } catch (err: any) {
      Alert.alert('Error', err?.message || 'No se pudo crear la reserva fija.');
    } finally {
      setCreando(false);
    }
  };

  return (
    <ScrollView style={[styles.contenedor, { backgroundColor: colores.fondo }]}>
      <View
        style={[
          styles.tarjetaForm,
          { backgroundColor: colores.tarjeta, borderColor: colores.borde },
        ]}
      >
        <Text style={[styles.tituloForm, { color: colores.texto }]}>
          Nueva Reserva Fija Semanal
        </Text>

        <Text style={[styles.etiqueta, { color: colores.texto }]}>Cancha:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={{ flexDirection: 'row', gap: 6, marginVertical: 4 }}>
            {espacios.map((e) => {
              const activo = e.id === espacioIdSeleccionado;
              return (
                <TouchableOpacity
                  key={e.id}
                  style={[
                    styles.chip,
                    {
                      backgroundColor: activo ? colores.primario : colores.chipFondo,
                      borderColor: activo ? colores.primario : colores.borde,
                    },
                  ]}
                  onPress={() => setEspacioIdSeleccionado(e.id)}
                >
                  <Text style={{ color: activo ? '#FFFFFF' : colores.texto, fontSize: 12, fontWeight: '700' }}>
                    {e.nombre}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>

        <Text style={[styles.etiqueta, { color: colores.texto, marginTop: 8 }]}>
          Titular o Institución:
        </Text>
        <TextInput
          style={[styles.input, { backgroundColor: colores.chipFondo, color: colores.texto, borderColor: colores.borde }]}
          value={titular}
          onChangeText={setTitular}
          placeholder="Ej: Liga Municipal de Veteranos"
        />

        <Text style={[styles.etiqueta, { color: colores.texto, marginTop: 8 }]}>
          Día de la Semana:
        </Text>
        <View style={styles.diasFila}>
          {DIAS_SEMANA.map((nombre, idx) => {
            const activo = diaSemana === idx;
            return (
              <TouchableOpacity
                key={nombre}
                style={[
                  styles.diaBtn,
                  { backgroundColor: activo ? colores.primario : colores.chipFondo },
                ]}
                onPress={() => setDiaSemana(idx as any)}
              >
                <Text style={{ color: activo ? '#FFFFFF' : colores.texto, fontSize: 11, fontWeight: '700' }}>
                  {nombre.substring(0, 3)}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.horasFila}>
          <View style={{ flex: 1 }}>
            <Text style={[styles.etiqueta, { color: colores.texto }]}>Desde (HH:MM):</Text>
            <TextInput
              style={[styles.input, { backgroundColor: colores.chipFondo, color: colores.texto, borderColor: colores.borde }]}
              value={horaInicio}
              onChangeText={setHoraInicio}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[styles.etiqueta, { color: colores.texto }]}>Hasta (HH:MM):</Text>
            <TextInput
              style={[styles.input, { backgroundColor: colores.chipFondo, color: colores.texto, borderColor: colores.borde }]}
              value={horaFin}
              onChangeText={setHoraFin}
            />
          </View>
        </View>

        <TouchableOpacity
          style={[styles.botonGuardar, { backgroundColor: colores.primario }]}
          onPress={handleCrearFija}
          disabled={creando}
        >
          <Text style={styles.botonGuardarTexto}>
            {creando ? 'Guardando...' : 'Asignar Reserva Fija'}
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={[styles.seccionTitulo, { color: colores.textoSecundario }]}>
        Reservas Fijas Existentes
      </Text>

      {fijas.map((f) => (
        <View
          key={f.id}
          style={[styles.tarjetaFija, { backgroundColor: colores.tarjeta, borderColor: colores.borde }]}
        >
          <View style={{ flex: 1 }}>
            <Text style={[styles.fijaTitular, { color: colores.texto }]}>{f.titular}</Text>
            <Text style={[styles.fijaEspacio, { color: colores.primario }]}>
              {espacios.find((e) => e.id === f.espacioId)?.nombre || f.espacioId}
            </Text>
            <Text style={[styles.fijaHorario, { color: colores.textoSecundario }]}>
              Todos los {DIAS_SEMANA[f.dia]}s de {f.inicio} a {f.fin} hs
            </Text>
          </View>
          <Icono nombre="repeat" tamano={20} color={colores.primario} />
        </View>
      ))}
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    padding: 16,
  },
  tarjetaForm: {
    borderRadius: 18,
    borderWidth: 1,
    padding: 18,
    gap: 8,
    marginBottom: 20,
  },
  tituloForm: {
    fontSize: 17,
    fontWeight: '800',
    marginBottom: 6,
  },
  etiqueta: {
    fontSize: 13,
    fontWeight: '600',
  },
  chip: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
  },
  input: {
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 12,
    fontSize: 14,
    height: 42,
  },
  diasFila: {
    flexDirection: 'row',
    gap: 6,
    marginVertical: 4,
  },
  diaBtn: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: 8,
  },
  horasFila: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 6,
  },
  botonGuardar: {
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  botonGuardarTexto: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 15,
  },
  seccionTitulo: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 10,
  },
  tarjetaFija: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 10,
    gap: 12,
  },
  fijaTitular: {
    fontSize: 15,
    fontWeight: '700',
  },
  fijaEspacio: {
    fontSize: 13,
    fontWeight: '600',
    marginTop: 2,
  },
  fijaHorario: {
    fontSize: 12,
    marginTop: 2,
  },
});
