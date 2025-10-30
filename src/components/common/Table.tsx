"use client"

// Componente Table genérico tipado
// Incluye paginación básica controlada por props

import React, { useState } from "react"
import { Button } from "./Button"

interface Column<T> {
  /** Clave del campo */
  key: keyof T
  /** Etiqueta de la columna */
  label: string
  /** Renderizador personalizado */
  render?: (value: any, row: T) => React.ReactNode
  /** Ancho de la columna */
  width?: string
}

interface TableProps<T> {
  /** Datos a mostrar */
  data: T[]
  /** Definición de columnas */
  columns: Column<T>[]
  /** Tamaño de página */
  pageSize?: number
  /** Callback cuando se selecciona una fila */
  onRowClick?: (row: T) => void
  /** Mostrar índice de fila */
  showIndex?: boolean
}

export const Table = React.forwardRef<HTMLTableElement, TableProps<any>>(
  ({ data, columns, pageSize = 10, onRowClick, showIndex = false }, ref) => {
    const [currentPage, setCurrentPage] = useState(1)

    const totalPages = Math.ceil(data.length / pageSize)
    const startIndex = (currentPage - 1) * pageSize
    const paginatedData = data.slice(startIndex, startIndex + pageSize)

    return (
      <div className="w-full">
        <div className="overflow-x-auto border border-gray-200 rounded-lg">
          <table ref={ref} className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                {showIndex && <th className="px-4 py-3 text-left font-semibold text-gray-700">#</th>}
                {columns.map((col) => (
                  <th key={String(col.key)} className="px-4 py-3 text-left font-semibold text-gray-700">
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginatedData.length === 0 ? (
                <tr>
                  <td colSpan={columns.length + (showIndex ? 1 : 0)} className="px-4 py-8 text-center text-gray-500">
                    No hay datos disponibles
                  </td>
                </tr>
              ) : (
                paginatedData.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className="border-b border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => onRowClick?.(row)}
                  >
                    {showIndex && <td className="px-4 py-3 text-gray-600">{startIndex + rowIndex + 1}</td>}
                    {columns.map((col) => (
                      <td key={String(col.key)} className="px-4 py-3 text-gray-900">
                        {col.render ? col.render(row[col.key], row) : String(row[col.key] || "-")}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Paginación */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-gray-600">
              Página {currentPage} de {totalPages}
            </p>
            <div className="flex gap-2">
              <Button
                variant="secondary"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                Anterior
              </Button>
              <Button
                variant="secondary"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                Siguiente
              </Button>
            </div>
          </div>
        )}
      </div>
    )
  },
)

Table.displayName = "Table"
