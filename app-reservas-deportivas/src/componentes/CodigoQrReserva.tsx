// src/componentes/CodigoQrReserva.tsx
// Componente visual de código QR real (ISO/IEC 18004) para acceso al complejo deportivo (disponible 100% offline)

import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTema } from '../contexto/tema';
import { Icono } from './Icono';
import { generarMatrizQr } from '../utils/qr';

interface Props {
  codigoQr: string;
  espacioNombre?: string;
  fecha?: string;
  inicio?: string;
  estado: string;
}

export function CodigoQrReserva({
  codigoQr,
  espacioNombre,
  fecha,
  inicio,
  estado,
}: Props) {
  const { colores } = useTema();

  const esValido = estado === 'confirmada';
  const matriz = useMemo(() => generarMatrizQr(codigoQr), [codigoQr]);
  const tamanoModulo = Math.max(5, Math.floor(185 / matriz.length));

  return (
    <View
      style={[
        styles.contenedor,
        {
          backgroundColor: colores.tarjeta,
          borderColor: esValido ? colores.primario : colores.borde,
        },
      ]}
    >
      <View
        style={[
          styles.cabeceraEstado,
          {
            backgroundColor: esValido ? colores.primario : colores.chipFondo,
          },
        ]}
      >
        <Icono
          nombre={esValido ? 'checkmark-circle' : 'information-circle'}
          tamano={18}
          color={esValido ? '#FFFFFF' : colores.textoSecundario}
        />
        <Text
          style={[
            styles.textoEstado,
            { color: esValido ? '#FFFFFF' : colores.textoSecundario },
          ]}
        >
          {esValido
            ? 'PASE DE INGRESO HABILITADO'
            : `RESERVA ${estado.toUpperCase()}`}
        </Text>
      </View>

      <View style={styles.cuerpo}>
        {/* Matriz QR real ISO/IEC 18004 sobre fondo blanco con zona silenciosa (quiet zone) */}
        <View style={styles.cajaQrBlanca}>
          <View style={styles.qrMatriz}>
            {matriz.map((fila, rIdx) => (
              <View key={rIdx} style={styles.qrFila}>
                {fila.map((oscuro, cIdx) => (
                  <View
                    key={cIdx}
                    style={{
                      width: tamanoModulo,
                      height: tamanoModulo,
                      backgroundColor: oscuro ? '#000000' : '#FFFFFF',
                    }}
                  />
                ))}
              </View>
            ))}
          </View>
          <View style={styles.selloVillaguay}>
            <Text style={styles.selloTexto}>VILLAGUAY DEPORTES</Text>
          </View>
        </View>

        <Text style={[styles.codigoTexto, { color: colores.texto }]} selectable>
          {codigoQr}
        </Text>

        {espacioNombre && (
          <Text style={[styles.espacioTexto, { color: colores.primario }]}>
            {espacioNombre}
          </Text>
        )}

        {fecha && inicio && (
          <Text style={[styles.turnoTexto, { color: colores.textoSecundario }]}>
            Fecha: {fecha} • Horario: {inicio} hs
          </Text>
        )}

        <View
          style={[
            styles.notaOffline,
            { backgroundColor: colores.fondo, borderColor: colores.borde },
          ]}
        >
          <Icono nombre="cloud-done-outline" tamano={16} color={colores.exito} />
          <Text style={[styles.notaTexto, { color: colores.textoSecundario }]}>
            Disponible sin conexión a internet. Presentalo al encargado al llegar al predio.
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    borderRadius: 20,
    borderWidth: 2,
    overflow: 'hidden',
    marginVertical: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
  },
  cabeceraEstado: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    gap: 6,
  },
  textoEstado: {
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  cuerpo: {
    padding: 20,
    alignItems: 'center',
  },
  cajaQrBlanca: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 14,
  },
  qrMatriz: {
    backgroundColor: '#FFFFFF',
    padding: 8,
  },
  qrFila: {
    flexDirection: 'row',
  },
  selloVillaguay: {
    backgroundColor: '#047857',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 6,
    marginTop: 8,
  },
  selloTexto: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1,
  },
  codigoTexto: {
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 1.2,
    marginBottom: 6,
  },
  espacioTexto: {
    fontSize: 15,
    fontWeight: '700',
    textAlign: 'center',
  },
  turnoTexto: {
    fontSize: 13,
    marginTop: 4,
    marginBottom: 16,
  },
  notaOffline: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    gap: 8,
    marginTop: 4,
  },
  notaTexto: {
    fontSize: 11,
    flex: 1,
    lineHeight: 15,
  },
});
