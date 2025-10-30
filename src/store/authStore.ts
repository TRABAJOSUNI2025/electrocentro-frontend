// Store global de autenticación con Zustand
// Manejo centralizado del estado del usuario y token

import { create } from "zustand"
import type { User } from "../types/user"

interface AuthState {
  user: User | null
  token: string | null
  isLoading: boolean
  error: string | null
  setUser: (user: User | null) => void
  setToken: (token: string | null) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  logout: () => void
  hydrate: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isLoading: false,
  error: null,

  // Actualizar usuario en estado y localStorage
  setUser: (user: User | null) => {
    set({ user })
    if (user) {
      localStorage.setItem("ec_user", JSON.stringify(user))
    } else {
      localStorage.removeItem("ec_user")
    }
  },

  // Actualizar token en estado y localStorage
  setToken: (token: string | null) => {
    set({ token })
    if (token) {
      localStorage.setItem("ec_token", token)
    } else {
      localStorage.removeItem("ec_token")
    }
  },

  // Actualizar estado de carga
  setLoading: (loading: boolean) => {
    set({ isLoading: loading })
  },

  // Actualizar mensaje de error
  setError: (error: string | null) => {
    set({ error })
  },

  // Limpiar estado y localStorage (logout)
  logout: () => {
    set({ user: null, token: null, error: null })
    localStorage.removeItem("ec_token")
    localStorage.removeItem("ec_user")
  },

  // Restaurar estado desde localStorage (hidratación)
  hydrate: () => {
    const token = localStorage.getItem("ec_token")
    const userStr = localStorage.getItem("ec_user")
    const user = userStr ? JSON.parse(userStr) : null
    set({ token, user })
  },
}))
