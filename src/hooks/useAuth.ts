"use client"
// Hook personalizado para autenticación
// Proporciona acceso al usuario actual y funciones de autenticación
// Manejo de tokens y sesión


// Hook personalizado para autenticación
// Proporciona acceso al usuario actual y funciones de autenticación
// Manejo de tokens y sesión

import { useEffect } from "react"
import { useAuthStore } from "../store/authStore"
import type { User } from "../types/user"

interface UseAuthReturn {
  user: User | null
  token: string | null
  isLoading: boolean
  error: string | null
  login: (userData: User, token: string) => Promise<void>
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

  // Login con usuario y token
  const login = async (userData: User, token: string): Promise<void> => {
    try {
      setLoading(true)
      setError(null)

      // Guardar en el store
      setUser(userData)
      setToken(token)
      // Guardar usuario en cookie como respaldo para el middleware/hidratación
      try {
        const cookieVal = encodeURIComponent(JSON.stringify(userData))
        document.cookie = `ec_user=${cookieVal}; path=/; max-age=${7 * 24 * 60 * 60}`
      } catch (e) {
        // ignore
      }
    
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
      
      // Limpiar estado
      storeLogout()
      
      // Eliminar cookies relacionadas con la sesión (síncrono)
      try {
        document.cookie = `ec_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
        document.cookie = `ec_user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
        document.cookie = `user_role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
      } catch (e) {
        // ignore
      }

      // Redirigir a landing usando replace para evitar historial innecesario
      window.location.replace("/")
    } catch (err) {
      console.warn("Error al hacer logout:", err)
    } finally {
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
