// Tipos genéricos para respuestas de API
// Proporciona estructura consistente para todas las llamadas HTTP

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
  statusCode?: number
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

export class ApiError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public data?: any,
  ) {
    super(message)
    this.name = "ApiError"
  }
}
