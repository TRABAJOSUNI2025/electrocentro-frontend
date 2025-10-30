// Tipos para el usuario de Electrocentro
// Define la estructura del usuario autenticado y sus roles

export type UserRole = "cliente" | "admin"

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  avatar?: string
  createdAt?: string
}

export interface AuthResponse {
  user: User
  token: string
}
