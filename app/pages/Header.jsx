import { MapPin } from '@deemlol/next-icons';
import { Button } from '@material-tailwind/react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

function Header() {
    const [user, setUser] = useState(null);
    const [name, setUsername] = useState(null);

    useEffect(() => {
        // Retrieve user and username from localStorage
        const storedUser = localStorage.getItem('user');
        const storedUsername = localStorage.getItem('username');

        setUser(storedUser);
        setUsername(storedUsername);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('username'); // Remove username as well
        setUser(null);
        setUsername(null);
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between">
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="rounded-full bg-primary p-1">
                            <MapPin className="h-5 w-5 text-primary-foreground" />
                        </div>
                        <span className="text-xl font-bold">StayEase</span>
                    </Link>
                </div>

                {/* Navigation Links */}
                <nav className="hidden md:flex items-center gap-6">
                    <Link href="/" className="text-sm font-medium hover:text-primary">
                        Home
                    </Link>
                    <Link href="/hotels" className="text-sm font-medium hover:text-primary">
                        Hotels
                    </Link>
                    <Link href="/destinations" className="text-sm font-medium hover:text-primary">
                        Destinations
                    </Link>
                    <Link href="/deals" className="text-sm font-medium hover:text-primary">
                        Deals
                    </Link>
                    <Link href="/contact" className="text-sm font-medium hover:text-primary">
                        Contact
                    </Link>
                </nav>

                {/* User Actions */}
                {user ? (
                    <div className="flex items-center gap-4">
                        <span className="text-sm font-medium">Welcome, {name || "Guest"}!</span>
                        <Button
                            size="sm"
                            className="text-blue border border-blue-700 cursor-pointer"
                            onClick={handleLogout}
                        >
                            Logout
                        </Button>
                    </div>
                ) : (
                    <div className="flex items-center gap-4">
                        <Link href="/login">
                            <Button variant="ghost" size="sm" className="cursor-pointer" color="blue">
                                Sign In
                            </Button>
                        </Link>
                        <Link href="/sign-up">
                            <Button size="sm" className="text-blue border border-blue-700 cursor-pointer">
                                Sign Up
                            </Button>
                        </Link>
                    </div>
                )}
            </div>
        </header>
    );
}

export default Header;