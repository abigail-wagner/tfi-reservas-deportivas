// src/app/+not-found.tsx
// Pantalla de ruta no encontrada

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Link, Stack } from 'expo-router';
import { useTema } from '../contexto/tema.js';
import { Icono } from '../componentes/Icono.js';

export default function NoEncontradoPantalla() {
  const { colores } = useTema();

  return (
    <>
      <Stack.Screen options={{ title: 'No Encontrado' }} />
      <View style={[styles.contenedor, { backgroundColor: colores.fondo }]}>
        <Icono nombre="alert-circle-outline" tamano={64} color={colores.advertencia} />
        <Text style={[styles.titulo, { color: colores.texto }]}>Página no encontrada</Text>
        <Text style={[styles.subtitulo, { color: colores.textoSecundario }]}>
          La dirección a la que intentás acceder no existe o fue movida.
        </Text>
        <Link href="/(tabs)" asChild>
          <TouchableOpacity style={[styles.boton, { backgroundColor: colores.primario }]}>
            <Text style={styles.botonTexto}>Ir al Inicio</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    gap: 12,
  },
  titulo: {
    fontSize: 22,
    fontWeight: '800',
  },
  subtitulo: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 12,
  },
  boton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
  },
  botonTexto: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 15,
  },
});
