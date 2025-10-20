"use client"

export default function PricingHero() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20">
      <div className="text-center max-w-4xl mx-auto">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-6 bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent animate-pulse">
          Premium Services
        </h1>

        <p className="text-xl sm:text-2xl text-gray-300 mb-8 font-light leading-relaxed">
          Choose the perfect plan for your digital transformation journey
        </p>

        <div className="flex justify-center gap-2 mb-12">
          <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full animate-pulse" />
          <div
            className="w-12 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full animate-pulse"
            style={{ animationDelay: "0.2s" }}
          />
          <div
            className="w-12 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full animate-pulse"
            style={{ animationDelay: "0.4s" }}
          />
        </div>

        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Transparent pricing, exceptional value. All prices in Indian Rupees.
        </p>
      </div>
    </div>
  )
}
