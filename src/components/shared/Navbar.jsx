"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import NavbarDrawer from "./NavbarDrawer"
import MenuIcon from "@mui/icons-material/Menu"
import CloseIcon from "@mui/icons-material/Close"

export default function Navbar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeLink, setActiveLink] = useState("/")

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/about", label: "About" },
    { href: "/pricing", label: "Pricing" },
  ]

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-2xl border-b border-blue-200/30 shadow-2xl"
            : "bg-white/80 backdrop-blur-xl border-b border-gray-100/20"
        }`}
      >
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center h-20 lg:h-24">
              {/* Logo */}
              <Link href="/" className="flex items-center gap-2 lg:gap-3 group flex-shrink-0">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-500 rounded-xl lg:rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:shadow-2xl group-hover:shadow-blue-600/60 transition-all duration-300 transform">
                  <span className="text-white font-bold text-lg lg:text-xl">R</span>
                </div>
                <div className="hidden sm:flex flex-col">
                  <span className="font-bold text-lg lg:text-xl text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                    Relyonus<span className="text-blue-600">Digitally</span>
                  </span>
                  <span className="hidden lg:inline text-xs text-gray-500 group-hover:text-blue-500 transition-colors duration-300">
                    Digital Excellence
                  </span>
                </div>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center gap-1 xl:gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setActiveLink(link.href)}
                    className="px-4 py-2 text-gray-700 hover:text-blue-600 font-medium transition-all duration-300 relative group/nav rounded-lg hover:bg-blue-50/50"
                  >
                    {link.label}
                    <span
                      className={`absolute bottom-1 left-4 h-0.5 bg-gradient-to-r from-blue-600 to-cyan-500 transition-all duration-300 ${
                        activeLink === link.href ? "w-[calc(100%-32px)]" : "w-0 group-hover/nav:w-[calc(100%-32px)]"
                      }`}
                    />
                  </Link>
                ))}
              </div>

              {/* Desktop CTA Button */}
              <Link
                href="/contact"
                className="hidden lg:flex px-6 lg:px-8 py-2.5 lg:py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl lg:rounded-2xl hover:from-blue-700 hover:to-cyan-600 font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-600/50 active:scale-95 relative overflow-hidden group flex-shrink-0"
              >
                <span className="relative z-10">Get Started</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -translate-x-full group-hover:translate-x-full transition-all duration-500" />
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsDrawerOpen(!isDrawerOpen)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-all duration-300 transform hover:scale-110 active:scale-95"
              >
                {isDrawerOpen ? (
                  <CloseIcon className="text-gray-900 text-2xl" />
                ) : (
                  <MenuIcon className="text-gray-900 text-2xl" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <NavbarDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
      <div className="h-20 lg:h-24" />
    </>
  )
}
