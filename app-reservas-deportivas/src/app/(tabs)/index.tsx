// src/app/(tabs)/index.tsx
// Catálogo principal de espacios deportivos en Villaguay con filtros, búsqueda y geolocalización

import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  StyleSheet,
  Modal,
} from 'react-native';
import { useRouter } from 'expo-router';
import * as Location from 'expo-location';
import { useSQLiteContext } from 'expo-sqlite';
import { useTema } from '../../contexto/tema.js';
import { useFiltrosStore, type OrdenEspacio } from '../../store/filtros.js';
import { ServicioReservas } from '../../servicios/reservas.js';
import { RepositorioOffline } from '../../db/repositorio-offline.js';
import { TarjetaEspacio } from '../../componentes/TarjetaEspacio.js';
import { EstadoPantalla } from '../../componentes/EstadoPantalla.js';
import { Icono } from '../../componentes/Icono.js';
import { ordenarEspaciosPorCercania } from '../../utils/distancia.js';
import type { Coordenadas, Deporte, Espacio } from '../../tipos/index.js';

export default function CatalogoEspaciosPantalla() {
  const router = useRouter();
  const db = useSQLiteContext();
  const { colores } = useTema();

  const repo = useMemo(() => new RepositorioOffline(db), [db]);
  const servicio = useMemo(() => new ServicioReservas(repo), [repo]);

  const {
    busqueda,
    setBusqueda,
    deporteId,
    setDeporteId,
    soloTechados,
    toggleTechados,
    soloIluminados,
    toggleIluminados,
    orden,
    setOrden,
    limpiarFiltros,
  } = useFiltrosStore();

  const [espacios, setEspacios] = useState<Espacio[]>([]);
  const [deportes, setDeportes] = useState<Deporte[]>([]);
  const [ubicacionUsuario, setUbicacionUsuario] = useState<Coordenadas | null>(null);
  const [cargando, setCargando] = useState(true);
  const [refrescando, setRefrescando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [modalFiltrosVisible, setModalFiltrosVisible] = useState(false);

  // Solicitar ubicación
  useEffect(() => {
    async function obtenerUbicacion() {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === 'granted') {
          const loc = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.Balanced,
          });
          setUbicacionUsuario({
            latitud: loc.coords.latitude,
            longitud: loc.coords.longitude,
          });
        }
      } catch {
        // Si el usuario deniega o el emulador no responde, no interrumpe
      }
    }
    obtenerUbicacion();
  }, []);

  const cargarDatos = async () => {
    try {
      setError(null);
      const [listaEspacios, listaDeportes] = await Promise.all([
        servicio.obtenerEspacios(),
        servicio.obtenerDeportes(),
      ]);
      setEspacios(listaEspacios);
      setDeportes(listaDeportes);
    } catch (err: any) {
      setError(err?.message || 'No se pudieron cargar los espacios.');
    } finally {
      setCargando(false);
      setRefrescando(false);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const onRefresh = () => {
    setRefrescando(true);
    cargarDatos();
  };

  // Filtrado y ordenamiento de la lista
  const espaciosFiltrados = useMemo(() => {
    let resultado = [...espacios];

    if (busqueda.trim()) {
      const q = busqueda.toLowerCase().trim();
      resultado = resultado.filter(
        (e) =>
          e.nombre.toLowerCase().includes(q) ||
          e.complejo.toLowerCase().includes(q) ||
          e.superficie.toLowerCase().includes(q)
      );
    }

    if (deporteId) {
      resultado = resultado.filter((e) => e.deporteId === deporteId);
    }

    if (soloTechados) {
      resultado = resultado.filter((e) => e.techado);
    }

    if (soloIluminados) {
      resultado = resultado.filter((e) => e.iluminacion);
    }

    // Ordenamiento
    const conDistancia = ordenarEspaciosPorCercania(resultado, ubicacionUsuario);

    if (orden === 'precio_asc') {
      conDistancia.sort((a, b) => a.precioPorHora - b.precioPorHora);
    } else if (orden === 'precio_desc') {
      conDistancia.sort((a, b) => b.precioPorHora - a.precioPorHora);
    } else if (orden === 'capacidad') {
      conDistancia.sort((a, b) => b.capacidad - a.capacidad);
    }

    return conDistancia;
  }, [
    espacios,
    busqueda,
    deporteId,
    soloTechados,
    soloIluminados,
    orden,
    ubicacionUsuario,
  ]);

  return (
    <View style={[styles.contenedor, { backgroundColor: colores.fondo }]}>
      {/* Barra de búsqueda superior */}
      <View style={[styles.barraBusquedaContenedor, { backgroundColor: colores.tarjeta }]}>
        <View style={[styles.cajaBusqueda, { backgroundColor: colores.chipFondo }]}>
          <Icono nombre="search-outline" tamano={18} color={colores.textoSecundario} />
          <TextInput
            style={[styles.inputBusqueda, { color: colores.texto }]}
            placeholder="Buscar por cancha, complejo o deporte..."
            placeholderTextColor={colores.textoSecundario}
            value={busqueda}
            onChangeText={setBusqueda}
            clearButtonMode="while-editing"
          />
          {busqueda.length > 0 && (
            <TouchableOpacity onPress={() => setBusqueda('')}>
              <Icono nombre="close-circle" tamano={18} color={colores.textoSecundario} />
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity
          style={[styles.botonFiltro, { backgroundColor: colores.chipFondo }]}
          onPress={() => setModalFiltrosVisible(true)}
        >
          <Icono nombre="options-outline" tamano={20} color={colores.primario} />
        </TouchableOpacity>
      </View>

      {/* Selector horizontal de Deportes (Chips) */}
      <View style={styles.deportesContenedor}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.deportesScroll}
        >
          <TouchableOpacity
            style={[
              styles.chipDeporte,
              {
                backgroundColor: deporteId === null ? colores.primario : colores.tarjeta,
                borderColor: deporteId === null ? colores.primario : colores.borde,
              },
            ]}
            onPress={() => setDeporteId(null)}
          >
            <Text
              style={[
                styles.chipTexto,
                { color: deporteId === null ? '#FFFFFF' : colores.texto },
              ]}
            >
              Todos
            </Text>
          </TouchableOpacity>

          {deportes.map((dep) => {
            const activo = deporteId === dep.id;
            return (
              <TouchableOpacity
                key={dep.id}
                style={[
                  styles.chipDeporte,
                  {
                    backgroundColor: activo ? colores.primario : colores.tarjeta,
                    borderColor: activo ? colores.primario : colores.borde,
                  },
                ]}
                onPress={() => setDeporteId(activo ? null : dep.id)}
              >
                <Icono
                  nombre={dep.icono}
                  tamano={16}
                  color={activo ? '#FFFFFF' : colores.textoSecundario}
                />
                <Text
                  style={[
                    styles.chipTexto,
                    { color: activo ? '#FFFFFF' : colores.texto },
                  ]}
                >
                  {dep.nombre}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Lista de Espacios */}
      <EstadoPantalla
        cargando={cargando}
        error={error}
        onReintentar={cargarDatos}
        vacio={espaciosFiltrados.length === 0}
        mensajeVacio="No encontramos canchas que coincidan con tus filtros."
        iconoVacio="football-outline"
      >
        <FlatList
          data={espaciosFiltrados}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TarjetaEspacio
              espacio={item}
              distanciaKm={item.distanciaKm}
              onPress={() => router.push(`/espacio/${item.id}`)}
            />
          )}
          contentContainerStyle={styles.listaContenido}
          refreshControl={
            <RefreshControl
              refreshing={refrescando}
              onRefresh={onRefresh}
              tintColor={colores.primario}
            />
          }
        />
      </EstadoPantalla>

      {/* Modal de Filtros Avanzados y Orden */}
      <Modal
        visible={modalFiltrosVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalFiltrosVisible(false)}
      >
        <View style={styles.modalFondo}>
          <View style={[styles.modalContenido, { backgroundColor: colores.tarjeta }]}>
            <View style={styles.modalCabecera}>
              <Text style={[styles.modalTitulo, { color: colores.texto }]}>
                Filtros y Orden
              </Text>
              <TouchableOpacity onPress={() => setModalFiltrosVisible(false)}>
                <Icono nombre="close" tamano={24} color={colores.texto} />
              </TouchableOpacity>
            </View>

            <Text style={[styles.modalSubtitulo, { color: colores.textoSecundario }]}>
              Ordenar por
            </Text>
            <View style={styles.opcionesFila}>
              {(
                [
                  { clave: 'cercania', etiqueta: 'Cercanía' },
                  { clave: 'precio_asc', etiqueta: 'Menor Precio' },
                  { clave: 'precio_desc', etiqueta: 'Mayor Precio' },
                  { clave: 'capacidad', etiqueta: 'Capacidad' },
                ] as const
              ).map((opt) => (
                <TouchableOpacity
                  key={opt.clave}
                  style={[
                    styles.opcionBoton,
                    {
                      backgroundColor:
                        orden === opt.clave ? colores.primario : colores.chipFondo,
                    },
                  ]}
                  onPress={() => setOrden(opt.clave as OrdenEspacio)}
                >
                  <Text
                    style={{
                      color: orden === opt.clave ? '#FFFFFF' : colores.texto,
                      fontWeight: '600',
                      fontSize: 13,
                    }}
                  >
                    {opt.etiqueta}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text
              style={[
                styles.modalSubtitulo,
                { color: colores.textoSecundario, marginTop: 16 },
              ]}
            >
              Equipamiento
            </Text>
            <TouchableOpacity
              style={styles.switchFila}
              onPress={toggleTechados}
              activeOpacity={0.7}
            >
              <Text style={[styles.switchTexto, { color: colores.texto }]}>
                Sólo techados
              </Text>
              <Icono
                nombre={soloTechados ? 'checkbox' : 'square-outline'}
                tamano={24}
                color={colores.primario}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.switchFila}
              onPress={toggleIluminados}
              activeOpacity={0.7}
            >
              <Text style={[styles.switchTexto, { color: colores.texto }]}>
                Sólo con iluminación nocturna
              </Text>
              <Icono
                nombre={soloIluminados ? 'checkbox' : 'square-outline'}
                tamano={24}
                color={colores.primario}
              />
            </TouchableOpacity>

            <View style={styles.modalAcciones}>
              <TouchableOpacity
                style={[styles.botonLimpiar, { borderColor: colores.borde }]}
                onPress={limpiarFiltros}
              >
                <Text style={{ color: colores.textoSecundario, fontWeight: '600' }}>
                  Restablecer
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.botonAplicar, { backgroundColor: colores.primario }]}
                onPress={() => setModalFiltrosVisible(false)}
              >
                <Text style={{ color: '#FFFFFF', fontWeight: '700' }}>Listo</Text>
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
  barraBusquedaContenedor: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 10,
  },
  cajaBusqueda: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    height: 42,
    borderRadius: 10,
    gap: 8,
  },
  inputBusqueda: {
    flex: 1,
    fontSize: 14,
    height: '100%',
  },
  botonFiltro: {
    width: 42,
    height: 42,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deportesContenedor: {
    paddingVertical: 8,
  },
  deportesScroll: {
    paddingHorizontal: 16,
    gap: 8,
  },
  chipDeporte: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 7,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
  },
  chipTexto: {
    fontSize: 13,
    fontWeight: '600',
  },
  listaContenido: {
    padding: 16,
    paddingBottom: 32,
  },
  modalFondo: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContenido: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  modalCabecera: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitulo: {
    fontSize: 18,
    fontWeight: '700',
  },
  modalSubtitulo: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  opcionesFila: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  opcionBoton: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  switchFila: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  switchTexto: {
    fontSize: 15,
  },
  modalAcciones: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
  },
  botonLimpiar: {
    flex: 1,
    borderWidth: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  botonAplicar: {
    flex: 2,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
});
