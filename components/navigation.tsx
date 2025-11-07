"use client"

import Link from "next/link"
import { useState } from "react"
import { usePathname } from "next/navigation"

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (href: string) => pathname === href

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-lg font-light tracking-widest hover:opacity-60 transition">
          STUDIO ARCH
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-12">
          <Link
            href="/projecten"
            className={`text-sm font-light tracking-wide transition ${
              isActive("/projecten") ? "opacity-100 border-b border-black" : "opacity-60 hover:opacity-100"
            }`}
          >
            PROJECTEN
          </Link>
          <Link
            href="/over"
            className={`text-sm font-light tracking-wide transition ${
              isActive("/over") ? "opacity-100 border-b border-black" : "opacity-60 hover:opacity-100"
            }`}
          >
            OVER ONS
          </Link>
          <Link
            href="/nieuws"
            className={`text-sm font-light tracking-wide transition ${
              isActive("/nieuws") ? "opacity-100 border-b border-black" : "opacity-60 hover:opacity-100"
            }`}
          >
            NIEUWS
          </Link>
          <Link
            href="/contact"
            className={`text-sm font-light tracking-wide transition ${
              isActive("/contact") ? "opacity-100 border-b border-black" : "opacity-60 hover:opacity-100"
            }`}
          >
            CONTACT
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden flex flex-col gap-1.5" aria-label="Menu">
          <div
            className={`w-6 h-0.5 bg-black transition-transform duration-300 ${isOpen ? "rotate-45 translate-y-2" : ""}`}
          />
          <div className={`w-6 h-0.5 bg-black transition-opacity duration-300 ${isOpen ? "opacity-0" : ""}`} />
          <div
            className={`w-6 h-0.5 bg-black transition-transform duration-300 ${isOpen ? "-rotate-45 -translate-y-2" : ""}`}
          />
        </button>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 bg-white border-t border-gray-200 md:hidden">
            <div className="flex flex-col gap-4 p-6">
              <Link href="/projecten" className="text-sm font-light tracking-wide" onClick={() => setIsOpen(false)}>
                PROJECTEN
              </Link>
              <Link href="/over" className="text-sm font-light tracking-wide" onClick={() => setIsOpen(false)}>
                OVER ONS
              </Link>
              <Link href="/nieuws" className="text-sm font-light tracking-wide" onClick={() => setIsOpen(false)}>
                NIEUWS
              </Link>
              <Link href="/contact" className="text-sm font-light tracking-wide" onClick={() => setIsOpen(false)}>
                CONTACT
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
