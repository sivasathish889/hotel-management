import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import img1 from "@/public/hotels/img1.jpg"
import img10 from "@/public/hotels/img10.jpg"
import img11 from "@/public/hotels/img11.jpg"
import img12 from "@/public/hotels/img12.jpg"
import img14 from "@/public/hotels/img14.jpg"
import img15 from "@/public/hotels/img15.jpg"

function PopularDestinations() {
  const destinations = [
    {
      id: 1,
      name: "Coimbatore",
      country: "India",
      hotels: 35,
      image: img1,
    },
    {
      id: 2,
      name: "Chennai",
      country: "India",
      hotels: 186,
      image: img10,
    },
    {
      id: 3,
      name: "Tirunelveli",
      country: "India",
      hotels: 112,
      image: img11,
    },
    {
      id: 4,
      name: "Tenkasi",
      country: "India",
      hotels: 87,
      image:img12,
    },
    {
      id: 5,
      name: "Villupuram",
      country: "India",
      hotels: 47,
      image: img14
    },
    {
      id: 6,
      name: "Tiruchy",
      country: "India",
      hotels: 112,
      image: img15,
    },
  ]

  return (
    <section className="bg-muted py-12 md:py-16 lg:py-20 flex-1">
      <div className="container">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Popular Destinations</h2>
          <p className="mt-2 text-muted-foreground">Explore top destinations with the best accommodations</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {destinations.map((destination) => (
            <Link key={destination.id} href="#" className="group">
              <div className="relative overflow-hidden rounded-lg">
                <div className="aspect-[4/3]">
                  <Image
                    src={destination.image || "/placeholder.svg"}
                    alt={destination.name}
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 p-4 text-white">
                  <h3 className="text-xl font-bold">{destination.name}</h3>
                  <p className="text-sm">{destination.country}</p>
                  <p className="mt-1 text-sm">{destination.hotels} hotels</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
export default PopularDestinations