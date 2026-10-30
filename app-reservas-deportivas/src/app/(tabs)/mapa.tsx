// src/app/(tabs)/mapa.tsx
// Mapa interactivo de los complejos deportivos en Villaguay con react-native-maps

import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { useRouter } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import { useTema } from '../../contexto/tema';
import { ServicioReservas } from '../../servicios/reservas';
import { RepositorioOffline } from '../../db/repositorio-offline';
import { Icono } from '../../componentes/Icono';
import type { Espacio } from '../../tipos/index';

// Coordenadas centrales de la ciudad de Villaguay, Entre Ríos
const VILLAGUAY_CENTRO = {
  latitude: -31.865,
  longitude: -59.027,
  latitudeDelta: 0.045,
  longitudeDelta: 0.045,
};

export default function MapaPantalla() {
  const router = useRouter();
  const db = useSQLiteContext();
  const { colores } = useTema();

  const repo = useMemo(() => new RepositorioOffline(db), [db]);
  const servicio = useMemo(() => new ServicioReservas(repo), [repo]);

  const [espacios, setEspacios] = useState<Espacio[]>([]);

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

  return (
    <View style={styles.contenedor}>
      <MapView
        style={styles.mapa}
        initialRegion={VILLAGUAY_CENTRO}
        showsUserLocation
        showsMyLocationButton
      >
        {espacios.map((e) => (
          <Marker
            key={e.id}
            coordinate={{
              latitude: e.coordenadas.latitud,
              longitude: e.coordenadas.longitud,
            }}
            title={e.nombre}
            description={`${e.complejo} · $${e.precioPorHora.toLocaleString('es-AR')}/h`}
          >
            <View style={[styles.marcador, { backgroundColor: colores.primario }]}>
              <Icono nombre="football" tamano={16} color="#FFFFFF" />
            </View>
            <Callout onPress={() => router.push(`/espacio/${e.id}`)}>
              <View style={styles.callout}>
                <Text style={styles.calloutTitulo}>{e.nombre}</Text>
                <Text style={styles.calloutSubtitulo}>{e.complejo}</Text>
                <Text style={styles.calloutSuperficie}>{e.superficie}</Text>
                <Text style={styles.calloutPrecio}>
                  ${e.precioPorHora.toLocaleString('es-AR')} / h
                </Text>
                <View style={styles.calloutBoton}>
                  <Text style={styles.calloutBotonTexto}>Ver Cancha y Turnos →</Text>
                </View>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>

      <View style={[styles.tarjetaFlotante, { backgroundColor: colores.tarjeta }]}>
        <Icono nombre="location-outline" tamano={18} color={colores.primario} />
        <Text style={[styles.textoFlotante, { color: colores.texto }]}>
          {espacios.length} canchas municipales en Villaguay
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
  },
  mapa: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  marcador: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  callout: {
    padding: 10,
    width: 200,
  },
  calloutTitulo: {
    fontWeight: '700',
    fontSize: 14,
  },
  calloutSubtitulo: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  calloutSuperficie: {
    fontSize: 11,
    color: '#0284C7',
    fontWeight: '600',
    marginTop: 2,
  },
  calloutPrecio: {
    fontSize: 13,
    fontWeight: '700',
    marginTop: 4,
  },
  calloutBoton: {
    marginTop: 6,
    paddingTop: 4,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#E2E8F0',
  },
  calloutBotonTexto: {
    fontSize: 11,
    color: '#0284C7',
    fontWeight: '700',
  },
  tarjetaFlotante: {
    position: 'absolute',
    top: 16,
    left: 16,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    gap: 8,
  },
  textoFlotante: {
    fontSize: 13,
    fontWeight: '600',
  },
});
