// src/app/auth/registro.tsx
// Formulario de registro de nuevo usuario con validación zod y react-hook-form

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
import { useTema } from '../../contexto/tema';
import { useSesion } from '../../contexto/sesion';
import { Icono } from '../../componentes/Icono';

const esquemaRegistro = z.object({
  nombre: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
  email: z.string().email('Ingresá un correo electrónico válido'),
  contrasena: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
  telefono: z.string().min(8, 'Ingresá un número de teléfono válido (ej: 3455-401122)'),
});

type DatosRegistro = z.infer<typeof esquemaRegistro>;

export default function RegistroPantalla() {
  const router = useRouter();
  const { colores } = useTema();
  const { registrarse } = useSesion();
  const [cargando, setCargando] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<DatosRegistro>({
    resolver: zodResolver(esquemaRegistro),
    defaultValues: {
      nombre: '',
      email: '',
      contrasena: '',
      telefono: '3455-',
    },
  });

  const onSubmit = async (datos: DatosRegistro) => {
    try {
      setCargando(true);
      await registrarse(datos.nombre, datos.email, datos.contrasena, datos.telefono);
      Alert.alert(
        '¡Cuenta Creada!',
        'Bienvenido a Reservas Villaguay. Ya podés reservar canchas y consultar turnos.',
        [{ text: 'Comenzar', onPress: () => router.replace('/(tabs)') }]
      );
    } catch (err: any) {
      Alert.alert('No se pudo registrar', err?.message || 'Error al crear la cuenta.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <ScrollView
      style={[styles.contenedor, { backgroundColor: colores.fondo }]}
      contentContainerStyle={styles.scrollContenido}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.cabecera}>
        <View style={[styles.iconoContenedor, { backgroundColor: colores.primarioClaro }]}>
          <Icono nombre="person-add" tamano={32} color={colores.primario} />
        </View>
        <Text style={[styles.titulo, { color: colores.texto }]}>Crear Cuenta</Text>
        <Text style={[styles.subtitulo, { color: colores.textoSecundario }]}>
          Completá tus datos para reservar turnos en los polideportivos de Villaguay.
        </Text>
      </View>

      <View
        style={[
          styles.tarjetaFormulario,
          { backgroundColor: colores.tarjeta, borderColor: colores.borde },
        ]}
      >
        {/* Campo Nombre */}
        <View style={styles.campoContenedor}>
          <Text style={[styles.etiqueta, { color: colores.texto }]}>Nombre y Apellido</Text>
          <Controller
            control={control}
            name="nombre"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: colores.chipFondo,
                    color: colores.texto,
                    borderColor: errors.nombre ? colores.peligro : colores.borde,
                  },
                ]}
                placeholder="Ej: Emiliano Ruiz"
                placeholderTextColor={colores.textoSecundario}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.nombre && (
            <Text style={[styles.errorTexto, { color: colores.peligro }]}>
              {errors.nombre.message}
            </Text>
          )}
        </View>

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

        {/* Campo Teléfono */}
        <View style={styles.campoContenedor}>
          <Text style={[styles.etiqueta, { color: colores.texto }]}>Teléfono de contacto</Text>
          <Controller
            control={control}
            name="telefono"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: colores.chipFondo,
                    color: colores.texto,
                    borderColor: errors.telefono ? colores.peligro : colores.borde,
                  },
                ]}
                placeholder="Ej: 3455-401122"
                placeholderTextColor={colores.textoSecundario}
                keyboardType="phone-pad"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.telefono && (
            <Text style={[styles.errorTexto, { color: colores.peligro }]}>
              {errors.telefono.message}
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
                placeholder="Mínimo 6 caracteres"
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

        {/* Botón Registrarse */}
        <TouchableOpacity
          style={[styles.botonRegistrar, { backgroundColor: colores.primario }]}
          onPress={() => handleSubmit(onSubmit)()}
          disabled={cargando}
        >
          <Text style={styles.botonRegistrarTexto}>
            {cargando ? 'Registrando...' : 'Crear Cuenta'}
          </Text>
        </TouchableOpacity>

        {/* Volver a Ingreso */}
        <View style={styles.volverFila}>
          <Text style={{ color: colores.textoSecundario, fontSize: 13 }}>
            ¿Ya tenés una cuenta?
          </Text>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={{ color: colores.primario, fontWeight: '700', fontSize: 13 }}>
              Iniciá sesión
            </Text>
          </TouchableOpacity>
        </View>
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
    marginVertical: 20,
  },
  iconoContenedor: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  titulo: {
    fontSize: 22,
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
  botonRegistrar: {
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 6,
  },
  botonRegistrarTexto: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  volverFila: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
    marginTop: 8,
  },
});
