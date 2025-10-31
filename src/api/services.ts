// Cliente HTTP configurado con Axios
// Incluye interceptores para autenticación y manejo de errores globales

import axios, { type AxiosInstance, type AxiosError, type InternalAxiosRequestConfig } from "axios"
import { ApiError } from "../types/api"

// Crear instancia de Axios con configuración base
const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "https://api.electrocentro.fake/v1",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
})

// Interceptor de request: agregar token Bearer desde localStorage
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("ec_token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  },
)

// Interceptor de response: manejar errores globales
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const statusCode = error.response?.status || 500
    const message = (error.response?.data as any)?.message || error.message || "Error desconocido"

    // Lanzar error tipado
    const apiError = new ApiError(statusCode, message, error.response?.data)

    // Si es 401, limpiar token (sesión expirada)
    if (statusCode === 401) {
      localStorage.removeItem("ec_token")
      window.location.href = "/login"
    }

    return Promise.reject(apiError)
  },
)

// Servicio de autenticación
export const authService = {
  // Login
  login: async (email: string, password: string) => {
    const response = await apiClient.post("/auth/login", { email, password })
    return response.data
  },

  // Logout
  logout: async () => {
    const response = await apiClient.post("/auth/logout")
    return response.data
  },

  // Verificar token
  verifyToken: async () => {
    const response = await apiClient.get("/auth/verify")
    return response.data
  }
}

export default apiClient
