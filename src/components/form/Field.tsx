// Componente Field reutilizable
// Wrapper para label + input + error

import React from "react"
import { Input } from "../common/Input"

interface FieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Etiqueta del campo */
  label?: string
  /** Mensaje de error */
  error?: string
  /** Texto de ayuda */
  helperText?: string
}

export const Field = React.forwardRef<HTMLInputElement, FieldProps>(({ label, error, helperText, ...props }, ref) => {
  return <Input ref={ref} label={label} error={error} helperText={helperText} {...props} />
})

Field.displayName = "Field"
