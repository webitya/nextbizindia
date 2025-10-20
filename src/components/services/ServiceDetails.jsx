"use client"

import { useRef, useEffect, useState } from "react"
import * as THREE from "three"
import TrendingUpIcon from "@mui/icons-material/TrendingUp"
import DesignServicesIcon from "@mui/icons-material/DesignServices"
import StorefrontIcon from "@mui/icons-material/Storefront"
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"

function Service3DVisualization({ color }) {
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

    // Create rotating torus
    const geometry = new THREE.TorusGeometry(1.2, 0.4, 32, 100)
    const material = new THREE.MeshStandardMaterial({
      color: color,
      metalness: 0.85,
      roughness: 0.15,
      emissive: color,
      emissiveIntensity: 0.5,
    })
    const torus = new THREE.Mesh(geometry, material)
    scene.add(torus)

    // Add particles around torus
    const particlesGeometry = new THREE.BufferGeometry()
    const particleCount = 100

    const positions = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount * 3; i += 3) {
      const angle = Math.random() * Math.PI * 2
      const radius = 2 + Math.random() * 1
      positions[i] = Math.cos(angle) * radius
      positions[i + 1] = (Math.random() - 0.5) * 2
      positions[i + 2] = Math.sin(angle) * radius
    }

    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    const particlesMaterial = new THREE.PointsMaterial({
      color: color,
      size: 0.05,
      transparent: true,
      opacity: 0.6,
    })
    const particles = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particles)

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7)
    scene.add(ambientLight)

    const pointLight = new THREE.PointLight(0xffffff, 1.2, 100)
    pointLight.position.set(5, 5, 5)
    scene.add(pointLight)

    let animationId
    const animate = () => {
      animationId = requestAnimationFrame(animate)
      torus.rotation.x += 0.003
      torus.rotation.y += 0.005
      particles.rotation.y += 0.001
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
  }, [color])

  return <div ref={containerRef} className="w-full h-full rounded-2xl overflow-hidden" />
}

export default function ServiceDetails() {
  const [hoveredIndex, setHoveredIndex] = useState(null)

  const services = [
    {
      icon: TrendingUpIcon,
      title: "Digital Marketing",
      description: "Strategic campaigns that drive growth and engagement",
      features: [
        "SEO & SEM Optimization",
        "Social Media Marketing",
        "Content Strategy",
        "Analytics & Reporting",
        "Email Marketing",
        "Conversion Optimization",
      ],
      color: "from-blue-600 to-blue-400",
      colorHex: 0x0066ff,
    },
    {
      icon: DesignServicesIcon,
      title: "Web Design",
      description: "Beautiful, responsive websites that convert",
      features: [
        "UI/UX Design",
        "Responsive Design",
        "E-Commerce Solutions",
        "CMS Integration",
        "Performance Optimization",
        "Accessibility Compliance",
      ],
      color: "from-cyan-600 to-cyan-400",
      colorHex: 0x00d4ff,
    },
    {
      icon: StorefrontIcon,
      title: "Software Development",
      description: "Custom solutions built with modern technology",
      features: [
        "Full-Stack Development",
        "API Development",
        "Database Design",
        "Cloud Integration",
        "Security Implementation",
        "Maintenance & Support",
      ],
      color: "from-indigo-600 to-indigo-400",
      colorHex: 0x4f46e5,
    },
    {
      icon: PhoneAndroidIcon,
      title: "Mobile Applications",
      description: "Native and cross-platform mobile experiences",
      features: [
        "iOS Development",
        "Android Development",
        "Cross-Platform Apps",
        "App Store Optimization",
        "Push Notifications",
        "Offline Functionality",
      ],
      color: "from-purple-600 to-purple-400",
      colorHex: 0xa855f7,
    },
  ]

  return (
    <section className="py-24 bg-gradient-to-b from-white via-blue-50/20 to-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-1/3 left-0 w-96 h-96 bg-blue-600 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-cyan-500 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="space-y-24">
          {services.map((service, index) => {
            const IconComponent = service.icon
            return (
              <div
                key={index}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center group opacity-0 animate-[fadeInUp_0.8s_ease-out_${0.2 + index * 0.1}s_forwards]`}
              >
                {/* Content */}
                <div className={`${index % 2 === 1 ? "md:order-2" : ""} transition-all duration-500`}>
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 shadow-lg group-hover:shadow-2xl group-hover:shadow-blue-600/50 relative overflow-hidden`}
                  >
                    <IconComponent className="text-white text-3xl relative z-10" />
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300 leading-tight">
                    {service.title}
                  </h2>
                  <p className="text-xl text-gray-600 mb-8 group-hover:text-gray-900 transition-colors duration-300 leading-relaxed">
                    {service.description}
                  </p>

                  <div className="space-y-3">
                    {service.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 group/item hover:translate-x-2 transition-transform duration-300 opacity-0 animate-[fadeInUp_0.6s_ease-out_${0.3 + idx * 0.05}s_forwards]"
                      >
                        <CheckCircleIcon className="text-blue-600 text-xl flex-shrink-0 group-hover/item:text-cyan-500 group-hover/item:scale-125 transition-all duration-300" />
                        <span className="text-gray-700 font-medium group-hover/item:text-gray-900 transition-colors duration-300">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3D Visualization */}
                <div
                  className={`relative h-96 bg-gradient-to-br ${service.color} rounded-2xl overflow-hidden shadow-2xl group-hover:shadow-3xl transition-all duration-500 transform group-hover:scale-105 border border-white/10 group-hover:border-white/30 ${index % 2 === 1 ? "md:order-1" : ""}`}
                >
                  <Service3DVisualization color={service.colorHex} />
                </div>
              </div>
            )
          })}
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
