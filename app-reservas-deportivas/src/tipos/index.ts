// src/tipos/index.ts
// Tipos unificados del PRD y Contrato API «Reservas Deportivas · Villaguay»

export interface Coordenadas {
  latitud: number;
  longitud: number;
}

export interface Espacio {
  id: string;
  nombre: string;
  deporteId: string;
  complejo: string;
  superficie: string;
  techado: boolean;
  iluminacion: boolean;
  capacidad: number;
  precioPorHora: number;
  coordenadas: Coordenadas;
  imagenes: string[];
  videoUrl: string | null;
  reglas: string;
  activo: boolean;
}

export interface Deporte {
  id: string;
  nombre: string;
  icono: string;
  color: string;
}

export type EstadoTurno = 'libre' | 'reservado' | 'fijo' | 'mantenimiento';

export interface Turno {
  id: string;
  espacioId: string;
  fecha: string; // "AAAA-MM-DD"
  inicio: string; // "HH:MM"
  fin: string; // "HH:MM"
  estado: EstadoTurno;
  reservaId: string | null;
  motivoBloqueo: string | null;
  precio: number;
}

export type EstadoReserva = 'confirmada' | 'cancelada' | 'cumplida' | 'ausente';

export interface Reserva {
  id: string;
  turnoId: string;
  espacioId: string;
  usuarioId: string;
  cantidadPersonas: number;
  codigoQr: string;
  estado: EstadoReserva;
  ingresoEn: string | null;
  creadaEn: string;
  cancelableHasta: string;
  // Campos complementarios útiles para la UI
  espacioNombre?: string;
  complejo?: string;
  fecha?: string;
  inicio?: string;
  fin?: string;
  precio?: number;
}

export interface ReservaFija {
  id: string;
  espacioId: string;
  titular: string;
  dia: 0 | 1 | 2 | 3 | 4 | 5 | 6; // 0 = domingo
  inicio: string;
  fin: string;
  desde: string;
  hasta: string | null;
  activa: boolean;
}

export type Rol = 'jugador' | 'encargado' | 'administrador';

export interface Usuario {
  id: string;
  nombre: string;
  email: string;
  telefono: string;
  rol: Rol;
  espaciosFavoritos: string[];
  cancelacionesTardias: number;
  ausencias: number;
}

export interface Bloqueo {
  id: string;
  espacioId: string;
  fecha: string; // "AAAA-MM-DD"
  inicio: string | null; // "HH:MM"
  fin: string | null;
  motivo: string;
}

export interface Meta {
  total: number;
  pagina: number;
  porPagina: number;
}

export interface RespuestaLista<T> {
  datos: T[];
  meta: Meta;
}

export interface RespuestaUno<T> {
  datos: T;
  meta: null;
}

export interface RespuestaError {
  error: {
    codigo: string;
    mensaje: string;
  };
}

export interface Sesion {
  token: string;
  usuario: Usuario;
}

export interface ArchivoSubido {
  url: string;
  tipo: 'imagen' | 'audio' | 'video';
  bytes: number;
}

export interface Dispositivo {
  tokenExpo: string;
  plataforma: 'ios' | 'android';
}

export interface PruebaDePush {
  dispositivos: number;
}

export interface TurnoDetalleConEspacio extends Turno {
  espacio: Espacio;
}
