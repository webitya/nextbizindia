"use client"

export default function AboutStory() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <span className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold mb-4">
              Our Story
            </span>
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              From Vision to <span className="text-blue-600">Reality</span>
            </h2>

            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Founded in 2018, Relyonusdigitally emerged from a simple belief: technology should empower businesses, not
              complicate them. What started as a small team of three developers has grown into a powerhouse of 50+
              talented professionals.
            </p>

            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              We've worked with startups, scale-ups, and enterprises across diverse industries. Each project has taught
              us something new, shaped our approach, and reinforced our commitment to excellence.
            </p>

            <p className="text-lg text-gray-600 leading-relaxed">
              Today, we're proud to have delivered 150+ successful projects, maintained a 98% client satisfaction rate,
              and built lasting partnerships with our clients.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-blue-600 to-blue-400 rounded-2xl p-8 text-white shadow-lg">
              <p className="text-5xl font-bold mb-2">6+</p>
              <p className="text-lg">Years of Excellence</p>
            </div>
            <div className="bg-gradient-to-br from-cyan-600 to-cyan-400 rounded-2xl p-8 text-white shadow-lg">
              <p className="text-5xl font-bold mb-2">150+</p>
              <p className="text-lg">Projects Delivered</p>
            </div>
            <div className="bg-gradient-to-br from-indigo-600 to-indigo-400 rounded-2xl p-8 text-white shadow-lg">
              <p className="text-5xl font-bold mb-2">50+</p>
              <p className="text-lg">Team Members</p>
            </div>
            <div className="bg-gradient-to-br from-purple-600 to-purple-400 rounded-2xl p-8 text-white shadow-lg">
              <p className="text-5xl font-bold mb-2">98%</p>
              <p className="text-lg">Client Satisfaction</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
