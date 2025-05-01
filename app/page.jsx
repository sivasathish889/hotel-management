"use client"

import Footer from "./pages/Footer"
import Header from "./pages/Header"
import HeroSection from "./pages/HeroSection"
import PopularDestinations from "./pages/PopularDestinations"
import Testimonials from "./pages/Testimonials"
import Newsletter from "./pages/Newsletter"
import HotelFeatures from "./pages/HotelFeatures"

export default function HotelBookingWebsite() {
  return (
    <div className="flex  flex-col">
      <Header />
      <div className="flex-1">
        <HeroSection />
        <HotelFeatures />
        <PopularDestinations />
        <Testimonials />
        <Newsletter />
      </div>
      <Footer />
    </div>
  )
}


