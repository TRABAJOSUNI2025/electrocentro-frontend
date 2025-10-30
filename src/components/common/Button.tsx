"use client"

// Componente Button reutilizable
// Soporta múltiples variantes: primary, secondary, danger
// Incluye estados: hover, disabled, loading

import React from "react"
import { motion } from "framer-motion"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Variante visual del botón */
  variant?: "primary" | "secondary" | "danger"
  /** Mostrar estado de carga */
  isLoading?: boolean
  /** Contenido del botón */
  children: React.ReactNode
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", isLoading = false, disabled, className = "", children, ...props }, ref) => {
    const baseStyles =
      "px-4 py-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"

    const variantStyles = {
      primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
      secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500",
      danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
    }

    const finalClassName = `${baseStyles} ${variantStyles[variant]} ${className}`

    return (
      <motion.button
        ref={ref}
        className={finalClassName}
        disabled={disabled || isLoading}
        whileHover={{ scale: disabled ? 1 : 1.02 }}
        whileTap={{ scale: disabled ? 1 : 0.98 }}
        {...props}
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            Cargando...
          </span>
        ) : (
          children
        )}
      </motion.button>
    )
  },
)

Button.displayName = "Button"
