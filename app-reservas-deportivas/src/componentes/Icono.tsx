// src/componentes/Icono.tsx
// Wrapper estandarizado para íconos usando @react-native-vector-icons/ionicons

import React from 'react';
import Ionicons from '@react-native-vector-icons/ionicons';

export interface IconoProps {
  nombre: string;
  tamano?: number;
  color?: any;
  style?: any;
}

export const Icono: React.FC<IconoProps> = ({
  nombre,
  tamano = 24,
  color = '#000000',
  style,
}) => {
  // @ts-expect-error glyphMap dinámico de Ionicons
  return <Ionicons name={nombre} size={tamano} color={color ?? '#000000'} style={style} />;
};
