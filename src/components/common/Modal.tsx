"use client"

// Componente Modal accesible
// Incluye overlay, animaciones de apertura/cierre con Framer Motion

import type React from "react"
import { motion, AnimatePresence } from "framer-motion"

interface ModalProps {
  /** Mostrar modal */
  isOpen: boolean
  /** Callback cuando se cierra */
  onClose: () => void
  /** Título del modal */
  title?: string
  /** Contenido del modal */
  children: React.ReactNode
  /** Mostrar botón de cerrar */
  showCloseButton?: boolean
  /** Tamaño del modal */
  size?: "sm" | "md" | "lg"
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  showCloseButton = true,
  size = "md",
}) => {
  const sizeStyles = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className={`bg-white rounded-lg shadow-xl w-full ${sizeStyles[size]}`}
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
            >
              {/* Header */}
              {title && (
                <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                  <h2 id="modal-title" className="text-lg font-semibold text-gray-900">
                    {title}
                  </h2>
                  {showCloseButton && (
                    <button
                      onClick={onClose}
                      className="text-gray-500 hover:text-gray-700 transition-colors"
                      aria-label="Cerrar modal"
                    >
                      ✕
                    </button>
                  )}
                </div>
              )}

              {/* Content */}
              <div className="px-6 py-4">{children}</div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

Modal.displayName = "Modal"
