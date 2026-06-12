export interface CategoriaServicio {
  id: string;
  nombre: string;
  descripcion?: string;
}

export interface TrabajadorResponse {
  id: string;
  usuarioId: string;
  categoriaId: string;
  ubicacionId: string | null;
  nombres: string;
  apellidos: string;
  telefono: string;
  dni: string;
  calificacionPromedio: number;
  disponibilidad: boolean;
}

export interface Page<T> {
  content: T[];
  totalElements?: number;
  totalPages?: number;
  number?: number;
  size?: number;
}

export interface TrabajadorSearchFilters {
  categoriaId?: string;
  minRating?: number;
  soloDisponibles?: boolean;
  zona?: string;
}

export interface CreateTrabajadorRequest {
  categoriaId: string;
  descripcion: string;
  experienciaAnios: number;
  tarifaHora: number;
  zonaCobertura: string;
}
