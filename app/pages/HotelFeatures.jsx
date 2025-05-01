import React, { useEffect, useState } from 'react'
import HotelCard from './HotelCard'
import { Button } from '@material-tailwind/react'
import axios from 'axios'

const HotelFeatures = () => {

    const [hotels, setHotel] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            await axios.get('/api/hotel/get-roomData').then((res) => {
                setHotel(res.data)
            })
        }
        fetchData()
    }, [])
    return (
        <section className="">
            <div className="container mt-[220em]">
                <div className="mb-8 text-center">
                    <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Featured Hotels</h2>
                    <p className="mt-2 text-muted-foreground">Discover our handpicked selection of the finest hotels</p>
                </div>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {hotels.map((hotel) => (
                        <HotelCard key={hotel._id} hotel={hotel} />
                    ))}
                </div>
                <div className="mt-8 text-center">
                    <Button variant="outline">View All Hotels</Button>
                </div>
            </div>
        </section>
    )
}

export default HotelFeatures