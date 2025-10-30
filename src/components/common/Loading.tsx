"use client"

// Componente Loading reutilizable
// Spinner y skeleton placeholder para estados de carga

import type React from "react"
import { motion } from "framer-motion"

interface LoadingProps {
  /** Mostrar spinner */
  isLoading?: boolean
  /** Mensaje de carga */
  message?: string
  /** Mostrar skeleton placeholder */
  skeleton?: boolean
  /** Número de líneas del skeleton */
  skeletonLines?: number
}

export const Loading: React.FC<LoadingProps> = ({
  isLoading = true,
  message = "Cargando...",
  skeleton = false,
  skeletonLines = 3,
}) => {
  if (skeleton) {
    return (
      <div className="space-y-4">
        {Array.from({ length: skeletonLines }).map((_, i) => (
          <motion.div
            key={i}
            className="h-4 bg-gray-200 rounded"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center py-8">
      <motion.div
        className="w-12 h-12 border-4 border-gray-200 border-t-blue-600 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      />
      {message && <p className="mt-4 text-gray-600 text-sm">{message}</p>}
    </div>
  )
}

Loading.displayName = "Loading"
