"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export default function ServicesHero() {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })

    renderer.setSize(window.innerWidth, window.innerHeight * 0.6)
    renderer.setClearColor(0xf9fafb, 1)
    containerRef.current.appendChild(renderer.domElement)

    camera.position.z = 6

    // Create rotating torus knot
    const geometry = new THREE.TorusKnotGeometry(2, 0.6, 100, 16)
    const material = new THREE.MeshPhongMaterial({
      color: 0x0066ff,
      emissive: 0x0052cc,
      shininess: 100,
      wireframe: false,
    })
    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    // Create floating spheres
    const spheres = []
    for (let i = 0; i < 5; i++) {
      const sphereGeom = new THREE.SphereGeometry(0.3, 32, 32)
      const sphereMat = new THREE.MeshPhongMaterial({
        color: new THREE.Color().setHSL(Math.random(), 0.7, 0.6),
        emissive: new THREE.Color().setHSL(Math.random(), 0.7, 0.4),
      })
      const sphere = new THREE.Mesh(sphereGeom, sphereMat)
      sphere.position.set((Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 5)
      spheres.push({
        mesh: sphere,
        vx: (Math.random() - 0.5) * 0.02,
        vy: (Math.random() - 0.5) * 0.02,
      })
      scene.add(sphere)
    }

    // Lighting
    const light1 = new THREE.DirectionalLight(0xffffff, 1)
    light1.position.set(5, 5, 5)
    scene.add(light1)

    const light2 = new THREE.PointLight(0x00d4ff, 0.8)
    light2.position.set(-5, -5, 5)
    scene.add(light2)

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    let animationId
    const animate = () => {
      animationId = requestAnimationFrame(animate)

      mesh.rotation.x += 0.002
      mesh.rotation.y += 0.003

      spheres.forEach((sphere) => {
        sphere.mesh.position.x += sphere.vx
        sphere.mesh.position.y += sphere.vy
        sphere.mesh.rotation.x += 0.01
        sphere.mesh.rotation.y += 0.01

        if (Math.abs(sphere.mesh.position.x) > 5) sphere.vx *= -1
        if (Math.abs(sphere.mesh.position.y) > 5) sphere.vy *= -1
      })

      renderer.render(scene, camera)
    }
    animate()

    const handleResize = () => {
      const width = window.innerWidth
      const height = window.innerHeight * 0.6
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
    <section className="relative w-full pt-20 pb-0 overflow-hidden">
      <div ref={containerRef} className="absolute inset-0 w-full h-full" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-screen flex items-center justify-center">
        <div className="text-center">
          <span className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold mb-4">
            Our Services
          </span>
          <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-6">
            Comprehensive <span className="text-blue-600">Solutions</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            From strategy to execution, we deliver excellence across all digital disciplines.
          </p>
        </div>
      </div>
    </section>
  )
}
