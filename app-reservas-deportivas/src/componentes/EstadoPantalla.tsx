// src/componentes/EstadoPantalla.tsx
// Componente unificado para estados de carga, error y lista vacía

import React from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native';
import { useTema } from '../contexto/tema';
import { Icono } from './Icono';

interface EstadoPantallaProps {
  cargando?: boolean;
  mensajeCarga?: string;
  error?: string | null;
  onReintentar?: () => void;
  vacio?: boolean;
  mensajeVacio?: string;
  iconoVacio?: string;
  children?: React.ReactNode;
}

export const EstadoPantalla: React.FC<EstadoPantallaProps> = ({
  cargando,
  mensajeCarga = 'Cargando información...',
  error,
  onReintentar,
  vacio,
  mensajeVacio = 'No hay elementos para mostrar',
  iconoVacio = 'file-tray-outline',
  children,
}) => {
  const { colores } = useTema();

  if (cargando) {
    return (
      <View style={[styles.centrado, { backgroundColor: colores.fondo }]}>
        <ActivityIndicator size="large" color={colores.primario} />
        <Text style={[styles.texto, { color: colores.textoSecundario, marginTop: 12 }]}>
          {mensajeCarga}
        </Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.centrado, { backgroundColor: colores.fondo }]}>
        <Icono nombre="alert-circle-outline" tamano={56} color={colores.peligro} />
        <Text style={[styles.titulo, { color: colores.texto, marginTop: 12 }]}>
          Algo no salió bien
        </Text>
        <Text style={[styles.subtitulo, { color: colores.textoSecundario, marginTop: 6 }]}>
          {error}
        </Text>
        {onReintentar && (
          <TouchableOpacity
            style={[styles.botonReintentar, { backgroundColor: colores.primario, marginTop: 16 }]}
            onPress={onReintentar}
            activeOpacity={0.8}
          >
            <Icono nombre="reload" tamano={18} color="#FFFFFF" />
            <Text style={styles.botonTexto}>Reintentar</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }

  if (vacio) {
    return (
      <View style={[styles.centrado, { backgroundColor: colores.fondo }]}>
        <Icono nombre={iconoVacio} tamano={56} color={colores.textoSecundario} />
        <Text style={[styles.subtitulo, { color: colores.textoSecundario, marginTop: 12 }]}>
          {mensajeVacio}
        </Text>
      </View>
    );
  }

  return <>{children}</>;
};

const styles = StyleSheet.create({
  centrado: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  titulo: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  subtitulo: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  texto: {
    fontSize: 14,
  },
  botonReintentar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  botonTexto: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 15,
  },
});
