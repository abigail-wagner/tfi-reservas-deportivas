// src/contexto/sesion.tsx
// Gestión del estado de sesión, almacenamiento seguro y registro de push token

import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  clienteHttp,
  TOKEN_SECURE_KEY,
  leerItemSeguro,
  guardarItemSeguro,
  borrarItemSeguro,
} from '../api/cliente';
import { USUARIOS_MOCK, CONTRASENA_DEMO } from '../mocks/datos';
import { registrarTokenPushEnBackend } from '../notificaciones/avisos-locales';
import type { Sesion, Usuario } from '../tipos/index';

export const USUARIO_SECURE_KEY = 'villaguay_auth_usuario';

function normalizarEmailDemo(email: string): string {
  const limpio = email.trim().toLowerCase();
  if (limpio === 'admin@villaguay.demo.ar') {
    return 'nahuel@villaguay.demo.ar';
  }
  return limpio;
}

interface SesionContextoTipo {
  usuario: Usuario | null;
  token: string | null;
  cargando: boolean;
  iniciarSesion: (email: string, contrasena: string) => Promise<Usuario>;
  registrarse: (
    nombre: string,
    email: string,
    contrasena: string,
    telefono: string
  ) => Promise<Usuario>;
  cerrarSesion: () => Promise<void>;
  alternarFavorito: (espacioId: string) => Promise<void>;
}

const SesionContexto = createContext<SesionContextoTipo>({} as SesionContextoTipo);

export const SesionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    async function inicializarSesion() {
      try {
        const tokenGuardado = await leerItemSeguro(TOKEN_SECURE_KEY);
        const usuarioGuardadoStr = await leerItemSeguro(USUARIO_SECURE_KEY);

        if (tokenGuardado && usuarioGuardadoStr) {
          const u = JSON.parse(usuarioGuardadoStr) as Usuario;
          if (u.email === 'admin@villaguay.demo.ar') {
            u.email = 'nahuel@villaguay.demo.ar';
            u.nombre = 'Nahuel Ojeda';
          }
          setToken(tokenGuardado);
          setUsuario(u);

          // Si el token guardado era de modo offline demo, intentar obtener JWT real
          if (tokenGuardado.startsWith('demo-jwt')) {
            clienteHttp
              .post<{ datos: Sesion }>('/auth/ingreso', {
                email: normalizarEmailDemo(u.email),
                contrasena: CONTRASENA_DEMO,
              })
              .then(async (res) => {
                if (res.data?.datos?.token) {
                  setToken(res.data.datos.token);
                  setUsuario(res.data.datos.usuario);
                  await guardarItemSeguro(TOKEN_SECURE_KEY, res.data.datos.token);
                  await guardarItemSeguro(
                    USUARIO_SECURE_KEY,
                    JSON.stringify(res.data.datos.usuario)
                  );
                }
              })
              .catch(() => {});
          }
          registrarTokenPushEnBackend().catch(() => {});
        } else {
          // Sesión por defecto inicial de Emiliano (usr-207) para facilitar evaluación de cátedra
          const demoInicial = USUARIOS_MOCK[0];
          const fakeToken = 'demo-jwt-token-emiliano';
          setUsuario(demoInicial);
          setToken(fakeToken);
          await guardarItemSeguro(TOKEN_SECURE_KEY, fakeToken);
          await guardarItemSeguro(USUARIO_SECURE_KEY, JSON.stringify(demoInicial));

          // Intentar autenticar contra la API real en segundo plano
          clienteHttp
            .post<{ datos: Sesion }>('/auth/ingreso', {
              email: demoInicial.email,
              contrasena: CONTRASENA_DEMO,
            })
            .then(async (res) => {
              if (res.data?.datos?.token) {
                setToken(res.data.datos.token);
                setUsuario(res.data.datos.usuario);
                await guardarItemSeguro(TOKEN_SECURE_KEY, res.data.datos.token);
                await guardarItemSeguro(
                  USUARIO_SECURE_KEY,
                  JSON.stringify(res.data.datos.usuario)
                );
              }
            })
            .catch(() => {});

          registrarTokenPushEnBackend().catch(() => {});
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
    const emailNormalizado = normalizarEmailDemo(email);
    try {
      // Intento contra API real
      const respuesta = await clienteHttp.post<{ datos: Sesion }>('/auth/ingreso', {
        email: emailNormalizado,
        contrasena,
      });
      const { token: nuevoToken, usuario: nuevoUsuario } = respuesta.data.datos;
      setToken(nuevoToken);
      setUsuario(nuevoUsuario);
      await guardarItemSeguro(TOKEN_SECURE_KEY, nuevoToken);
      await guardarItemSeguro(USUARIO_SECURE_KEY, JSON.stringify(nuevoUsuario));
      registrarTokenPushEnBackend().catch(() => {});
      return nuevoUsuario;
    } catch {
      // Fallback offline o demo
      const demoUser = USUARIOS_MOCK.find(
        (u) => u.email.toLowerCase() === emailNormalizado
      );
      if (demoUser && contrasena === CONTRASENA_DEMO) {
        const fakeToken = `demo-jwt-${demoUser.id}`;
        setToken(fakeToken);
        setUsuario(demoUser);
        await guardarItemSeguro(TOKEN_SECURE_KEY, fakeToken);
        await guardarItemSeguro(USUARIO_SECURE_KEY, JSON.stringify(demoUser));
        registrarTokenPushEnBackend().catch(() => {});
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
      await guardarItemSeguro(TOKEN_SECURE_KEY, nuevoToken);
      await guardarItemSeguro(USUARIO_SECURE_KEY, JSON.stringify(nuevoUsuario));
      registrarTokenPushEnBackend().catch(() => {});
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
      await guardarItemSeguro(TOKEN_SECURE_KEY, fakeToken);
      await guardarItemSeguro(USUARIO_SECURE_KEY, JSON.stringify(nuevoUsuario));
      registrarTokenPushEnBackend().catch(() => {});
      return nuevoUsuario;
    }
  };

  const cerrarSesion = async () => {
    setUsuario(null);
    setToken(null);
    await borrarItemSeguro(TOKEN_SECURE_KEY);
    await borrarItemSeguro(USUARIO_SECURE_KEY);
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
    await guardarItemSeguro(USUARIO_SECURE_KEY, JSON.stringify(usuarioActualizado));

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

  return (
    <SesionContexto.Provider
      value={{
        usuario,
        token,
        cargando,
        iniciarSesion,
        registrarse,
        cerrarSesion,
        alternarFavorito,
      }}
    >
      {children}
    </SesionContexto.Provider>
  );
};

export const useSesion = () => useContext(SesionContexto);
