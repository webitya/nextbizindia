"use client"

import { useRef, useEffect } from "react"
import * as THREE from "three"

export default function TorusKnot() {
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

    camera.position.z = 4

    // Create torus knot
    const geometry = new THREE.TorusKnotGeometry(1, 0.4, 100, 16)
    const material = new THREE.MeshPhongMaterial({
      color: 0xff00ff,
      emissive: 0xcc00ff,
      shininess: 100,
    })
    const torusKnot = new THREE.Mesh(geometry, material)
    scene.add(torusKnot)

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
    scene.add(ambientLight)

    const pointLight1 = new THREE.PointLight(0x00ffff, 1, 100)
    pointLight1.position.set(5, 5, 5)
    scene.add(pointLight1)

    const pointLight2 = new THREE.PointLight(0xff00ff, 1, 100)
    pointLight2.position.set(-5, -5, 5)
    scene.add(pointLight2)

    let animationId
    const animate = () => {
      animationId = requestAnimationFrame(animate)
      torusKnot.rotation.x += 0.002
      torusKnot.rotation.y += 0.003
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
