"use client"

import { useRef, useEffect } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

export default function PricingGalaxy() {
  const particlesRef = useRef()

  useEffect(() => {
    if (!particlesRef.current) return

    const geometry = new THREE.BufferGeometry()
    const particleCount = 1000

    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount * 3; i += 3) {
      const angle = Math.random() * Math.PI * 2
      const radius = Math.random() * 20
      const height = (Math.random() - 0.5) * 10

      positions[i] = Math.cos(angle) * radius
      positions[i + 1] = height
      positions[i + 2] = Math.sin(angle) * radius

      const hue = Math.random()
      const color = new THREE.Color().setHSL(hue, 0.7, 0.6)
      colors[i] = color.r
      colors[i + 1] = color.g
      colors[i + 2] = color.b
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3))

    const material = new THREE.PointsMaterial({
      size: 0.1,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true,
    })

    particlesRef.current.geometry = geometry
    particlesRef.current.material = material
  }, [])

  useFrame(() => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.0001
      particlesRef.current.rotation.z += 0.00005
    }
  })

  return <points ref={particlesRef} />
}
