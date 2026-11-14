// src/app/encargado/precio.tsx
// Actualización de tarifas por hora de canchas y complejos deportivos municipales

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
import { Redirect } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import { useTema } from '../../contexto/tema';
import { useSesion } from '../../contexto/sesion';
import { ServicioGestion } from '../../servicios/gestion';
import { ServicioReservas } from '../../servicios/reservas';
import { RepositorioOffline } from '../../db/repositorio-offline';
import { Icono } from '../../componentes/Icono';
import type { Espacio } from '../../tipos/index';

export default function ActualizarPreciosPantalla() {
  const db = useSQLiteContext();
  const { colores } = useTema();
  const { usuario } = useSesion();
  const esAdmin = usuario?.rol === 'administrador';

  const repo = useMemo(() => new RepositorioOffline(db), [db]);
  const gestion = useMemo(() => new ServicioGestion(repo), [repo]);
  const reservas = useMemo(() => new ServicioReservas(repo), [repo]);

  const [espacios, setEspacios] = useState<Espacio[]>([]);
  const [espacioId, setEspacioId] = useState('esp-01');
  const [nuevoPrecio, setNuevoPrecio] = useState('12000');
  const [guardando, setGuardando] = useState(false);

  const cargarEspacios = async () => {
    try {
      const lista = await reservas.obtenerEspacios();
      setEspacios(lista);
      if (lista.length > 0) {
        setEspacioId(lista[0].id);
        setNuevoPrecio(lista[0].precioPorHora.toString());
      }
    } catch {
      //
    }
  };

  useEffect(() => {
    cargarEspacios();
  }, []);

  const handleSeleccionarEspacio = (id: string) => {
    setEspacioId(id);
    const esp = espacios.find((e) => e.id === id);
    if (esp) {
      setNuevoPrecio(esp.precioPorHora.toString());
    }
  };

  const handleActualizar = async () => {
    const precio = parseFloat(nuevoPrecio);
    if (isNaN(precio) || precio <= 0) {
      Alert.alert('Valor inválido', 'Ingresá un precio numérico mayor a cero.');
      return;
    }

    try {
      setGuardando(true);
      await gestion.actualizarPrecio(espacioId, precio);

      // Actualizar estado local
      setEspacios((prev) =>
        prev.map((e) => (e.id === espacioId ? { ...e, precioPorHora: precio } : e))
      );

      Alert.alert('Tarifa Actualizada', `El nuevo precio por hora es $${precio.toLocaleString('es-AR')}`);
    } catch (err: any) {
      Alert.alert('Error', err?.message || 'No se pudo actualizar el precio.');
    } finally {
      setGuardando(false);
    }
  };

  if (!esAdmin) {
    return <Redirect href="/(tabs)/gestion" />;
  }

  return (
    <ScrollView style={[styles.contenedor, { backgroundColor: colores.fondo }]}>
      <View
        style={[
          styles.tarjetaForm,
          { backgroundColor: colores.tarjeta, borderColor: colores.borde },
        ]}
      >
        <Text style={[styles.titulo, { color: colores.texto }]}>
          Modificar Tarifa de Alquiler
        </Text>

        <Text style={[styles.etiqueta, { color: colores.texto }]}>Seleccionar Cancha:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginVertical: 6 }}>
          <View style={{ flexDirection: 'row', gap: 6 }}>
            {espacios.map((e) => {
              const activo = e.id === espacioId;
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
                  onPress={() => handleSeleccionarEspacio(e.id)}
                >
                  <Text style={{ color: activo ? '#FFFFFF' : colores.texto, fontSize: 12, fontWeight: '700' }}>
                    {e.nombre}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>

        <Text style={[styles.etiqueta, { color: colores.texto, marginTop: 12 }]}>
          Nuevo Precio por Hora ($ ARS):
        </Text>
        <TextInput
          style={[
            styles.input,
            { backgroundColor: colores.chipFondo, color: colores.texto, borderColor: colores.borde },
          ]}
          keyboardType="number-pad"
          value={nuevoPrecio}
          onChangeText={setNuevoPrecio}
        />

        <TouchableOpacity
          style={[styles.botonGuardar, { backgroundColor: colores.primario }]}
          onPress={handleActualizar}
          disabled={guardando}
        >
          <Icono nombre="save-outline" tamano={18} color="#FFFFFF" />
          <Text style={styles.botonGuardarTexto}>
            {guardando ? 'Guardando...' : 'Actualizar Tarifa'}
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={[styles.seccionTitulo, { color: colores.textoSecundario }]}>
        Tarifario Vigente en Villaguay
      </Text>

      {espacios.map((e) => (
        <View
          key={e.id}
          style={[styles.tarjetaEspacioPrecio, { backgroundColor: colores.tarjeta, borderColor: colores.borde }]}
        >
          <View style={{ flex: 1 }}>
            <Text style={[styles.canchaNombre, { color: colores.texto }]}>{e.nombre}</Text>
            <Text style={[styles.canchaComplejo, { color: colores.textoSecundario }]}>
              {e.complejo} · {e.superficie}
            </Text>
          </View>
          <Text style={[styles.precioValor, { color: colores.primario }]}>
            ${e.precioPorHora.toLocaleString('es-AR')} / h
          </Text>
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
  titulo: {
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
    fontSize: 16,
    fontWeight: '700',
    height: 44,
  },
  botonGuardar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    borderRadius: 10,
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
  tarjetaEspacioPrecio: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 8,
  },
  canchaNombre: {
    fontSize: 14,
    fontWeight: '700',
  },
  canchaComplejo: {
    fontSize: 12,
    marginTop: 2,
  },
  precioValor: {
    fontSize: 15,
    fontWeight: '800',
  },
});
