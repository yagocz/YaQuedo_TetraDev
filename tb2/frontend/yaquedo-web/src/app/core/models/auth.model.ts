export type UserRole = 'CLIENTE' | 'TRABAJADOR' | 'ADMIN';

export interface RegisterRequest {
  email: string;
  password: string;
  nombre: string;
  apellido: string;
  telefono: string;
  rol: UserRole;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface UserResponse {
  id: string;
  email: string;
  nombre: string;
  apellido: string;
  telefono: string;
  rol: UserRole;
}

export interface AuthResponse {
  token: string;
  user: UserResponse;
}
