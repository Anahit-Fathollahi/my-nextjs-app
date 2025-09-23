"use client"

import { ReactNode } from "react"
import { useTheme } from "../context/ThemeContext"

interface ThemeDividerProps {
  children: ReactNode
}

export default function ThemeDivider({ children }: ThemeDividerProps) {
  const { theme } = useTheme()

  return (
    <div
    className={`w-full min-h-screen transition-colors duration-300 ${
        theme === "light" ? "bg-white text-black" : "bg-gray-900 text-white"
    }`}
    >
    {children}
    </div>
  )
}
