"use client"

import { useRef, useEffect } from "react"
import * as THREE from "three"

export default function AnimatedSphere() {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })

    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x000000, 0)
    containerRef.current.appendChild(renderer.domElement)

    camera.position.z = 3

    // Create advanced sphere with wireframe
    const geometry = new THREE.IcosahedronGeometry(1.5, 8)
    const material = new THREE.MeshPhongMaterial({
      color: 0x00d4ff,
      emissive: 0x0099cc,
      shininess: 100,
      wireframe: false,
    })
    const sphere = new THREE.Mesh(geometry, material)
    scene.add(sphere)

    // Add wireframe overlay
    const wireframeGeometry = new THREE.IcosahedronGeometry(1.5, 8)
    const wireframeMaterial = new THREE.LineBasicMaterial({
      color: 0x00ffff,
      linewidth: 2,
      transparent: true,
      opacity: 0.3,
    })
    const wireframe = new THREE.LineSegments(new THREE.EdgesGeometry(wireframeGeometry), wireframeMaterial)
    sphere.add(wireframe)

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
    scene.add(ambientLight)

    const pointLight1 = new THREE.PointLight(0x00d4ff, 1, 100)
    pointLight1.position.set(5, 5, 5)
    scene.add(pointLight1)

    const pointLight2 = new THREE.PointLight(0xff00ff, 0.8, 100)
    pointLight2.position.set(-5, -5, 5)
    scene.add(pointLight2)

    // Animation
    let animationId
    const animate = () => {
      animationId = requestAnimationFrame(animate)
      sphere.rotation.x += 0.0005
      sphere.rotation.y += 0.001
      renderer.render(scene, camera)
    }
    animate()

    // Handle resize
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

  return <div ref={containerRef} className="w-full h-screen" />
}
