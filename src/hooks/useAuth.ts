"use client"
// Hook personalizado para autenticación
// Proporciona acceso al usuario actual y funciones de autenticación
// Manejo de tokens y sesión


// Hook personalizado para autenticación
// Proporciona acceso al usuario actual y funciones de autenticación
// Manejo de tokens y sesión

import { useEffect } from "react"
import { useAuthStore } from "../store/authStore"
import { authService } from "../api/services"
import type { User } from "../types/user"

interface UseAuthReturn {
  user: User | null
  token: string | null
  isLoading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  getUser: () => User | null
}

export const useAuth = (): UseAuthReturn => {
  const {
    user,
    token,
    isLoading,
    error,
    setUser,
    setToken,
    setLoading,
    setError,
    logout: storeLogout,
    hydrate,
  } = useAuthStore()

  // Hidratar estado desde localStorage al montar
  useEffect(() => {
    hydrate()
  }, [hydrate])

  // Login con email y password
  const login = async (email: string, password: string): Promise<void> => {
    try {
      setLoading(true)
      setError(null)

      // Llamar servicio de autenticación
      const response = await authService.login(email, password)

      // Guardar usuario y token
      setUser(response.user)
      setToken(response.token)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Error al iniciar sesión"
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  // Logout
  const logout = async (): Promise<void> => {
    try {
      setLoading(true)
      await authService.logout()
    } catch (err) {
      console.warn("Error al hacer logout:", err)
    } finally {
      storeLogout()
      setLoading(false)
    }
  }

  // Obtener usuario actual
  const getUser = (): User | null => {
    return user
  }

  return {
    user,
    token,
    isLoading,
    error,
    login,
    logout,
    getUser,
  }
}
