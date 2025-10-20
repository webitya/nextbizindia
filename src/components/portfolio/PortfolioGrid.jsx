"use client"

import Image from "next/image"
import { useState } from "react"
import VisibilityIcon from "@mui/icons-material/Visibility"

export default function PortfolioGrid() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [hoveredId, setHoveredId] = useState(null)

  const projects = [
    {
      id: 1,
      title: "E-Commerce Revolution",
      category: "web-design",
      image: "/ecommerce-dashboard.png",
      tags: ["React", "Node.js", "MongoDB"],
    },
    {
      id: 2,
      title: "FinTech Mobile App",
      category: "mobile-app",
      image: "/mobile-banking-app.png",
      tags: ["React Native", "Firebase", "Stripe"],
    },
    {
      id: 3,
      title: "Analytics Dashboard",
      category: "software",
      image: "/saas-dashboard-analytics.jpg",
      tags: ["Next.js", "PostgreSQL", "Chart.js"],
    },
    {
      id: 4,
      title: "Digital Marketing Campaign",
      category: "marketing",
      image: "/ecommerce-dashboard.png",
      tags: ["SEO", "SEM", "Analytics"],
    },
    {
      id: 5,
      title: "SaaS Platform",
      category: "software",
      image: "/saas-dashboard-analytics.jpg",
      tags: ["Next.js", "Stripe", "Auth0"],
    },
    {
      id: 6,
      title: "Social Media App",
      category: "mobile-app",
      image: "/mobile-banking-app.png",
      tags: ["Flutter", "Firebase", "WebSocket"],
    },
  ]

  const categories = [
    { id: "all", label: "All Projects" },
    { id: "web-design", label: "Web Design" },
    { id: "mobile-app", label: "Mobile Apps" },
    { id: "software", label: "Software" },
    { id: "marketing", label: "Marketing" },
  ]

  const filtered = selectedCategory === "all" ? projects : projects.filter((p) => p.category === selectedCategory)

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-600 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Category Filter with premium styling */}
        <div className="flex flex-wrap justify-center gap-4 mb-16 opacity-0 animate-[fadeInUp_0.8s_ease-out_0.2s_forwards]">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 relative overflow-hidden group ${
                selectedCategory === cat.id
                  ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-600/50 scale-105"
                  : "bg-white text-gray-700 border-2 border-gray-200 hover:border-blue-600 hover:shadow-lg"
              }`}
            >
              <span className="relative z-10">{cat.label}</span>
              {selectedCategory === cat.id && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 transform -translate-x-full animate-[shimmer_2s_infinite]" />
              )}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((project, idx) => (
            <div
              key={project.id}
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
              className={`group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-100 hover:border-blue-300 opacity-0 animate-[fadeInUp_0.8s_ease-out_${0.3 + idx * 0.1}s_forwards]`}
            >
              <div className="relative h-64 overflow-hidden bg-gray-200">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* Premium overlay with glow effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                  <button className="w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-full flex items-center justify-center hover:from-blue-700 hover:to-cyan-600 transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-2xl hover:shadow-blue-600/50 relative overflow-hidden group/btn">
                    <VisibilityIcon className="text-white text-2xl relative z-10" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover/btn:opacity-20 transform -translate-x-full group-hover/btn:translate-x-full transition-all duration-500" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                  {project.title}
                </h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 rounded-full text-xs font-semibold hover:from-blue-200 hover:to-cyan-200 transition-all duration-300 border border-blue-200 hover:border-blue-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <button className="text-blue-600 font-semibold hover:text-blue-700 transition-all duration-300 flex items-center gap-2 group/btn">
                  View Case Study
                  <span className="group-hover/btn:translate-x-1 transition-transform duration-300">→</span>
                </button>
              </div>
            </div>
          ))}
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
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </section>
  )
}
