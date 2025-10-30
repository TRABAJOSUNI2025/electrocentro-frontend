"use client"

// Hook personalizado para fetching de datos
// Manejo de loading, error y datos
// Integración con Axios

import { useEffect, useState, useCallback } from "react"
import type { ApiError } from "../types/api"

interface UseFetchReturn<T> {
  data: T | null
  isLoading: boolean
  error: ApiError | null
  refetch: () => Promise<void>
}

export const useFetch = <T,>(key: string, fn: () => Promise<T>, deps: any[] = []): UseFetchReturn<T> => {
  const [data, setData] = useState<T | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<ApiError | null>(null)

  // Función para hacer fetch
  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)
      const result = await fn()
      setData(result)
    } catch (err) {
      const apiError = err instanceof Error ? (err as ApiError) : new Error(String(err))
      setError(apiError as ApiError)
    } finally {
      setIsLoading(false)
    }
  }, [fn])

  // Ejecutar fetch al montar o cuando cambien dependencias
  useEffect(() => {
    fetchData()
  }, [key, ...deps, fetchData])

  // Refetch manual
  const refetch = useCallback(async () => {
    await fetchData()
  }, [fetchData])

  return { data, isLoading, error, refetch }
}

