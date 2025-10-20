"use client"
import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import PricingHero from "@/components/pricing/PricingHero"
import PricingForm from "@/components/pricing/PricingForm"
import PricingGalaxy from "@/components/pricing/PricingGalaxy"

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-blue-950 to-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 w-full h-96">
        <Canvas className="w-full h-full">
          <PricingGalaxy />
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/50 to-slate-950 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10">
        <PricingHero />
        <PricingForm />
      </div>
    </div>
  )
}
