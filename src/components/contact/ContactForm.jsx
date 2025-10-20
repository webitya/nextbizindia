"use client"

import { useState } from "react"
import SendIcon from "@mui/icons-material/Send"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import ErrorIcon from "@mui/icons-material/Error"

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    message: "",
  })

  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setStatus(null)

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus({ type: "success", message: "Message sent successfully! We'll get back to you soon." })
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          service: "",
          message: "",
        })
      } else {
        setStatus({ type: "error", message: data.message || "Failed to send message. Please try again." })
      }
    } catch (error) {
      setStatus({ type: "error", message: "An error occurred. Please try again later." })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-gradient-to-br from-white via-blue-50/50 to-cyan-50/30 rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-200 hover:border-cyan-400/50 transition-all duration-500 relative overflow-hidden group">
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-blue-600 to-cyan-500 rounded-full blur-3xl opacity-5" />
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-full blur-3xl opacity-5" />
      </div>

      <div className="relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 bg-clip-text text-transparent leading-tight">
          Send us a Message
        </h2>
        <p className="text-gray-600 mb-8 text-lg">We'll respond within 24 hours</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name & Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="group/input">
              <label className="block text-sm font-semibold text-gray-700 mb-2 group-hover/input:text-blue-600 transition-colors duration-300">
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-300 hover:border-blue-400 bg-white/70 backdrop-blur-sm hover:bg-white/90 placeholder-gray-400 font-medium"
                placeholder="John Doe"
              />
            </div>
            <div className="group/input">
              <label className="block text-sm font-semibold text-gray-700 mb-2 group-hover/input:text-blue-600 transition-colors duration-300">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-300 hover:border-blue-400 bg-white/70 backdrop-blur-sm hover:bg-white/90 placeholder-gray-400 font-medium"
                placeholder="john@example.com"
              />
            </div>
          </div>

          {/* Phone & Company */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="group/input">
              <label className="block text-sm font-semibold text-gray-700 mb-2 group-hover/input:text-blue-600 transition-colors duration-300">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-300 hover:border-blue-400 bg-white/70 backdrop-blur-sm hover:bg-white/90 placeholder-gray-400 font-medium"
                placeholder="+91 XXXXX XXXXX"
              />
            </div>
            <div className="group/input">
              <label className="block text-sm font-semibold text-gray-700 mb-2 group-hover/input:text-blue-600 transition-colors duration-300">
                Company Name
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-300 hover:border-blue-400 bg-white/70 backdrop-blur-sm hover:bg-white/90 placeholder-gray-400 font-medium"
                placeholder="Your Company"
              />
            </div>
          </div>

          {/* Service */}
          <div className="group/input">
            <label className="block text-sm font-semibold text-gray-700 mb-2 group-hover/input:text-blue-600 transition-colors duration-300">
              Service Interested In *
            </label>
            <select
              name="service"
              value={formData.service}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-300 hover:border-blue-400 bg-white/70 backdrop-blur-sm hover:bg-white/90 font-medium text-gray-700"
            >
              <option value="">Select a service</option>
              <option value="digital-marketing">Digital Marketing</option>
              <option value="web-design">Web Design</option>
              <option value="software-development">Software Development</option>
              <option value="mobile-app">Mobile Application</option>
              <option value="branding">Branding</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Message */}
          <div className="group/input">
            <label className="block text-sm font-semibold text-gray-700 mb-2 group-hover/input:text-blue-600 transition-colors duration-300">
              Message *
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="6"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-300 hover:border-blue-400 resize-none bg-white/70 backdrop-blur-sm hover:bg-white/90 placeholder-gray-400 font-medium"
              placeholder="Tell us about your project..."
            />
          </div>

          {/* Status Messages */}
          {status && (
            <div
              className={`flex items-center gap-3 p-4 rounded-xl opacity-0 animate-[fadeInUp_0.5s_ease-out_forwards] border-2 ${
                status.type === "success"
                  ? "bg-gradient-to-r from-green-50 to-emerald-50 border-green-300 text-green-700"
                  : "bg-gradient-to-r from-red-50 to-rose-50 border-red-300 text-red-700"
              }`}
            >
              {status.type === "success" ? (
                <CheckCircleIcon className="text-2xl flex-shrink-0" />
              ) : (
                <ErrorIcon className="text-2xl flex-shrink-0" />
              )}
              <p className="font-semibold">{status.message}</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 text-white rounded-xl hover:from-blue-700 hover:via-blue-600 hover:to-cyan-600 font-bold flex items-center justify-center gap-2 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-600/50 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 relative overflow-hidden group/btn text-lg"
          >
            <span className="relative z-10 flex items-center gap-2">
              {loading ? "Sending..." : "Send Message"}
              {!loading && <SendIcon className="text-xl" />}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover/btn:opacity-20 transform -translate-x-full group-hover/btn:translate-x-full transition-all duration-500" />
          </button>
        </form>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}
