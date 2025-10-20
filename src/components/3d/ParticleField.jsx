"use client"

import { useRef, useEffect } from "react"
import * as THREE from "three"

export default function ParticleField() {
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

    camera.position.z = 5

    // Create particle system
    const particleCount = 1000
    const geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(particleCount * 3)
    const velocities = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 10
      positions[i + 1] = (Math.random() - 0.5) * 10
      positions[i + 2] = (Math.random() - 0.5) * 10

      velocities[i] = (Math.random() - 0.5) * 0.02
      velocities[i + 1] = (Math.random() - 0.5) * 0.02
      velocities[i + 2] = (Math.random() - 0.5) * 0.02
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    const material = new THREE.PointsMaterial({
      color: 0x00d4ff,
      size: 0.05,
      sizeAttenuation: true,
    })
    const particles = new THREE.Points(geometry, material)
    scene.add(particles)

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    let animationId
    const animate = () => {
      animationId = requestAnimationFrame(animate)

      const positionAttribute = geometry.getAttribute("position")
      const posArray = positionAttribute.array

      for (let i = 0; i < particleCount * 3; i += 3) {
        posArray[i] += velocities[i]
        posArray[i + 1] += velocities[i + 1]
        posArray[i + 2] += velocities[i + 2]

        if (posArray[i] > 5 || posArray[i] < -5) velocities[i] *= -1
        if (posArray[i + 1] > 5 || posArray[i + 1] < -5) velocities[i + 1] *= -1
        if (posArray[i + 2] > 5 || posArray[i + 2] < -5) velocities[i + 2] *= -1
      }

      positionAttribute.needsUpdate = true
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

  return <div ref={containerRef} className="w-full h-96 rounded-2xl overflow-hidden" />
}
