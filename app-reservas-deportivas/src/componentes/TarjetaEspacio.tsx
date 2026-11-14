// src/componentes/TarjetaEspacio.tsx
// Tarjeta de espacio deportivo con imagen optimizada, insignias de equipamiento y botón de favoritos

import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import * as Haptics from 'expo-haptics';
import { useTema } from '../contexto/tema';
import { useSesion } from '../contexto/sesion';
import { normalizarUrlImagen } from '../api/cliente';
import { ESPACIOS_MOCK } from '../mocks/datos';
import { Icono } from './Icono';
import { formatearDistancia } from '../utils/distancia';
import type { Espacio } from '../tipos/index';

interface TarjetaEspacioProps {
  espacio: Espacio;
  distanciaKm?: number | null;
  onPress: () => void;
}

const IMAGEN_RESPALDO_GENERAL =
  'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80';

export const TarjetaEspacio: React.FC<TarjetaEspacioProps> = ({
  espacio,
  distanciaKm,
  onPress,
}) => {
  const { colores } = useTema();
  const { usuario, alternarFavorito } = useSesion();
  const [falloImagen, setFalloImagen] = useState(false);

  const esFavorito = usuario?.espaciosFavoritos?.includes(espacio.id) ?? false;
  const imagenRespaldo =
    ESPACIOS_MOCK.find((m) => m.id === espacio.id)?.imagenes[0] || IMAGEN_RESPALDO_GENERAL;
  const urlPrimaria = normalizarUrlImagen(espacio.imagenes?.[0]);
  const imagenUrl = !falloImagen && urlPrimaria ? urlPrimaria : imagenRespaldo;

  useEffect(() => {
    setFalloImagen(false);
  }, [urlPrimaria]);

  const handleFavoritoPress = async (e: any) => {
    e.stopPropagation();
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    await alternarFavorito(espacio.id);
  };

  return (
    <TouchableOpacity
      style={[
        styles.tarjeta,
        {
          backgroundColor: colores.tarjeta,
          borderColor: colores.borde,
        },
      ]}
      onPress={onPress}
      activeOpacity={0.88}
    >
      <View style={[styles.imagenContenedor, { backgroundColor: colores.chipFondo }]}>
        <Image
          source={{ uri: imagenUrl }}
          style={styles.imagen}
          resizeMode="cover"
          onError={() => setFalloImagen(true)}
        />
        <TouchableOpacity
          style={[styles.botonFavorito, { backgroundColor: colores.tarjeta }]}
          onPress={handleFavoritoPress}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Icono
            nombre={esFavorito ? 'heart' : 'heart-outline'}
            tamano={22}
            color={esFavorito ? colores.peligro : colores.textoSecundario}
          />
        </TouchableOpacity>
        {distanciaKm !== undefined && distanciaKm !== null && (
          <View style={styles.badgeDistancia}>
            <Icono nombre="navigate-outline" tamano={12} color="#FFFFFF" />
            <Text style={styles.distanciaTexto}>{formatearDistancia(distanciaKm)}</Text>
          </View>
        )}
      </View>

      <View style={styles.contenido}>
        <Text style={[styles.titulo, { color: colores.texto }]} numberOfLines={1}>
          {espacio.nombre}
        </Text>
        <Text style={[styles.complejo, { color: colores.textoSecundario }]} numberOfLines={1}>
          {espacio.complejo}
        </Text>

        <View style={styles.insigniasFila}>
          <View style={[styles.insignia, { backgroundColor: colores.chipFondo }]}>
            <Text style={[styles.insigniaTexto, { color: colores.chipTexto }]}>
              {espacio.superficie}
            </Text>
          </View>
          {espacio.techado && (
            <View style={[styles.insignia, { backgroundColor: colores.primarioClaro }]}>
              <Icono nombre="umbrella-outline" tamano={12} color={colores.primario} />
              <Text style={[styles.insigniaTexto, { color: colores.primario }]}>Techado</Text>
            </View>
          )}
          {espacio.iluminacion && (
            <View style={[styles.insignia, { backgroundColor: colores.chipFondo }]}>
              <Icono nombre="sunny-outline" tamano={12} color={colores.advertencia} />
              <Text style={[styles.insigniaTexto, { color: colores.chipTexto }]}>Con Luz</Text>
            </View>
          )}
        </View>

        <View style={styles.pieFila}>
          <Text style={[styles.precio, { color: colores.primario }]}>
            ${espacio.precioPorHora.toLocaleString('es-AR')}{' '}
            <Text style={[styles.precioHora, { color: colores.textoSecundario }]}>/ hora</Text>
          </Text>
          <View style={styles.capacidad}>
            <Icono nombre="people-outline" tamano={14} color={colores.textoSecundario} />
            <Text style={[styles.capacidadTexto, { color: colores.textoSecundario }]}>
              Hasta {espacio.capacidad}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  tarjeta: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
  },
  imagenContenedor: {
    height: 160,
    width: '100%',
    position: 'relative',
  },
  imagen: {
    width: '100%',
    height: '100%',
  },
  botonFavorito: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  badgeDistancia: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.72)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    gap: 4,
  },
  distanciaTexto: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  contenido: {
    padding: 14,
  },
  titulo: {
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  complejo: {
    fontSize: 13,
    marginTop: 2,
  },
  insigniasFila: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 10,
    marginBottom: 12,
  },
  insignia: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  insigniaTexto: {
    fontSize: 11,
    fontWeight: '600',
  },
  pieFila: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#E2E8F0',
    paddingTop: 10,
  },
  precio: {
    fontSize: 16,
    fontWeight: '700',
  },
  precioHora: {
    fontSize: 12,
    fontWeight: '400',
  },
  capacidad: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  capacidadTexto: {
    fontSize: 12,
  },
});
