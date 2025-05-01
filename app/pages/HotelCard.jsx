import { MapPin, Star } from '@deemlol/next-icons'
import { Button, IconButton } from '@material-tailwind/react'
import { Badge, Card, CardBody, CardFooter, CardHeader } from '@material-tailwind/react'
import Image from 'next/image'
import React from 'react'

function HotelCard({ hotel }) {
    return (
        <Card className="overflow-hidden">
            <div className="relative h-48">
                <Image
                    src={hotel.roomImageUrl[0]}
                    alt={hotel.roomNumber}
                    fill
                    className="object-cover transition-transform hover:scale-105"
                />
                <div className="absolute right-2 top-2">
                    <Badge variant="secondary" className="flex items-center gap-1 bg-white/90">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        {hotel.roomRating}
                    </Badge>
                </div>
            </div>
            <CardHeader className="p-4">
                <div className="text-lg">{hotel.roomNumber}</div>
                <div className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />
                    {hotel.roomLocation}
                </div>
            </CardHeader>
            <CardBody className="p-4 pt-0">
                {/* <div className="flex flex-wrap gap-2">
                    {hotel.amenities.slice(0, 3).map((amenity, index) => (
                        <Badge key={index} variant="outline" className="font-normal">
                            {amenity}
                        </Badge>
                    ))}
                    {hotel.amenities.length > 3 && (
                        <Badge variant="outline" className="font-normal">
                            +{hotel.amenities.length - 3} more
                        </Badge>
                    )}
                </div> */}
                <div>
                    <Badge  >
                       <p className='text-xl'> {hotel.roomType}</p>
                    </Badge>
                    {hotel.roomDescription.length > 80 &&
                        <Badge variant="outline" className="font-normal">
                            {hotel.roomDescription.slice(0, 80)}...
                        </Badge>
                    }
                </div>
            </CardBody>
            <CardFooter className="flex items-center justify-between p-4 pt-0">
                <div>
                    <span className="text-lg font-bold">{hotel.roomPrice}</span>
                    <span className="text-sm text-muted-foreground"> / night</span>
                </div>
                <Button size="md" color='blue' className='py-2'>Book Now</Button>
            </CardFooter>
        </Card>
    )
}


export default HotelCard