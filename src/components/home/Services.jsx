"use client"

import Link from "next/link"
import { useRef, useEffect, useState } from "react"
import * as THREE from "three"
import DesignServicesIcon from "@mui/icons-material/DesignServices"
import StorefrontIcon from "@mui/icons-material/Storefront"
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid"
import TrendingUpIcon from "@mui/icons-material/TrendingUp"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"

function Service3DCube({ color }) {
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

    // Premium cube with metallic material
    const geometry = new THREE.BoxGeometry(1.2, 1.2, 1.2)
    const material = new THREE.MeshStandardMaterial({
      color: color,
      metalness: 0.8,
      roughness: 0.2,
      emissive: color,
      emissiveIntensity: 0.3,
    })
    const cube = new THREE.Mesh(geometry, material)
    scene.add(cube)

    // Add glowing edges
    const edges = new THREE.EdgesGeometry(geometry)
    const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0x00ffff, linewidth: 2 }))
    cube.add(line)

    // Advanced lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7)
    scene.add(ambientLight)

    const pointLight = new THREE.PointLight(0x00d4ff, 1.2, 100)
    pointLight.position.set(5, 5, 5)
    scene.add(pointLight)

    const directionalLight = new THREE.DirectionalLight(0x0066ff, 0.8)
    directionalLight.position.set(-5, -5, 5)
    scene.add(directionalLight)

    let animationId
    const animate = () => {
      animationId = requestAnimationFrame(animate)
      cube.rotation.x += 0.003
      cube.rotation.y += 0.005
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

  return <div ref={containerRef} className="w-full h-32 rounded-xl overflow-hidden" />
}

export default function Services() {
  const [hoveredIndex, setHoveredIndex] = useState(null)

  const services = [
    {
      icon: TrendingUpIcon,
      title: "Digital Marketing",
      description: "Strategic campaigns that drive growth, engagement, and measurable ROI for your brand.",
      color: "from-blue-600 to-blue-400",
      bgColor: "bg-blue-50",
      cubeColor: 0x0066ff,
    },
    {
      icon: DesignServicesIcon,
      title: "Web Design",
      description: "Beautiful, responsive websites that captivate users and convert visitors into customers.",
      color: "from-cyan-600 to-cyan-400",
      bgColor: "bg-cyan-50",
      cubeColor: 0x00d4ff,
    },
    {
      icon: StorefrontIcon,
      title: "Software Development",
      description: "Custom software solutions built with cutting-edge technology and best practices.",
      color: "from-indigo-600 to-indigo-400",
      bgColor: "bg-indigo-50",
      cubeColor: 0x4f46e5,
    },
    {
      icon: PhoneAndroidIcon,
      title: "Mobile Applications",
      description: "Native and cross-platform mobile apps that deliver exceptional user experiences.",
      color: "from-purple-600 to-purple-400",
      bgColor: "bg-purple-50",
      cubeColor: 0xa855f7,
    },
  ]

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header with premium styling */}
        <div className="text-center mb-20 opacity-0 animate-[fadeInUp_0.8s_ease-out_0.2s_forwards]">
          <span className="inline-block px-4 py-2 bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-600 rounded-full text-sm font-semibold mb-4 border border-blue-200 hover:border-blue-400 transition-all duration-300 hover:shadow-lg hover:shadow-blue-600/20 cursor-pointer">
            Our Expertise
          </span>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Services That{" "}
            <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 bg-clip-text text-transparent">
              Transform
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Comprehensive digital solutions tailored to elevate your business to new heights.
          </p>
        </div>

        {/* Services Grid with enhanced hover effects */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {services.map((service, index) => {
            const IconComponent = service.icon
            return (
              <div
                key={index}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 border border-gray-100 hover:border-blue-300 overflow-hidden cursor-pointer opacity-0 animate-[fadeInUp_0.8s_ease-out_${0.3 + index * 0.1}s_forwards]`}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div
                    className={`absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br ${service.color} rounded-full blur-3xl opacity-10`}
                  />
                </div>

                <div className="relative z-10">
                  {/* 3D Cube */}
                  <div className="mb-6 rounded-xl overflow-hidden border border-gray-200 group-hover:border-blue-400 transition-all duration-300 shadow-md group-hover:shadow-lg group-hover:shadow-blue-600/30">
                    <Service3DCube color={service.cubeColor} />
                  </div>

                  {/* Icon with premium styling */}
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 shadow-lg group-hover:shadow-2xl group-hover:shadow-blue-600/50 relative`}
                  >
                    <IconComponent className="text-white text-3xl relative z-10" />
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed group-hover:text-gray-900 transition-colors duration-300">
                    {service.description}
                  </p>

                  {/* CTA Link */}
                  <Link
                    href="/services"
                    className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-all duration-300 group-hover:gap-3 relative"
                  >
                    Learn More{" "}
                    <ArrowForwardIcon className="text-lg group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>
              </div>
            )
          })}
        </div>

        {/* CTA Button */}
        <div className="text-center opacity-0 animate-[fadeInUp_0.8s_ease-out_0.8s_forwards]">
          <Link
            href="/services"
            className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg hover:from-blue-700 hover:to-cyan-600 font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-600/50 active:scale-95 relative overflow-hidden group"
          >
            <span className="relative z-10">Explore All Services</span>
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
