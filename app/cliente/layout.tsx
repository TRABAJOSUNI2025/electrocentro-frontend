"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/src/store/authStore"
import { Navbar } from "@/src/components/common/Navbar"
import { motion } from "framer-motion"

export default function ClienteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, logout } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push("/login")
    }
  }, [user, router])

  if (!user) return null

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  const menuOptions = [
    {
      label: "Cuentas",
      submenu: [
        { label: "Mi Perfil", onClick: () => router.push("/cliente/perfil") },
        { label: "Mis Cuentas", onClick: () => router.push("/cliente/cuentas") },
      ],
    },
    {
      label: "Consumos",
      submenu: [
        { label: "Ver Consumos", onClick: () => router.push("/cliente/consumos") },
        { label: "Reportes", onClick: () => router.push("/cliente/reportes") },
      ],
    },
    {
      label: "Pagos",
      submenu: [
        { label: "Consultar Recibos", onClick: () => router.push("/cliente/pagos") },
        { label: "Realizar Pago", onClick: () => router.push("/cliente/pagos/nuevo") },
      ],
    },
    {
      label: "Trámites",
      submenu: [
        { label: "Mis Solicitudes", onClick: () => router.push("/cliente/tramites") },
        { label: "Nueva Solicitud", onClick: () => router.push("/cliente/tramites/nueva") },
      ],
    },
    {
      label: "Incidencias",
      submenu: [
        { label: "Mis Reclamos", onClick: () => router.push("/cliente/incidencias") },
        { label: "Reportar Reclamo", onClick: () => router.push("/cliente/incidencias/nuevo") },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar title="Electrocentro" menuOptions={menuOptions} userName={user.name} onLogout={handleLogout} />

      <div className="flex">
        {/* Sidebar */}
        <motion.aside
          className="w-64 bg-white border-r border-gray-200 shadow-sm hidden lg:block"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <nav className="p-6 space-y-2">
            {menuOptions.map((item, idx) => (
              <div key={idx}>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">{item.label}</p>
                <div className="space-y-1 mb-4">
                  {item.submenu?.map((subitem, subidx) => (
                    <button
                      key={subidx}
                      onClick={subitem.onClick}
                      className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
                    >
                      {subitem.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </nav>
        </motion.aside>

        {/* Main Content */}
        <main className="flex-1">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  )
}
