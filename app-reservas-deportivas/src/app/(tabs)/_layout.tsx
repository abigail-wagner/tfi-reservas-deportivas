// src/app/(tabs)/_layout.tsx
// Navegación de pestañas inferiores para la app móvil

import React from 'react';
import { Tabs } from 'expo-router';
import { useTema } from '../../contexto/tema.js';
import { Icono } from '../../componentes/Icono.js';

export default function LayoutPestanas() {
  const { colores } = useTema();

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
          height: 60,
          paddingBottom: 8,
          paddingTop: 6,
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
