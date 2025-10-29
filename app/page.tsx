export default function Page() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-900 mb-4">Electrocentro</h1>
          <p className="text-xl text-gray-600">Sistema de Gestión de Servicios de Energía Eléctrica</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-blue-800 mb-6">Estructura Base del Proyecto</h2>

          <p className="text-gray-700 mb-6">
            Este es el proyecto frontend base para Electrocentro, desarrollado con React y TypeScript. La estructura
            está lista para implementación modular con diferenciación por roles.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold text-gray-800 mb-2">Módulos Disponibles</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>✓ Gestión de Cuentas</li>
                <li>✓ Consumos y Suministros</li>
                <li>✓ Pagos y Recibos</li>
                <li>✓ Trámites y Solicitudes</li>
                <li>✓ Incidencias y Reclamos</li>
              </ul>
            </div>

            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold text-gray-800 mb-2">Tecnologías</h3>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>✓ React 18+ con TypeScript</li>
                <li>✓ React Router v6+</li>
                <li>✓ Axios para API</li>
                <li>✓ TailwindCSS v4</li>
                <li>✓ Framer Motion</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 rounded-lg p-8 border border-blue-200">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">Próximos Pasos</h3>
          <ol className="text-gray-700 space-y-2 list-decimal list-inside">
            <li>
              Revisar la estructura de carpetas en <code className="bg-white px-2 py-1 rounded text-sm">src/</code>
            </li>
            <li>
              Implementar componentes base en{" "}
              <code className="bg-white px-2 py-1 rounded text-sm">src/components/</code>
            </li>
            <li>
              Configurar servicios de API en <code className="bg-white px-2 py-1 rounded text-sm">src/api/</code>
            </li>
            <li>Desarrollar módulos funcionales según asignación</li>
            <li>Integrar con backend de Electrocentro</li>
          </ol>
        </div>

        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>Estructura base creada - Lista para implementación</p>
        </div>
      </div>
    </main>
  )
}
