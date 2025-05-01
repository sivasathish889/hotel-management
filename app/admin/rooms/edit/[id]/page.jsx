"use client"


import { useState, useEffect, use } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Save } from "lucide-react"
import Link from "next/link"
import axios from "axios"
import { toast } from "react-toastify"


export default function EditRoomPage({ params, }) {
  const router = useRouter()
  const { id } = use(params);
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [data, setData] = useState([])

  const [formData, setFormData] = useState({
    number: "",
    type: "",
    capacity: "",
    price: "",
    status: "",
    description: "",
    amenities: {
      wifi: false,
      tv: false,
      aircon: false,
      minibar: false,
      balcony: false,
      bathtub: false,
    },
  })

  // Simulate fetching room data
  useEffect(() => {
    getRoomById()
  }, [id])



  const getRoomById = async () => {
    try {
      await axios.get(`/api/admin/getRoomById/${id}`)
        .then((res) => {
          setData(res.data)
          setFormData({
            number: res.data.roomNumber,
            capacity: res.data.roomCapacity,
            amenities: res.data.roomAmenities,
            description: res.data.roomDescription,
            price: res.data.roomPrice,
            status: res.data.roomStatus,
            type: res.data.roomType
          })
        })
    } catch (error) {
      console.log(error)
    }
  }
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleAmenityChange = (amenity,) => {
    setFormData((prev) => ({
      ...prev,
      amenities: {
        ...prev.amenities,
        [amenity]: checked,
      },
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      await axios.put(`/api/admin/update-room/${id}`, JSON.stringify(formData),
      )
        .then((res) => {
          toast.success(res.data.message)
        })

    } catch (error) {
      console.error("Error updating room:", error);
      throw error;
    }


  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" asChild>
          <Link href="/dashboard/rooms">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Edit Room</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Room Details</CardTitle>
              <CardDescription>Update the information about the room</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="number">Room Number *</Label>
                <Input
                  id="number"
                  name="number"
                  placeholder="e.g. 101"
                  value={formData.number}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Room Type *</Label>
                <Select value={formData.type} onValueChange={(value) => handleSelectChange("type", value)} required>
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Select room type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Standard">Standard</SelectItem>
                    <SelectItem value="Deluxe">Deluxe</SelectItem>
                    <SelectItem value="Suite">Suite</SelectItem>
                    <SelectItem value="Executive">Executive</SelectItem>
                    <SelectItem value="Presidential">Presidential</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="capacity">Capacity *</Label>
                  <Select
                    value={formData.capacity}
                    onValueChange={(value) => handleSelectChange("capacity", value)}
                    required
                  >
                    <SelectTrigger id="capacity">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Person</SelectItem>
                      <SelectItem value="2">2 People</SelectItem>
                      <SelectItem value="3">3 People</SelectItem>
                      <SelectItem value="4">4 People</SelectItem>
                      <SelectItem value="5">5+ People</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Price per Night ($) *</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="e.g. 99.99"
                    value={formData.price}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status *</Label>
                <Select value={formData.status} onValueChange={(value) => handleSelectChange("status", value)} required>
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="occupied">Occupied</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                    <SelectItem value="reserved">Reserved</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Enter room description..."
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Amenities & Features</CardTitle>
              <CardDescription>Update the amenities available in this room</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="wifi"
                    checked={formData.amenities.wifi}
                    onCheckedChange={(checked) => handleAmenityChange("wifi", checked)}
                  />
                  <Label htmlFor="wifi">WiFi</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="tv"
                    checked={formData.amenities.tv}
                    onCheckedChange={(checked) => handleAmenityChange("tv", checked)}
                  />
                  <Label htmlFor="tv">TV</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="aircon"
                    checked={formData.amenities.aircon}
                    onCheckedChange={(checked) => handleAmenityChange("aircon", checked)}
                  />
                  <Label htmlFor="aircon">Air Conditioning</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="minibar"
                    checked={formData.amenities.minibar}
                    onCheckedChange={(checked) => handleAmenityChange("minibar", checked)}
                  />
                  <Label htmlFor="minibar">Mini Bar</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="balcony"
                    checked={formData.amenities.balcony}
                    onCheckedChange={(checked) => handleAmenityChange("balcony", checked)}
                  />
                  <Label htmlFor="balcony">Balcony</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="bathtub"
                    checked={formData.amenities.bathtub}
                    onCheckedChange={(checked) => handleAmenityChange("bathtub", checked)}
                  />
                  <Label htmlFor="bathtub">Bathtub</Label>
                </div>
              </div>

              <div className="mt-6 space-y-2">
                <Label>Room Images</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative h-32 rounded-md bg-muted">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <p className="text-sm text-muted-foreground">Room Image 1</p>
                    </div>
                    <div className="absolute right-2 top-2">
                      <Button variant="destructive" size="icon" className="h-6 w-6">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-3 w-3"
                        >
                          <path d="M18 6 6 18"></path>
                          <path d="m6 6 12 12"></path>
                        </svg>
                      </Button>
                    </div>
                  </div>
                  <div className="flex h-32 cursor-pointer items-center justify-center rounded-md border border-dashed border-muted-foreground/25 p-4 transition-colors hover:border-muted-foreground/50">
                    <div className="flex flex-col items-center gap-1 text-center">
                      <div className="rounded-full bg-primary/10 p-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="h-4 w-4 text-primary"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                      </div>
                      <div className="text-xs text-muted-foreground">Add Image</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" asChild>
                <Link href="/dashboard/rooms">Cancel</Link>
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <svg
                      className="mr-2 h-4 w-4 animate-spin"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Update Room
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </form>
    </div>
  )
}
