"use client"

import Image from "next/image"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"

export default function CaseStudies() {
  const caseStudies = [
    {
      id: 1,
      title: "TechStart E-Commerce Platform",
      challenge: "Legacy system unable to handle peak traffic and poor user experience",
      solution: "Built modern React-based platform with optimized backend",
      results: ["300% increase in sales", "50% reduction in bounce rate", "99.9% uptime"],
      image: "/ecommerce-dashboard.png",
    },
    {
      id: 2,
      title: "FinanceFlow Mobile Banking",
      challenge: "Need for secure, user-friendly mobile banking solution",
      solution: "Developed React Native app with bank-grade security",
      results: ["50K+ downloads", "4.8 star rating", "Zero security breaches"],
      image: "/mobile-banking-app.png",
    },
  ]

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Featured <span className="text-blue-600">Case Studies</span>
          </h2>
        </div>

        <div className="space-y-24">
          {caseStudies.map((study, index) => (
            <div
              key={study.id}
              className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? "md:flex-row-reverse" : ""}`}
            >
              {/* Image */}
              <div className={index % 2 === 1 ? "md:order-2" : ""}>
                <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
                  <Image src={study.image || "/placeholder.svg"} alt={study.title} fill className="object-cover" />
                </div>
              </div>

              {/* Content */}
              <div className={index % 2 === 1 ? "md:order-1" : ""}>
                <span className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold mb-4">
                  Case Study
                </span>
                <h3 className="text-4xl font-bold text-gray-900 mb-6">{study.title}</h3>

                <div className="space-y-6 mb-8">
                  <div>
                    <p className="text-sm font-semibold text-blue-600 mb-2">Challenge</p>
                    <p className="text-gray-700">{study.challenge}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-blue-600 mb-2">Solution</p>
                    <p className="text-gray-700">{study.solution}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-blue-600 mb-2">Results</p>
                    <ul className="space-y-2">
                      {study.results.map((result, idx) => (
                        <li key={idx} className="text-gray-700 flex items-center gap-2">
                          <span className="w-2 h-2 bg-blue-600 rounded-full" />
                          {result}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <button className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold transition">
                  Read Full Case Study <ArrowForwardIcon className="text-lg" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
