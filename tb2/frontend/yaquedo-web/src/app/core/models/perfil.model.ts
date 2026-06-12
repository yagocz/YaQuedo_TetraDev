export interface ClienteResponse {
  id: string;
  usuarioId: string;
  nombres: string;
  apellidos: string;
  telefono: string;
}

export interface UpdateClienteRequest {
  nombres: string;
  apellidos: string;
  telefono: string;
}

export interface UpdateTrabajadorRequest {
  categoriaId: string;
  ubicacionId?: string | null;
  nombres: string;
  apellidos: string;
  telefono: string;
  dni: string;
}
