"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
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
import { Rating } from "@material-tailwind/react"
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify"

export default function AddRoomPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    number: "",
    type: "",
    capacity: "",
    price: "",
    status: "available",
    description: "",
    amenities: {
      wifi: true,
      tv: true,
      aircon: true,
      minibar: false,
      balcony: false,
      bathtub: false,
    },
    rating: "1",
    location: "",
    images: []
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAmenityChange = (amenity, checked) => {
    setFormData((prev) => ({
      ...prev,
      amenities: {
        ...prev.amenities,
        [amenity]: checked,
      },
    }));
  };

  const handleDrop = (acceptedFiles) => {
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...acceptedFiles],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "images") {
        formData.images.forEach((image) => {
          formDataToSend.append("images", image);
        });
      } else {
        formDataToSend.append(key, formData[key]);
      }
    });
    await axios
      .post("/api/admin/add-room", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        toast.success(res.data.message)
        router.push("/admin/rooms");
      })
      .catch((error) => {
        toast.warning(error.message)
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };


  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    accept: {
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/png': ['.png'],
      'image/gif': ['.gif'],
    },
  });

  return (
    <div className="space-y-6 w-full ">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" asChild>
          <Link href="/admin/rooms">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Add New Room</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Room Details</CardTitle>
              <CardDescription>Enter the basic information about the room</CardDescription>
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
                    step="1"
                    placeholder="e.g. 4599"
                    value={formData.price}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
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
                  <Label htmlFor="location">Location *</Label>
                  <Select
                    value={formData.location}
                    onValueChange={(value) => handleSelectChange("location", value)}
                    required
                  >
                    <SelectTrigger id="location">
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Chennai">Chenai</SelectItem>
                      <SelectItem value="Tiruchy">Tiruchy</SelectItem>
                      <SelectItem value="Tanjavur">Tanjavur</SelectItem>
                      <SelectItem value="Triunelveli">Triunelveli</SelectItem>
                      <SelectItem value="Kanniyakumari">Kanniyakumari</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
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
              <div className="space-y-4">
                <Label htmlFor="rating">Rating *</Label>
                <Rating
                  id="rating"
                  name="rating"
                  value={formData.rating}
                  onChange={(event) => handleSelectChange("rating", event)}
                />
              </div>
              <CardTitle>Amenities & Features</CardTitle>
              <CardDescription>Select the amenities available in this room</CardDescription>
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
                <div
                  {...getRootProps()}
                  className={`flex h-32 cursor-pointer items-center justify-center rounded-md border border-dashed ${isDragActive ? "border-primary" : "border-muted-foreground/25"
                    } p-4 transition-colors hover:border-muted-foreground/50`}
                >
                  <input {...getInputProps()} />
                  <div className="flex flex-col items-center gap-1 text-center">
                    <div className="rounded-full bg-primary/10 p-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-5 w-5 text-primary"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                        />
                      </svg>
                    </div>
                    <div className="text-sm font-medium">Upload Images</div>
                    <div className="text-xs text-muted-foreground">
                      Drag & drop or click to browse
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  {formData.images.length > 0 && (
                    <ul className="space-y-2">
                      {formData.images.map((file, index) => (
                        <li key={index} className="text-sm">
                          {file.name}
                        </li>
                      ))}
                    </ul>
                  )}
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
                    Save Room
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </form >
    </div >
  )
}
