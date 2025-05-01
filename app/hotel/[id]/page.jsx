"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import {
  CalendarIcon,
  MapPin,
  Star,
  Wifi,
  Utensils,
  Car,
  Tv,
  Coffee,
  Users,
  ChevronLeft,
  Heart,
  Share,
  Check,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { useState } from "react"

export default function HotelDetailPage({ params }) {
  const [checkInDate, setCheckInDate] = useState(new Date())
  const [checkOutDate, setCheckOutDate] = useState(
    new Date(new Date().setDate(new Date().getDate() + 3)),
  )
  const [guests, setGuests] = useState(2)

  // Mock hotel data
  const hotel = {
    id: params.id,
    name: "Grand Plaza Hotel",
    location: "New York City, USA",
    description:
      "Experience luxury in the heart of Manhattan. The Grand Plaza Hotel offers spacious rooms with stunning city views, world-class dining, and exceptional service.",
    price: 199,
    rating: 4.8,
    reviews: 324,
    images: [
      "/placeholder.svg?height=600&width=800&text=Grand+Plaza+Hotel",
      "/placeholder.svg?height=600&width=800&text=Hotel+Room",
      "/placeholder.svg?height=600&width=800&text=Hotel+Lobby",
      "/placeholder.svg?height=600&width=800&text=Hotel+Restaurant",
      "/placeholder.svg?height=600&width=800&text=Hotel+Pool",
    ],
    amenities: [
      { name: "Free WiFi", icon: <Wifi className="h-4 w-4" /> },
      { name: "Restaurant", icon: <Utensils className="h-4 w-4" /> },
      { name: "Parking", icon: <Car className="h-4 w-4" /> },
      { name: "TV", icon: <Tv className="h-4 w-4" /> },
      { name: "Coffee Maker", icon: <Coffee className="h-4 w-4" /> },
    ],
    rooms: [
      {
        id: 1,
        name: "Standard Room",
        price: 199,
        capacity: 2,
        description: "Comfortable room with city view",
        amenities: ["Free WiFi", "TV", "Air Conditioning"],
        image: "/placeholder.svg?height=300&width=500&text=Standard+Room",
      },
      {
        id: 2,
        name: "Deluxe Room",
        price: 299,
        capacity: 2,
        description: "Spacious room with premium amenities",
        amenities: ["Free WiFi", "TV", "Mini Bar", "Coffee Maker"],
        image: "/placeholder.svg?height=300&width=500&text=Deluxe+Room",
      },
      {
        id: 3,
        name: "Executive Suite",
        price: 399,
        capacity: 4,
        description: "Luxury suite with separate living area",
        amenities: ["Free WiFi", "TV", "Mini Bar", "Coffee Maker", "Bathtub"],
        image: "/placeholder.svg?height=300&width=500&text=Executive+Suite",
      },
    ],
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="rounded-full bg-primary p-1">
                <MapPin className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">StayEase</span>
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium hover:text-primary">
              Home
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-primary">
              Hotels
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-primary">
              Destinations
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-primary">
              Deals
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-primary">
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="hidden md:flex">
              Sign In
            </Button>
            <Button size="sm">Sign Up</Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="container py-6">
          <div className="mb-6">
            <Link
              href="/"
              className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-primary"
            >
              <ChevronLeft className="h-4 w-4" />
              Back to Search Results
            </Link>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl font-bold md:text-3xl">{hotel.name}</h1>
                <div className="mt-1 flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{hotel.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{hotel.rating}</span>
                    <span className="text-sm text-muted-foreground">({hotel.reviews} reviews)</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="gap-2">
                  <Share className="h-4 w-4" />
                  Share
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <Heart className="h-4 w-4" />
                  Save
                </Button>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <div className="md:col-span-2">
                <div className="grid grid-cols-2 grid-rows-2 gap-2 rounded-lg overflow-hidden h-[400px]">
                  <div className="col-span-1 row-span-2">
                    <Image
                      src={hotel.images[0] || "/placeholder.svg"}
                      alt={hotel.name}
                      width={800}
                      height={600}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <Image
                      src={hotel.images[1] || "/placeholder.svg"}
                      alt="Hotel Room"
                      width={400}
                      height={300}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <Image
                      src={hotel.images[2] || "/placeholder.svg"}
                      alt="Hotel Lobby"
                      width={400}
                      height={300}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              </div>

              <div className="lg:row-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-baseline justify-between">
                      <span>${hotel.price}</span>
                      <span className="text-sm font-normal text-muted-foreground">per night</span>
                    </CardTitle>
                    <CardDescription>Includes taxes and fees</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-2">
                          <Label>Check-in</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-full justify-start text-left font-normal",
                                  !checkInDate && "text-muted-foreground",
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {checkInDate ? format(checkInDate, "PPP") : <span>Pick a date</span>}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar mode="single" selected={checkInDate} onSelect={setCheckInDate} initialFocus />
                            </PopoverContent>
                          </Popover>
                        </div>
                        <div className="space-y-2">
                          <Label>Check-out</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-full justify-start text-left font-normal",
                                  !checkOutDate && "text-muted-foreground",
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {checkOutDate ? format(checkOutDate, "PPP") : <span>Pick a date</span>}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar mode="single" selected={checkOutDate} onSelect={setCheckOutDate} initialFocus />
                            </PopoverContent>
                          </Popover>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Guests</Label>
                        <Select defaultValue="2">
                          <SelectTrigger>
                            <SelectValue placeholder="Select guests" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1 Guest</SelectItem>
                            <SelectItem value="2">2 Guests</SelectItem>
                            <SelectItem value="3">3 Guests</SelectItem>
                            <SelectItem value="4">4 Guests</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Separator />
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span>${hotel.price} x 3 nights</span>
                          <span>${hotel.price * 3}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Cleaning fee</span>
                          <span>$50</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Service fee</span>
                          <span>$30</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between font-bold">
                          <span>Total</span>
                          <span>${hotel.price * 3 + 50 + 30}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Reserve Now</Button>
                  </CardFooter>
                </Card>
              </div>

              <div className="md:col-span-2">
                <Tabs defaultValue="description">
                  <TabsList className="w-full justify-start">
                    <TabsTrigger value="description">Description</TabsTrigger>
                    <TabsTrigger value="amenities">Amenities</TabsTrigger>
                    <TabsTrigger value="rooms">Rooms</TabsTrigger>
                    <TabsTrigger value="reviews">Reviews</TabsTrigger>
                  </TabsList>
                  <TabsContent value="description" className="mt-4">
                    <div className="space-y-4">
                      <p>{hotel.description}</p>
                      <p>
                        Located just steps away from Central Park and Fifth Avenue shopping, our hotel combines elegant
                        design with modern comfort. Each room is thoughtfully appointed with premium bedding, high-speed
                        WiFi, and stunning views of the city skyline.
                      </p>
                      <p>
                        Our on-site restaurant serves breakfast, lunch, and dinner with a menu featuring local and
                        international cuisine. The rooftop bar offers craft cocktails and panoramic views of Manhattan.
                      </p>
                    </div>
                  </TabsContent>
                  <TabsContent value="amenities" className="mt-4">
                    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                      {hotel.amenities.map((amenity, index) => (
                        <div key={index} className="flex items-center gap-2">
                          {amenity.icon}
                          <span>{amenity.name}</span>
                        </div>
                      ))}
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        <span>Room Service</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="h-4 w-4" />
                        <span>Air Conditioning</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="h-4 w-4" />
                        <span>Fitness Center</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="h-4 w-4" />
                        <span>Swimming Pool</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="h-4 w-4" />
                        <span>Business Center</span>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="rooms" className="mt-4">
                    <div className="space-y-6">
                      {hotel.rooms.map((room) => (
                        <Card key={room.id}>
                          <div className="grid md:grid-cols-3 gap-4">
                            <div className="md:col-span-1">
                              <Image
                                src={room.image || "/placeholder.svg"}
                                alt={room.name}
                                width={500}
                                height={300}
                                className="h-full w-full rounded-l-lg object-cover"
                              />
                            </div>
                            <div className="p-4 md:col-span-2 flex flex-col">
                              <div className="flex-1">
                                <h3 className="text-lg font-bold">{room.name}</h3>
                                <p className="text-sm text-muted-foreground">{room.description}</p>
                                <div className="mt-2 flex flex-wrap gap-2">
                                  {room.amenities.map((amenity, index) => (
                                    <Badge key={index} variant="outline" className="font-normal">
                                      {amenity}
                                    </Badge>
                                  ))}
                                </div>
                                <div className="mt-2 flex items-center gap-2">
                                  <Users className="h-4 w-4 text-muted-foreground" />
                                  <span className="text-sm text-muted-foreground">Up to {room.capacity} guests</span>
                                </div>
                              </div>
                              <div className="mt-4 flex items-center justify-between">
                                <div>
                                  <span className="text-lg font-bold">${room.price}</span>
                                  <span className="text-sm text-muted-foreground"> / night</span>
                                </div>
                                <Button>Select</Button>
                              </div>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="reviews" className="mt-4">
                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-3xl font-bold text-primary-foreground">
                          {hotel.rating}
                        </div>
                        <div>
                          <div className="text-lg font-bold">Excellent</div>
                          <div className="text-sm text-muted-foreground">Based on {hotel.reviews} reviews</div>
                        </div>
                      </div>
                      <Separator />
                      {[
                        {
                          name: "John Smith",
                          date: "2 weeks ago",
                          rating: 5,
                          comment:
                            "Excellent hotel with great amenities and friendly staff. The location is perfect for exploring the city.",
                        },
                        {
                          name: "Emily Johnson",
                          date: "1 month ago",
                          rating: 4,
                          comment:
                            "Very comfortable stay. The room was clean and spacious. The only downside was the noise from the street.",
                        },
                        {
                          name: "Michael Brown",
                          date: "2 months ago",
                          rating: 5,
                          comment:
                            "One of the best hotels I've stayed at. The service was impeccable and the food at the restaurant was delicious.",
                        },
                      ].map((review, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="font-medium">{review.name}</div>
                            <div className="text-sm text-muted-foreground">{review.date}</div>
                          </div>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={cn(
                                  "h-4 w-4",
                                  i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground",
                                )}
                              />
                            ))}
                          </div>
                          <p className="text-sm">{review.comment}</p>
                          {index < 2 && <Separator />}
                        </div>
                      ))}
                      <Button variant="outline" className="w-full">
                        View All Reviews
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t bg-background">
        <div className="container py-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-primary p-1">
                <MapPin className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold">StayEase</span>
            </div>
            <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} StayEase. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
