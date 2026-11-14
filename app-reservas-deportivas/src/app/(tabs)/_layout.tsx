// src/app/(tabs)/_layout.tsx
// Navegación de pestañas inferiores para la app móvil

import React from 'react';
import { Platform } from 'react-native';
import { Tabs } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTema } from '../../contexto/tema';
import { useSesion } from '../../contexto/sesion';
import { Icono } from '../../componentes/Icono';

export default function LayoutPestanas() {
  const { colores } = useTema();
  const { usuario } = useSesion();
  const insets = useSafeAreaInsets();

  const puedeVerGestion =
    usuario?.rol === 'encargado' || usuario?.rol === 'administrador';

  // En Android con barra de navegación por software (3 botones o barra de gestos),
  // la barra nativa del sistema operativo ocupa entre 48dp y 54dp de la parte inferior.
  // Aseguramos un padding inferior robusto para que la barra de pestañas y sus iconos
  // queden completamente por encima y nunca tapados por los controles del dispositivo.
  const esAndroid = Platform.OS === 'android';
  const esAndroidWeb =
    Platform.OS === 'web' &&
    typeof navigator !== 'undefined' &&
    /android/i.test(navigator.userAgent);
  const esDispositivoAndroid = esAndroid || esAndroidWeb;

  const baseInferiorAndroid = Math.max(insets.bottom, 48);
  const paddingInferior = esDispositivoAndroid
    ? baseInferiorAndroid + 12
    : (insets.bottom > 0 ? insets.bottom + 8 : 12);

  const alturaTabBar = 60 + paddingInferior;

  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: colores.tarjeta },
        headerTintColor: colores.texto,
        headerTitleStyle: { fontWeight: '700', fontSize: 18 },
        headerShadowVisible: false,
        tabBarStyle: {
          backgroundColor: colores.tarjeta,
          borderTopColor: colores.borde,
          height: alturaTabBar,
          paddingBottom: paddingInferior,
          paddingTop: 8,
        },
        tabBarActiveTintColor: colores.primario,
        tabBarInactiveTintColor: colores.textoSecundario,
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Canchas',
          tabBarLabel: 'Canchas',
          tabBarIcon: ({ color, focused }) => (
            <Icono
              nombre={focused ? 'football' : 'football-outline'}
              tamano={22}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="mapa"
        options={{
          title: 'Mapa Villaguay',
          tabBarLabel: 'Mapa',
          tabBarIcon: ({ color, focused }) => (
            <Icono
              nombre={focused ? 'map' : 'map-outline'}
              tamano={22}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="mis-reservas"
        options={{
          title: 'Mis Reservas',
          tabBarLabel: 'Reservas',
          tabBarIcon: ({ color, focused }) => (
            <Icono
              nombre={focused ? 'calendar' : 'calendar-outline'}
              tamano={22}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="gestion"
        options={{
          href: puedeVerGestion ? undefined : null,
          title: 'Gestión',
          tabBarLabel: 'Gestión',
          tabBarIcon: ({ color, focused }) => (
            <Icono
              nombre={focused ? 'clipboard' : 'clipboard-outline'}
              tamano={22}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="perfil"
        options={{
          title: 'Mi Perfil',
          tabBarLabel: 'Perfil',
          tabBarIcon: ({ color, focused }) => (
            <Icono
              nombre={focused ? 'person' : 'person-outline'}
              tamano={22}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
