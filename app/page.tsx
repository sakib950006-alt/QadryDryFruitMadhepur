'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { ProductCard } from '@/components/product-card'
import { Button } from '@/components/ui/button'
import { CartProvider } from '@/lib/cart-context'
import { AuthProvider } from '@/lib/auth-context'
import { AdminProvider } from '@/lib/admin-context'
import { useAdmin } from '@/lib/admin-context'
import { Leaf, Truck, Award, MessageCircle } from 'lucide-react'

function HomeContent() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const { products } = useAdmin()

  const categories = ['All', 'Nuts', 'Dried Fruits', 'Mix']
  const filteredProducts =
    selectedCategory === 'All'
      ? products
      : products.filter((p) => p.category === selectedCategory)

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-secondary/5 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-foreground text-balance">
                  Premium Dry Fruits
                  <span className="text-primary"> Delivered Fresh</span>
                </h1>
              </div>
              <p className="text-lg text-muted-foreground text-balance">
                Experience the finest quality dry fruits sourced directly from the best producers. Packed with nutrients and delivered to your doorstep.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="#products">
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8">
                    Shop Now
                  </Button>
                </Link>
                <Link href="/about">
                  <Button variant="outline">Learn More</Button>
                </Link>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative h-96 hidden md:block">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl" />
              <div className="absolute inset-4 bg-gradient-to-tr from-primary/10 to-transparent rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <Leaf className="h-24 w-24 text-primary mx-auto mb-4 opacity-50" />
                  <p className="text-muted-foreground font-semibold">100% Organic & Fresh</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Truck className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Fast Delivery</h3>
              <p className="text-muted-foreground">Get your order delivered within 2-3 business days</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Award className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Quality Assured</h3>
              <p className="text-muted-foreground">Premium quality products with freshness guarantee</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Leaf className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">100% Organic</h3>
              <p className="text-muted-foreground">All products are purely organic and natural</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-16 md:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Collections
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Browse our curated selection of premium dry fruits and enjoy the finest quality
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category)}
                className={
                  selectedCategory === category
                    ? 'bg-primary hover:bg-primary/90 text-primary-foreground'
                    : ''
                }
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
            Need Help? Connect with Us
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Have questions about our products? Chat with us on WhatsApp for personalized assistance.
          </p>
          <a
            href="https://wa.me/917361033851?text=Hi%20Quadri%20Dryfruit%2C%20I%20have%20a%20question%20about%20your%20products"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            <MessageCircle className="h-5 w-5" />
            Chat on WhatsApp
          </a>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default function Home() {
  return (
    <CartProvider>
      <AuthProvider>
        <AdminProvider>
          <Header />
          <HomeContent />
        </AdminProvider>
      </AuthProvider>
    </CartProvider>
  )
}
