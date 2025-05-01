import React from "react";
import Image from "next/image";
import hotel from "@/public/hotelsheader/hotelheader.jpg";

function HeroSection() {
    return (
        <section className="mt-[90em]">
            {/* Background Image */}
            <div className=" ">
                <Image
                    src={hotel}
                    alt="Hotel view"
                    fill
                    className="object-cover brightness-[0.5]"
                />
            </div>
            {/* <SearchForm/> */}
            <div className="absolute inset-0 flex items-center justify-center text-white">
                <div className="absolute top-28">
                    <div className=" z-10 py-24 md:py-32 lg:py-40">
                        <div className=" text-center text-white">
                            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                                Find Your Perfect Stay
                            </h1>
                            <p className="mt-4 text-lg md:text-xl">
                                Discover amazing hotels at the best prices, anywhere in the world
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default HeroSection;