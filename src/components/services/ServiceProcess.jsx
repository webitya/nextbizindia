"use client"

import LightbulbIcon from "@mui/icons-material/Lightbulb"
import DesignServicesIcon from "@mui/icons-material/DesignServices"
import BuildIcon from "@mui/icons-material/Build"
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch"
import AnalyticsIcon from "@mui/icons-material/Analytics"

export default function ServiceProcess() {
  const steps = [
    {
      icon: LightbulbIcon,
      title: "Discovery",
      description: "We understand your goals, challenges, and vision for success.",
    },
    {
      icon: DesignServicesIcon,
      title: "Strategy",
      description: "Develop a comprehensive roadmap tailored to your needs.",
    },
    {
      icon: BuildIcon,
      title: "Development",
      description: "Build with precision using cutting-edge technologies.",
    },
    {
      icon: RocketLaunchIcon,
      title: "Launch",
      description: "Deploy with confidence and ensure smooth operations.",
    },
    {
      icon: AnalyticsIcon,
      title: "Optimize",
      description: "Monitor, analyze, and continuously improve performance.",
    },
  ]

  return (
    <section className="py-24 bg-gradient-to-b from-white via-blue-50/20 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20 animate-fade-in-up">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Our <span className="text-blue-600">Process</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            A proven methodology that ensures success at every stage.
          </p>
        </div>

        <div className="relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-20 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 rounded-full" />

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {steps.map((step, index) => {
              const IconComponent = step.icon
              return (
                <div
                  key={index}
                  className="relative group animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Circle */}
                  <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 bg-white border-4 border-blue-600 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-2xl group-hover:shadow-blue-600/50 relative z-10 transition-all duration-300 transform group-hover:scale-110">
                      <IconComponent className="text-blue-600 text-3xl group-hover:text-cyan-500 transition-colors duration-300" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="bg-white rounded-xl p-6 shadow-lg group-hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-2 border border-gray-100 group-hover:border-blue-300">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 group-hover:text-gray-900 transition-colors duration-300">
                      {step.description}
                    </p>
                  </div>

                  {/* Step number */}
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-blue-600 to-cyan-500 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-lg group-hover:shadow-xl group-hover:shadow-blue-600/50 transition-all duration-300">
                    {index + 1}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
