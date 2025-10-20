"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"
import Link from "next/link"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"

export default function Hero() {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })

    renderer.setSize(window.innerWidth, window.innerHeight * 0.9)
    renderer.setClearColor(0xffffff, 1)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFShadowMap
    containerRef.current.appendChild(renderer.domElement)

    camera.position.z = 6

    // Torus Knot
    const geometry1 = new THREE.TorusKnotGeometry(1.2, 0.4, 100, 16)
    const material1 = new THREE.MeshStandardMaterial({
      color: 0x0066ff,
      metalness: 0.85,
      roughness: 0.15,
      emissive: 0x0052cc,
      emissiveIntensity: 0.4,
    })
    const mesh1 = new THREE.Mesh(geometry1, material1)
    mesh1.position.set(-3, 1.3, 0)
    scene.add(mesh1)

    // Icosphere
    const geometry2 = new THREE.IcosahedronGeometry(1.3, 5)
    const material2 = new THREE.MeshStandardMaterial({
      color: 0x00d4ff,
      metalness: 0.75,
      roughness: 0.25,
      emissive: 0x0099cc,
      emissiveIntensity: 0.3,
    })
    const mesh2 = new THREE.Mesh(geometry2, material2)
    mesh2.position.set(3, -1.2, 0)
    scene.add(mesh2)

    // Octahedron
    const geometry3 = new THREE.OctahedronGeometry(1.1, 3)
    const material3 = new THREE.MeshStandardMaterial({
      color: 0x1a1a1a,
      metalness: 0.9,
      roughness: 0.1,
      emissive: 0x333333,
      emissiveIntensity: 0.5,
    })
    const mesh3 = new THREE.Mesh(geometry3, material3)
    mesh3.position.set(0, 0, -2)
    scene.add(mesh3)

    // Lights
    const light1 = new THREE.DirectionalLight(0xffffff, 1.2)
    light1.position.set(8, 8, 8)
    scene.add(light1)

    const light2 = new THREE.DirectionalLight(0x0066ff, 0.9)
    light2.position.set(-8, -8, 8)
    scene.add(light2)

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
    scene.add(ambientLight)

    let animationId
    const animate = () => {
      animationId = requestAnimationFrame(animate)

      mesh1.rotation.x += 0.002
      mesh1.rotation.y += 0.003

      mesh2.rotation.x -= 0.0025
      mesh2.rotation.y -= 0.0035

      mesh3.rotation.z += 0.002
      mesh3.rotation.x += 0.0015

      renderer.render(scene, camera)
    }
    animate()

    const handleResize = () => {
      const width = window.innerWidth
      const height = window.innerHeight * 0.9
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

  return (
    <section className="relative w-full h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-blue-50 to-blue-100">
      {/* 3D Background */}
      <div ref={containerRef} className="absolute inset-0 w-full h-full" />
      <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/80 to-transparent pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 w-full  px-5 md:px-10 flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Left Text Section */}
        <div className="w-full md:w-1/2 space-y-5 text-center md:text-left">
          <span className="inline-block px-4 py-1.5 bg-blue-100/70 text-blue-700 font-medium text-xs rounded-full border border-blue-300 shadow-sm">
            Welcome to the Future
          </span>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
            Digital Excellence{" "}
            <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 bg-clip-text text-transparent">
              Redefined
            </span>
          </h1>

          <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-md mx-auto md:mx-0">
            Transform your business with digital marketing, elegant web design, and innovative software
            solutions. We don’t just build — we create results-driven experiences.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start pt-2">
            <Link
              href="/contact"
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg shadow-md hover:shadow-blue-600/40 hover:scale-105 transition-transform duration-300 flex items-center justify-center gap-2"
            >
              Get Started <ArrowForwardIcon className="text-base" />
            </Link>

            <Link
              href="/portfolio"
              className="px-6 py-3 border-2 border-gray-900 text-gray-900 font-semibold rounded-lg hover:bg-gray-900 hover:text-white hover:scale-105 transition-transform duration-300"
            >
              View Work
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-8 grid grid-cols-3 gap-4 sm:gap-6 text-center md:text-left">
            <div className="group cursor-pointer">
              <p className="text-2xl font-bold text-blue-600 group-hover:text-cyan-500 transition-colors duration-300">
                150+
              </p>
              <p className="text-gray-600 text-xs group-hover:text-gray-900 transition-colors duration-300">
                Projects
              </p>
            </div>

            <div className="group cursor-pointer">
              <p className="text-2xl font-bold text-blue-600 group-hover:text-cyan-500 transition-colors duration-300">
                98%
              </p>
              <p className="text-gray-600 text-xs group-hover:text-gray-900 transition-colors duration-300">
                Satisfaction
              </p>
            </div>

            <div className="group cursor-pointer">
              <p className="text-2xl font-bold text-blue-600 group-hover:text-cyan-500 transition-colors duration-300">
                50+
              </p>
              <p className="text-gray-600 text-xs group-hover:text-gray-900 transition-colors duration-300">
                Team Members
              </p>
            </div>
          </div>
        </div>

        {/* Right Spacer for layout balance */}
        <div className="hidden md:block w-1/2" />
      </div>
    </section>
  )
}
