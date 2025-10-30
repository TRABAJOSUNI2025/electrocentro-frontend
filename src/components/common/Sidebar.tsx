"use client"

// Menú lateral reutilizable
// Incluye collapse/expand y navegación

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"

interface SidebarItem {
  label: string
  icon?: string
  onClick?: () => void
  active?: boolean
  submenu?: SidebarItem[]
}

interface SidebarProps {
  /** Items del sidebar */
  items: SidebarItem[]
  /** Mostrar sidebar colapsado */
  collapsed?: boolean
  /** Callback cuando se colapsa */
  onCollapse?: (collapsed: boolean) => void
}

export const Sidebar: React.FC<SidebarProps> = ({ items, collapsed = false, onCollapse }) => {
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  const toggleExpand = (label: string) => {
    setExpandedItems((prev) => (prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]))
  }

  return (
    <motion.aside
      className="bg-gray-900 text-white h-screen overflow-y-auto border-r border-gray-800"
      animate={{ width: collapsed ? 64 : 256 }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-4 flex items-center justify-between">
        {!collapsed && <span className="font-semibold">Menú</span>}
        <button
          onClick={() => onCollapse?.(!collapsed)}
          className="p-1 hover:bg-gray-800 rounded transition-colors"
          aria-label="Toggle sidebar"
        >
          {collapsed ? "→" : "←"}
        </button>
      </div>

      <nav className="space-y-1 px-2">
        {items.map((item, idx) => (
          <div key={idx}>
            <button
              onClick={() => {
                item.onClick?.()
                if (item.submenu) toggleExpand(item.label)
              }}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                item.active ? "bg-blue-600" : "hover:bg-gray-800"
              }`}
            >
              {item.icon && <span className="text-lg">{item.icon}</span>}
              {!collapsed && (
                <>
                  <span className="flex-1 text-left text-sm">{item.label}</span>
                  {item.submenu && (
                    <span
                      className={`text-xs transition-transform ${expandedItems.includes(item.label) ? "rotate-180" : ""}`}
                    >
                      ▼
                    </span>
                  )}
                </>
              )}
            </button>

            {/* Submenu */}
            {!collapsed && expandedItems.includes(item.label) && item.submenu && (
              <motion.div
                className="ml-4 space-y-1 mt-1"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
              >
                {item.submenu.map((subitem, subidx) => (
                  <button
                    key={subidx}
                    onClick={subitem.onClick}
                    className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${
                      subitem.active ? "bg-blue-600" : "hover:bg-gray-800"
                    }`}
                  >
                    {subitem.label}
                  </button>
                ))}
              </motion.div>
            )}
          </div>
        ))}
      </nav>
    </motion.aside>
  )
}

Sidebar.displayName = "Sidebar"
