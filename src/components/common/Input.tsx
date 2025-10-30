// Componente Input reutilizable
// Soporta label, error, placeholder y múltiples tipos

import React from "react"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Etiqueta del input */
  label?: string
  /** Mensaje de error */
  error?: string
  /** Texto de ayuda */
  helperText?: string
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className = "", ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <input
          ref={ref}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
            error ? "border-red-500 focus:ring-red-500" : "border-gray-300"
          } ${className}`}
          {...props}
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        {helperText && !error && <p className="text-gray-500 text-sm mt-1">{helperText}</p>}
      </div>
    )
  },
)

Input.displayName = "Input"
