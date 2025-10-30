"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import Link from "next/link"
import { useAuthStore } from "@/src/store/authStore"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Datos de prueba simulados
const MOCK_USERS = [
  { email: "cliente@correo.com", password: "1234", role: "cliente", name: "Juan Pérez" },
  { email: "admin@correo.com", password: "1234", role: "admin", name: "Carla Supervisor" },
]

export default function LoginPage() {
  const router = useRouter()
  const { setUser, setToken } = useAuthStore()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const validateEmail = (email: string) => email.includes("@")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess(false)

    // Validaciones
    if (!email || !password) {
      setError("Por favor completa todos los campos")
      return
    }

    if (!validateEmail(email)) {
      setError("Por favor ingresa un correo válido")
      return
    }

    setLoading(true)

    // Simular petición a API
    setTimeout(() => {
      // Buscar usuario en datos de prueba
      const user = MOCK_USERS.find((u) => u.email === email && u.password === password)

      if (user) {
        // Determinar rol basado en el email
        const role = email.includes("admin") ? "admin" : "cliente"

        // Guardar en store
        setUser({
          id: "1",
          name: user.name,
          email: user.email,
          role: role as "cliente" | "admin",
        })
        setToken("mock-token-" + Date.now())

        setSuccess(true)

        // Redirigir después de 1.5 segundos
        setTimeout(() => {
          router.push(role === "admin" ? "/admin/bienvenida" : "/cliente/bienvenida")
        }, 1500)
      } else {
        setError("Correo o contraseña incorrectos")
      }

      setLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-4">
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center mx-auto mb-4 shadow-lg">
            <span className="text-white font-bold text-2xl">E</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Electrocentro</h1>
          <p className="text-gray-600 mt-2">Inicia sesión en tu cuenta</p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          {error && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-4">
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            </motion.div>
          )}

          {success && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-4">
              <Alert className="bg-green-50 border-green-200">
                <AlertDescription className="text-green-800">
                  Inicio de sesión exitoso. Redirigiendo...
                </AlertDescription>
              </Alert>
            </motion.div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Correo Electrónico</label>
              <Input
                type="email"
                placeholder="tu@correo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Contraseña</label>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                className="w-full"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-colors"
            >
              {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
            </Button>
          </form>

          {/* Demo Users */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-3 font-medium">Usuarios de prueba:</p>
            <div className="space-y-2 text-xs text-gray-600">
              <p>Cliente: cliente@correo.com / 1234</p>
              <p>Admin: admin@correo.com / 1234</p>
            </div>
          </div>
        </div>

        {/* Register Link */}
        <p className="text-center text-gray-600 mt-6">
          ¿No tienes cuenta?{" "}
          <Link href="/registro" className="text-blue-600 font-semibold hover:text-blue-700">
            Regístrate aquí
          </Link>
        </p>
      </motion.div>
    </div>
  )
}
