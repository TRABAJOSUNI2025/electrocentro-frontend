"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function LandingPage() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  }

  const floatingVariants = {
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 3,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  }

  if (!isClient) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 overflow-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <motion.div
              className="flex items-center gap-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">E</span>
              </div>
              <span className="font-bold text-xl text-gray-900">Electrocentro</span>
            </motion.div>

            {/* Buttons */}
            <motion.div
              className="flex items-center gap-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link href="/login" className="px-6 py-2 text-blue-600 font-medium hover:text-blue-800 transition-colors">
                Ingresar
              </Link>
              <Link
                href="/registro"
                className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
              >
                Registrarse
              </Link>
            </motion.div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <motion.div
        className="pt-32 pb-20 px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div variants={itemVariants} className="space-y-8">
              <div>
                <motion.h1
                  className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight"
                  variants={itemVariants}
                >
                  Electrocentro
                </motion.h1>
                <motion.p className="text-2xl text-gray-600 mt-4 leading-relaxed" variants={itemVariants}>
                  Energía que impulsa tu hogar y tu empresa
                </motion.p>
              </div>

              <motion.p className="text-lg text-gray-600 leading-relaxed max-w-lg" variants={itemVariants}>
                Gestiona tus suministros de energía eléctrica de forma simple y segura. Consulta consumos, realiza pagos
                y reporta incidencias en tiempo real.
              </motion.p>

              <motion.div className="flex flex-col sm:flex-row gap-4" variants={itemVariants}>
                <Link
                  href="/login"
                  className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl text-center"
                >
                  Iniciar Sesión
                </Link>
                <Link
                  href="/registro"
                  className="px-8 py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-all text-center"
                >
                  Crear Cuenta
                </Link>
              </motion.div>

              {/* Features */}
              <motion.div className="space-y-4 pt-8" variants={itemVariants}>
                {[
                  "Consulta tu consumo en tiempo real",
                  "Realiza pagos de forma segura",
                  "Reporta incidencias al instante",
                ].map((feature, idx) => (
                  <motion.div key={idx} className="flex items-center gap-3" variants={itemVariants}>
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">✓</span>
                    </div>
                    <span className="text-gray-700">{feature}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Illustration */}
            <motion.div className="relative h-96 lg:h-full flex items-center justify-center" variants={itemVariants}>
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-blue-600/20 rounded-3xl blur-3xl"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
              />
              <motion.div
                className="relative w-64 h-64 bg-gradient-to-br from-blue-500 to-blue-700 rounded-3xl shadow-2xl flex items-center justify-center"
                variants={floatingVariants}
                animate="animate"
              >
                <div className="text-center">
                  <div className="text-6xl mb-4">⚡</div>
                  <p className="text-white font-semibold text-lg">Energía Confiable</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Features Section */}
      <motion.div
        className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-4xl font-bold text-center text-gray-900 mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Características Principales
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "📊",
                title: "Monitoreo de Consumo",
                description: "Visualiza tu consumo de energía en gráficos detallados y recibe alertas de uso anómalo.",
              },
              {
                icon: "💳",
                title: "Pagos Seguros",
                description: "Realiza pagos de tus recibos de forma rápida y segura desde cualquier dispositivo.",
              },
              {
                icon: "🔧",
                title: "Gestión de Solicitudes",
                description: "Solicita cambios de plan, reporta incidencias y realiza trámites en línea.",
              },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        className="py-20 px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-12 text-center shadow-2xl">
          <motion.h2
            className="text-3xl lg:text-4xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Comienza Ahora
          </motion.h2>
          <motion.p
            className="text-lg text-blue-100 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Accede a tu cuenta o crea una nueva para gestionar tu energía
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Link
              href="/login"
              className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Ingresar
            </Link>
            <Link
              href="/registro"
              className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
            >
              Registrarse
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <p>© 2025 Electrocentro. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  )
}
