"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { useAuthStore } from "@/src/store/authStore"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function BienvenidaClientePage() {
  const { user } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push("/login")
    }
  }, [user, router])

  if (!user) return null

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

  const quickAccessItems = [
    {
      icon: "📊",
      title: "Ver Consumos",
      description: "Consulta tu consumo de energía",
      href: "/cliente/consumos",
    },
    {
      icon: "📄",
      title: "Consultar Recibos",
      description: "Revisa tus recibos y pagos",
      href: "/cliente/pagos",
    },
    {
      icon: "🔧",
      title: "Reportar Reclamo",
      description: "Reporta incidencias o problemas",
      href: "/cliente/incidencias",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-3xl font-bold text-gray-900">
              Bienvenido, <span className="text-blue-600">{user.name}</span>
            </h1>
            <p className="text-gray-600 mt-2">Accede a tus consumos, pagos y solicitudes desde aquí</p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Card */}
        <motion.div
          className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl shadow-lg p-8 text-white mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-bold mb-4">Tu Panel de Control</h2>
          <p className="text-blue-100">
            Desde aquí puedes gestionar todos tus servicios de energía eléctrica de forma rápida y segura.
          </p>
        </motion.div>

        {/* Quick Access */}
        <motion.div className="mb-12" variants={containerVariants} initial="hidden" animate="visible">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Acceso Rápido</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quickAccessItems.map((item, idx) => (
              <motion.div key={idx} variants={itemVariants}>
                <Link href={item.href}>
                  <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 cursor-pointer h-full">
                    <div className="text-4xl mb-4">{item.icon}</div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h4>
                    <p className="text-gray-600 text-sm">{item.description}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Info Section */}
        <motion.div
          className="bg-white rounded-lg shadow-md p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3 className="text-xl font-bold text-gray-900 mb-4">Información Útil</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Consumo Promedio</h4>
              <p className="text-gray-600">Tu consumo promedio mensual es de 250 kWh</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Próximo Vencimiento</h4>
              <p className="text-gray-600">Tu próximo recibo vence el 15 de noviembre</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
