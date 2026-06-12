export interface CategoriaServicio {
  id: string;
  nombre: string;
  descripcion?: string;
  icono?: string;
}

export interface TrabajadorResponse {
  id: string;
  usuarioId: string;
  nombre: string;
  apellido: string;
  telefono: string;
  categoriaId: string;
  categoriaNombre: string;
  descripcion: string;
  experienciaAnios: number;
  tarifaHora: number;
  rating: number;
  totalResenas: number;
  disponible: boolean;
  zonaCobertura: string;
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
