"use client"

import { useRef, useEffect } from "react"
import * as THREE from "three"

export default function FloatingCube() {
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

    camera.position.z = 3

    // Create cube with gradient material
    const geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5)
    const material = new THREE.MeshPhongMaterial({
      color: 0x0066ff,
      emissive: 0x0033ff,
      shininess: 100,
    })
    const cube = new THREE.Mesh(geometry, material)
    scene.add(cube)

    // Add edges
    const edges = new THREE.EdgesGeometry(geometry)
    const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0x00ffff, linewidth: 2 }))
    cube.add(line)

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7)
    scene.add(ambientLight)

    const pointLight = new THREE.PointLight(0x00d4ff, 1.5, 100)
    pointLight.position.set(5, 5, 5)
    scene.add(pointLight)

    // Animation
    let animationId
    const animate = () => {
      animationId = requestAnimationFrame(animate)
      cube.rotation.x += 0.003
      cube.rotation.y += 0.005
      cube.position.y = Math.sin(Date.now() * 0.001) * 0.3
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
