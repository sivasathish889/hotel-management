import { Facebook, Instagram, MapPin, Twitter } from '@deemlol/next-icons'
import { faAppStore, faGooglePlay } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from '@material-tailwind/react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'


function Footer() {
    return (
        <footer className="border-t bg-background">
            <div className="container py-8 md:py-12">
                <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
                    <div>
                        <h3 className="mb-4 text-lg font-semibold">About StayEase</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="#" className="text-muted-foreground hover:text-foreground">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-muted-foreground hover:text-foreground">
                                    How It Works
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-muted-foreground hover:text-foreground">
                                    Careers
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-muted-foreground hover:text-foreground">
                                    Press
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-muted-foreground hover:text-foreground">
                                    Blog
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="mb-4 text-lg font-semibold">Support</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="#" className="text-muted-foreground hover:text-foreground">
                                    Help Center
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-muted-foreground hover:text-foreground">
                                    Contact Us
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-muted-foreground hover:text-foreground">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-muted-foreground hover:text-foreground">
                                    Terms of Service
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-muted-foreground hover:text-foreground">
                                    Trust & Safety
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="mb-4 text-lg font-semibold">Destinations</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="#" className="text-muted-foreground hover:text-foreground">
                                    New York
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-muted-foreground hover:text-foreground">
                                    Paris
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-muted-foreground hover:text-foreground">
                                    Tokyo
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-muted-foreground hover:text-foreground">
                                    London
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-muted-foreground hover:text-foreground">
                                    All Destinations
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="mb-4 text-lg font-semibold">Get the App</h3>
                        <p className="mb-4 text-sm text-muted-foreground">Download our app for a better experience</p>
                        <div className="flex mt-10 gap-6">
                            <div className="justify-start gap-2">
                                <FontAwesomeIcon icon={faAppStore} size="2xl" color='black' />
                                App Store
                            </div>
                            <div className="justify-start gap-2">
                                <FontAwesomeIcon icon={faGooglePlay} size="2xl" color='black' />
                                Google Play
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-8 border-t pt-8">
                    <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                        <div className="flex items-center gap-2">
                            <div className="rounded-full bg-primary p-1">
                                <MapPin className="h-4 w-4 text-primary-foreground" />
                            </div>
                            <span className="text-lg font-bold">StayEase</span>
                        </div>
                        <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} StayEase. All rights reserved.</p>
                        <div className="flex gap-4">
                            <Link href="#" className="text-muted-foreground hover:text-foreground">
                                <span className="sr-only">Facebook</span>
                                <Facebook />
                            </Link>
                            <Link href="#" className="text-muted-foreground hover:text-foreground">
                                <span className="sr-only">Twitter</span>
                                <Twitter />
                            </Link>
                            <Link href="#" className="text-muted-foreground hover:text-foreground">
                                <span className="sr-only">Instagram</span>
                                <Instagram />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}


export default Footer