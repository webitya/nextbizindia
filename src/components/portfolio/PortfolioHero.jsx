"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export default function PortfolioHero() {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })

    renderer.setSize(window.innerWidth, window.innerHeight * 0.5)
    renderer.setClearColor(0xffffff, 1)
    renderer.shadowMap.enabled = true
    containerRef.current.appendChild(renderer.domElement)

    camera.position.z = 5

    const cubes = []
    for (let i = -2; i <= 2; i++) {
      for (let j = -2; j <= 2; j++) {
        const geometry = new THREE.BoxGeometry(0.8, 0.8, 0.8)
        const material = new THREE.MeshStandardMaterial({
          color: new THREE.Color().setHSL(Math.random(), 0.7, 0.6),
          metalness: 0.7,
          roughness: 0.2,
          emissive: new THREE.Color().setHSL(Math.random(), 0.7, 0.3),
          emissiveIntensity: 0.3,
        })
        const cube = new THREE.Mesh(geometry, material)
        cube.position.set(i * 1.2, j * 1.2, 0)
        cube.userData = { originalY: j * 1.2 }
        cube.castShadow = true
        cube.receiveShadow = true
        cubes.push(cube)
        scene.add(cube)
      }
    }

    const light1 = new THREE.DirectionalLight(0xffffff, 1.2)
    light1.position.set(5, 5, 5)
    light1.castShadow = true
    light1.shadow.mapSize.width = 2048
    light1.shadow.mapSize.height = 2048
    scene.add(light1)

    const light2 = new THREE.PointLight(0x00d4ff, 0.8)
    light2.position.set(-5, -5, 5)
    scene.add(light2)

    const light3 = new THREE.PointLight(0xff00ff, 0.6)
    light3.position.set(5, -5, 5)
    scene.add(light3)

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
    scene.add(ambientLight)

    let animationId
    const animate = () => {
      animationId = requestAnimationFrame(animate)

      cubes.forEach((cube, index) => {
        cube.rotation.x += 0.005
        cube.rotation.y += 0.005
        cube.position.y = cube.userData.originalY + Math.sin(Date.now() * 0.0005 + index) * 0.3
      })

      renderer.render(scene, camera)
    }
    animate()

    const handleResize = () => {
      const width = window.innerWidth
      const height = window.innerHeight * 0.5
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
            Our Work
          </span>
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Showcase of <span className="text-blue-600 animate-pulse">Excellence</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Explore our portfolio of successful projects and transformative digital solutions.
          </p>
        </div>
      </div>
    </section>
  )
}
