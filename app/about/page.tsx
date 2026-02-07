'use client'

import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { CartProvider } from '@/lib/cart-context'
import { AuthProvider } from '@/lib/auth-context'
import { Leaf, Award, Users, Heart } from 'lucide-react'

function AboutContent() {
  return (
    <main className="flex-1 bg-background">
      <Header />

      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary/10 via-background to-secondary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground text-balance mb-6">
            About Quadri Dryfruit
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Bringing the finest quality dry fruits to your table since years of dedicated service
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 md:py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Our Story</h2>
              <p className="text-muted-foreground text-lg mb-4">
                Founded with a passion for quality and authenticity, Quadri Dryfruit started as a vision to bring the finest dry fruits from across the globe to every Indian household.
              </p>
              <p className="text-muted-foreground text-lg mb-4">
                We believe in direct sourcing from farmers and producers, ensuring that you get the freshest and most authentic products at the best prices.
              </p>
              <p className="text-muted-foreground text-lg">
                Our commitment to quality, transparency, and customer satisfaction has made us a trusted name in the dry fruit industry.
              </p>
            </div>
            <div className="relative h-96 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl flex items-center justify-center">
              <Leaf className="h-40 w-40 text-primary opacity-30" />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
            Our Values
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            <Card className="p-6 text-center">
              <Leaf className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-bold text-lg text-foreground mb-2">Quality</h3>
              <p className="text-muted-foreground text-sm">
                We ensure every product meets our strict quality standards
              </p>
            </Card>

            <Card className="p-6 text-center">
              <Award className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-bold text-lg text-foreground mb-2">Authenticity</h3>
              <p className="text-muted-foreground text-sm">
                100% genuine and sourced from trusted suppliers
              </p>
            </Card>

            <Card className="p-6 text-center">
              <Users className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-bold text-lg text-foreground mb-2">Transparency</h3>
              <p className="text-muted-foreground text-sm">
                Open communication with our customers always
              </p>
            </Card>

            <Card className="p-6 text-center">
              <Heart className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-bold text-lg text-foreground mb-2">Care</h3>
              <p className="text-muted-foreground text-sm">
                Treating every customer with respect and care
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
            Why Choose Us?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold text-foreground mb-4">Direct from Source</h3>
              <p className="text-muted-foreground">
                We work directly with farmers and producers, eliminating middlemen to ensure better quality and pricing for you.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-foreground mb-4">Freshness Guaranteed</h3>
              <p className="text-muted-foreground">
                Every product is carefully packaged and shipped to reach you in perfect condition, maintaining optimal freshness.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-foreground mb-4">Best Prices</h3>
              <p className="text-muted-foreground">
                By sourcing directly, we pass the savings to you with competitive pricing without compromising on quality.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-foreground mb-4">24/7 Support</h3>
              <p className="text-muted-foreground">
                Our dedicated support team is available round the clock on WhatsApp to assist with any queries or concerns.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-foreground mb-4">Secure Payment</h3>
              <p className="text-muted-foreground">
                Order through WhatsApp with secure payment options and transparent pricing throughout the process.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-foreground mb-4">Fast Delivery</h3>
              <p className="text-muted-foreground">
                Quick processing and delivery to your doorstep within 2-3 business days across India.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-balance">
            Ready to Taste the Difference?
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Start your journey to better health with our premium dry fruits. Order now and enjoy exclusive discounts.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/">
              <Button className="bg-background text-primary hover:bg-background/90 px-8">
                Shop Now
              </Button>
            </Link>
            <a
              href="https://wa.me/917361033851?text=Hi%20Quadri%2C%20Tell%20me%20more%20about%20your%20products"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-white/10 px-8 bg-transparent">
                Contact Us
              </Button>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

export default function AboutPage() {
  return (
    <CartProvider>
      <AuthProvider>
        <AboutContent />
      </AuthProvider>
    </CartProvider>
  )
}
