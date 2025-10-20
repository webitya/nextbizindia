"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export default function AboutHero() {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })

    renderer.setSize(window.innerWidth, window.innerHeight * 0.6)
    renderer.setClearColor(0xffffff, 1)
    renderer.shadowMap.enabled = true
    containerRef.current.appendChild(renderer.domElement)

    camera.position.z = 5

    const spheres = []
    for (let i = 0; i < 30; i++) {
      const angle = (i / 30) * Math.PI * 4
      const radius = 2 + (i / 30) * 1.5
      const geometry = new THREE.SphereGeometry(0.2, 32, 32)
      const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color().setHSL(i / 30, 0.8, 0.6),
        metalness: 0.8,
        roughness: 0.1,
        emissive: new THREE.Color().setHSL(i / 30, 0.8, 0.3),
        emissiveIntensity: 0.4,
      })
      const sphere = new THREE.Mesh(geometry, material)
      sphere.position.set(Math.cos(angle) * radius, Math.sin(angle) * radius, (i / 30) * 2 - 1)
      sphere.castShadow = true
      sphere.receiveShadow = true
      spheres.push(sphere)
      scene.add(sphere)
    }

    const light1 = new THREE.DirectionalLight(0xffffff, 1.2)
    light1.position.set(5, 5, 5)
    light1.castShadow = true
    light1.shadow.mapSize.width = 2048
    light1.shadow.mapSize.height = 2048
    scene.add(light1)

    const light2 = new THREE.PointLight(0x00d4ff, 1)
    light2.position.set(-5, -5, 5)
    scene.add(light2)

    const light3 = new THREE.PointLight(0x00ffff, 0.8)
    light3.position.set(0, 5, 5)
    scene.add(light3)

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
    scene.add(ambientLight)

    let animationId
    const animate = () => {
      animationId = requestAnimationFrame(animate)

      spheres.forEach((sphere, index) => {
        sphere.rotation.x += 0.01
        sphere.rotation.y += 0.01
        sphere.position.z += Math.sin(Date.now() * 0.0005 + index) * 0.01
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
        <div className="text-center animate-fade-in-up">
          <span className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold mb-4 border border-blue-200 hover:border-blue-400 transition-all duration-300">
            About Us
          </span>
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Crafting Digital <span className="text-blue-600 animate-pulse">Excellence</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            A team of passionate innovators dedicated to transforming businesses through technology.
          </p>
        </div>
      </div>
    </section>
  )
}
