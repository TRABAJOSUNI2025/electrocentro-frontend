"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { useAuthStore } from "@/src/store/authStore"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function BienvenidaAdminPage() {
  const { user } = useAuthStore()
  const router = useRouter()

  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    // Esperar un breve tick para permitir la hidratación del store
    const t = setTimeout(() => setHydrated(true), 50)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    // Si ya pasó la hidratación y no hay usuario válido, redirigir a login
    if (hydrated) {
      const tokenCookie = document.cookie.split('; ').find((c) => c.startsWith('ec_token='))
      if (!user || user.role !== "admin") {
        // Si no hay token en cookies, redirigir; si hay token pero store vacío, esperar
        if (!tokenCookie) {
          router.push("/login")
        }
      }
    }
  }, [hydrated, user, router])

  if (!hydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>Cargando...</div>
      </div>
    )
  }

  if (!user || user.role !== "admin") return null

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  const adminItems = [
    {
      icon: "⚠️",
      title: "Monitorear Incidencias",
      description: "Gestiona incidencias reportadas",
      href: "/admin/incidencias",
    },
    {
      icon: "📈",
      title: "Ver Reportes",
      description: "Analiza reportes del sistema",
      href: "/admin/reportes",
    },
    {
      icon: "🔌",
      title: "Gestionar Suministros",
      description: "Administra suministros de energía",
      href: "/admin/suministros",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900/5 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-900 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-3xl font-bold">
              Bienvenido, <span className="text-blue-200">{user.name}</span>
            </h1>
            <p className="text-blue-100 mt-2">Panel de administración - Gestiona reportes, suministros e incidencias</p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Card */}
        <motion.div
          className="bg-gradient-to-r from-blue-700 to-blue-900 rounded-xl shadow-lg p-8 text-white mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-bold mb-4">Panel de Administración</h2>
          <p className="text-blue-100">
            Desde aquí puedes monitorear el sistema, gestionar incidencias y acceder a reportes detallados.
          </p>
        </motion.div>

        {/* Admin Actions */}
        <motion.div className="mb-12" variants={containerVariants} initial="hidden" animate="visible">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Acciones Principales</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {adminItems.map((item, idx) => (
              <motion.div key={idx} variants={itemVariants}>
                <Link href={item.href}>
                  <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 cursor-pointer h-full border-l-4 border-blue-600">
                    <div className="text-4xl mb-4">{item.icon}</div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h4>
                    <p className="text-gray-600 text-sm">{item.description}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="bg-white rounded-lg shadow-md p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3 className="text-xl font-bold text-gray-900 mb-6">Estadísticas del Sistema</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { label: "Usuarios Activos", value: "1,234" },
              { label: "Incidencias Pendientes", value: "45" },
              { label: "Suministros", value: "5,678" },
              { label: "Consumo Total (kWh)", value: "125,430" },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 + idx * 0.1 }}
              >
                <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
                <p className="text-2xl font-bold text-blue-900 mt-2">{stat.value}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
