// src/contexto/tema.tsx
// Soporte para modo oscuro / claro con persistencia sincrónica mediante expo-sqlite/kv-store

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import { openDatabaseSync } from 'expo-sqlite';

export interface ColoresTema {
  fondo: string;
  tarjeta: string;
  texto: string;
  textoSecundario: string;
  borde: string;
  primario: string;
  primarioClaro: string;
  exito: string;
  peligro: string;
  advertencia: string;
  chipFondo: string;
  chipTexto: string;
  grillaLibre: string;
  grillaReservado: string;
  grillaFijo: string;
  grillaMantenimiento: string;
}

export const COLORES_CLARO: ColoresTema = {
  fondo: '#F8FAFC',
  tarjeta: '#FFFFFF',
  texto: '#0F172A',
  textoSecundario: '#64748B',
  borde: '#E2E8F0',
  primario: '#0284C7',
  primarioClaro: '#E0F2FE',
  exito: '#16A34A',
  peligro: '#DC2626',
  advertencia: '#D97706',
  chipFondo: '#F1F5F9',
  chipTexto: '#334155',
  grillaLibre: '#DCFCE7',
  grillaReservado: '#FEE2E2',
  grillaFijo: '#FEF3C7',
  grillaMantenimiento: '#F1F5F9',
};

export const COLORES_OSCURO: ColoresTema = {
  fondo: '#0F172A',
  tarjeta: '#1E293B',
  texto: '#F8FAFC',
  textoSecundario: '#94A3B8',
  borde: '#334155',
  primario: '#38BDF8',
  primarioClaro: '#0369A1',
  exito: '#22C55E',
  peligro: '#EF4444',
  advertencia: '#F59E0B',
  chipFondo: '#334155',
  chipTexto: '#E2E8F0',
  grillaLibre: '#14532D',
  grillaReservado: '#7F1D1D',
  grillaFijo: '#78350F',
  grillaMantenimiento: '#1E293B',
};

type ModoPreferencia = 'sistema' | 'claro' | 'oscuro';

interface TemaContextoTipo {
  esOscuro: boolean;
  colores: ColoresTema;
  preferencia: ModoPreferencia;
  setPreferencia: (modo: ModoPreferencia) => void;
}

const TemaContexto = createContext<TemaContextoTipo>({
  esOscuro: false,
  colores: COLORES_CLARO,
  preferencia: 'sistema',
  setPreferencia: () => {},
});

const KV_KEY_TEMA = 'preferencia_tema_villaguay';

export const TemaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const esquemaSistema = useColorScheme();
  const [preferencia, setPreferenciaEstado] = useState<ModoPreferencia>('sistema');

  // Inicialización sincrónica o lectura inicial desde SQLite
  useEffect(() => {
    try {
      const db = openDatabaseSync('villaguay_kv.db');
      db.execSync('CREATE TABLE IF NOT EXISTS kv_store (clave TEXT PRIMARY KEY, valor TEXT);');
      const fila = db.getFirstSync<{ valor: string }>(
        'SELECT valor FROM kv_store WHERE clave = ?',
        [KV_KEY_TEMA]
      );
      if (fila?.valor) {
        setPreferenciaEstado(fila.valor as ModoPreferencia);
      }
    } catch {
      // Fallback a sistema si falla
    }
  }, []);

  const setPreferencia = (nuevoModo: ModoPreferencia) => {
    setPreferenciaEstado(nuevoModo);
    try {
      const db = openDatabaseSync('villaguay_kv.db');
      db.runSync(
        'INSERT OR REPLACE INTO kv_store (clave, valor) VALUES (?, ?)',
        [KV_KEY_TEMA, nuevoModo]
      );
    } catch {
      // Ignorar error de guardado no crítico
    }
  };

  const esOscuro =
    preferencia === 'oscuro' || (preferencia === 'sistema' && esquemaSistema === 'dark');

  const colores = esOscuro ? COLORES_OSCURO : COLORES_CLARO;

  return (
    <TemaContexto.Provider value={{ esOscuro, colores, preferencia, setPreferencia }}>
      {children}
    </TemaContexto.Provider>
  );
};

export const useTema = () => useContext(TemaContexto);
