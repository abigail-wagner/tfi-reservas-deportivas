// src/app/(tabs)/mapa.tsx
// Mapa interactivo de los complejos deportivos en Villaguay (OpenStreetMap Web Mercator nativo, compatible con APK compilado y Web sin API key de pago)

import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  PanResponder,
  Platform,
  Linking,
  type LayoutChangeEvent,
} from 'react-native';
import { useRouter } from 'expo-router';
import * as Location from 'expo-location';
import { useSQLiteContext } from 'expo-sqlite';
import { useTema } from '../../contexto/tema';
import { ServicioReservas } from '../../servicios/reservas';
import { RepositorioOffline } from '../../db/repositorio-offline';
import { Icono } from '../../componentes/Icono';
import type { Coordenadas, Espacio } from '../../tipos/index';

// Coordenadas centrales de la ciudad de Villaguay, Entre Ríos
const VILLAGUAY_CENTRO: Coordenadas = {
  latitud: -31.8635,
  longitud: -59.0265,
};

const ZOOM_INICIAL = 14;
const ZOOM_MIN = 12;
const ZOOM_MAX = 17;
const TILE_SIZE = 256;

// Conversión Web Mercator (EPSG:3857) de (lat, lon, zoom) a píxeles globales
function latLonAPixelGlobal(lat: number, lon: number, zoom: number): { x: number; y: number } {
  const escala = TILE_SIZE * Math.pow(2, zoom);
  const x = ((lon + 180) / 360) * escala;
  const latRad = (lat * Math.PI) / 180;
  const senLat = Math.sin(latRad);
  const y =
    (0.5 - Math.log((1 + senLat) / (1 - senLat)) / (4 * Math.PI)) * escala;
  return { x, y };
}

// Conversión inversa de píxeles globales a (lat, lon)
function pixelGlobalALatLon(x: number, y: number, zoom: number): Coordenadas {
  const escala = TILE_SIZE * Math.pow(2, zoom);
  const lon = (x / escala) * 360 - 180;
  const n = Math.PI - (2 * Math.PI * y) / escala;
  const lat = (180 / Math.PI) * Math.atan(0.5 * (Math.exp(n) - Math.exp(-n)));
  return {
    latitud: Math.max(-85, Math.min(85, lat)),
    longitud: Math.max(-180, Math.min(180, lon)),
  };
}

function obtenerSourceTile(z: number, x: number, y: number) {
  const url = `https://tile.openstreetmap.org/${z}/${x}/${y}.png`;
  if (Platform.OS === 'web') {
    return { uri: url };
  }
  return {
    uri: url,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Linux; Android 14; Mobile) ReservasVillaguay/1.0',
      Accept: 'image/avif,image/webp,image/apng,image/*,*/*;q=0.8',
    },
  };
}

export default function MapaPantalla() {
  const router = useRouter();
  const db = useSQLiteContext();
  const { colores } = useTema();

  const repo = useMemo(() => new RepositorioOffline(db), [db]);
  const servicio = useMemo(() => new ServicioReservas(repo), [repo]);

  const [espacios, setEspacios] = useState<Espacio[]>([]);
  const [espacioSeleccionado, setEspacioSeleccionado] = useState<Espacio | null>(null);
  const [ubicacionUsuario, setUbicacionUsuario] = useState<Coordenadas | null>(null);

  const [centro, setCentro] = useState<Coordenadas>(VILLAGUAY_CENTRO);
  const [zoom, setZoom] = useState<number>(ZOOM_INICIAL);
  const [arrastrePx, setArrastrePx] = useState<{ dx: number; dy: number }>({ dx: 0, dy: 0 });
  const [dimensiones, setDimensiones] = useState<{ ancho: number; alto: number }>({
    ancho: 380,
    alto: 560,
  });

  const estadoRef = useRef({ centro, zoom });
  useEffect(() => {
    estadoRef.current = { centro, zoom };
  }, [centro, zoom]);

  useEffect(() => {
    async function cargar() {
      try {
        const datos = await servicio.obtenerEspacios();
        setEspacios(datos);
      } catch {
        // Fallback
      }
    }
    cargar();
  }, [servicio]);

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
        // Permiso no concedido o sin GPS
      }
    }
    obtenerUbicacion();
  }, []);

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => false,
        onMoveShouldSetPanResponder: (_, gestureState) =>
          Math.abs(gestureState.dx) > 4 || Math.abs(gestureState.dy) > 4,
        onPanResponderMove: (_, gestureState) => {
          setArrastrePx({ dx: gestureState.dx, dy: gestureState.dy });
        },
        onPanResponderRelease: (_, gestureState) => {
          const { centro: cActual, zoom: zActual } = estadoRef.current;
          const centroGlobal = latLonAPixelGlobal(
            cActual.latitud,
            cActual.longitud,
            zActual
          );
          const nuevoCentro = pixelGlobalALatLon(
            centroGlobal.x - gestureState.dx,
            centroGlobal.y - gestureState.dy,
            zActual
          );
          setCentro(nuevoCentro);
          setArrastrePx({ dx: 0, dy: 0 });
        },
        onPanResponderTerminate: () => {
          setArrastrePx({ dx: 0, dy: 0 });
        },
      }),
    []
  );

  const handleLayout = (e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout;
    if (width > 0 && height > 0) {
      setDimensiones({ ancho: width, alto: height });
    }
  };

  // Cálculo del origen en píxeles globales de la esquina superior izquierda del mapa
  const vistaMapa = useMemo(() => {
    const centroGlobal = latLonAPixelGlobal(centro.latitud, centro.longitud, zoom);
    const cx = centroGlobal.x - arrastrePx.dx;
    const cy = centroGlobal.y - arrastrePx.dy;
    const leftGlobal = cx - dimensiones.ancho / 2;
    const topGlobal = cy - dimensiones.alto / 2;

    const maxTile = Math.pow(2, zoom) - 1;
    const minTileX = Math.max(0, Math.floor(leftGlobal / TILE_SIZE));
    const maxTileX = Math.min(
      maxTile,
      Math.floor((leftGlobal + dimensiones.ancho) / TILE_SIZE)
    );
    const minTileY = Math.max(0, Math.floor(topGlobal / TILE_SIZE));
    const maxTileY = Math.min(
      maxTile,
      Math.floor((topGlobal + dimensiones.alto) / TILE_SIZE)
    );

    const tiles: { key: string; tx: number; ty: number; left: number; top: number }[] = [];
    for (let tx = minTileX; tx <= maxTileX; tx++) {
      for (let ty = minTileY; ty <= maxTileY; ty++) {
        tiles.push({
          key: `${zoom}-${tx}-${ty}`,
          tx,
          ty,
          left: tx * TILE_SIZE - leftGlobal,
          top: ty * TILE_SIZE - topGlobal,
        });
      }
    }

    return { leftGlobal, topGlobal, tiles };
  }, [centro, zoom, arrastrePx, dimensiones]);

  const seleccionarEspacio = (e: Espacio) => {
    setEspacioSeleccionado(e);
    setCentro({
      latitud: e.coordenadas.latitud,
      longitud: e.coordenadas.longitud,
    });
    setArrastrePx({ dx: 0, dy: 0 });
    if (zoom < 15) {
      setZoom(15);
    }
  };

  const centrarEnVillaguay = () => {
    setCentro(VILLAGUAY_CENTRO);
    setZoom(ZOOM_INICIAL);
    setArrastrePx({ dx: 0, dy: 0 });
    setEspacioSeleccionado(null);
  };

  const centrarEnMiUbicacion = () => {
    if (ubicacionUsuario) {
      setCentro(ubicacionUsuario);
      setZoom(15);
      setArrastrePx({ dx: 0, dy: 0 });
    } else {
      centrarEnVillaguay();
    }
  };

  const abrirEnGoogleMaps = (e: Espacio) => {
    const { latitud, longitud } = e.coordenadas;
    const label = encodeURIComponent(`${e.nombre} - ${e.complejo}, Villaguay`);
    const url =
      Platform.OS === 'android'
        ? `geo:${latitud},${longitud}?q=${latitud},${longitud}(${label})`
        : `https://www.google.com/maps/search/?api=1&query=${latitud},${longitud}`;
    Linking.openURL(url).catch(() => {
      Linking.openURL(
        `https://www.google.com/maps/search/?api=1&query=${latitud},${longitud}`
      ).catch(() => {});
    });
  };

  return (
    <View style={[styles.contenedor, { backgroundColor: colores.fondo }]}>
      {/* Lienzo interactivo del mapa */}
      <View
        style={styles.lienzoMapa}
        onLayout={handleLayout}
        {...panResponder.panHandlers}
      >
        {/* Capa de mosaicos OpenStreetMap */}
        {vistaMapa.tiles.map((t) => (
          <Image
            key={t.key}
            source={obtenerSourceTile(zoom, t.tx, t.ty)}
            style={[
              styles.tile,
              {
                left: t.left,
                top: t.top,
              },
            ]}
            resizeMode="cover"
          />
        ))}

        {/* Punto de ubicación del usuario si está disponible */}
        {ubicacionUsuario &&
          (() => {
            const pos = latLonAPixelGlobal(
              ubicacionUsuario.latitud,
              ubicacionUsuario.longitud,
              zoom
            );
            const left = pos.x - vistaMapa.leftGlobal - 10;
            const top = pos.y - vistaMapa.topGlobal - 10;
            if (
              left < -30 ||
              top < -30 ||
              left > dimensiones.ancho + 30 ||
              top > dimensiones.alto + 30
            ) {
              return null;
            }
            return (
              <View style={[styles.puntoUsuarioHalo, { left, top }]}>
                <View style={styles.puntoUsuarioCentro} />
              </View>
            );
          })()}

        {/* Marcadores de las canchas deportivas */}
        {espacios.map((e, idx) => {
          const pos = latLonAPixelGlobal(
            e.coordenadas.latitud,
            e.coordenadas.longitud,
            zoom
          );
          // Pequeño desplazamiento si dos canchas comparten casi el mismo punto para que ambas se puedan tocar
          const offsetDuplicado = (idx % 3 - 1) * 4;
          const x = pos.x - vistaMapa.leftGlobal + offsetDuplicado;
          const y = pos.y - vistaMapa.topGlobal;

          if (
            x < -40 ||
            y < -40 ||
            x > dimensiones.ancho + 40 ||
            y > dimensiones.alto + 40
          ) {
            return null;
          }

          const activo = espacioSeleccionado?.id === e.id;

          return (
            <TouchableOpacity
              key={e.id}
              activeOpacity={0.85}
              onPress={() => setEspacioSeleccionado(e)}
              style={[
                styles.marcadorContenedor,
                {
                  left: x - (activo ? 20 : 17),
                  top: y - (activo ? 20 : 17),
                  zIndex: activo ? 30 : 10,
                },
              ]}
            >
              <View
                style={[
                  styles.marcador,
                  {
                    backgroundColor: activo ? '#16A34A' : colores.primario,
                    width: activo ? 40 : 34,
                    height: activo ? 40 : 34,
                    borderRadius: activo ? 20 : 17,
                  },
                ]}
              >
                <Icono nombre="football" tamano={activo ? 20 : 16} color="#FFFFFF" />
              </View>
            </TouchableOpacity>
          );
        })}

        {/* Atribución OpenStreetMap */}
        <View style={styles.atribucionCaja}>
          <Text style={styles.atribucionTexto}>© OpenStreetMap contributors</Text>
        </View>
      </View>

      {/* Banner superior con contador */}
      <View style={[styles.tarjetaFlotante, { backgroundColor: colores.tarjeta }]}>
        <Icono nombre="location-outline" tamano={18} color={colores.primario} />
        <Text style={[styles.textoFlotante, { color: colores.texto }]} numberOfLines={1}>
          {espacios.length} canchas municipales en Villaguay
        </Text>
        <TouchableOpacity
          style={[styles.botonCentrarChip, { backgroundColor: colores.chipFondo }]}
          onPress={centrarEnVillaguay}
        >
          <Text style={[styles.botonCentrarTexto, { color: colores.primario }]}>
            Centrar
          </Text>
        </TouchableOpacity>
      </View>

      {/* Controles flotantes de Zoom y GPS */}
      <View style={styles.controlesMapa}>
        <TouchableOpacity
          style={[styles.botonControl, { backgroundColor: colores.tarjeta, borderColor: colores.borde }]}
          onPress={() => setZoom((z) => Math.min(ZOOM_MAX, z + 1))}
          activeOpacity={0.8}
        >
          <Icono nombre="add" tamano={22} color={colores.texto} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.botonControl, { backgroundColor: colores.tarjeta, borderColor: colores.borde }]}
          onPress={() => setZoom((z) => Math.max(ZOOM_MIN, z - 1))}
          activeOpacity={0.8}
        >
          <Icono nombre="remove" tamano={22} color={colores.texto} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.botonControl, { backgroundColor: colores.tarjeta, borderColor: colores.borde }]}
          onPress={centrarEnMiUbicacion}
          activeOpacity={0.8}
        >
          <Icono nombre="navigate-outline" tamano={20} color={colores.primario} />
        </TouchableOpacity>
      </View>

      {/* Callout / Tarjeta de detalle de la cancha seleccionada */}
      {espacioSeleccionado && (
        <View
          style={[
            styles.calloutTarjeta,
            { backgroundColor: colores.tarjeta, borderColor: colores.borde },
          ]}
        >
          <View style={styles.calloutCabecera}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.calloutTitulo, { color: colores.texto }]}>
                {espacioSeleccionado.nombre}
              </Text>
              <Text style={[styles.calloutSubtitulo, { color: colores.textoSecundario }]}>
                {espacioSeleccionado.complejo} · {espacioSeleccionado.superficie}
              </Text>
              <Text style={[styles.calloutPrecio, { color: colores.primario }]}>
                ${espacioSeleccionado.precioPorHora.toLocaleString('es-AR')} / hora
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => setEspacioSeleccionado(null)}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Icono nombre="close" tamano={22} color={colores.textoSecundario} />
            </TouchableOpacity>
          </View>

          <View style={styles.calloutAcciones}>
            <TouchableOpacity
              style={[styles.botonMapsExterno, { borderColor: colores.borde }]}
              onPress={() => abrirEnGoogleMaps(espacioSeleccionado)}
            >
              <Icono nombre="navigate-outline" tamano={16} color={colores.primario} />
              <Text style={[styles.botonMapsTexto, { color: colores.primario }]}>
                Cómo llegar
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.botonVerTurnos, { backgroundColor: colores.primario }]}
              onPress={() => router.push(`/espacio/${espacioSeleccionado.id}`)}
            >
              <Text style={styles.botonVerTurnosTexto}>Ver Cancha y Turnos →</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Selector horizontal rápido de canchas */}
      <View
        style={[
          styles.barraCanchasInferior,
          { backgroundColor: colores.tarjeta, borderTopColor: colores.borde },
        ]}
      >
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollCanchas}
        >
          {espacios.map((e) => {
            const seleccionado = espacioSeleccionado?.id === e.id;
            return (
              <TouchableOpacity
                key={e.id}
                style={[
                  styles.chipCanchaMapa,
                  {
                    backgroundColor: seleccionado ? colores.primario : colores.chipFondo,
                    borderColor: seleccionado ? colores.primario : colores.borde,
                  },
                ]}
                onPress={() => seleccionarEspacio(e)}
              >
                <Icono
                  nombre="location"
                  tamano={14}
                  color={seleccionado ? '#FFFFFF' : colores.primario}
                />
                <Text
                  style={[
                    styles.chipCanchaTexto,
                    { color: seleccionado ? '#FFFFFF' : colores.texto },
                  ]}
                  numberOfLines={1}
                >
                  {e.nombre}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
  },
  lienzoMapa: {
    flex: 1,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#E2E8F0',
  },
  tile: {
    position: 'absolute',
    width: TILE_SIZE,
    height: TILE_SIZE,
  },
  marcadorContenedor: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  marcador: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2.5,
    borderColor: '#FFFFFF',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  puntoUsuarioHalo: {
    position: 'absolute',
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: 'rgba(2, 132, 199, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 20,
  },
  puntoUsuarioCentro: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#0284C7',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  atribucionCaja: {
    position: 'absolute',
    bottom: 6,
    right: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.78)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  atribucionTexto: {
    fontSize: 10,
    color: '#334155',
  },
  tarjetaFlotante: {
    position: 'absolute',
    top: 12,
    left: 12,
    right: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    gap: 8,
  },
  textoFlotante: {
    flex: 1,
    fontSize: 13,
    fontWeight: '600',
  },
  botonCentrarChip: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  botonCentrarTexto: {
    fontSize: 12,
    fontWeight: '700',
  },
  controlesMapa: {
    position: 'absolute',
    right: 12,
    top: 72,
    gap: 8,
  },
  botonControl: {
    width: 42,
    height: 42,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  calloutTarjeta: {
    position: 'absolute',
    left: 12,
    right: 12,
    bottom: 62,
    borderRadius: 16,
    borderWidth: 1,
    padding: 14,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  calloutCabecera: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 10,
  },
  calloutTitulo: {
    fontWeight: '800',
    fontSize: 16,
  },
  calloutSubtitulo: {
    fontSize: 12,
    marginTop: 2,
  },
  calloutPrecio: {
    fontSize: 15,
    fontWeight: '800',
    marginTop: 4,
  },
  calloutAcciones: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 12,
  },
  botonMapsExterno: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
    borderWidth: 1,
  },
  botonMapsTexto: {
    fontSize: 13,
    fontWeight: '700',
  },
  botonVerTurnos: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
  },
  botonVerTurnosTexto: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  barraCanchasInferior: {
    borderTopWidth: 1,
    paddingVertical: 10,
  },
  scrollCanchas: {
    paddingHorizontal: 12,
    gap: 8,
  },
  chipCanchaMapa: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 18,
    borderWidth: 1,
  },
  chipCanchaTexto: {
    fontSize: 12,
    fontWeight: '600',
  },
});
