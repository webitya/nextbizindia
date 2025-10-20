import ServicesHero from "@/components/services/ServicesHero"
import ServiceDetails from "@/components/services/ServiceDetails"
import ServiceProcess from "@/components/services/ServiceProcess"
import ServiceCTA from "@/components/services/ServiceCTA"

export default function ServicesPage() {
  return (
    <>
      <ServicesHero />
      <ServiceDetails />
      <ServiceProcess />
      <ServiceCTA />
    </>
  )
}
