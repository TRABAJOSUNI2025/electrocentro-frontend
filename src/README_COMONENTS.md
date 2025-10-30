# Componentes y Hooks Comunes - Electrocentro

Documentación de componentes reutilizables, hooks personalizados y utilidades para el proyecto Electrocentro.

## Componentes Comunes

### Button

Botón reutilizable con múltiples variantes y estados.

**Props:**

- `variant?: 'primary' | 'secondary' | 'danger'` - Estilo del botón (default: 'primary')
- `isLoading?: boolean` - Mostrar estado de carga
- `disabled?: boolean` - Deshabilitar botón
- `onClick?: () => void` - Callback al hacer click
- `children: React.ReactNode` - Contenido del botón

**Ejemplo:**
\`\`\`tsx
import { Button } from '@/components/common'

export function MyComponent() {
return (
<>
<Button variant="primary" onClick={() => console.log('Click')}>
Guardar
</Button>
<Button variant="danger" disabled>
Eliminar
</Button>
<Button isLoading>
Cargando...
</Button>
</>
)
}
\`\`\`

### Input

Input reutilizable con label, validación y mensajes de error.

**Props:**

- `label?: string` - Etiqueta del input
- `name: string` - Nombre del input
- `value: string` - Valor actual
- `onChange: (e) => void` - Callback de cambio
- `error?: string` - Mensaje de error
- `helperText?: string` - Texto de ayuda
- `type?: string` - Tipo de input (default: 'text')
- `placeholder?: string` - Placeholder

**Ejemplo:**
\`\`\`tsx
import { Input } from '@/components/common'
import { useState } from 'react'

export function LoginForm() {
const [email, setEmail] = useState('')
const [error, setError] = useState('')

return (
<Input
label="Email"
name="email"
value={email}
onChange={(e) => setEmail(e.target.value)}
error={error}
helperText="Ingresa tu email de Electrocentro"
type="email"
placeholder="usuario@electrocentro.com"
/>
)
}
\`\`\`

### Card

Contenedor con header, body y footer slots.

**Props:**

- `children: React.ReactNode` - Contenido principal
- `header?: React.ReactNode` - Contenido del header
- `footer?: React.ReactNode` - Contenido del footer
- `className?: string` - Clases CSS adicionales

**Ejemplo:**
\`\`\`tsx
import { Card } from '@/components/common'

export function AccountCard() {
return (
<Card
header={<h3>Mi Cuenta</h3>}
footer={<button>Ver Detalles</button>} >
<p>Número de cuenta: 12345678</p>
<p>Estado: Activo</p>
</Card>
)
}
\`\`\`

### Modal

Modal accesible con animaciones.

**Props:**

- `isOpen: boolean` - Mostrar modal
- `onClose: () => void` - Callback al cerrar
- `title?: string` - Título del modal
- `children: React.ReactNode` - Contenido
- `showCloseButton?: boolean` - Mostrar botón cerrar (default: true)
- `size?: 'sm' | 'md' | 'lg'` - Tamaño (default: 'md')

**Ejemplo:**
\`\`\`tsx
import { Modal, Button } from '@/components/common'
import { useState } from 'react'

export function ConfirmDialog() {
const [isOpen, setIsOpen] = useState(false)

return (
<>
<Button onClick={() => setIsOpen(true)}>Abrir Modal</Button>
<Modal
isOpen={isOpen}
onClose={() => setIsOpen(false)}
title="Confirmar Acción" >
<p>¿Estás seguro de que deseas continuar?</p>
<div className="flex gap-2 mt-4">
<Button variant="primary" onClick={() => setIsOpen(false)}>
Confirmar
</Button>
<Button variant="secondary" onClick={() => setIsOpen(false)}>
Cancelar
</Button>
</div>
</Modal>
</>
)
}
\`\`\`

### Table

Tabla genérica tipada con paginación.

**Props:**

- `data: T[]` - Datos a mostrar
- `columns: Column<T>[]` - Definición de columnas
- `pageSize?: number` - Tamaño de página (default: 10)
- `onRowClick?: (row: T) => void` - Callback al hacer click en fila
- `showIndex?: boolean` - Mostrar índice (default: false)

**Ejemplo:**
\`\`\`tsx
import { Table } from '@/components/common'

interface Invoice {
id: string
amount: number
date: string
status: string
}

export function InvoicesList() {
const invoices: Invoice[] = [
{ id: '1', amount: 150.50, date: '2024-01-15', status: 'Pagado' },
{ id: '2', amount: 200.00, date: '2024-02-15', status: 'Pendiente' },
]

return (
<Table
data={invoices}
columns={[
{ key: 'id', label: 'ID' },
{ key: 'amount', label: 'Monto', render: (val) => `$${val}` },
{ key: 'date', label: 'Fecha' },
{ key: 'status', label: 'Estado' },
]}
showIndex
onRowClick={(row) => console.log('Seleccionado:', row)}
/>
)
}
\`\`\`

### Alert

Alerta con múltiples tipos y auto-dismiss.

**Props:**

- `type?: 'success' | 'error' | 'info' | 'warning'` - Tipo (default: 'info')
- `title?: string` - Título
- `message: string` - Mensaje
- `isVisible?: boolean` - Mostrar alerta (default: true)
- `onClose?: () => void` - Callback al cerrar
- `autoDismiss?: number` - Auto-cerrar después de ms

**Ejemplo:**
\`\`\`tsx
import { Alert } from '@/components/common'
import { useState } from 'react'

export function PaymentSuccess() {
const [visible, setVisible] = useState(true)

return (
<Alert
type="success"
title="Pago Exitoso"
message="Tu pago ha sido procesado correctamente"
isVisible={visible}
onClose={() => setVisible(false)}
autoDismiss={5000}
/>
)
}
\`\`\`

### Loading

Spinner y skeleton placeholder.

**Props:**

- `isLoading?: boolean` - Mostrar spinner (default: true)
- `message?: string` - Mensaje de carga
- `skeleton?: boolean` - Mostrar skeleton
- `skeletonLines?: number` - Número de líneas (default: 3)

**Ejemplo:**
\`\`\`tsx
import { Loading } from '@/components/common'

export function DataFetcher() {
const [isLoading, setIsLoading] = useState(true)

return (
<>
{isLoading ? (
<Loading message="Cargando datos..." />
) : (
<div>Datos cargados</div>
)}
</>
)
}
\`\`\`

### Navbar

Barra de navegación superior.

**Props:**

- `menuOptions?: MenuItem[]` - Opciones del menú
- `onLogout?: () => void` - Callback logout
- `userName?: string` - Nombre del usuario
- `title?: string` - Título/Logo (default: 'Electrocentro')

**Ejemplo:**
\`\`\`tsx
import { Navbar } from '@/components/common'

export function AppNavbar() {
return (
<Navbar
title="Electrocentro"
userName="Juan Pérez"
menuOptions={[
{ label: 'Inicio', onClick: () => {} },
{
label: 'Servicios',
submenu: [
{ label: 'Cuentas', onClick: () => {} },
{ label: 'Consumos', onClick: () => {} },
],
},
]}
onLogout={() => console.log('Logout')}
/>
)
}
\`\`\`

### Sidebar

Menú lateral con collapse/expand.

**Props:**

- `items: SidebarItem[]` - Items del menú
- `collapsed?: boolean` - Mostrar colapsado
- `onCollapse?: (collapsed: boolean) => void` - Callback collapse

**Ejemplo:**
\`\`\`tsx
import { Sidebar } from '@/components/common'
import { useState } from 'react'

export function AppSidebar() {
const [collapsed, setCollapsed] = useState(false)

return (
<Sidebar
collapsed={collapsed}
onCollapse={setCollapsed}
items={[
{ label: 'Dashboard', icon: '📊', active: true },
{ label: 'Cuentas', icon: '👤' },
{
label: 'Servicios',
icon: '⚙️',
submenu: [
{ label: 'Consumos' },
{ label: 'Pagos' },
],
},
]}
/>
)
}
\`\`\`

## Hooks Personalizados

### useAuth

Hook para autenticación y gestión de sesión.

**Retorna:**

- `user: User | null` - Usuario actual
- `token: string | null` - Token de autenticación
- `isLoading: boolean` - Estado de carga
- `error: string | null` - Mensaje de error
- `login(email, password): Promise<void>` - Función de login
- `logout(): Promise<void>` - Función de logout
- `getUser(): User | null` - Obtener usuario actual

**Ejemplo:**
\`\`\`tsx
import { useAuth } from '@/hooks'

export function LoginPage() {
const { login, isLoading, error } = useAuth()

const handleLogin = async (email: string, password: string) => {
try {
await login(email, password)
// Redirigir a dashboard
} catch (err) {
console.error('Error:', err)
}
}

return (
<form onSubmit={(e) => {
e.preventDefault()
handleLogin('user@example.com', 'password123')
}}>
{error && <p className="text-red-500">{error}</p>}
<button disabled={isLoading}>
{isLoading ? 'Iniciando...' : 'Iniciar Sesión'}
</button>
</form>
)
}
\`\`\`

### useFetch

Hook genérico para fetching de datos.

**Parámetros:**

- `key: string` - Clave única para cacheo
- `fn: () => Promise<T>` - Función que retorna datos
- `deps?: any[]` - Dependencias

**Retorna:**

- `data: T | null` - Datos obtenidos
- `isLoading: boolean` - Estado de carga
- `error: ApiError | null` - Error si ocurre
- `refetch(): Promise<void>` - Refetch manual

**Ejemplo:**
\`\`\`tsx
import { useFetch } from '@/hooks'
import { accountService } from '@/api/services'

export function AccountsList() {
const { data: accounts, isLoading, error, refetch } = useFetch(
'accounts',
() => accountService.getAccounts()
)

if (isLoading) return <p>Cargando...</p>
if (error) return <p>Error: {error.message}</p>

return (
<>
<ul>
{accounts?.map((acc) => (
<li key={acc.id}>{acc.name}</li>
))}
</ul>
<button onClick={refetch}>Actualizar</button>
</>
)
}
\`\`\`

### useForm

Hook para manejo de formularios con validación.

**Parámetros:**

- `initialValues: T` - Valores iniciales
- `validate?: (values: T) => Record<keyof T, string>` - Función de validación
- `onSubmit?: (values: T) => Promise<void>` - Callback submit

**Retorna:**

- `values: T` - Valores actuales
- `errors: Record<keyof T, string>` - Errores de validación
- `isSubmitting: boolean` - Estado de envío
- `handleChange(e): void` - Handler de cambio
- `handleSubmit(e): Promise<void>` - Handler de submit
- `reset(): void` - Reset del formulario
- `setFieldValue(field, value): void` - Establecer valor
- `setFieldError(field, error): void` - Establecer error

**Ejemplo:**
\`\`\`tsx
import { useForm } from '@/hooks'
import { isEmail, isRequired } from '@/utils'

interface LoginForm {
email: string
password: string
}

export function LoginForm() {
const { values, errors, handleChange, handleSubmit } = useForm<LoginForm>({
initialValues: { email: '', password: '' },
validate: (values) => {
const errors: Record<string, string> = {}
if (!isRequired(values.email)) errors.email = 'Email requerido'
if (!isEmail(values.email)) errors.email = 'Email inválido'
if (!isRequired(values.password)) errors.password = 'Contraseña requerida'
return errors
},
onSubmit: async (values) => {
console.log('Enviando:', values)
},
})

return (
<form onSubmit={handleSubmit}>
<input
        name="email"
        value={values.email}
        onChange={handleChange}
        placeholder="Email"
      />
{errors.email && <p className="text-red-500">{errors.email}</p>}

      <input
        name="password"
        type="password"
        value={values.password}
        onChange={handleChange}
        placeholder="Contraseña"
      />
      {errors.password && <p className="text-red-500">{errors.password}</p>}

      <button type="submit">Iniciar Sesión</button>
    </form>

)
}
\`\`\`

## Utilidades

### Validadores

\`\`\`tsx
import {
isEmail,
isRequired,
minLength,
maxLength,
isValidPassword,
isValidPhone,
isValidAccountNumber,
isMatch,
isPositive,
} from '@/utils'

// Ejemplos
isEmail('user@example.com') // true
isRequired('texto') // true
minLength('password', 8) // true/false
isValidPassword('Pass123') // true
isValidPhone('+34 123 456 789') // true
\`\`\`

### Formateadores

\`\`\`tsx
import {
formatCurrency,
formatDate,
formatDateTime,
formatKWh,
formatNumber,
formatPercentage,
truncateText,
capitalize,
} from '@/utils'

// Ejemplos
formatCurrency(1500.50) // "$1,500.50"
formatDate('2024-01-15') // "15/01/2024"
formatKWh(250.5) // "250.50 kWh"
formatPercentage(0.85) // "85.0%"
truncateText('Texto largo...', 10) // "Texto lar..."
capitalize('electrocentro') // "Electrocentro"
\`\`\`

### Constantes

\`\`\`tsx
import {
ROLES,
REQUEST_STATUS,
PAYMENT_STATUS,
INCIDENT_TYPES,
API_ENDPOINTS,
COLORS,
ERROR_MESSAGES,
SUCCESS_MESSAGES,
} from '@/utils'

// Ejemplos
ROLES.ADMIN // "admin"
PAYMENT_STATUS.PAID // "paid"
API_ENDPOINTS.ACCOUNTS.LIST // "/accounts"
COLORS.PRIMARY // "#1E90FF"
ERROR_MESSAGES.INVALID_EMAIL // "Email inválido"
\`\`\`

## Servicios de API

### authService

\`\`\`tsx
import { authService } from '@/api/services'

// Login
const { user, token } = await authService.login('user@example.com', 'password')

// Logout
await authService.logout()

// Obtener perfil
const user = await authService.getProfile()

// Actualizar perfil
const updated = await authService.updateProfile({ name: 'Nuevo Nombre' })
\`\`\`

### accountService

\`\`\`tsx
import { accountService } from '@/api/services'

// Obtener cuentas
const accounts = await accountService.getAccounts()

// Obtener cuenta específica
const account = await accountService.getAccountById('123')

// Crear cuenta
const newAccount = await accountService.createAccount({ name: 'Nueva Cuenta' })

// Actualizar cuenta
const updated = await accountService.updateAccount('123', { name: 'Actualizado' })
\`\`\`

### Otros Servicios

Similar a `accountService`, existen servicios para:

- `consumptionService` - Consumos de energía
- `paymentService` - Pagos e invoices
- `requestService` - Trámites y solicitudes
- `incidentService` - Incidencias y reclamos

## Configuración de Estilos

El proyecto usa Tailwind CSS v4 con variables CSS personalizadas. Los colores están definidos en `src/utils/constants.ts` y se pueden usar directamente en clases Tailwind.

**Ejemplo:**
\`\`\`tsx

<div className="bg-blue-600 text-white p-4 rounded-lg">
  Contenido con estilos Tailwind
</div>
\`\`\`

## Estructura de Carpetas

\`\`\`
src/
├── api/
│ ├── apiClient.ts # Cliente HTTP con Axios
│ └── services.ts # Servicios de API
├── components/
│ ├── common/ # Componentes reutilizables
│ │ ├── Button.tsx
│ │ ├── Input.tsx
│ │ ├── Card.tsx
│ │ ├── Modal.tsx
│ │ ├── Table.tsx
│ │ ├── Alert.tsx
│ │ ├── Loading.tsx
│ │ ├── Navbar.tsx
│ │ ├── Sidebar.tsx
│ │ └── index.ts
│ └── form/ # Componentes de formulario
│ ├── Field.tsx
│ └── Select.tsx
├── hooks/
│ ├── useAuth.ts # Hook de autenticación
│ ├── useFetch.ts # Hook de fetching
│ ├── useForm.ts # Hook de formularios
│ └── index.ts
├── store/
│ └── authStore.ts # Store de Zustand
├── types/
│ ├── user.ts # Tipos de usuario
│ ├── api.ts # Tipos de API
│ └── index.ts
├── utils/
│ ├── validators.ts # Funciones de validación
│ ├── formatters.ts # Funciones de formato
│ ├── constants.ts # Constantes globales
│ └── index.ts
└── README_COMPONENTS.md # Esta documentación
