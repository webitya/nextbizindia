"use client"

import Link from "next/link"
import CloseIcon from "@mui/icons-material/Close"
import HomeIcon from "@mui/icons-material/Home"
import BuildIcon from "@mui/icons-material/Build"
import FolderIcon from "@mui/icons-material/Folder"
import InfoIcon from "@mui/icons-material/Info"
import LocalOfferIcon from "@mui/icons-material/LocalOffer"
import EmailIcon from "@mui/icons-material/Email"

export default function NavbarDrawer({ isOpen, onClose }) {
  const drawerLinks = [
    { href: "/", label: "Home", icon: HomeIcon },
    { href: "/services", label: "Services", icon: BuildIcon },
    { href: "/portfolio", label: "Portfolio", icon: FolderIcon },
    { href: "/about", label: "About", icon: InfoIcon },
    { href: "/pricing", label: "Pricing", icon: LocalOfferIcon },
    { href: "/contact", label: "Contact", icon: EmailIcon },
  ]

  return (
    <>
      {/* Overlay with smooth animation */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-screen w-80 sm:w-96 bg-gradient-to-b from-white via-white to-blue-50/30 shadow-2xl z-50 transform transition-all duration-300 lg:hidden overflow-y-auto ${
          isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0 pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-xl border-b border-gray-200/50 p-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">R</span>
            </div>
            <span className="font-bold text-lg text-gray-900">
              Relyonus<span className="text-blue-600">Digitally</span>
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-all duration-300 transform hover:scale-110 active:scale-95"
          >
            <CloseIcon className="text-gray-900 text-2xl" />
          </button>
        </div>

        {/* Navigation Links */}
        <div className="p-6 space-y-2">
          {drawerLinks.map((link, index) => {
            const IconComponent = link.icon
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className="flex items-center gap-4 px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50/80 font-medium text-lg transition-all duration-300 rounded-xl group transform hover:translate-x-1"
                style={{
                  transitionDelay: isOpen ? `${index * 50}ms` : "0ms",
                }}
              >
                <IconComponent className="text-blue-600 group-hover:scale-110 transition-transform duration-300" />
                <span>{link.label}</span>
              </Link>
            )
          })}
        </div>

        {/* Divider */}
        <div className="mx-6 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

        {/* CTA Section */}
        <div className="p-6 space-y-4">
          <Link
            href="/contact"
            onClick={onClose}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl hover:from-blue-700 hover:to-cyan-600 font-semibold text-center transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-600/50 active:scale-95 w-full"
          >
            <EmailIcon className="text-lg" />
            Get in Touch
          </Link>

          {/* Social Links */}
          <div className="flex justify-center gap-4 pt-4">
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-600 transition-all duration-300 transform hover:scale-110"
              title="LinkedIn"
            >
              <span className="text-lg">in</span>
            </a>
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-600 transition-all duration-300 transform hover:scale-110"
              title="Twitter"
            >
              <span className="text-lg">𝕏</span>
            </a>
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-600 transition-all duration-300 transform hover:scale-110"
              title="Facebook"
            >
              <span className="text-lg">f</span>
            </a>
          </div>
        </div>

        {/* Footer Info */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-blue-50/50 to-transparent border-t border-gray-200/50">
          <p className="text-xs text-gray-600 text-center">© 2025 RelyonusDigitally. All rights reserved.</p>
        </div>
      </div>
    </>
  )
}
