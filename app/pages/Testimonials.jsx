import { Star } from '@deemlol/next-icons'
import { Card, CardBody } from '@material-tailwind/react'
import Image from 'next/image'
import React from 'react'
import img1 from "@/public/customer1.jpg"
function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: "Siva Sathish",
      location: "New York, USA",
      text: "StayEase made booking our family vacation so simple. We found the perfect hotel within our budget and the booking process was seamless.",
      avatar: img1,
    },
    {
      id: 2,
      name: "Naveen Kumar",
      location: "Toronto, Canada",
      text: "I use StayEase for all my business trips. The interface is intuitive and I always find great deals on quality hotels.",
      avatar: "/placeholder.svg?height=80&width=80&text=MC",
    },
    {
      id: 3,
      name: "Maha Vishwa",
      location: "Madrid, Spain",
      text: "As a frequent traveler, I've tried many booking platforms, but StayEase offers the best combination of selection, price, and user experience.",
      avatar: "/placeholder.svg?height=80&width=80&text=ER",
    },
    {
      id: 3,
      name: "Ponraj",
      location: "Madrid, Spain",
      text: "As a frequent traveler, I've tried many booking platforms, but StayEase offers the best combination of selection, price, and user experience.",
      avatar: "/placeholder.svg?height=80&width=80&text=ER",
    },
  ]

  return (
    <section className="py-12 md:py-16 lg:py-20">
      <div className="container">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">What Our Customers Say</h2>
          <p className="mt-2 text-muted-foreground">Hear from travelers who have booked with StayEase</p>
        </div>
        <div className="grid gap-4 md:grid-cols-4">
          {testimonials.map((testimonial,index) => (
            <Card key={index} className="h-full">
              <CardBody className="flex h-full flex-col p-6">
                <div className="mb-4 flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <blockquote className="flex-1">
                  <p className="text-muted-foreground">"{testimonial.text}"</p>
                </blockquote>
                <div className="mt-6 flex items-center gap-4  object-cover rounded-full">
                  <div className='relative h-14 w-14 overflow-hidden rounded-full'>
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="rounded-full object-cover relative"
                      height={30}
                      width={60}
                    />
                  </div>
                  <div>
                    <p className="font-medium">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials