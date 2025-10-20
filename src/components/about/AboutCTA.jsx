"use client"

import Link from "next/link"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"

export default function AboutCTA() {
  return (
    <section className="py-24 bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-5xl md:text-6xl font-bold mb-6">
          Let's Build Something <span className="text-cyan-400">Great</span>
        </h2>

        <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-12">
          Join us on a journey to transform your business through innovative digital solutions.
        </p>

        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold transition transform hover:scale-105"
        >
          Get in Touch <ArrowForwardIcon className="text-lg" />
        </Link>
      </div>
    </section>
  )
}
