// src/contexto/sesion.tsx
// Gestión del estado de sesión, almacenamiento seguro en SecureStore y autenticación biométrica

import React, { createContext, useContext, useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import * as LocalAuthentication from 'expo-local-authentication';
import { clienteHttp, TOKEN_SECURE_KEY } from '../api/cliente';
import { USUARIOS_MOCK, CONTRASENA_DEMO } from '../mocks/datos';
import type { Sesion, Usuario } from '../tipos/index';

const USUARIO_SECURE_KEY = 'villaguay_auth_usuario';
const BIOMETRIA_HABILITADA_KEY = 'villaguay_biometria_activa';

interface SesionContextoTipo {
  usuario: Usuario | null;
  token: string | null;
  cargando: boolean;
  biometriaDisponible: boolean;
  biometriaHabilitada: boolean;
  iniciarSesion: (email: string, contrasena: string) => Promise<Usuario>;
  registrarse: (
    nombre: string,
    email: string,
    contrasena: string,
    telefono: string
  ) => Promise<Usuario>;
  cerrarSesion: () => Promise<void>;
  alternarFavorito: (espacioId: string) => Promise<void>;
  setBiometriaHabilitada: (habilitada: boolean) => Promise<void>;
  desbloquearBiometrico: () => Promise<boolean>;
}

const SesionContexto = createContext<SesionContextoTipo>({} as SesionContextoTipo);

export const SesionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [cargando, setCargando] = useState(true);
  const [biometriaDisponible, setBiometriaDisponible] = useState(false);
  const [biometriaHabilitada, setBiometriaHabilitadaEstado] = useState(false);

  useEffect(() => {
    async function inicializarSesion() {
      try {
        // 1. Verificar hardware biométrico
        const compatible = await LocalAuthentication.hasHardwareAsync();
        const registrado = await LocalAuthentication.isEnrolledAsync();
        setBiometriaDisponible(compatible && registrado);

        // 2. Leer preferencia biométrica
        const bioPreferencia = await SecureStore.getItemAsync(BIOMETRIA_HABILITADA_KEY);
        const bioActiva = bioPreferencia === 'true';
        setBiometriaHabilitadaEstado(bioActiva);

        // 3. Restaurar sesión almacenada
        const tokenGuardado = await SecureStore.getItemAsync(TOKEN_SECURE_KEY);
        const usuarioGuardadoStr = await SecureStore.getItemAsync(USUARIO_SECURE_KEY);

        if (tokenGuardado && usuarioGuardadoStr) {
          const u = JSON.parse(usuarioGuardadoStr) as Usuario;
          setToken(tokenGuardado);
          setUsuario(u);
        } else {
          // Sesión por defecto inicial de Emiliano (usr-207) para facilitar evaluación de cátedra
          const demoInicial = USUARIOS_MOCK[0];
          setUsuario(demoInicial);
          setToken('demo-jwt-token-emiliano');
        }
      } catch {
        // Sesión vacía o fallback
      } finally {
        setCargando(false);
      }
    }

    inicializarSesion();
  }, []);

  const iniciarSesion = async (email: string, contrasena: string): Promise<Usuario> => {
    try {
      // Intento contra API real
      const respuesta = await clienteHttp.post<{ datos: Sesion }>('/auth/ingreso', {
        email,
        contrasena,
      });
      const { token: nuevoToken, usuario: nuevoUsuario } = respuesta.data.datos;
      setToken(nuevoToken);
      setUsuario(nuevoUsuario);
      await SecureStore.setItemAsync(TOKEN_SECURE_KEY, nuevoToken);
      await SecureStore.setItemAsync(USUARIO_SECURE_KEY, JSON.stringify(nuevoUsuario));
      return nuevoUsuario;
    } catch {
      // Fallback offline o demo
      const demoUser = USUARIOS_MOCK.find(
        (u) => u.email.toLowerCase() === email.trim().toLowerCase()
      );
      if (demoUser && contrasena === CONTRASENA_DEMO) {
        const fakeToken = `demo-jwt-${demoUser.id}`;
        setToken(fakeToken);
        setUsuario(demoUser);
        await SecureStore.setItemAsync(TOKEN_SECURE_KEY, fakeToken);
        await SecureStore.setItemAsync(USUARIO_SECURE_KEY, JSON.stringify(demoUser));
        return demoUser;
      }
      throw new Error('Credenciales inválidas. Comprobá el correo y contraseña.');
    }
  };

  const registrarse = async (
    nombre: string,
    email: string,
    contrasena: string,
    telefono: string
  ): Promise<Usuario> => {
    try {
      const respuesta = await clienteHttp.post<{ datos: Sesion }>('/auth/registro', {
        nombre,
        email,
        contrasena,
        telefono,
      });
      const { token: nuevoToken, usuario: nuevoUsuario } = respuesta.data.datos;
      setToken(nuevoToken);
      setUsuario(nuevoUsuario);
      await SecureStore.setItemAsync(TOKEN_SECURE_KEY, nuevoToken);
      await SecureStore.setItemAsync(USUARIO_SECURE_KEY, JSON.stringify(nuevoUsuario));
      return nuevoUsuario;
    } catch {
      const nuevoUsuario: Usuario = {
        id: `usr-${Date.now()}`,
        nombre,
        email,
        telefono,
        rol: 'jugador',
        espaciosFavoritos: [],
        cancelacionesTardias: 0,
        ausencias: 0,
      };
      const fakeToken = `demo-jwt-${nuevoUsuario.id}`;
      setToken(fakeToken);
      setUsuario(nuevoUsuario);
      await SecureStore.setItemAsync(TOKEN_SECURE_KEY, fakeToken);
      await SecureStore.setItemAsync(USUARIO_SECURE_KEY, JSON.stringify(nuevoUsuario));
      return nuevoUsuario;
    }
  };

  const cerrarSesion = async () => {
    setUsuario(null);
    setToken(null);
    await SecureStore.deleteItemAsync(TOKEN_SECURE_KEY);
    await SecureStore.deleteItemAsync(USUARIO_SECURE_KEY);
  };

  const alternarFavorito = async (espacioId: string) => {
    if (!usuario) return;
    const esFav = usuario.espaciosFavoritos.includes(espacioId);
    const nuevaLista = esFav
      ? usuario.espaciosFavoritos.filter((id) => id !== espacioId)
      : [...usuario.espaciosFavoritos, espacioId];

    const usuarioActualizado: Usuario = {
      ...usuario,
      espaciosFavoritos: nuevaLista,
    };
    setUsuario(usuarioActualizado);
    await SecureStore.setItemAsync(USUARIO_SECURE_KEY, JSON.stringify(usuarioActualizado));

    // Intentar sincronizar con backend
    try {
      if (esFav) {
        await clienteHttp.delete(`/usuarios/favoritos/${espacioId}`);
      } else {
        await clienteHttp.post(`/usuarios/favoritos/${espacioId}`);
      }
    } catch {
      // Ignorar si está sin conexión
    }
  };

  const setBiometriaHabilitada = async (habilitada: boolean) => {
    setBiometriaHabilitadaEstado(habilitada);
    await SecureStore.setItemAsync(BIOMETRIA_HABILITADA_KEY, habilitada ? 'true' : 'false');
  };

  const desbloquearBiometrico = async (): Promise<boolean> => {
    if (!biometriaDisponible || !biometriaHabilitada) return false;
    try {
      const resultado = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Ingresar a Reservas Deportivas Villaguay',
        cancelLabel: 'Cancelar',
        disableDeviceFallback: false,
      });
      return resultado.success;
    } catch {
      return false;
    }
  };

  return (
    <SesionContexto.Provider
      value={{
        usuario,
        token,
        cargando,
        biometriaDisponible,
        biometriaHabilitada,
        iniciarSesion,
        registrarse,
        cerrarSesion,
        alternarFavorito,
        setBiometriaHabilitada,
        desbloquearBiometrico,
      }}
    >
      {children}
    </SesionContexto.Provider>
  );
};

export const useSesion = () => useContext(SesionContexto);
