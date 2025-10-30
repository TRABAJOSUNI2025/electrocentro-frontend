# Electrocentro - Frontend

Sistema de gestión de servicios de energía eléctrica para clientes particulares y empresas.

## Descripción

Aplicación frontend desarrollada con React y TypeScript para la plataforma Electrocentro. Proporciona interfaces diferenciadas para administradores y clientes con funcionalidades de gestión de cuentas, consumos, pagos, trámites e incidencias.

## Tecnologías

- **Framework**: React 18+ con TypeScript
- **Gestor de dependencias**: npm
- **Comunicación**: Axios
- **Ruteo**: React Router v6+
- **Estilos**: TailwindCSS v4
- **Animaciones**: Framer Motion (referencias)
- **Gestión de estado**: Zustand o Redux

## Estructura de carpetas

\`\`\`
src/
├── api/ # Configuración de Axios y servicios globales
│ ├── apiClient.ts # Cliente HTTP con interceptores
│ └── services.ts # Servicios de API (auth, accounts, etc.)
├── assets/ # Imágenes, iconos, fuentes
├── components/ # Componentes reutilizables
│ ├── common/ # Componentes base (Button, Input, Card, etc.)
│ └── form/ # Componentes de formulario (Field, Select)
├── hooks/ # Hooks personalizados (useAuth, useFetch, useForm)
├── layouts/ # Layouts por rol (AdminLayout, ClientLayout, AuthLayout)
├── modules/ # Módulos funcionales según roles
│ ├── cuentas/ # Gestión de cuentas y autenticación
│ ├── consumos/ # Visualización de consumos y suministros
│ ├── pagos/ # Gestión de pagos y recibos
│ ├── tramites/ # Trámites y solicitudes
│ └── incidencias/ # Incidencias y reclamos
├── routes/ # Configuración de rutas y rutas protegidas
├── store/ # Manejo de estado global (Zustand)
├── styles/ # Estilos globales y animaciones
├── types/ # Tipos e interfaces globales
├── utils/ # Funciones auxiliares
├── App.tsx # Componente raíz
└── main.tsx # Punto de entrada
\`\`\`

## Módulos

### 1. Gestión de Cuentas (cuentas/)

- **Login**: Autenticación compartida para Cliente y Admin
- **Registro**: Registro de nuevos clientes
- **Dashboard Cliente**: Panel principal para clientes
- **Dashboard Supervisor**: Panel principal para administradores

### 2. Consumos y Suministros (consumos/)

- **Visualizar Consumo**: Gráficos y estadísticas de consumo
- **Gestión Suministros**: Administración de suministros del cliente
- **Agregar Suministro**: Formulario para nuevos suministros
- **Generar Reporte**: Reportes de consumo
- **Gestión Admin**: Administración completa de suministros

### 3. Pagos (pagos/)

- **Consulta Recibos**: Listado y búsqueda de recibos
- **Detalle Recibo**: Información completa del recibo
- **Pasarela de Pago**: Integración de pagos
- **Reporte Admin**: Reportes de pagos para administradores

### 4. Trámites y Solicitudes (tramites/)

- **Solicitud Conexión**: Formulario para nueva conexión
- **Cambio Titularidad**: Cambio de titular de cuenta
- **Cambio Plan**: Cambio de plan de servicio
- **Corte Temporal**: Solicitud de corte temporal
- **Programar Corte**: Programación de cortes (Admin)
- **Gestión Solicitudes**: Administración de solicitudes (Admin)

### 5. Incidencias y Reclamos (incidencias/)

- **Formulario Reclamo**: Registro de reclamos
- **Consulta Reclamos**: Historial de reclamos
- **Reportar Incidencia**: Reporte de incidencias técnicas
- **Monitoreo Incidencias**: Monitoreo en tiempo real (Admin)
- **Gestión Reclamos**: Administración de reclamos (Admin)

## Diferenciación por Rol

### Cliente

- Acceso a módulos: Cuentas, Consumos, Pagos, Trámites, Incidencias
- Layout: ClientLayout con Navbar y Sidebar simplificado
- Funcionalidades: Consulta, solicitudes, pagos

### Administrador

- Acceso a todos los módulos con funcionalidades extendidas
- Layout: AdminLayout con Navbar y Sidebar completo
- Funcionalidades: Gestión, reportes, monitoreo

## Componentes y Hooks Comunes Implementados

### Componentes Reutilizables (src/components/common/)

- **Button**: Variantes primary, secondary, danger con animaciones
- **Input**: Tipos text, email, password, number con validación
- **Card**: Contenedor con header, body, footer slots
- **Modal**: Diálogos modales accesibles con animaciones Framer Motion
- **Table**: Tablas genéricas tipadas con paginación
- **Navbar**: Barra de navegación con dropdowns
- **Sidebar**: Menú lateral colapsable con submenús
- **Loading**: Spinners y skeleton loaders animados
- **Alert**: Alertas de success, error, warning, info con auto-dismiss

### Componentes de Formulario (src/components/form/)

- **Field**: Wrapper para label + input + error
- **Select**: Select tipado con validación

### Hooks Personalizados (src/hooks/)

- **useAuth**: Autenticación, login, logout y gestión de sesión
- **useFetch**: Fetching genérico de datos con caching y refetch
- **useForm**: Manejo de formularios con validación integrada

### Servicios de API (src/api/services.ts)

- **authService**: Login, logout, perfil
- **accountService**: Gestión de cuentas
- **consumptionService**: Consumos de energía
- **paymentService**: Pagos e invoices
- **requestService**: Trámites y solicitudes
- **incidentService**: Incidencias y reclamos

### Utilidades (src/utils/)

- **validators.ts**: isEmail, isRequired, minLength, isValidPassword, isValidPhone, etc.
- **formatters.ts**: formatCurrency, formatDate, formatKWh, formatNumber, etc.
- **constants.ts**: ROLES, REQUEST_STATUS, PAYMENT_STATUS, API_ENDPOINTS, COLORS, ERROR_MESSAGES

### Documentación

- **src/README_COMPONENTS.md**: Documentación completa de componentes, hooks y ejemplos de uso

## Diseño

- **Colores base**: Azul claro (#1E90FF) y blanco
- **Estilo**: Limpio y profesional
- **Animaciones**: Suaves transiciones con Framer Motion
- **Responsive**: Mobile-first design con Tailwind CSS

## Fases de Implementación

### Fase 1: Estructura Base ✓

- Creación de carpetas y archivos
- Configuración de herramientas
- Definición de tipos

### Fase 2: Componentes Base ✓

- Implementación de componentes reutilizables
- Configuración de estilos
- Setup de Axios y servicios

### Fase 3: Módulo de Cuentas

- Implementación de autenticación
- Dashboards por rol
- Gestión de sesión

### Fase 4: Módulos Funcionales

- Consumos y suministros
- Pagos y recibos
- Trámites y solicitudes
- Incidencias y reclamos

### Fase 5: Integración y Testing

- Integración con backend
- Testing de componentes
- Optimización de rendimiento

## Instalación

\`\`\`bash
npm install
\`\`\`

## Desarrollo

\`\`\`bash
npm run dev
\`\`\`

## Build

\`\`\`bash
npm run build
\`\`\`

## Cómo Usar los Componentes y Hooks

### Ejemplo: Formulario de Login

\`\`\`tsx
import { useForm } from '@/hooks'
import { Button, Input, Alert } from '@/components/common'
import { isEmail, isRequired } from '@/utils'

export function LoginForm() {
const { values, errors, handleChange, handleSubmit, isSubmitting } = useForm({
initialValues: { email: '', password: '' },
validate: (values) => {
const errors: Record<string, string> = {}
if (!isRequired(values.email)) errors.email = 'Email requerido'
if (!isEmail(values.email)) errors.email = 'Email inválido'
if (!isRequired(values.password)) errors.password = 'Contraseña requerida'
return errors
},
onSubmit: async (values) => {
// Lógica de login
},
})

return (
<form onSubmit={handleSubmit}>
<Input
        label="Email"
        name="email"
        value={values.email}
        onChange={handleChange}
        error={errors.email}
      />
<Input
        label="Contraseña"
        name="password"
        type="password"
        value={values.password}
        onChange={handleChange}
        error={errors.password}
      />
<Button type="submit" isLoading={isSubmitting}>
Iniciar Sesión
</Button>
</form>
)
}
\`\`\`

### Ejemplo: Listado de Cuentas

\`\`\`tsx
import { useFetch } from '@/hooks'
import { Table, Loading, Alert } from '@/components/common'
import { accountService } from '@/api/services'

export function AccountsList() {
const { data: accounts, isLoading, error, refetch } = useFetch(
'accounts',
() => accountService.getAccounts()
)

if (isLoading) return <Loading message="Cargando cuentas..." />
if (error) return <Alert type="error" message={error.message} />

return (
<Table
data={accounts || []}
columns={[
{ key: 'id', label: 'ID' },
{ key: 'name', label: 'Nombre' },
{ key: 'email', label: 'Email' },
{ key: 'status', label: 'Estado' },
]}
showIndex
/>
)
}
\`\`\`

## Notas Importantes

- Todos los archivos están comentados indicando su propósito
- Los componentes y hooks están listos para usar en los módulos funcionales
- La estructura permite trabajo paralelo de múltiples desarrolladores
- Las rutas protegidas validan rol y autenticación
- El estado global se maneja con Zustand
- Las animaciones se implementan con Framer Motion
- Consulta `src/README_COMPONENTS.md` para documentación detallada
  \`\`\`

He actualizado el README.md con la información de los componentes, hooks y utilidades implementados. Se agregó una sección "Componentes y Hooks Comunes Implementados" que documenta todo lo que se ha creado, ejemplos de uso prácticos, y referencias a la documentación detallada en `src/README_COMPONENTS.md`.
