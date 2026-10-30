// src/app/(tabs)/perfil.tsx
// Perfil de usuario, configuración de biometría, modo oscuro y selector rápido de cuentas demo

import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Switch,
  StyleSheet,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useTema } from '../../contexto/tema';
import { useSesion } from '../../contexto/sesion';
import { Icono } from '../../componentes/Icono';
import { USUARIOS_MOCK } from '../../mocks/datos';

export default function PerfilPantalla() {
  const router = useRouter();
  const { colores, esOscuro, preferencia, setPreferencia } = useTema();
  const {
    usuario,
    cerrarSesion,
    biometriaDisponible,
    biometriaHabilitada,
    setBiometriaHabilitada,
    iniciarSesion,
  } = useSesion();

  const handleCerrarSesion = () => {
    Alert.alert('Cerrar Sesión', '¿Deseás salir de tu cuenta?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Cerrar Sesión',
        style: 'destructive',
        onPress: async () => {
          await cerrarSesion();
          router.replace('/auth/ingreso');
        },
      },
    ]);
  };

  const handleCambiarCuentaDemo = async (email: string) => {
    try {
      await iniciarSesion(email, 'villaguay2026');
      Alert.alert('Sesión cambiada', `Iniciaste como ${email}`);
    } catch {
      //
    }
  };

  return (
    <ScrollView style={[styles.contenedor, { backgroundColor: colores.fondo }]}>
      {/* Tarjeta de usuario */}
      <View
        style={[
          styles.tarjetaPerfil,
          { backgroundColor: colores.tarjeta, borderColor: colores.borde },
        ]}
      >
        <View style={[styles.avatar, { backgroundColor: colores.primario }]}>
          <Text style={styles.avatarTexto}>
            {usuario?.nombre?.substring(0, 2).toUpperCase() || 'VG'}
          </Text>
        </View>

        <Text style={[styles.nombre, { color: colores.texto }]}>
          {usuario?.nombre || 'Emiliano Ruiz'}
        </Text>
        <Text style={[styles.email, { color: colores.textoSecundario }]}>
          {usuario?.email || 'emiliano@mail.com'}
        </Text>

        <View style={styles.estadisticasFila}>
          <View style={styles.statItem}>
            <Text style={[styles.statValor, { color: colores.primario }]}>
              {usuario?.espaciosFavoritos?.length || 0}
            </Text>
            <Text style={[styles.statLabel, { color: colores.textoSecundario }]}>
              Favoritos
            </Text>
          </View>

          <View style={styles.statItem}>
            <Text
              style={[
                styles.statValor,
                {
                  color:
                    (usuario?.cancelacionesTardias || 0) > 0
                      ? colores.advertencia
                      : colores.exito,
                },
              ]}
            >
              {usuario?.cancelacionesTardias || 0}
            </Text>
            <Text style={[styles.statLabel, { color: colores.textoSecundario }]}>
              Canc. Tardías
            </Text>
          </View>

          <View style={styles.statItem}>
            <Text
              style={[
                styles.statValor,
                {
                  color:
                    (usuario?.ausencias || 0) > 0
                      ? colores.peligro
                      : colores.exito,
                },
              ]}
            >
              {usuario?.ausencias || 0}
            </Text>
            <Text style={[styles.statLabel, { color: colores.textoSecundario }]}>
              Ausencias
            </Text>
          </View>
        </View>
      </View>

      {/* Ajustes y Preferencias */}
      <Text style={[styles.seccionTitulo, { color: colores.textoSecundario }]}>
        Preferencias de la Aplicación
      </Text>

      <View
        style={[
          styles.seccionAjustes,
          { backgroundColor: colores.tarjeta, borderColor: colores.borde },
        ]}
      >
        {/* Switch de Biometría */}
        {biometriaDisponible && (
          <View style={[styles.filaAjuste, { borderBottomColor: colores.borde }]}>
            <View style={styles.ajusteIconoTexto}>
              <Icono nombre="finger-print-outline" tamano={22} color={colores.primario} />
              <View>
                <Text style={[styles.ajusteTitulo, { color: colores.texto }]}>
                  Ingreso con Biometría
                </Text>
                <Text style={[styles.ajusteSub, { color: colores.textoSecundario }]}>
                  Huella dactilar o Face ID
                </Text>
              </View>
            </View>
            <Switch
              value={biometriaHabilitada}
              onValueChange={setBiometriaHabilitada}
              trackColor={{ false: '#CBD5E1', true: colores.primario }}
            />
          </View>
        )}

        {/* Switch Modo Oscuro */}
        <View style={styles.filaAjuste}>
          <View style={styles.ajusteIconoTexto}>
            <Icono
              nombre={esOscuro ? 'moon' : 'sunny-outline'}
              tamano={22}
              color={esOscuro ? colores.primario : colores.advertencia}
            />
            <View>
              <Text style={[styles.ajusteTitulo, { color: colores.texto }]}>Modo Oscuro</Text>
              <Text style={[styles.ajusteSub, { color: colores.textoSecundario }]}>
                Tema visual de la interfaz
              </Text>
            </View>
          </View>
          <Switch
            value={esOscuro}
            onValueChange={(activo) => setPreferencia(activo ? 'oscuro' : 'claro')}
            trackColor={{ false: '#CBD5E1', true: colores.primario }}
          />
        </View>
      </View>

      {/* Cuentas Demo para Evaluación de Cátedra */}
      <Text style={[styles.seccionTitulo, { color: colores.textoSecundario }]}>
        Cuentas Demo de Cátedra
      </Text>
      <View
        style={[
          styles.seccionAjustes,
          { backgroundColor: colores.tarjeta, borderColor: colores.borde },
        ]}
      >
        {USUARIOS_MOCK.map((u) => {
          const esActual = usuario?.id === u.id;
          return (
            <TouchableOpacity
              key={u.id}
              style={[
                styles.filaDemo,
                { borderBottomColor: colores.borde },
                esActual && { backgroundColor: colores.primarioClaro },
              ]}
              onPress={() => handleCambiarCuentaDemo(u.email)}
            >
              <View style={{ flex: 1 }}>
                <Text
                  style={[
                    styles.demoNombre,
                    { color: esActual ? colores.primario : colores.texto },
                  ]}
                >
                  {u.nombre}
                </Text>
                <Text style={[styles.demoEmail, { color: colores.textoSecundario }]}>
                  {u.email} · Rol: {u.rol.toUpperCase()}
                </Text>
              </View>
              {esActual && (
                <Icono nombre="checkmark-circle" tamano={20} color={colores.primario} />
              )}
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Botón Salir */}
      <TouchableOpacity
        style={[styles.botonCerrarSesion, { borderColor: colores.peligro }]}
        onPress={handleCerrarSesion}
      >
        <Icono nombre="log-out-outline" tamano={20} color={colores.peligro} />
        <Text style={[styles.botonCerrarTexto, { color: colores.peligro }]}>
          Cerrar Sesión
        </Text>
      </TouchableOpacity>

      <Text style={[styles.versionTexto, { color: colores.textoSecundario }]}>
        Reservas Deportivas Villaguay v1.0.0 · UNER 2026
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    padding: 16,
  },
  tarjetaPerfil: {
    alignItems: 'center',
    padding: 24,
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 20,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  avatarTexto: {
    fontSize: 26,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  nombre: {
    fontSize: 20,
    fontWeight: '800',
  },
  email: {
    fontSize: 13,
    marginTop: 2,
  },
  estadisticasFila: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    marginTop: 20,
    paddingTop: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#E2E8F0',
  },
  statItem: {
    alignItems: 'center',
  },
  statValor: {
    fontSize: 18,
    fontWeight: '800',
  },
  statLabel: {
    fontSize: 11,
    marginTop: 2,
  },
  seccionTitulo: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 10,
    marginLeft: 4,
  },
  seccionAjustes: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
    marginBottom: 20,
  },
  filaAjuste: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  ajusteIconoTexto: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  ajusteTitulo: {
    fontSize: 15,
    fontWeight: '600',
  },
  ajusteSub: {
    fontSize: 12,
    marginTop: 1,
  },
  filaDemo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  demoNombre: {
    fontSize: 14,
    fontWeight: '700',
  },
  demoEmail: {
    fontSize: 12,
    marginTop: 1,
  },
  botonCerrarSesion: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1.5,
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 8,
    marginBottom: 16,
  },
  botonCerrarTexto: {
    fontSize: 15,
    fontWeight: '700',
  },
  versionTexto: {
    textAlign: 'center',
    fontSize: 11,
    marginBottom: 32,
  },
});
