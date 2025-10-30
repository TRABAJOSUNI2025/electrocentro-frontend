# Flujo de Autenticación - Electrocentro

## Descripción General

El sistema implementa un flujo de autenticación completo con diferenciación de roles (Cliente y Administrador) usando Zustand para gestión de estado global.

## Flujo de Navegación

### 1. Landing Page (/)

- Página inicial con información del sistema
- Botones para "Ingresar" y "Registrarse"
- Animaciones con Framer Motion
- Responsive (móvil y desktop)

### 2. Registro (/registro)

- Formulario con campos: nombre, correo, contraseña, confirmación
- Validaciones:
  - Todos los campos requeridos
  - Correo válido (contiene @)
  - Contraseña mínimo 4 caracteres
  - Contraseñas coincidentes
- Simula envío a API con setTimeout
- Redirige a /login después de registro exitoso

### 3. Login (/login)

- Formulario con correo y contraseña
- Validaciones básicas
- Determinación de rol:
  - Si el correo contiene "admin" → rol = "admin"
  - Si no → rol = "cliente"
- Usuarios de prueba:
  - Cliente: cliente@correo.com / 1234
  - Admin: admin@correo.com / 1234
- Guarda usuario y token en authStore
- Redirige según rol:
  - Cliente → /cliente/bienvenida
  - Admin → /admin/bienvenida

### 4. Pantalla de Bienvenida

- **Cliente** (/cliente/bienvenida):

  - Saludo personalizado
  - Acceso rápido a: Consumos, Recibos, Reclamos
  - Información útil (consumo promedio, próximo vencimiento)

- **Admin** (/admin/bienvenida):
  - Saludo personalizado
  - Acceso rápido a: Incidencias, Reportes, Suministros
  - Estadísticas del sistema

### 5. Layouts por Rol

#### ClienteLayout (/cliente/\*)

- Navbar superior con opciones de menú
- Sidebar con navegación:
  - Cuentas (Mi Perfil, Mis Cuentas)
  - Consumos (Ver Consumos, Reportes)
  - Pagos (Consultar Recibos, Realizar Pago)
  - Trámites (Mis Solicitudes, Nueva Solicitud)
  - Incidencias (Mis Reclamos, Reportar Reclamo)
- Botón de Salir que limpia el estado

#### AdminLayout (/admin/\*)

- Navbar superior con opciones de menú
- Sidebar oscuro con navegación:
  - Gestión (Suministros, Usuarios)
  - Monitoreo (Incidencias, Reclamos)
  - Reportes (Consumo, Pagos, Incidencias)
- Botón de Salir que limpia el estado

## Gestión de Estado (Zustand)

### authStore

\`\`\`typescript
interface AuthState {
user: User | null
token: string | null
isLoading: boolean
error: string | null
setUser: (user: User | null) => void
setToken: (token: string | null) => void
setLoading: (loading: boolean) => void
setError: (error: string | null) => void
logout: () => void
hydrate: () => void
}
\`\`\`

### Persistencia

- Usuario y token se guardan en localStorage
- Se restauran automáticamente al recargar la página
- Se limpian al hacer logout

## Protección de Rutas

### Rutas Públicas

- `/` - Landing Page
- `/login` - Página de Login
- `/registro` - Página de Registro

### Rutas Protegidas

- `/cliente/*` - Solo accesibles si user.role === 'cliente'
- `/admin/*` - Solo accesibles si user.role === 'admin'

### Validaciones

- Si no hay usuario autenticado → redirige a /login
- Si usuario intenta acceder a ruta de otro rol → redirige a su ruta correspondiente

## Datos de Prueba

### Usuarios Disponibles

\`\`\`
Cliente:

- Email: cliente@correo.com
- Contraseña: 1234
- Rol: cliente
- Nombre: Juan Pérez

Admin:

- Email: admin@correo.com
- Contraseña: 1234
- Rol: admin
- Nombre: Carla Supervisor
  \`\`\`

## Componentes Utilizados

- **Navbar**: Barra de navegación superior con menú desplegable
- **Button**: Botones reutilizables
- **Input**: Campos de entrada
- **Alert**: Mensajes de error y éxito
- **Framer Motion**: Animaciones suaves

## Próximos Pasos

1. Implementar módulos funcionales (Consumos, Pagos, Trámites, Incidencias)
2. Conectar con API real
3. Implementar autenticación con JWT
4. Agregar más validaciones y manejo de errores
5. Implementar recuperación de contraseña
