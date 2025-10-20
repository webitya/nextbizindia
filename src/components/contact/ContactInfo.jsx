"use client"

import PhoneIcon from "@mui/icons-material/Phone"
import EmailIcon from "@mui/icons-material/Email"
import LocationOnIcon from "@mui/icons-material/LocationOn"
import AccessTimeIcon from "@mui/icons-material/AccessTime"

export default function ContactInfo() {
  const contactDetails = [
    {
      icon: EmailIcon,
      title: "Email",
      content: "hello@relyonusdigitally.com",
      link: "mailto:hello@relyonusdigitally.com",
    },
    {
      icon: PhoneIcon,
      title: "Phone",
      content: "+1 (234) 567-890",
      link: "tel:+12345678900",
    },
    {
      icon: LocationOnIcon,
      title: "Address",
      content: "San Francisco, CA 94105",
      link: "#",
    },
    {
      icon: AccessTimeIcon,
      title: "Hours",
      content: "Mon - Fri: 9AM - 6PM PST",
      link: "#",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h3>
      </div>

      {contactDetails.map((detail, index) => {
        const IconComponent = detail.icon
        return (
          <a
            key={index}
            href={detail.link}
            className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition group"
          >
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-blue-700 transition">
              <IconComponent className="text-white text-xl" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-600">{detail.title}</p>
              <p className="text-gray-900 font-medium group-hover:text-blue-600 transition">{detail.content}</p>
            </div>
          </a>
        )
      })}

      {/* Social Links */}
      <div className="pt-6 border-t border-gray-200">
        <p className="text-sm font-semibold text-gray-600 mb-4">Follow Us</p>
        <div className="flex gap-3">
          {["Facebook", "Twitter", "LinkedIn", "Instagram"].map((social, idx) => (
            <a
              key={idx}
              href="#"
              className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center hover:bg-blue-600 hover:text-white transition text-sm font-semibold text-gray-700"
            >
              {social.charAt(0)}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
