// src/componentes/AvisoDeRed.tsx
// Aviso visual persistente en la parte superior cuando el teléfono está sin conexión a internet

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Network from 'expo-network';
import { Icono } from './Icono.js';

export const AvisoDeRed: React.FC = () => {
  const [estaConectado, setEstaConectado] = useState(true);

  useEffect(() => {
    let intervalo: ReturnType<typeof setInterval>;

    async function verificarConexion() {
      try {
        const estado = await Network.getNetworkStateAsync();
        setEstaConectado(Boolean(estado.isConnected && estado.isInternetReachable !== false));
      } catch {
        // En caso de no poder consultar, asumir conectado
        setEstaConectado(true);
      }
    }

    verificarConexion();
    intervalo = setInterval(verificarConexion, 5000);

    return () => clearInterval(intervalo);
  }, []);

  if (estaConectado) return null;

  return (
    <View style={styles.contenedor}>
      <Icono nombre="cloud-offline-outline" tamano={18} color="#FFFFFF" />
      <Text style={styles.texto}>
        Sin conexión. Mostrando datos y reservas guardadas sin internet.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: '#D97706',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    gap: 8,
  },
  texto: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
});
