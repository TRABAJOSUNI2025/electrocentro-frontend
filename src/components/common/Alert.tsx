"use client"

// Componente Alert reutilizable
// Soporta múltiples tipos: success, error, info, warning
// Auto-dismiss opcional

import type React from "react"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface AlertProps {
  /** Tipo de alerta */
  type?: "success" | "error" | "info" | "warning"
  /** Título de la alerta */
  title?: string
  /** Mensaje de la alerta */
  message: string
  /** Mostrar alerta */
  isVisible?: boolean
  /** Callback cuando se cierra */
  onClose?: () => void
  /** Auto-cerrar después de ms */
  autoDismiss?: number
}

export const Alert: React.FC<AlertProps> = ({
  type = "info",
  title,
  message,
  isVisible = true,
  onClose,
  autoDismiss,
}) => {
  const [visible, setVisible] = useState(isVisible)

  useEffect(() => {
    setVisible(isVisible)
  }, [isVisible])

  useEffect(() => {
    if (!visible || !autoDismiss) return

    const timer = setTimeout(() => {
      setVisible(false)
      onClose?.()
    }, autoDismiss)

    return () => clearTimeout(timer)
  }, [visible, autoDismiss, onClose])

  const typeStyles = {
    success: "bg-green-50 border-green-200 text-green-800",
    error: "bg-red-50 border-red-200 text-red-800",
    info: "bg-blue-50 border-blue-200 text-blue-800",
    warning: "bg-yellow-50 border-yellow-200 text-yellow-800",
  }

  const iconStyles = {
    success: "text-green-600",
    error: "text-red-600",
    info: "text-blue-600",
    warning: "text-yellow-600",
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className={`border rounded-lg p-4 ${typeStyles[type]}`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          <div className="flex items-start gap-3">
            <span className={`text-xl ${iconStyles[type]}`}>
              {type === "success" && "✓"}
              {type === "error" && "✕"}
              {type === "info" && "ℹ"}
              {type === "warning" && "⚠"}
            </span>
            <div className="flex-1">
              {title && <h3 className="font-semibold">{title}</h3>}
              <p className="text-sm">{message}</p>
            </div>
            <button
              onClick={() => {
                setVisible(false)
                onClose?.()
              }}
              className="text-lg hover:opacity-70 transition-opacity"
              aria-label="Cerrar alerta"
            >
              ✕
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

Alert.displayName = "Alert"
