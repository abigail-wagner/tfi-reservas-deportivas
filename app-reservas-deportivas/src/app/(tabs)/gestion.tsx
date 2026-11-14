// src/app/(tabs)/gestion.tsx
// Panel de control para personal del complejo municipal: escaneo de QR, bloqueos por lluvia y reservas fijas

import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useRouter, Redirect } from 'expo-router';
import { useTema } from '../../contexto/tema';
import { useSesion } from '../../contexto/sesion';
import { Icono } from '../../componentes/Icono';

export default function GestionPantalla() {
  const router = useRouter();
  const { colores } = useTema();
  const { usuario } = useSesion();

  const esPersonal = usuario?.rol === 'encargado' || usuario?.rol === 'administrador';
  const esAdmin = usuario?.rol === 'administrador';

  if (!esPersonal) {
    return <Redirect href="/(tabs)" />;
  }

  return (
    <ScrollView style={[styles.contenedor, { backgroundColor: colores.fondo }]}>
      {/* Banner de estado del rol */}
      <View
        style={[
          styles.tarjetaRol,
          {
            backgroundColor: colores.tarjeta,
            borderColor: colores.borde,
          },
        ]}
      >
        <View style={[styles.iconoRol, { backgroundColor: colores.primarioClaro }]}>
          <Icono nombre="shield-checkmark" tamano={28} color={colores.primario} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={[styles.nombreUsuario, { color: colores.texto }]}>
            {usuario?.nombre || 'Usuario Municipal'}
          </Text>
          <Text style={[styles.rolBadge, { color: colores.primario }]}>
            ROL: {(usuario?.rol || 'JUGADOR').toUpperCase()}
          </Text>
        </View>
      </View>

      {!esPersonal && (
        <View
          style={[
            styles.avisoRol,
            { backgroundColor: colores.chipFondo, borderColor: colores.borde },
          ]}
        >
          <Icono nombre="information-circle-outline" tamano={20} color={colores.advertencia} />
          <Text style={[styles.avisoTexto, { color: colores.texto }]}>
            Estás explorando con rol de Jugador. Podés probar las herramientas de encargado
            seleccionando el usuario demo de Marcelo Godoy en Perfil.
          </Text>
        </View>
      )}

      <Text style={[styles.seccionTitulo, { color: colores.textoSecundario }]}>
        Herramientas de Encargado
      </Text>

      {/* Botón Principal: Escanear QR */}
      <TouchableOpacity
        style={[styles.botonDestacado, { backgroundColor: colores.primario }]}
        onPress={() => router.push('/encargado/escanear')}
        activeOpacity={0.85}
      >
        <View style={styles.iconoBotonCirculo}>
          <Icono nombre="qr-code-outline" tamano={28} color="#FFFFFF" />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.botonDestacadoTitulo}>Escanear QR de Ingreso</Text>
          <Text style={styles.botonDestacadoSub}>
            Validar el acceso de jugadores en la puerta con la cámara del celular.
          </Text>
        </View>
        <Icono nombre="chevron-forward" tamano={22} color="#FFFFFF" />
      </TouchableOpacity>

      {/* Tarjeta de Bloqueos por Lluvia o Mantenimiento */}
      <TouchableOpacity
        style={[
          styles.tarjetaOpcion,
          { backgroundColor: colores.tarjeta, borderColor: colores.borde },
        ]}
        onPress={() => router.push('/encargado/bloqueos')}
        activeOpacity={0.8}
      >
        <View style={[styles.iconoOpcion, { backgroundColor: '#FEF3C7' }]}>
          <Icono nombre="rainy-outline" tamano={24} color="#D97706" />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={[styles.opcionTitulo, { color: colores.texto }]}>
            Bloqueos por Lluvia y Arreglos
          </Text>
          <Text style={[styles.opcionSub, { color: colores.textoSecundario }]}>
            Inhabilitar canchas anegadas o en reparación con foto de evidencia.
          </Text>
        </View>
        <Icono nombre="chevron-forward" tamano={20} color={colores.textoSecundario} />
      </TouchableOpacity>

      {/* Tarjeta de Reservas Fijas Semanales */}
      <TouchableOpacity
        style={[
          styles.tarjetaOpcion,
          { backgroundColor: colores.tarjeta, borderColor: colores.borde },
        ]}
        onPress={() => router.push('/encargado/fijas')}
        activeOpacity={0.8}
      >
        <View style={[styles.iconoOpcion, { backgroundColor: '#E0F2FE' }]}>
          <Icono nombre="repeat-outline" tamano={24} color="#0284C7" />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={[styles.opcionTitulo, { color: colores.texto }]}>
            Reservas Fijas Semanales
          </Text>
          <Text style={[styles.opcionSub, { color: colores.textoSecundario }]}>
            {esAdmin
              ? 'Asignar horarios fijos recurrentes a torneos, veteranos y escuelitas.'
              : 'Visualizar horarios fijos existentes de torneos, veteranos y escuelitas.'}
          </Text>
        </View>
        <Icono nombre="chevron-forward" tamano={20} color={colores.textoSecundario} />
      </TouchableOpacity>

      {/* Tarjeta de Actualizar Tarifas (exclusivo Administrador) */}
      {esAdmin && (
        <TouchableOpacity
          style={[
            styles.tarjetaOpcion,
            { backgroundColor: colores.tarjeta, borderColor: colores.borde },
          ]}
          onPress={() => router.push('/encargado/precio')}
          activeOpacity={0.8}
        >
          <View style={[styles.iconoOpcion, { backgroundColor: '#DCFCE7' }]}>
            <Icono nombre="pricetag-outline" tamano={24} color="#16A34A" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[styles.opcionTitulo, { color: colores.texto }]}>
              Actualizar Tarifas por Hora
            </Text>
            <Text style={[styles.opcionSub, { color: colores.textoSecundario }]}>
              Configurar precios de alquiler para los 11 espacios deportivos.
            </Text>
          </View>
          <Icono nombre="chevron-forward" tamano={20} color={colores.textoSecundario} />
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    padding: 16,
  },
  tarjetaRol: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    gap: 14,
    marginBottom: 16,
  },
  iconoRol: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nombreUsuario: {
    fontSize: 17,
    fontWeight: '700',
  },
  rolBadge: {
    fontSize: 12,
    fontWeight: '800',
    marginTop: 2,
    letterSpacing: 0.5,
  },
  avisoRol: {
    flexDirection: 'row',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    gap: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  avisoTexto: {
    fontSize: 12,
    lineHeight: 18,
    flex: 1,
  },
  seccionTitulo: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  botonDestacado: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
    borderRadius: 16,
    gap: 14,
    marginBottom: 14,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  iconoBotonCirculo: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  botonDestacadoTitulo: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '800',
  },
  botonDestacadoSub: {
    color: 'rgba(255, 255, 255, 0.85)',
    fontSize: 12,
    marginTop: 2,
    lineHeight: 16,
  },
  tarjetaOpcion: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    gap: 14,
    marginBottom: 12,
  },
  iconoOpcion: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  opcionTitulo: {
    fontSize: 15,
    fontWeight: '700',
  },
  opcionSub: {
    fontSize: 12,
    marginTop: 2,
    lineHeight: 16,
  },
});
