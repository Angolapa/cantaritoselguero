export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  phone?: string;
  birthDate?: string; // ISO 8601 "YYYY-MM-DD"
}

export type UserRole =
  | "USER"
  | "ADMIN"
  | "STAND_OPERATOR"
  | "CATALOG_MANAGER";

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  birthDate?: string | null; // ISO datetime devuelto por el backend
  role: UserRole;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}
