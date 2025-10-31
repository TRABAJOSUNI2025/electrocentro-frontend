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
    // Eliminar cookies relacionadas con la sesión si estamos en cliente
    try {
      if (typeof document !== "undefined") {
        document.cookie = `ec_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
        document.cookie = `ec_user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
        document.cookie = `user_role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
      }
    } catch (e) {
      // ignore
    }
  },

  // Restaurar estado desde localStorage (hidratación)
  hydrate: () => {
    const token = localStorage.getItem("ec_token")
    const userStr = localStorage.getItem("ec_user")
    // Fallback a cookie si no está en localStorage
    let user = userStr ? JSON.parse(userStr) : null
    try {
      if (!user) {
        const cookieMatch = document.cookie.split('; ').find((c) => c.startsWith('ec_user='))
        if (cookieMatch) {
          const cookieVal = decodeURIComponent(cookieMatch.split('=')[1])
          user = JSON.parse(cookieVal)
        }
      }
    } catch (e) {
      // ignore parse errors
    }

    set({ token, user })
  },
}))

// Auto-hidratación en cliente: intenta restaurar estado inmediatamente para evitar
// que componentes que leen el store vean `user` como null durante la hidratación.
if (typeof window !== "undefined") {
  // Llamar a hydrate en el siguiente tick para asegurarnos que la store esté definida
  setTimeout(() => {
    try {
      useAuthStore.getState().hydrate()
    } catch (e) {
      // ignore
    }
  }, 0)
}
