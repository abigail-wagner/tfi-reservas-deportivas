// src/store/filtros.ts
// Store global de Zustand para búsqueda, filtrado y ordenamiento de canchas y espacios

import { create } from 'zustand';

export type OrdenEspacio = 'cercania' | 'precio_asc' | 'precio_desc' | 'capacidad';

interface FiltrosEstado {
  busqueda: string;
  deporteId: string | null;
  soloTechados: boolean;
  soloIluminados: boolean;
  precioMaximo: number | null;
  orden: OrdenEspacio;
  
  // Acciones
  setBusqueda: (texto: string) => void;
  setDeporteId: (id: string | null) => void;
  toggleTechados: () => void;
  toggleIluminados: () => void;
  setPrecioMaximo: (precio: number | null) => void;
  setOrden: (orden: OrdenEspacio) => void;
  limpiarFiltros: () => void;
}

export const useFiltrosStore = create<FiltrosEstado>((set) => ({
  busqueda: '',
  deporteId: null,
  soloTechados: false,
  soloIluminados: false,
  precioMaximo: null,
  orden: 'cercania',

  setBusqueda: (busqueda) => set({ busqueda }),
  setDeporteId: (deporteId) => set({ deporteId }),
  toggleTechados: () => set((state) => ({ soloTechados: !state.soloTechados })),
  toggleIluminados: () => set((state) => ({ soloIluminados: !state.soloIluminados })),
  setPrecioMaximo: (precioMaximo) => set({ precioMaximo }),
  setOrden: (orden) => set({ orden }),
  limpiarFiltros: () =>
    set({
      busqueda: '',
      deporteId: null,
      soloTechados: false,
      soloIluminados: false,
      precioMaximo: null,
      orden: 'cercania',
    }),
}));
