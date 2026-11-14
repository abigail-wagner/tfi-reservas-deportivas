// src/componentes/ReproductorCancha.tsx
// Reproductor de video de la cancha usando la API moderna expo-video (useVideoPlayer y VideoView)

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useVideoPlayer, VideoView } from 'expo-video';
import { useTema } from '../contexto/tema';
import { Icono } from './Icono';

interface ReproductorCanchaProps {
  videoUrl: string | null;
}

const ReproductorActivo: React.FC<{ url: string }> = ({ url }) => {
  const player = useVideoPlayer(url, (p) => {
    p.loop = true;
    p.muted = true;
  });

  return (
    <View style={styles.contenedor}>
      <VideoView
        style={styles.video}
        player={player}
        nativeControls={true}
        contentFit="cover"
      />
    </View>
  );
};

export const ReproductorCancha: React.FC<ReproductorCanchaProps> = ({ videoUrl }) => {
  const { colores } = useTema();

  if (!videoUrl) {
    return (
      <View
        style={[
          styles.contenedorVacio,
          { backgroundColor: colores.chipFondo, borderColor: colores.borde },
        ]}
      >
        <Icono nombre="videocam-off-outline" tamano={32} color={colores.textoSecundario} />
        <Text style={[styles.textoVacio, { color: colores.textoSecundario }]}>
          Este espacio no cuenta con video demostrativo.
        </Text>
      </View>
    );
  }

  return <ReproductorActivo url={videoUrl} />;
};

const styles = StyleSheet.create({
  contenedor: {
    width: '100%',
    height: 220,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#000000',
    marginBottom: 16,
  },
  video: {
    width: '100%',
    height: '100%',
  },
  contenedorVacio: {
    width: '100%',
    height: 120,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    gap: 8,
    marginBottom: 16,
  },
  textoVacio: {
    fontSize: 13,
    textAlign: 'center',
  },
});
