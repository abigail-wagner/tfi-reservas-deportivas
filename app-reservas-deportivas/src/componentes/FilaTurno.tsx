// src/componentes/FilaTurno.tsx
// Fila interactiva para la grilla de turnos con indicación semántica de estado

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTema } from '../contexto/tema.js';
import { Icono } from './Icono.js';
import type { Turno } from '../tipos/index.js';

interface FilaTurnoProps {
  turno: Turno;
  onSeleccionar: (turno: Turno) => void;
}

export const FilaTurno: React.FC<FilaTurnoProps> = ({ turno, onSeleccionar }) => {
  const { colores } = useTema();

  const esLibre = turno.estado === 'libre';

  const obtenerEtiquetaEstado = () => {
    switch (turno.estado) {
      case 'libre':
        return { texto: 'Disponible', color: colores.exito, fondo: colores.grillaLibre };
      case 'reservado':
        return { texto: 'Ocupado', color: colores.peligro, fondo: colores.grillaReservado };
      case 'fijo':
        return { texto: 'Fijo Semanal', color: colores.advertencia, fondo: colores.grillaFijo };
      case 'mantenimiento':
        return {
          texto: turno.motivoBloqueo || 'No disponible',
          color: colores.textoSecundario,
          fondo: colores.grillaMantenimiento,
        };
    }
  };

  const estadoInfo = obtenerEtiquetaEstado();

  return (
    <TouchableOpacity
      style={[
        styles.contenedor,
        {
          backgroundColor: colores.tarjeta,
          borderColor: esLibre ? colores.primario : colores.borde,
          opacity: esLibre ? 1 : 0.85,
        },
      ]}
      onPress={() => esLibre && onSeleccionar(turno)}
      disabled={!esLibre}
      activeOpacity={0.8}
    >
      <View style={styles.columnaHora}>
        <Text style={[styles.horaInicio, { color: colores.texto }]}>{turno.inicio}</Text>
        <Text style={[styles.horaFin, { color: colores.textoSecundario }]}>hasta {turno.fin}</Text>
      </View>

      <View style={[styles.badgeEstado, { backgroundColor: estadoInfo.fondo }]}>
        <View style={[styles.puntoEstado, { backgroundColor: estadoInfo.color }]} />
        <Text style={[styles.textoEstado, { color: estadoInfo.color }]} numberOfLines={1}>
          {estadoInfo.texto}
        </Text>
      </View>

      <View style={styles.columnaAccion}>
        {esLibre ? (
          <View style={[styles.botonReservar, { backgroundColor: colores.primario }]}>
            <Text style={styles.botonTexto}>Reservar</Text>
            <Icono nombre="chevron-forward" tamano={16} color="#FFFFFF" />
          </View>
        ) : (
          <Text style={[styles.precioDeshabilitado, { color: colores.textoSecundario }]}>
            ${turno.precio.toLocaleString('es-AR')}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 8,
  },
  columnaHora: {
    width: 75,
  },
  horaInicio: {
    fontSize: 16,
    fontWeight: '700',
  },
  horaFin: {
    fontSize: 11,
    marginTop: 1,
  },
  badgeEstado: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginHorizontal: 8,
  },
  puntoEstado: {
    width: 7,
    height: 7,
    borderRadius: 4,
  },
  textoEstado: {
    fontSize: 12,
    fontWeight: '600',
    flexShrink: 1,
  },
  columnaAccion: {
    alignItems: 'flex-end',
  },
  botonReservar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  botonTexto: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  precioDeshabilitado: {
    fontSize: 13,
    fontWeight: '500',
  },
});
