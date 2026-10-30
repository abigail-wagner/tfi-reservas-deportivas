// src/app/_layout.tsx
// Layout raíz con proveedores de SQLite, React Query, Tema, Sesión y Stack Navigation

import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SQLiteProvider } from 'expo-sqlite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TemaProvider, useTema } from '../contexto/tema.js';
import { SesionProvider } from '../contexto/sesion.js';
import { AvisoDeRed } from '../componentes/AvisoDeRed.js';
import { migrarBaseDeDatos } from '../db/migraciones.js';
import { configurarCanalesNotificacion } from '../notificaciones/avisos-locales.js';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 2,
      retry: 1,
    },
  },
});

function NavegacionRaiz() {
  const { colores, esOscuro } = useTema();

  useEffect(() => {
    configurarCanalesNotificacion();
  }, []);

  return (
    <>
      <StatusBar style={esOscuro ? 'light' : 'dark'} />
      <AvisoDeRed />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colores.tarjeta },
          headerTintColor: colores.texto,
          headerTitleStyle: { fontWeight: '700' },
          contentStyle: { backgroundColor: colores.fondo },
          headerShadowVisible: false,
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="espacio/[id]"
          options={{ title: 'Detalle de Cancha', headerBackTitle: 'Volver' }}
        />
        <Stack.Screen
          name="espacio/[id]/turnos"
          options={{ title: 'Disponibilidad y Turnos', headerBackTitle: 'Espacio' }}
        />
        <Stack.Screen
          name="reserva/[id]"
          options={{ title: 'Detalle de Reserva', headerBackTitle: 'Reservas' }}
        />
        <Stack.Screen
          name="auth/ingreso"
          options={{ title: 'Iniciar Sesión', presentation: 'modal' }}
        />
        <Stack.Screen
          name="auth/registro"
          options={{ title: 'Crear Cuenta', presentation: 'modal' }}
        />
        <Stack.Screen
          name="encargado/escanear"
          options={{ title: 'Escanear QR de Ingreso' }}
        />
        <Stack.Screen
          name="encargado/bloqueos"
          options={{ title: 'Bloqueos de Canchas' }}
        />
        <Stack.Screen
          name="encargado/fijas"
          options={{ title: 'Reservas Fijas Semanales' }}
        />
        <Stack.Screen
          name="encargado/precio"
          options={{ title: 'Actualizar Tarifas' }}
        />
        <Stack.Screen name="+not-found" options={{ title: 'Página no encontrada' }} />
      </Stack>
    </>
  );
}

export default function LayoutPrincipal() {
  return (
    <SQLiteProvider databaseName="villaguay_reservas.db" onInit={migrarBaseDeDatos}>
      <QueryClientProvider client={queryClient}>
        <TemaProvider>
          <SesionProvider>
            <NavegacionRaiz />
          </SesionProvider>
        </TemaProvider>
      </QueryClientProvider>
    </SQLiteProvider>
  );
}
