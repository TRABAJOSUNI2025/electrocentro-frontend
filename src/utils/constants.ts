// Constantes globales de la aplicación
// URLs de API, mensajes de error, configuración
// Enumeraciones de roles, estados, etc.

// Roles de usuario
export const ROLES = {
  ADMIN: "admin",
  CLIENTE: "cliente",
} as const

// Estados de solicitudes/trámites
export const REQUEST_STATUS = {
  PENDING: "pending",
  IN_PROGRESS: "in_progress",
  COMPLETED: "completed",
  REJECTED: "rejected",
  CANCELLED: "cancelled",
} as const

// Estados de pagos
export const PAYMENT_STATUS = {
  PENDING: "pending",
  PAID: "paid",
  OVERDUE: "overdue",
  CANCELLED: "cancelled",
} as const

// Tipos de incidencias
export const INCIDENT_TYPES = {
  POWER_OUTAGE: "power_outage",
  BILLING_ISSUE: "billing_issue",
  METER_PROBLEM: "meter_problem",
  SERVICE_REQUEST: "service_request",
  COMPLAINT: "complaint",
} as const

// Endpoints de API
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
    PROFILE: "/auth/profile",
  },
  ACCOUNTS: {
    LIST: "/accounts",
    DETAIL: "/accounts/:id",
    CREATE: "/accounts",
    UPDATE: "/accounts/:id",
  },
  CONSUMPTION: {
    HISTORY: "/accounts/:id/consumption",
    CURRENT: "/accounts/:id/consumption/current",
  },
  PAYMENTS: {
    INVOICES: "/invoices",
    INVOICE_DETAIL: "/invoices/:id",
    PAY: "/invoices/:id/pay",
    METHODS: "/payment-methods",
  },
  REQUESTS: {
    LIST: "/requests",
    DETAIL: "/requests/:id",
    CREATE: "/requests",
    UPDATE: "/requests/:id",
  },
  INCIDENTS: {
    LIST: "/incidents",
    DETAIL: "/incidents/:id",
    CREATE: "/incidents",
    UPDATE: "/incidents/:id",
    COMMENTS: "/incidents/:id/comments",
  },
} as const

// Paleta de colores
export const COLORS = {
  PRIMARY: "#1E90FF",
  PRIMARY_DARK: "#1873CC",
  PRIMARY_LIGHT: "#4DA6FF",
  SECONDARY: "#6C757D",
  SUCCESS: "#28A745",
  WARNING: "#FFC107",
  DANGER: "#DC3545",
  INFO: "#17A2B8",
  WHITE: "#FFFFFF",
  BLACK: "#000000",
  GRAY_50: "#F9FAFB",
  GRAY_100: "#F3F4F6",
  GRAY_200: "#E5E7EB",
  GRAY_300: "#D1D5DB",
  GRAY_400: "#9CA3AF",
  GRAY_500: "#6B7280",
  GRAY_600: "#4B5563",
  GRAY_700: "#374151",
  GRAY_800: "#1F2937",
  GRAY_900: "#111827",
} as const

// Mensajes de error comunes
export const ERROR_MESSAGES = {
  REQUIRED_FIELD: "Este campo es requerido",
  INVALID_EMAIL: "Email inválido",
  INVALID_PASSWORD: "La contraseña debe tener al menos 8 caracteres, una mayúscula y un número",
  PASSWORDS_NOT_MATCH: "Las contraseñas no coinciden",
  INVALID_PHONE: "Teléfono inválido",
  INVALID_ACCOUNT_NUMBER: "Número de cuenta inválido",
  NETWORK_ERROR: "Error de conexión. Intenta de nuevo",
  SERVER_ERROR: "Error del servidor. Intenta más tarde",
  UNAUTHORIZED: "No autorizado. Por favor inicia sesión",
  FORBIDDEN: "No tienes permiso para acceder a esto",
  NOT_FOUND: "Recurso no encontrado",
} as const

// Mensajes de éxito
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: "Sesión iniciada correctamente",
  LOGOUT_SUCCESS: "Sesión cerrada correctamente",
  PROFILE_UPDATED: "Perfil actualizado correctamente",
  PAYMENT_SUCCESS: "Pago realizado correctamente",
  REQUEST_CREATED: "Solicitud creada correctamente",
  INCIDENT_REPORTED: "Incidencia reportada correctamente",
} as const

// Configuración de paginación
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [10, 25, 50, 100],
} as const

// Timeouts
export const TIMEOUTS = {
  API_TIMEOUT: 10000,
  ALERT_AUTO_DISMISS: 5000,
  DEBOUNCE_DELAY: 300,
} as const
