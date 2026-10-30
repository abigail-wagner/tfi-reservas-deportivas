// src/componentes/CodigoQrReserva.tsx
// Visualización del código QR y credencial de ingreso de la reserva (disponible 100% offline)

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTema } from '../contexto/tema';
import { Icono } from './Icono';

interface CodigoQrReservaProps {
  codigoQr: string;
  estado: string;
  espacioNombre?: string;
  fecha?: string;
  inicio?: string;
}

export const CodigoQrReserva: React.FC<CodigoQrReservaProps> = ({
  codigoQr,
  estado,
  espacioNombre,
  fecha,
  inicio,
}) => {
  const { colores } = useTema();

  const esValida = estado === 'confirmada';

  return (
    <View
      style={[
        styles.contenedor,
        {
          backgroundColor: colores.tarjeta,
          borderColor: colores.borde,
        },
      ]}
    >
      <View style={styles.marcoQr}>
        {/* Representación gráfica de QR vectorizada */}
        <View style={styles.cajaQr}>
          <Icono nombre="qr-code" tamano={160} color="#0F172A" />
        </View>
      </View>

      <Text style={[styles.codigoTexto, { color: colores.texto }]}>{codigoQr}</Text>

      {espacioNombre && (
        <Text style={[styles.espacioTexto, { color: colores.textoSecundario }]}>
          {espacioNombre} · {fecha} {inicio && `a las ${inicio}`}
        </Text>
      )}

      <View
        style={[
          styles.aviso,
          {
            backgroundColor: esValida ? colores.primarioClaro : colores.chipFondo,
          },
        ]}
      >
        <Icono
          nombre={esValida ? 'checkmark-circle-outline' : 'information-circle-outline'}
          tamano={16}
          color={esValida ? colores.primario : colores.textoSecundario}
        />
        <Text
          style={[
            styles.avisoTexto,
            { color: esValida ? colores.primario : colores.textoSecundario },
          ]}
        >
          {esValida
            ? 'Presentá este código en la entrada del complejo deportivo.'
            : `Reserva ${estado}. No válida para ingreso.`}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 20,
    alignItems: 'center',
    marginVertical: 12,
  },
  marcoQr: {
    padding: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  cajaQr: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  codigoTexto: {
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 1.5,
    marginTop: 16,
    fontVariant: ['tabular-nums'],
  },
  espacioTexto: {
    fontSize: 13,
    marginTop: 4,
  },
  aviso: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginTop: 16,
    width: '100%',
  },
  avisoTexto: {
    fontSize: 12,
    fontWeight: '600',
    flexShrink: 1,
  },
});
