export type UserRole = 'CLIENTE' | 'TRABAJADOR' | 'ADMIN';

export interface RegisterRequest {
  email: string;
  password: string;
  role: UserRole;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface UserResponse {
  id: string;
  email: string;
  role: UserRole;
  estadoActivo: boolean;
  emailVerificado: boolean;
  createdAt: string;
}

export interface AuthResponse {
  accessToken: string;
  tokenType: string;
  expiresInMs: number;
  user: UserResponse;
}
