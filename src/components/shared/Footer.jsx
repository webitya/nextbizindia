"use client"

import Link from "next/link"
import { useRef, useEffect } from "react"
import * as THREE from "three"
import FacebookIcon from "@mui/icons-material/Facebook"
import TwitterIcon from "@mui/icons-material/Twitter"
import LinkedInIcon from "@mui/icons-material/LinkedIn"
import InstagramIcon from "@mui/icons-material/Instagram"
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward"

function FooterGlobe() {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000,
    )
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })

    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    renderer.setClearColor(0x000000, 0)
    containerRef.current.appendChild(renderer.domElement)

    camera.position.z = 2

    const geometry = new THREE.IcosahedronGeometry(1, 4)
    const material = new THREE.MeshStandardMaterial({
      color: 0x00d4ff,
      metalness: 0.7,
      roughness: 0.3,
      emissive: 0x0066ff,
      emissiveIntensity: 0.3,
      wireframe: true,
    })
    const sphere = new THREE.Mesh(geometry, material)
    scene.add(sphere)

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
    scene.add(ambientLight)

    const pointLight = new THREE.PointLight(0x00d4ff, 1, 100)
    pointLight.position.set(5, 5, 5)
    scene.add(pointLight)

    let animationId
    const animate = () => {
      animationId = requestAnimationFrame(animate)
      sphere.rotation.x += 0.001
      sphere.rotation.y += 0.002
      renderer.render(scene, camera)
    }
    animate()

    const handleResize = () => {
      const width = containerRef.current.clientWidth
      const height = containerRef.current.clientHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationId)
      containerRef.current?.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={containerRef} className="w-full h-full" />
}

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="bg-gradient-to-b from-slate-900 via-slate-950 to-black text-white relative overflow-hidden">
      {/* Background 3D element */}
      <div className="absolute top-0 right-0 w-96 h-96 opacity-10 pointer-events-none">
        <FooterGlobe />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="group">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-cyan-500/50 transition-all duration-300 transform">
                <span className="text-white font-bold text-lg">R</span>
              </div>
              <span className="font-bold text-xl group-hover:text-cyan-400 transition-colors duration-300">
                Relyonus<span className="text-cyan-400">Digitally</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
              Premium digital marketing and software solutions for modern businesses worldwide.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-cyan-400">Services</h3>
            <ul className="space-y-3 text-gray-400 text-sm">
              {[
                { label: "Digital Marketing", href: "/services" },
                { label: "Web Design", href: "/services" },
                { label: "Software Development", href: "/services" },
                { label: "Mobile Apps", href: "/services" },
              ].map((item, idx) => (
                <li key={idx}>
                  <Link
                    href={item.href}
                    className="hover:text-cyan-400 transition-all duration-300 relative group/link"
                  >
                    {item.label}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 group-hover/link:w-full transition-all duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-cyan-400">Company</h3>
            <ul className="space-y-3 text-gray-400 text-sm">
              {[
                { label: "About Us", href: "/about" },
                { label: "Portfolio", href: "/portfolio" },
                { label: "Contact", href: "/contact" },
                { label: "Pricing", href: "/pricing" },
              ].map((item, idx) => (
                <li key={idx}>
                  <Link
                    href={item.href}
                    className="hover:text-cyan-400 transition-all duration-300 relative group/link"
                  >
                    {item.label}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 group-hover/link:w-full transition-all duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-cyan-400">Follow Us</h3>
            <div className="flex gap-4 flex-wrap">
              {[
                { icon: FacebookIcon, href: "#" },
                { icon: TwitterIcon, href: "#" },
                { icon: LinkedInIcon, href: "#" },
                { icon: InstagramIcon, href: "#" },
              ].map((social, idx) => {
                const Icon = social.icon
                return (
                  <a
                    key={idx}
                    href={social.href}
                    className="w-10 h-10 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 rounded-lg flex items-center justify-center hover:from-cyan-500/40 hover:to-blue-500/40 hover:border-cyan-400/50 transition-all duration-300 transform hover:scale-110 hover:shadow-lg hover:shadow-cyan-500/30 group"
                  >
                    <Icon className="text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300" />
                  </a>
                )
              })}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800/50 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">© {currentYear} Relyonusdigitally. All rights reserved.</p>
            <div className="flex gap-6 text-gray-400 text-sm">
              {[
                { label: "Privacy Policy", href: "#" },
                { label: "Terms of Service", href: "#" },
                { label: "Cookie Policy", href: "#" },
              ].map((item, idx) => (
                <a
                  key={idx}
                  href={item.href}
                  className="hover:text-cyan-400 transition-all duration-300 relative group/link"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 group-hover/link:w-full transition-all duration-300" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to top button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-110 hover:shadow-lg hover:shadow-cyan-500/50 active:scale-95 z-40 opacity-0 hover:opacity-100 transition-opacity duration-300"
        aria-label="Scroll to top"
      >
        <ArrowUpwardIcon className="text-white" />
      </button>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </footer>
  )
}
