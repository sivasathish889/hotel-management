import { Button, Input } from '@material-tailwind/react'
import React from 'react'

function Newsletter() {
    return (
      <section className="bg-primary py-12 md:py-16 lg:py-20 text-primary-foreground">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Get Exclusive Hotel Deals</h2>
            <p className="mt-2">Subscribe to our newsletter and receive special offers and discounts</p>
            <div className="mt-6 flex flex-col gap-2 sm:flex-row">
              <Input type="email" placeholder="Enter your email" className="bg-primary-foreground text-primary" />
              <Button variant="secondary">Subscribe</Button>
            </div>
            <p className="mt-2 text-sm opacity-80">We respect your privacy. Unsubscribe at any time.</p>
          </div>
        </div>
      </section>
    )
  }
export default Newsletter