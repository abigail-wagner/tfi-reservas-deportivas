// src/app/auth/ingreso.tsx
// Formulario de ingreso de usuario con react-hook-form, validación zod y autenticación biométrica

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTema } from '../../contexto/tema.js';
import { useSesion } from '../../contexto/sesion.js';
import { Icono } from '../../componentes/Icono.js';
import { USUARIOS_MOCK } from '../../mocks/datos.js';

const esquemaIngreso = z.object({
  email: z.string().email('Ingresá un correo electrónico válido'),
  contrasena: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

type DatosIngreso = z.infer<typeof esquemaIngreso>;

export default function IngresoPantalla() {
  const router = useRouter();
  const { colores } = useTema();
  const {
    iniciarSesion,
    biometriaDisponible,
    biometriaHabilitada,
    desbloquearBiometrico,
  } = useSesion();

  const [cargando, setCargando] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<DatosIngreso>({
    resolver: zodResolver(esquemaIngreso),
    defaultValues: {
      email: 'emiliano@mail.com',
      contrasena: 'villaguay2026',
    },
  });

  const onSubmit = async (datos: DatosIngreso) => {
    try {
      setCargando(true);
      await iniciarSesion(datos.email, datos.contrasena);
      router.replace('/(tabs)');
    } catch (err: any) {
      Alert.alert('No se pudo ingresar', err?.message || 'Revisá tus credenciales.');
    } finally {
      setCargando(false);
    }
  };

  const handleBiometria = async () => {
    const exito = await desbloquearBiometrico();
    if (exito) {
      router.replace('/(tabs)');
    } else {
      Alert.alert('Autenticación biométrica no completada');
    }
  };

  const seleccionarDemo = (email: string) => {
    setValue('email', email);
    setValue('contrasena', 'villaguay2026');
  };

  return (
    <ScrollView
      style={[styles.contenedor, { backgroundColor: colores.fondo }]}
      contentContainerStyle={styles.scrollContenido}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.cabecera}>
        <View style={[styles.logoContenedor, { backgroundColor: colores.primario }]}>
          <Icono nombre="football" tamano={36} color="#FFFFFF" />
        </View>
        <Text style={[styles.titulo, { color: colores.texto }]}>Reservas Villaguay</Text>
        <Text style={[styles.subtitulo, { color: colores.textoSecundario }]}>
          Accedé al sistema municipal de reservas de canchas y complejos deportivos.
        </Text>
      </View>

      <View
        style={[
          styles.tarjetaFormulario,
          { backgroundColor: colores.tarjeta, borderColor: colores.borde },
        ]}
      >
        {/* Campo Email */}
        <View style={styles.campoContenedor}>
          <Text style={[styles.etiqueta, { color: colores.texto }]}>Correo electrónico</Text>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: colores.chipFondo,
                    color: colores.texto,
                    borderColor: errors.email ? colores.peligro : colores.borde,
                  },
                ]}
                placeholder="ejemplo@correo.com"
                placeholderTextColor={colores.textoSecundario}
                keyboardType="email-address"
                autoCapitalize="none"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.email && (
            <Text style={[styles.errorTexto, { color: colores.peligro }]}>
              {errors.email.message}
            </Text>
          )}
        </View>

        {/* Campo Contraseña */}
        <View style={styles.campoContenedor}>
          <Text style={[styles.etiqueta, { color: colores.texto }]}>Contraseña</Text>
          <Controller
            control={control}
            name="contrasena"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: colores.chipFondo,
                    color: colores.texto,
                    borderColor: errors.contrasena ? colores.peligro : colores.borde,
                  },
                ]}
                placeholder="Tu contraseña"
                placeholderTextColor={colores.textoSecundario}
                secureTextEntry
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.contrasena && (
            <Text style={[styles.errorTexto, { color: colores.peligro }]}>
              {errors.contrasena.message}
            </Text>
          )}
        </View>

        {/* Botón Ingresar */}
        <TouchableOpacity
          style={[styles.botonIngresar, { backgroundColor: colores.primario }]}
          onPress={() => handleSubmit(onSubmit)()}
          disabled={cargando}
        >
          <Text style={styles.botonIngresarTexto}>
            {cargando ? 'Ingresando...' : 'Iniciar Sesión'}
          </Text>
        </TouchableOpacity>

        {/* Botón Biometría */}
        {biometriaDisponible && biometriaHabilitada && (
          <TouchableOpacity
            style={[styles.botonBiometria, { borderColor: colores.primario }]}
            onPress={handleBiometria}
          >
            <Icono nombre="finger-print-outline" tamano={22} color={colores.primario} />
            <Text style={[styles.botonBiometriaTexto, { color: colores.primario }]}>
              Ingresar con Huella o Face ID
            </Text>
          </TouchableOpacity>
        )}

        {/* Acceso a Registro */}
        <View style={styles.registroFila}>
          <Text style={{ color: colores.textoSecundario, fontSize: 13 }}>
            ¿No tenés una cuenta?
          </Text>
          <TouchableOpacity onPress={() => router.push('/auth/registro')}>
            <Text style={{ color: colores.primario, fontWeight: '700', fontSize: 13 }}>
              Registrate acá
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Cuentas Demo de Acceso Rápido */}
      <Text style={[styles.seccionDemo, { color: colores.textoSecundario }]}>
        Cuentas rápidas de prueba:
      </Text>
      <View style={styles.demoBotones}>
        {USUARIOS_MOCK.slice(0, 4).map((u) => (
          <TouchableOpacity
            key={u.id}
            style={[
              styles.chipDemo,
              { backgroundColor: colores.tarjeta, borderColor: colores.borde },
            ]}
            onPress={() => seleccionarDemo(u.email)}
          >
            <Text style={[styles.chipDemoNombre, { color: colores.texto }]}>{u.nombre}</Text>
            <Text style={[styles.chipDemoRol, { color: colores.primario }]}>
              {u.rol.toUpperCase()}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
  },
  scrollContenido: {
    padding: 20,
    paddingBottom: 40,
  },
  cabecera: {
    alignItems: 'center',
    marginVertical: 24,
  },
  logoContenedor: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  titulo: {
    fontSize: 24,
    fontWeight: '800',
  },
  subtitulo: {
    fontSize: 13,
    textAlign: 'center',
    marginTop: 6,
    paddingHorizontal: 20,
    lineHeight: 18,
  },
  tarjetaFormulario: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 20,
    gap: 16,
  },
  campoContenedor: {
    gap: 6,
  },
  etiqueta: {
    fontSize: 13,
    fontWeight: '600',
  },
  input: {
    height: 48,
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 14,
    fontSize: 15,
  },
  errorTexto: {
    fontSize: 11,
    fontWeight: '500',
  },
  botonIngresar: {
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 6,
  },
  botonIngresarTexto: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  botonBiometria: {
    height: 48,
    borderRadius: 12,
    borderWidth: 1.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  botonBiometriaTexto: {
    fontSize: 14,
    fontWeight: '700',
  },
  registroFila: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
    marginTop: 8,
  },
  seccionDemo: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginTop: 24,
    marginBottom: 10,
  },
  demoBotones: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chipDemo: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
  },
  chipDemoNombre: {
    fontSize: 12,
    fontWeight: '700',
  },
  chipDemoRol: {
    fontSize: 10,
    fontWeight: '800',
    marginTop: 1,
  },
});
