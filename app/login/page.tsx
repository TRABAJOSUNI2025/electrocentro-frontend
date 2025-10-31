"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth } from "@/src/hooks/useAuth"
import { setCookie } from "@/src/utils/cookies"
import type { User, UserRole } from "@/src/types/user"

// Datos de prueba simulados
const MOCK_USERS = [
  { email: "cliente@correo.com", password: "1234", role: "cliente" as UserRole, name: "Juan Pérez" },
  { email: "admin@correo.com", password: "1234", role: "admin" as UserRole, name: "Carla Supervisor" },
]

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuth()
  // Al montar, comprobar cookies para decidir redirección automática
  useEffect(() => {
    try {
      const cookies = document.cookie.split('; ').reduce((acc: any, cur) => {
        const [k, v] = cur.split('=')
        acc[k] = decodeURIComponent(v || '')
        return acc
      }, {})

      const token = cookies['ec_token']
      const userStr = cookies['ec_user']

      if (token && userStr) {
        try {
          const parsed = JSON.parse(userStr)
          // Sólo redirigir si parsed.role existe
          if (parsed && parsed.role) {
            router.replace(parsed.role === 'admin' ? '/admin/bienvenida' : '/cliente/bienvenida')
            return
          }
        } catch (e) {
          // Si la cookie ec_user está corrupta, eliminar cookies y mostrar login
          document.cookie = `ec_user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
          document.cookie = `ec_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
          document.cookie = `user_role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
        }
      }
    } catch (e) {
      // ignore
    }
  }, [router])
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

    try {
      // Simular petición a API
      const user = MOCK_USERS.find((u) => u.email === email && u.password === password)

      if (!user) {
        throw new Error("Correo o contraseña incorrectos")
      }

      // Generar token de prueba
      const token = "mock-token-" + Date.now()

      // Crear objeto de usuario con el formato esperado
      const userData: User = {
        id: "1",
        name: user.name,
        email: user.email,
        role: user.role,
      }

        // Guardar token y rol en cookies para el middleware
        setCookie("ec_token", token)
        setCookie("user_role", userData.role)

      // Llamar a login del hook useAuth que ahora maneja el estado
      await login(userData, token)

      setSuccess(true)

      // Redirigir según el rol
      router.replace(user.role === "admin" ? "/admin/bienvenida" : "/cliente/bienvenida")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al iniciar sesión")
    } finally {
      setLoading(false)
    }
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
