// Funciones de formato de datos
// Formateo de moneda, fechas, números
// Conversión de unidades de consumo eléctrico

/**
 * Formatear número como moneda
 * @param value - Valor a formatear
 * @param currency - Código de moneda (default: USD)
 * @returns Valor formateado
 */
export const formatCurrency = (value: number, currency = "USD"): string => {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency,
  }).format(value)
}

/**
 * Formatear fecha ISO a formato local
 * @param dateString - Fecha en formato ISO
 * @param locale - Locale (default: es-ES)
 * @returns Fecha formateada (dd/mm/yyyy)
 */
export const formatDate = (dateString: string, locale = "es-ES"): string => {
  try {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat(locale, {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date)
  } catch {
    return dateString
  }
}

/**
 * Formatear fecha y hora
 * @param dateString - Fecha en formato ISO
 * @param locale - Locale (default: es-ES)
 * @returns Fecha y hora formateadas
 */
export const formatDateTime = (dateString: string, locale = "es-ES"): string => {
  try {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat(locale, {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  } catch {
    return dateString
  }
}

/**
 * Formatear consumo en kWh
 * @param value - Valor en kWh
 * @returns Valor formateado con unidad
 */
export const formatKWh = (value: number): string => {
  return `${value.toFixed(2)} kWh`
}

/**
 * Formatear número con separadores de miles
 * @param value - Valor a formatear
 * @param decimals - Número de decimales (default: 2)
 * @returns Valor formateado
 */
export const formatNumber = (value: number, decimals = 2): string => {
  return new Intl.NumberFormat("es-ES", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value)
}

/**
 * Formatear porcentaje
 * @param value - Valor entre 0 y 1
 * @param decimals - Número de decimales (default: 1)
 * @returns Porcentaje formateado
 */
export const formatPercentage = (value: number, decimals = 1): string => {
  return `${(value * 100).toFixed(decimals)}%`
}

/**
 * Truncar texto con ellipsis
 * @param text - Texto a truncar
 * @param maxLength - Longitud máxima
 * @returns Texto truncado
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text
  return `${text.substring(0, maxLength)}...`
}

/**
 * Capitalizar primera letra
 * @param text - Texto a capitalizar
 * @returns Texto capitalizado
 */
export const capitalize = (text: string): string => {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
}
