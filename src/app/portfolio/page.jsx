import PortfolioHero from "@/components/portfolio/PortfolioHero"
import PortfolioGrid from "@/components/portfolio/PortfolioGrid"
import CaseStudies from "@/components/portfolio/CaseStudies"
import PortfolioCTA from "@/components/portfolio/PortfolioCTA"

export default function PortfolioPage() {
  return (
    <>
      <PortfolioHero />
      <PortfolioGrid />
      <CaseStudies />
      <PortfolioCTA />
    </>
  )
}
