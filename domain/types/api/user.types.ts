import { User, UserRole } from "./auth.types";

export interface UserDetail extends User {
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  authId: string;
}

export interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
  phone?: string;
  birthDate?: string; // ISO 8601 "YYYY-MM-DD"
}

export interface UpdateUserRequest {
  name?: string;
  email?: string;
  phone?: string;
  birthDate?: string; // ISO 8601 "YYYY-MM-DD"
  role?: UserRole;
}
