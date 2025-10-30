// Funciones de validación reutilizables
// Validación de email, contraseña, teléfono, etc.
// Reglas de validación específicas del negocio

/**
 * Validar si un email es válido
 * @param email - Email a validar
 * @returns true si es válido
 */
export const isEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validar si un campo es requerido (no vacío)
 * @param value - Valor a validar
 * @returns true si tiene contenido
 */
export const isRequired = (value: string | number | boolean): boolean => {
  if (typeof value === "string") {
    return value.trim().length > 0
  }
  return Boolean(value)
}

/**
 * Validar longitud mínima
 * @param value - Valor a validar
 * @param min - Longitud mínima
 * @returns true si cumple
 */
export const minLength = (value: string, min: number): boolean => {
  return value.length >= min
}

/**
 * Validar longitud máxima
 * @param value - Valor a validar
 * @param max - Longitud máxima
 * @returns true si cumple
 */
export const maxLength = (value: string, max: number): boolean => {
  return value.length <= max
}

/**
 * Validar contraseña (mínimo 8 caracteres, mayúscula, número)
 * @param password - Contraseña a validar
 * @returns true si es válida
 */
export const isValidPassword = (password: string): boolean => {
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/
  return passwordRegex.test(password)
}

/**
 * Validar teléfono (formato básico)
 * @param phone - Teléfono a validar
 * @returns true si es válido
 */
export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^[\d\s\-+$$$$]{7,}$/
  return phoneRegex.test(phone)
}

/**
 * Validar número de cuenta (formato específico)
 * @param accountNumber - Número de cuenta
 * @returns true si es válido
 */
export const isValidAccountNumber = (accountNumber: string): boolean => {
  // Formato: 8-12 dígitos
  return /^\d{8,12}$/.test(accountNumber)
}

/**
 * Validar que dos valores sean iguales
 * @param value1 - Primer valor
 * @param value2 - Segundo valor
 * @returns true si son iguales
 */
export const isMatch = (value1: string, value2: string): boolean => {
  return value1 === value2
}

/**
 * Validar número positivo
 * @param value - Valor a validar
 * @returns true si es positivo
 */
export const isPositive = (value: number): boolean => {
  return value > 0
}
