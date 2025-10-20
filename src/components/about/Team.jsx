"use client"

import Image from "next/image"
import { useState } from "react"
import LinkedInIcon from "@mui/icons-material/LinkedIn"
import TwitterIcon from "@mui/icons-material/Twitter"

export default function Team() {
  const [hoveredIndex, setHoveredIndex] = useState(null)

  const team = [
    {
      name: "Alex Johnson",
      role: "Founder & CEO",
      image: "/placeholder.svg",
      bio: "Visionary leader with 15+ years in tech",
      color: "from-blue-600 to-cyan-500",
    },
    {
      name: "Sarah Chen",
      role: "CTO",
      image: "/placeholder.svg",
      bio: "Full-stack architect and innovation driver",
      color: "from-cyan-600 to-blue-500",
    },
    {
      name: "Michael Rodriguez",
      role: "Head of Design",
      image: "/placeholder.svg",
      bio: "Award-winning designer focused on UX",
      color: "from-indigo-600 to-cyan-500",
    },
    {
      name: "Emma Williams",
      role: "Head of Marketing",
      image: "/placeholder.svg",
      bio: "Digital marketing strategist and growth expert",
      color: "from-purple-600 to-blue-500",
    },
    {
      name: "David Park",
      role: "Lead Developer",
      image: "/placeholder.svg",
      bio: "Full-stack developer with passion for clean code",
      color: "from-blue-600 to-purple-500",
    },
    {
      name: "Lisa Anderson",
      role: "Project Manager",
      image: "/placeholder.svg",
      bio: "Agile expert ensuring project success",
      color: "from-cyan-600 to-purple-500",
    },
  ]

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-cyan-500 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-20 opacity-0 animate-[fadeInUp_0.8s_ease-out_0.2s_forwards]">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Meet Our{" "}
            <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 bg-clip-text text-transparent">
              Team
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Talented professionals united by a passion for digital excellence.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <div
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 border border-gray-100 hover:border-blue-300 opacity-0 animate-[fadeInUp_0.8s_ease-out_${0.3 + index * 0.1}s_forwards]`}
            >
              <div className={`relative h-64 overflow-hidden bg-gradient-to-br ${member.color}`}>
                <Image
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors duration-300">
                  {member.name}
                </h3>
                <p className={`bg-gradient-to-r ${member.color} bg-clip-text text-transparent font-semibold mb-3`}>
                  {member.role}
                </p>
                <p className="text-gray-600 mb-6 group-hover:text-gray-900 transition-colors duration-300">
                  {member.bio}
                </p>

                {/* Social Links */}
                <div className="flex gap-3">
                  <a
                    href="#"
                    className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gradient-to-br hover:from-blue-600 hover:to-cyan-500 hover:text-white transition-all duration-300 transform hover:scale-110 hover:shadow-lg relative overflow-hidden group/social"
                  >
                    <LinkedInIcon className="text-lg relative z-10" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover/social:opacity-20 transform -translate-x-full group-hover/social:translate-x-full transition-all duration-500" />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gradient-to-br hover:from-blue-600 hover:to-cyan-500 hover:text-white transition-all duration-300 transform hover:scale-110 hover:shadow-lg relative overflow-hidden group/social"
                  >
                    <TwitterIcon className="text-lg relative z-10" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover/social:opacity-20 transform -translate-x-full group-hover/social:translate-x-full transition-all duration-500" />
                  </a>
                </div>
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
      `}</style>
    </section>
  )
}
