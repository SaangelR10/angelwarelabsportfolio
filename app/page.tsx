import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import Portfolio from '@/components/Portfolio'
import About from '@/components/About'
import ClientLogos from '@/components/ClientLogos'
import CaseStudies from '@/components/CaseStudies'
import Team from '@/components/Team'
import Pricing from '@/components/Pricing'
import FAQ from '@/components/FAQ'
import Process from '@/components/Process'
import Testimonials from '@/components/Testimonials'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import NavigationManager from '@/components/NavigationManager'

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Header />
      <Hero />
      <Services />
      <ClientLogos />
      <Portfolio />
      <CaseStudies />
      <Process />
      <Pricing />
      <FAQ />
      <About />
      <Testimonials />
      <Contact />
      <Footer />
      <NavigationManager />
    </main>
  )
} 