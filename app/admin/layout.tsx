"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/src/store/authStore"
import { Navbar } from "@/src/components/common/Navbar"
import { motion } from "framer-motion"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, logout } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    if (!user || user.role !== "admin") {
      router.push("/login")
    }
  }, [user, router])

  if (!user || user.role !== "admin") return null

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  const menuOptions = [
    {
      label: "Gestión",
      submenu: [
        { label: "Suministros", onClick: () => router.push("/admin/suministros") },
        { label: "Usuarios", onClick: () => router.push("/admin/usuarios") },
      ],
    },
    {
      label: "Monitoreo",
      submenu: [
        { label: "Incidencias", onClick: () => router.push("/admin/incidencias") },
        { label: "Reclamos", onClick: () => router.push("/admin/reclamos") },
      ],
    },
    {
      label: "Reportes",
      submenu: [
        { label: "Consumo", onClick: () => router.push("/admin/reportes/consumo") },
        { label: "Pagos", onClick: () => router.push("/admin/reportes/pagos") },
        { label: "Incidencias", onClick: () => router.push("/admin/reportes/incidencias") },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar title="Electrocentro - Admin" menuOptions={menuOptions} userName={user.name} onLogout={handleLogout} />

      <div className="flex">
        {/* Sidebar */}
        <motion.aside
          className="w-64 bg-gradient-to-b from-blue-900 to-blue-800 text-white shadow-lg hidden lg:block"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <nav className="p-6 space-y-2">
            {menuOptions.map((item, idx) => (
              <div key={idx}>
                <p className="text-xs font-semibold text-blue-200 uppercase tracking-wider mb-2">{item.label}</p>
                <div className="space-y-1 mb-4">
                  {item.submenu?.map((subitem, subidx) => (
                    <button
                      key={subidx}
                      onClick={subitem.onClick}
                      className="w-full text-left px-3 py-2 text-sm text-blue-100 hover:bg-blue-700 hover:text-white rounded-lg transition-colors"
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
