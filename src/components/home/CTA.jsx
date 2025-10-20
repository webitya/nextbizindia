"use client"

import Link from "next/link"
import { useRef, useEffect } from "react"
import * as THREE from "three"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"

function GalaxyBackground() {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })

    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x000000, 0)
    containerRef.current.appendChild(renderer.domElement)

    camera.position.z = 30

    // Create galaxy particles
    const particlesGeometry = new THREE.BufferGeometry()
    const particleCount = 2000

    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    const sizes = new Float32Array(particleCount)

    for (let i = 0; i < particleCount * 3; i += 3) {
      const angle = Math.random() * Math.PI * 2
      const radius = Math.random() * 25
      const height = (Math.random() - 0.5) * 15

      positions[i] = Math.cos(angle) * radius
      positions[i + 1] = height
      positions[i + 2] = Math.sin(angle) * radius

      const hue = Math.random() * 0.3 + 0.55 // Blue to cyan range
      const color = new THREE.Color().setHSL(hue, 0.8, 0.6)
      colors[i] = color.r
      colors[i + 1] = color.g
      colors[i + 2] = color.b

      sizes[i / 3] = Math.random() * 2 + 0.5
    }

    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    particlesGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3))
    particlesGeometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1))

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.3,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true,
    })

    const particles = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particles)

    // Add central glowing sphere
    const coreGeometry = new THREE.IcosahedronGeometry(2, 4)
    const coreMaterial = new THREE.MeshStandardMaterial({
      color: 0x0066ff,
      metalness: 0.8,
      roughness: 0.2,
      emissive: 0x0099ff,
      emissiveIntensity: 0.6,
    })
    const core = new THREE.Mesh(coreGeometry, coreMaterial)
    scene.add(core)

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4)
    scene.add(ambientLight)

    const pointLight = new THREE.PointLight(0x00d4ff, 2, 100)
    pointLight.position.set(0, 0, 10)
    scene.add(pointLight)

    let animationId
    const animate = () => {
      animationId = requestAnimationFrame(animate)

      particles.rotation.y += 0.0001
      particles.rotation.z += 0.00005

      core.rotation.x += 0.001
      core.rotation.y += 0.002

      renderer.render(scene, camera)
    }
    animate()

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationId)
      containerRef.current?.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={containerRef} className="absolute inset-0 w-full h-full" />
}

export default function CTA() {
  return (
    <section className="relative py-32 bg-gradient-to-b from-slate-950 via-blue-950 to-slate-900 text-white overflow-hidden">
      <GalaxyBackground />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/40 to-slate-950 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="opacity-0 animate-[fadeInUp_0.8s_ease-out_0.2s_forwards]">
          <h2 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
            Ready to Transform Your{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300 bg-clip-text text-transparent animate-pulse">
              Business?
            </span>
          </h2>

          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed font-light">
            Let's collaborate to create something extraordinary. Our team is ready to bring your vision to life with
            cutting-edge technology and creative excellence.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16 opacity-0 animate-[fadeInUp_0.8s_ease-out_0.4s_forwards]">
          <Link
            href="/contact"
            className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl hover:from-cyan-600 hover:to-blue-700 font-bold flex items-center justify-center gap-2 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/50 active:scale-95 relative overflow-hidden group text-lg"
          >
            <span className="relative z-10 flex items-center gap-2">
              Start Your Project <ArrowForwardIcon className="text-xl" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -translate-x-full group-hover:translate-x-full transition-all duration-500" />
          </Link>
          <Link
            href="/about"
            className="px-8 py-4 border-2 border-cyan-400 text-cyan-300 rounded-xl hover:bg-cyan-400/10 hover:border-cyan-300 font-bold transition-all duration-300 transform hover:scale-105 active:scale-95 text-lg relative overflow-hidden group"
          >
            <span className="relative z-10">Learn About Us</span>
            <div className="absolute inset-0 bg-cyan-400/5 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
          </Link>
        </div>

        {/* Contact Info with premium styling */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 opacity-0 animate-[fadeInUp_0.8s_ease-out_0.6s_forwards]">
          <div className="group p-6 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 hover:border-cyan-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20 transform hover:-translate-y-2">
            <p className="text-cyan-400 font-bold mb-3 text-lg group-hover:text-cyan-300 transition-colors">Email</p>
            <a
              href="mailto:hello@relyonusdigitally.com"
              className="text-gray-300 hover:text-cyan-300 transition-colors duration-300 font-semibold break-all"
            >
              hello@relyonusdigitally.com
            </a>
          </div>
          <div className="group p-6 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 hover:border-cyan-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20 transform hover:-translate-y-2">
            <p className="text-cyan-400 font-bold mb-3 text-lg group-hover:text-cyan-300 transition-colors">Phone</p>
            <a
              href="tel:+919876543210"
              className="text-gray-300 hover:text-cyan-300 transition-colors duration-300 font-semibold"
            >
              +91 98765 43210
            </a>
          </div>
          <div className="group p-6 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 hover:border-cyan-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20 transform hover:-translate-y-2">
            <p className="text-cyan-400 font-bold mb-3 text-lg group-hover:text-cyan-300 transition-colors">Location</p>
            <p className="text-gray-300 font-semibold">India</p>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="mt-16 flex justify-center gap-4 opacity-0 animate-[fadeInUp_0.8s_ease-out_0.8s_forwards]">
          <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse" />
          <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: "0.2s" }} />
          <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: "0.4s" }} />
        </div>
      </div>

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
    </section>
  )
}
