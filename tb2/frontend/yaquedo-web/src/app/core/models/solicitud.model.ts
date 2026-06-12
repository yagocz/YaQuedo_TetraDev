export type EstadoSolicitud =
  | 'PENDIENTE'
  | 'ACEPTADA'
  | 'RECHAZADA'
  | 'EN_PROGRESO'
  | 'FINALIZADA'
  | 'CANCELADA';

export interface CreateSolicitudRequest {
  trabajadorId: string;
  categoriaId: string;
  descripcion: string;
  fechaServicio: string;
  precioOfrecido: number;
  direccion: string;
}

export interface SolicitudResponse {
  id: string;
  clienteId: string;
  trabajadorId: string;
  trabajadorNombre: string;
  categoriaNombre: string;
  descripcion: string;
  fechaServicio: string;
  precioOfrecido: number;
  direccion: string;
  estado: EstadoSolicitud;
  creadoEn: string;
}

export interface CreateResenaRequest {
  solicitudId: string;
  puntuacion: number;
  comentario: string;
}

export interface ResenaResponse {
  id: string;
  solicitudId: string;
  clienteNombre: string;
  trabajadorId: string;
  puntuacion: number;
  comentario: string;
  creadoEn: string;
}
