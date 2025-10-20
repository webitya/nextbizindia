"use client"

import Image from "next/image"
import Link from "next/link"
import { useRef, useEffect, useState } from "react"
import * as THREE from "three"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"

function PortfolioGlobe() {
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

    camera.position.z = 2.5

    // Create sphere with gradient material
    const geometry = new THREE.IcosahedronGeometry(1.5, 6)
    const material = new THREE.MeshStandardMaterial({
      color: 0x00d4ff,
      metalness: 0.7,
      roughness: 0.3,
      emissive: 0x0066ff,
      emissiveIntensity: 0.4,
      wireframe: false,
    })
    const sphere = new THREE.Mesh(geometry, material)
    scene.add(sphere)

    // Add wireframe overlay
    const wireframeGeometry = new THREE.IcosahedronGeometry(1.52, 6)
    const wireframeMaterial = new THREE.MeshStandardMaterial({
      color: 0x00ffff,
      metalness: 0.9,
      roughness: 0.1,
      emissive: 0x00ffff,
      emissiveIntensity: 0.2,
      wireframe: true,
    })
    const wireframe = new THREE.Mesh(wireframeGeometry, wireframeMaterial)
    scene.add(wireframe)

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
    scene.add(ambientLight)

    const pointLight1 = new THREE.PointLight(0x00d4ff, 1.5, 100)
    pointLight1.position.set(5, 5, 5)
    scene.add(pointLight1)

    const pointLight2 = new THREE.PointLight(0x0066ff, 1, 100)
    pointLight2.position.set(-5, -5, 5)
    scene.add(pointLight2)

    let animationId
    const animate = () => {
      animationId = requestAnimationFrame(animate)
      sphere.rotation.x += 0.0005
      sphere.rotation.y += 0.001
      wireframe.rotation.x -= 0.0003
      wireframe.rotation.y -= 0.0008
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

  return <div ref={containerRef} className="w-full h-64 rounded-xl overflow-hidden" />
}

export default function Portfolio() {
  const [hoveredIndex, setHoveredIndex] = useState(null)

  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      category: "Web Design",
      description: "Modern e-commerce solution with advanced features and seamless checkout",
      image: "/ecommerce-dashboard.png",
      tags: ["React", "Node.js", "MongoDB"],
    },
    {
      id: 2,
      title: "Mobile Banking App",
      category: "Mobile App",
      description: "Secure and intuitive banking application with real-time transactions",
      image: "/mobile-banking-app.png",
      tags: ["React Native", "Firebase", "Security"],
    },
    {
      id: 3,
      title: "SaaS Dashboard",
      category: "Software",
      description: "Comprehensive analytics and management dashboard for enterprises",
      image: "/saas-dashboard-analytics.jpg",
      tags: ["Next.js", "PostgreSQL", "Analytics"],
    },
  ]

  return (
    <section className="py-24 bg-gradient-to-b from-white via-blue-50/30 to-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-blue-600 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-cyan-500 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header with premium styling */}
        <div className="text-center mb-20 opacity-0 animate-[fadeInUp_0.8s_ease-out_0.2s_forwards]">
          <span className="inline-block px-4 py-2 bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-600 rounded-full text-sm font-semibold mb-4 border border-blue-200 hover:border-blue-400 transition-all duration-300 hover:shadow-lg hover:shadow-blue-600/20 cursor-pointer">
            Recent Work
          </span>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Featured{" "}
            <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Showcase of our most impactful work and successful client transformations
          </p>
        </div>

        {/* Projects Grid with enhanced hover effects */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {projects.map((project, index) => (
            <div
              key={project.id}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`group rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 border border-gray-100 hover:border-blue-300 opacity-0 animate-[fadeInUp_0.8s_ease-out_${0.3 + index * 0.1}s_forwards]`}
            >
              {/* Image Container with 3D effect */}
              <div className="relative h-64 overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300">
                <Image
                  src={project.image || "/placeholder.svg?height=256&width=400&query=portfolio"}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-end justify-end p-6">
                  <div className="w-full">
                    <p className="text-cyan-400 text-sm font-semibold mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      {project.category}
                    </p>
                    <h3 className="text-white text-2xl font-bold mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                      {project.title}
                    </h3>
                    <p className="text-gray-200 text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-150">
                      {project.description}
                    </p>
                  </div>
                </div>

                {/* Floating 3D Globe */}
                <div className="absolute top-4 right-4 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <PortfolioGlobe />
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6 bg-white group-hover:bg-gradient-to-br group-hover:from-blue-50 group-hover:to-cyan-50 transition-all duration-500">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs font-semibold group-hover:bg-blue-200 transition-colors duration-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <Link
                  href="/portfolio"
                  className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-all duration-300 group-hover:gap-3 relative"
                >
                  View Case Study{" "}
                  <ArrowForwardIcon className="text-lg group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center opacity-0 animate-[fadeInUp_0.8s_ease-out_0.6s_forwards]">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg hover:from-blue-700 hover:to-cyan-600 font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-600/50 active:scale-95 relative overflow-hidden group"
          >
            <span className="relative z-10">View All Projects</span>
            <ArrowForwardIcon className="text-lg relative z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -translate-x-full group-hover:translate-x-full transition-all duration-500" />
          </Link>
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
