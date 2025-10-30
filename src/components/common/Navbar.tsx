"use client"

// Barra de navegación superior reutilizable
// Incluye dropdown simple con Framer Motion para submenús

import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface MenuItem {
  label: string
  onClick?: () => void
  submenu?: MenuItem[]
}

interface NavbarProps {
  /** Opciones del menú */
  menuOptions?: MenuItem[]
  /** Callback para logout */
  onLogout?: () => void
  /** Nombre del usuario */
  userName?: string
  /** Logo o título */
  title?: string
}

export const Navbar: React.FC<NavbarProps> = ({ menuOptions = [], onLogout, userName, title = "Electrocentro" }) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Title */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">E</span>
            </div>
            <span className="font-semibold text-gray-900">{title}</span>
          </div>

          {/* Menu Items */}
          <div className="flex items-center gap-6">
            {menuOptions.map((item, idx) => (
              <div key={idx} className="relative">
                <button
                  onClick={() => {
                    item.onClick?.()
                    setOpenDropdown(openDropdown === item.label ? null : item.label)
                  }}
                  className="text-gray-700 hover:text-blue-600 transition-colors flex items-center gap-1"
                >
                  {item.label}
                  {item.submenu && <span className="text-xs">▼</span>}
                </button>

                {/* Submenu */}
                <AnimatePresence>
                  {openDropdown === item.label && item.submenu && (
                    <motion.div
                      className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      {item.submenu.map((subitem, subidx) => (
                        <button
                          key={subidx}
                          onClick={() => {
                            subitem.onClick?.()
                            setOpenDropdown(null)
                          }}
                          className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors first:rounded-t-lg last:rounded-b-lg"
                        >
                          {subitem.label}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* User Section */}
          <div className="flex items-center gap-4">
            {userName && <span className="text-sm text-gray-600">{userName}</span>}
            {onLogout && (
              <button
                onClick={onLogout}
                className="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                Salir
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

Navbar.displayName = "Navbar"
