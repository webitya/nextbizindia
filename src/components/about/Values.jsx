"use client"

import LightbulbIcon from "@mui/icons-material/Lightbulb"
import PeopleIcon from "@mui/icons-material/People"
import SecurityIcon from "@mui/icons-material/Security"
import TrendingUpIcon from "@mui/icons-material/TrendingUp"

export default function Values() {
  const values = [
    {
      icon: LightbulbIcon,
      title: "Innovation",
      description: "We constantly push boundaries and embrace new technologies to deliver cutting-edge solutions.",
    },
    {
      icon: PeopleIcon,
      title: "Collaboration",
      description: "We believe in the power of teamwork and close partnerships with our clients.",
    },
    {
      icon: SecurityIcon,
      title: "Integrity",
      description: "Trust and transparency are the foundation of everything we do.",
    },
    {
      icon: TrendingUpIcon,
      title: "Excellence",
      description: "We're committed to delivering the highest quality in every project we undertake.",
    },
  ]

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Our <span className="text-blue-600">Values</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            These principles guide every decision we make and every project we undertake.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => {
            const IconComponent = value.icon
            return (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-400 rounded-xl flex items-center justify-center mb-6">
                  <IconComponent className="text-white text-3xl" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
