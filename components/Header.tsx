"use client"

import { useTheme } from "@/context/ThemeContext"
import Link from "next/link"
import text from "../public/locales/fa/common.json"
import React, { useState, Suspense, lazy } from "react"

// Lazy load icons
const SunIcon = lazy(() =>
  import("@heroicons/react/24/solid").then((mod) => ({ default: mod.SunIcon }))
)
const MoonIcon = lazy(() =>
  import("@heroicons/react/24/solid").then((mod) => ({ default: mod.MoonIcon }))
)
const MenuIcon = lazy(() =>
  import("@heroicons/react/24/solid").then((mod) => ({ default: mod.Bars3Icon }))
)
const CloseIcon = lazy(() =>
  import("@heroicons/react/24/solid").then((mod) => ({ default: mod.XMarkIcon }))
)

export default function Header() {
  const { theme, toggleTheme } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div
      className={`p-6 duration-300 ${
        theme === "light" ? "bg-white text-black" : "bg-gray-900 text-white"
      }`}
    >
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">{text.site_title} 🌹</h1>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-4 rtl:space-x-reverse ml-auto">
          <Link href="/">{text.home}</Link>
          <Link href="/posts">{text.posts}</Link>
          <Link href="/about">{text.aboutUs}</Link>
          <Link href="/contact">{text.contact_us}</Link>
          <Link href="/dashboard" className="mr-4">
            {text.dashboard_management}
          </Link>
        </nav>

        {/* Mobile & Theme Buttons */}
        <div className="flex items-center space-x-2 rtl:space-x-reverse md:ml-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded"
          >
            <Suspense fallback={<div className="h-6 w-6" />}>
              {theme === "light" ? (
                <MoonIcon className="h-6 w-6 text-gray-800" />
              ) : (
                <SunIcon className="h-6 w-6 text-yellow-400" />
              )}
            </Suspense>
          </button>

          {/* Hamburger Button */}
          <button
            className="md:hidden p-2 rounded"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Suspense fallback={<div className="h-6 w-6" />}>
              {menuOpen ? (
                <CloseIcon className="h-6 w-6" />
              ) : (
                <MenuIcon className="h-6 w-6" />
              )}
            </Suspense>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <nav className="flex flex-col mt-4 space-y-2 rtl:space-y-reverse md:hidden">
          <Link href="/" onClick={() => setMenuOpen(false)}>
            {text.home}
          </Link>
          <Link href="/posts" onClick={() => setMenuOpen(false)}>
            {text.posts}
          </Link>
          <Link href="/about" onClick={() => setMenuOpen(false)}>
            {text.aboutUs}
          </Link>
          <Link href="/contact" onClick={() => setMenuOpen(false)}>
            {text.contact_us}
          </Link>
          <Link
            href="/dashboard"
            className="text-blue-600 font-semibold "
            onClick={() => setMenuOpen(false)}
          >
            {text.dashboard_management}
          </Link>
        </nav>
      )}
    </div>
  )
}
