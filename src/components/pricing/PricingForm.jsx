"use client"

import { useState, useEffect } from "react"
import { loadScript } from "@/lib/razorpay"
import axios from "axios"

const SERVICES = [
  {
    id: "web-design",
    name: "Web Design & Development",
    price: 25000,
    description: "Custom website design and development",
    features: ["Responsive Design", "SEO Optimized", "Fast Loading", "Mobile Friendly"],
  },
  {
    id: "digital-marketing",
    name: "Digital Marketing Campaign",
    price: 15000,
    description: "Complete digital marketing strategy",
    features: ["Social Media", "SEO", "Content Marketing", "Analytics"],
  },
  {
    id: "mobile-app",
    name: "Mobile App Development",
    price: 50000,
    description: "Native iOS and Android apps",
    features: ["iOS App", "Android App", "Backend API", "Cloud Integration"],
  },
  {
    id: "software-dev",
    name: "Custom Software Development",
    price: 75000,
    description: "Enterprise software solutions",
    features: ["Custom Development", "Database Design", "API Integration", "Support"],
  },
  {
    id: "branding",
    name: "Brand Identity & Logo Design",
    price: 10000,
    description: "Complete branding package",
    features: ["Logo Design", "Brand Guidelines", "Color Palette", "Typography"],
  },
  {
    id: "seo-optimization",
    name: "SEO Optimization",
    price: 8000,
    description: "Search engine optimization",
    features: ["Keyword Research", "On-page SEO", "Link Building", "Monthly Reports"],
  },
]

export default function PricingForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    description: "",
  })
  const [selectedService, setSelectedService] = useState(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [razorpayKey, setRazorpayKey] = useState(null)

  useEffect(() => {
    const fetchRazorpayKey = async () => {
      try {
        const response = await axios.get("/api/get-razorpay-key")
        setRazorpayKey(response.data.key)
      } catch (error) {
        console.error("Failed to fetch Razorpay key:", error)
        setMessage("Payment system initialization failed. Please refresh the page.")
      }
    }

    fetchRazorpayKey()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    if (name === "service") {
      const service = SERVICES.find((s) => s.id === value)
      setSelectedService(service)
    }
  }

  const handlePayment = async (e) => {
    e.preventDefault()

    if (!formData.name || !formData.email || !formData.phone || !formData.service) {
      setMessage("Please fill all required fields")
      return
    }

    if (!razorpayKey) {
      setMessage("Payment system not ready. Please refresh the page.")
      return
    }

    setLoading(true)

    try {
      const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js")

      if (!res) {
        setMessage("Razorpay SDK failed to load")
        setLoading(false)
        return
      }

      // Create order on backend
      const orderRes = await axios.post("/api/create-order", {
        amount: selectedService.price * 100, // Convert to paise
        service: selectedService.name,
      })

      const { orderId } = orderRes.data

      const options = {
        key: razorpayKey,
        amount: selectedService.price * 100,
        currency: "INR",
        name: "Relyonus Digitally",
        description: selectedService.name,
        order_id: orderId,
        handler: async (response) => {
          try {
            // Verify payment on secure backend
            const verifyRes = await axios.post("/api/verify-payment", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              formData,
              service: selectedService,
            })

            if (verifyRes.data.success) {
              setMessage("Payment successful! Check your email for receipt.")
              setFormData({ name: "", email: "", phone: "", service: "", description: "" })
              setSelectedService(null)
            }
          } catch (error) {
            setMessage("Payment verification failed")
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        theme: {
          color: "#0ea5e9",
        },
      }

      const rzp = new window.Razorpay(options)
      rzp.open()
    } catch (error) {
      setMessage("Payment initiation failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20">
      <div className="w-full max-w-2xl">
        <div className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-2xl border border-cyan-500/20 rounded-3xl p-8 sm:p-12 shadow-2xl hover:shadow-cyan-500/20 transition-all duration-500">
          <h2 className="text-3xl sm:text-4xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Get Started Today
          </h2>

          <form onSubmit={handlePayment} className="space-y-6">
            <div className="group">
              <label className="block text-sm font-semibold text-gray-300 mb-2 group-hover:text-cyan-400 transition-colors">
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                className="w-full px-4 py-3 bg-slate-900/50 border border-gray-600/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 hover:border-gray-500/50"
                required
              />
            </div>

            <div className="group">
              <label className="block text-sm font-semibold text-gray-300 mb-2 group-hover:text-cyan-400 transition-colors">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                className="w-full px-4 py-3 bg-slate-900/50 border border-gray-600/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 hover:border-gray-500/50"
                required
              />
            </div>

            <div className="group">
              <label className="block text-sm font-semibold text-gray-300 mb-2 group-hover:text-cyan-400 transition-colors">
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 XXXXX XXXXX"
                className="w-full px-4 py-3 bg-slate-900/50 border border-gray-600/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 hover:border-gray-500/50"
                required
              />
            </div>

            <div className="group">
              <label className="block text-sm font-semibold text-gray-300 mb-2 group-hover:text-cyan-400 transition-colors">
                Select Service *
              </label>
              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-900/50 border border-gray-600/30 rounded-xl text-white focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 hover:border-gray-500/50"
                required
              >
                <option value="">Choose a service...</option>
                {SERVICES.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.name} - ₹{service.price.toLocaleString("en-IN")}
                  </option>
                ))}
              </select>
            </div>

            <div className="group">
              <label className="block text-sm font-semibold text-gray-300 mb-2 group-hover:text-cyan-400 transition-colors">
                Project Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Tell us about your project..."
                rows="4"
                className="w-full px-4 py-3 bg-slate-900/50 border border-gray-600/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 hover:border-gray-500/50 resize-none"
              />
            </div>

            {selectedService && (
              <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-xl p-4 animate-pulse">
                <p className="text-cyan-300 font-semibold mb-2">{selectedService.name}</p>
                <p className="text-2xl font-bold text-cyan-400">₹{selectedService.price.toLocaleString("en-IN")}</p>
              </div>
            )}

            {message && (
              <div
                className={`p-4 rounded-xl text-center font-semibold ${
                  message.includes("successful")
                    ? "bg-green-500/20 text-green-300 border border-green-500/30"
                    : "bg-red-500/20 text-red-300 border border-red-500/30"
                }`}
              >
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !razorpayKey}
              className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-cyan-500/50 relative overflow-hidden group"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {loading ? "Processing..." : `Pay ₹${selectedService?.price.toLocaleString("en-IN") || "0"}`}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -translate-x-full group-hover:translate-x-full transition-all duration-500" />
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-gray-700/50 flex justify-center gap-6 text-gray-400 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              Secure Payment
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              Instant Receipt
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              24/7 Support
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
