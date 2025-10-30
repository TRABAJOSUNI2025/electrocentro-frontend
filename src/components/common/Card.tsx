// Componente Card reutilizable
// Contenedor con header, body y footer slots

import type React from "react"

interface CardProps {
  /** Contenido principal de la tarjeta */
  children: React.ReactNode
  /** Contenido del header */
  header?: React.ReactNode
  /** Contenido del footer */
  footer?: React.ReactNode
  /** Clases CSS adicionales */
  className?: string
}

export const Card: React.FC<CardProps> = ({ children, header, footer, className = "" }) => {
  return (
    <div className={`bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden ${className}`}>
      {header && <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">{header}</div>}
      <div className="px-6 py-4">{children}</div>
      {footer && <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">{footer}</div>}
    </div>
  )
}

Card.displayName = "Card"
