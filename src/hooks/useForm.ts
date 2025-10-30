"use client"

import type React from "react"

// Hook personalizado para manejo de formularios
// Validación, cambios de estado, submit
// Manejo de errores de validación

import { useState, useCallback } from "react"

interface UseFormOptions<T> {
  initialValues: T
  validate?: (values: T) => Record<keyof T, string>
  onSubmit?: (values: T) => Promise<void> | void
}

interface UseFormReturn<T> {
  values: T
  errors: Record<keyof T, string>
  isSubmitting: boolean
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
  handleSubmit: (e: React.FormEvent) => Promise<void>
  reset: () => void
  setFieldValue: (field: keyof T, value: any) => void
  setFieldError: (field: keyof T, error: string) => void
}

export const useForm = <T extends Record<string, any>>({
  initialValues,
  validate,
  onSubmit,
}: UseFormOptions<T>): UseFormReturn<T> => {
  const [values, setValues] = useState<T>(initialValues)
  const [errors, setErrors] = useState<Record<keyof T, string>>({} as Record<keyof T, string>)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Manejar cambios en inputs
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const finalValue = type === "checkbox" ? (e.target as HTMLInputElement).checked : value

    setValues((prev) => ({
      ...prev,
      [name]: finalValue,
    }))

    // Limpiar error del campo
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }))
  }, [])

  // Manejar submit del formulario
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()

      // Validar si existe función de validación
      if (validate) {
        const newErrors = validate(values)
        setErrors(newErrors)

        // Si hay errores, no continuar
        if (Object.values(newErrors).some((err) => err)) {
          return
        }
      }

      try {
        setIsSubmitting(true)
        await onSubmit?.(values)
      } catch (err) {
        console.error("Error en submit:", err)
      } finally {
        setIsSubmitting(false)
      }
    },
    [values, validate, onSubmit],
  )

  // Reset del formulario
  const reset = useCallback(() => {
    setValues(initialValues)
    setErrors({} as Record<keyof T, string>)
  }, [initialValues])

  // Establecer valor de un campo
  const setFieldValue = useCallback((field: keyof T, value: any) => {
    setValues((prev) => ({
      ...prev,
      [field]: value,
    }))
  }, [])

  // Establecer error de un campo
  const setFieldError = useCallback((field: keyof T, error: string) => {
    setErrors((prev) => ({
      ...prev,
      [field]: error,
    }))
  }, [])

  return {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    reset,
    setFieldValue,
    setFieldError,
  }
}
