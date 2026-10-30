// src/app/encargado/bloqueos.tsx
// Gestión de bloqueos por lluvia o mantenimiento con adjunto de foto de evidencia (expo-image-picker)

import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
} from 'react-native';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { useSQLiteContext } from 'expo-sqlite';
import { useTema } from '../../contexto/tema';
import { ServicioGestion } from '../../servicios/gestion';
import { ServicioReservas } from '../../servicios/reservas';
import { RepositorioOffline } from '../../db/repositorio-offline';
import { guardarFotoEvidenciaLocal } from '../../servicios/archivos';
import { Icono } from '../../componentes/Icono';
import { hoyString } from '../../utils/fechas';
import type { Bloqueo, Espacio } from '../../tipos/index';

export default function BloqueosPantalla() {
  const db = useSQLiteContext();
  const { colores } = useTema();

  const repo = useMemo(() => new RepositorioOffline(db), [db]);
  const gestion = useMemo(() => new ServicioGestion(repo), [repo]);
  const reservas = useMemo(() => new ServicioReservas(repo), [repo]);

  const [espacios, setEspacios] = useState<Espacio[]>([]);
  const [bloqueos, setBloqueos] = useState<Bloqueo[]>([]);
  const [espacioIdSeleccionado, setEspacioIdSeleccionado] = useState('esp-01');
  const [fecha, setFecha] = useState(hoyString());
  const [motivo, setMotivo] = useState('Anegamiento de cancha por intensa lluvia.');
  const [fotoEvidenciaUri, setFotoEvidenciaUri] = useState<string | null>(null);
  const [creando, setCreando] = useState(false);

  const cargarDatos = async () => {
    try {
      const [esp, blq] = await Promise.all([
        reservas.obtenerEspacios(),
        gestion.obtenerBloqueos(),
      ]);
      setEspacios(esp);
      setBloqueos(blq);
      if (esp.length > 0 && !espacioIdSeleccionado) {
        setEspacioIdSeleccionado(esp[0].id);
      }
    } catch {
      //
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const tomarFotoEvidencia = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permiso necesario', 'Se necesita acceso a la cámara para tomar la foto.');
        return;
      }

      const res = await ImagePicker.launchCameraAsync({
        mediaTypes: ['images'],
        quality: 0.7,
        allowsEditing: true,
      });

      if (!res.canceled && res.assets[0]?.uri) {
        const uriGuardada = await guardarFotoEvidenciaLocal(res.assets[0].uri);
        setFotoEvidenciaUri(uriGuardada);
      }
    } catch {
      Alert.alert('Error al capturar imagen');
    }
  };

  const seleccionarDeGaleria = async () => {
    try {
      const res = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        quality: 0.7,
      });
      if (!res.canceled && res.assets[0]?.uri) {
        const uriGuardada = await guardarFotoEvidenciaLocal(res.assets[0].uri);
        setFotoEvidenciaUri(uriGuardada);
      }
    } catch {
      //
    }
  };

  const handleCrearBloqueo = async () => {
    if (!motivo.trim()) {
      Alert.alert('Requerido', 'Escribí el motivo del bloqueo.');
      return;
    }

    try {
      setCreando(true);
      await gestion.crearBloqueo(espacioIdSeleccionado, fecha, null, null, motivo);
      Alert.alert(
        'Cancha Bloqueada',
        'El bloqueo fue registrado. Los turnos de ese día figurarán en mantenimiento y no podrán reservarse.'
      );
      setMotivo('');
      setFotoEvidenciaUri(null);
      cargarDatos();
    } catch (err: any) {
      Alert.alert('Error', err?.message || 'No se pudo crear el bloqueo.');
    } finally {
      setCreando(false);
    }
  };

  const handleEliminarBloqueo = (id: string) => {
    Alert.alert('Eliminar Bloqueo', '¿Deseás rehabilitar los turnos de este día?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Eliminar',
        style: 'destructive',
        onPress: async () => {
          await gestion.eliminarBloqueo(id);
          cargarDatos();
        },
      },
    ]);
  };

  return (
    <ScrollView style={[styles.contenedor, { backgroundColor: colores.fondo }]}>
      {/* Formulario de Nuevo Bloqueo */}
      <View
        style={[
          styles.tarjetaFormulario,
          { backgroundColor: colores.tarjeta, borderColor: colores.borde },
        ]}
      >
        <Text style={[styles.tituloForm, { color: colores.texto }]}>
          Registrar Bloqueo de Espacio
        </Text>

        <Text style={[styles.etiqueta, { color: colores.texto }]}>Seleccionar Cancha:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginVertical: 6 }}>
          <View style={{ flexDirection: 'row', gap: 6 }}>
            {espacios.map((e) => {
              const activo = e.id === espacioIdSeleccionado;
              return (
                <TouchableOpacity
                  key={e.id}
                  style={[
                    styles.chipCancha,
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
          Fecha (AAAA-MM-DD):
        </Text>
        <TextInput
          style={[styles.input, { backgroundColor: colores.chipFondo, color: colores.texto, borderColor: colores.borde }]}
          value={fecha}
          onChangeText={setFecha}
          placeholder="AAAA-MM-DD"
        />

        <Text style={[styles.etiqueta, { color: colores.texto, marginTop: 8 }]}>
          Motivo (Lluvia, Reparación, Evento):
        </Text>
        <TextInput
          style={[
            styles.input,
            { backgroundColor: colores.chipFondo, color: colores.texto, borderColor: colores.borde, height: 60 },
          ]}
          value={motivo}
          onChangeText={setMotivo}
          placeholder="Ej: Anegamiento de césped por tormenta..."
          multiline
        />

        {/* Evidencia Fotográfica */}
        <Text style={[styles.etiqueta, { color: colores.texto, marginTop: 8 }]}>
          Foto de Evidencia:
        </Text>
        <View style={styles.botonesFotoFila}>
          <TouchableOpacity style={[styles.botonFoto, { backgroundColor: colores.chipFondo }]} onPress={tomarFotoEvidencia}>
            <Icono nombre="camera" tamano={18} color={colores.primario} />
            <Text style={[styles.botonFotoTexto, { color: colores.primario }]}>Tomar Foto</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.botonFoto, { backgroundColor: colores.chipFondo }]} onPress={seleccionarDeGaleria}>
            <Icono nombre="images-outline" tamano={18} color={colores.primario} />
            <Text style={[styles.botonFotoTexto, { color: colores.primario }]}>Galería</Text>
          </TouchableOpacity>
        </View>

        {fotoEvidenciaUri && (
          <View style={styles.previewContenedor}>
            <Image source={{ uri: fotoEvidenciaUri }} style={styles.previewImagen} contentFit="cover" />
            <TouchableOpacity style={styles.botonBorrarFoto} onPress={() => setFotoEvidenciaUri(null)}>
              <Icono nombre="trash" tamano={16} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        )}

        <TouchableOpacity
          style={[styles.botonBloquear, { backgroundColor: colores.peligro }]}
          onPress={handleCrearBloqueo}
          disabled={creando}
        >
          <Icono nombre="lock-closed" tamano={18} color="#FFFFFF" />
          <Text style={styles.botonBloquearTexto}>
            {creando ? 'Bloqueando...' : 'Aplicar Bloqueo'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Lista de Bloqueos Activos */}
      <Text style={[styles.seccionTitulo, { color: colores.textoSecundario }]}>
        Bloqueos Activos
      </Text>

      {bloqueos.map((b) => (
        <View
          key={b.id}
          style={[styles.tarjetaBloqueo, { backgroundColor: colores.tarjeta, borderColor: colores.borde }]}
        >
          <View style={{ flex: 1 }}>
            <Text style={[styles.bloqueoEspacio, { color: colores.texto }]}>
              {espacios.find((e) => e.id === b.espacioId)?.nombre || b.espacioId}
            </Text>
            <Text style={[styles.bloqueoFecha, { color: colores.advertencia }]}>
              Fecha: {b.fecha} {b.inicio ? `(${b.inicio} a ${b.fin})` : '(Día completo)'}
            </Text>
            <Text style={[styles.bloqueoMotivo, { color: colores.textoSecundario }]}>
              {b.motivo}
            </Text>
          </View>
          <TouchableOpacity onPress={() => handleEliminarBloqueo(b.id)}>
            <Icono nombre="trash-outline" tamano={22} color={colores.peligro} />
          </TouchableOpacity>
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
  tarjetaFormulario: {
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
  chipCancha: {
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
  botonesFotoFila: {
    flexDirection: 'row',
    gap: 10,
  },
  botonFoto: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    borderRadius: 8,
  },
  botonFotoTexto: {
    fontSize: 13,
    fontWeight: '700',
  },
  previewContenedor: {
    height: 140,
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
    marginTop: 6,
  },
  previewImagen: {
    width: '100%',
    height: '100%',
  },
  botonBorrarFoto: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botonBloquear: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 10,
  },
  botonBloquearTexto: {
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
  tarjetaBloqueo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 10,
    gap: 12,
  },
  bloqueoEspacio: {
    fontSize: 15,
    fontWeight: '700',
  },
  bloqueoFecha: {
    fontSize: 12,
    fontWeight: '700',
    marginTop: 2,
  },
  bloqueoMotivo: {
    fontSize: 12,
    marginTop: 4,
  },
});
