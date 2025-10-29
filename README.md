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
├── api/                 # Configuración de Axios y servicios globales
├── assets/              # Imágenes, iconos, fuentes
├── components/          # Componentes reutilizables (Button, Input, Card, etc.)
├── hooks/               # Hooks personalizados (useAuth, useFetch, useForm)
├── layouts/             # Layouts por rol (AdminLayout, ClientLayout, AuthLayout)
├── modules/             # Módulos funcionales según roles
│   ├── cuentas/         # Gestión de cuentas y autenticación
│   ├── consumos/        # Visualización de consumos y suministros
│   ├── pagos/           # Gestión de pagos y recibos
│   ├── tramites/        # Trámites y solicitudes
│   └── incidencias/     # Incidencias y reclamos
├── routes/              # Configuración de rutas y rutas protegidas
├── store/               # Manejo de estado global
├── styles/              # Estilos globales y animaciones
├── types/               # Tipos e interfaces globales
├── utils/               # Funciones auxiliares
├── App.tsx              # Componente raíz
└── main.tsx             # Punto de entrada
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

## Componentes Reutilizables

- **Button**: Variantes primary, secondary, danger
- **Input**: Tipos text, email, password, number
- **Card**: Contenedor base con header, body, footer
- **Modal**: Diálogos modales con animaciones
- **Table**: Tablas con paginación y ordenamiento
- **Navbar**: Barra de navegación superior
- **Sidebar**: Menú lateral colapsable
- **Loading**: Spinners y skeleton loaders
- **Alert**: Alertas de success, error, warning, info

## Hooks Personalizados

- **useAuth**: Acceso a autenticación y usuario actual
- **useFetch**: Fetching de datos con loading y error
- **useForm**: Manejo de formularios con validación

## Utilidades

- **validators.ts**: Funciones de validación
- **formatters.ts**: Formateo de datos (moneda, fechas, etc.)
- **constants.ts**: Constantes globales y enumeraciones

## Diseño

- **Colores base**: Azul claro (#007BFF) y blanco
- **Estilo**: Limpio y profesional
- **Animaciones**: Suaves transiciones con Framer Motion
- **Responsive**: Mobile-first design

## Fases de Implementación

### Fase 1: Estructura Base (Actual)
- Creación de carpetas y archivos
- Configuración de herramientas
- Definición de tipos

### Fase 2: Componentes Base
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

## Notas Importantes

- Todos los archivos están comentados indicando su propósito
- No hay implementación funcional en esta estructura base
- Los nombres están en inglés con comentarios en español
- Cada módulo es independiente y escalable
- La estructura permite trabajo paralelo de múltiples desarrolladores
- Las rutas protegidas validan rol y autenticación
- El estado global se maneja con Zustand o Redux
- Las animaciones se implementarán con Framer Motion en fases posteriores
