'use client'

import Link from 'next/link'
import { MessageCircle, Mail, Phone, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                
                       <Image
                        src="/logo.png"
                        alt="Logo"
                        width={120}
                        height={120}
                        priority
                      />
              </div>
              <div>
                <h3 className="font-bold text-lg">Qadri</h3>
                <p className="text-xs opacity-75">Premium Dry Fruits</p>
              </div>
            </div>
            <p className="text-sm opacity-75">
              Bringing the finest quality dry fruits to your doorstep with freshness and care.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <nav className="space-y-2 text-sm">
              <Link href="/" className="opacity-75 hover:opacity-100 transition-opacity block">
                Home
              </Link>
              <Link href="/#products" className="opacity-75 hover:opacity-100 transition-opacity block">
                Products
              </Link>
              <Link href="/about" className="opacity-75 hover:opacity-100 transition-opacity block">
                About Us
              </Link>
              <Link href="/contact" className="opacity-75 hover:opacity-100 transition-opacity block">
                Contact
              </Link>
            </nav>
          </div>

          {/* Information */}
          <div>
            <h4 className="font-semibold mb-4">Information</h4>
            <nav className="space-y-2 text-sm">
              <Link href="/shipping" className="opacity-75 hover:opacity-100 transition-opacity block">
                Shipping Info
              </Link>
              <Link href="/returns" className="opacity-75 hover:opacity-100 transition-opacity block">
                Returns & Exchange
              </Link>
              <Link href="/privacy" className="opacity-75 hover:opacity-100 transition-opacity block">
                Privacy Policy
              </Link>
              <Link href="/terms" className="opacity-75 hover:opacity-100 transition-opacity block">
                Terms & Conditions
              </Link>
            </nav>
          </div>

          {/* Contact & Support */}
          <div>
            <h4 className="font-semibold mb-4">Get in Touch</h4>
            <div className="space-y-3">
              <a
                href="tel:+917361033851"
                className="flex items-start gap-3 text-sm opacity-75 hover:opacity-100 transition-opacity"
              >
                <Phone className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <span>+91 7361033851</span>
              </a>
              <a
                href="mailto:akhtarrazafaizi121@gmail.com"
                className="flex items-start gap-3 text-sm opacity-75 hover:opacity-100 transition-opacity"
              >
                <Mail className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <span>akhtarrazafaizi121@gmail.com</span>
              </a>
              <div className="flex items-start gap-3 text-sm opacity-75">
                <MapPin className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <span>Madhepur Madhubani bihar, India</span>
              </div>
            </div>
          </div>
        </div>

        {/* WhatsApp CTA */}
        <div className="border-t border-background/20 pt-8 mb-8">
          <div className="bg-primary/20 rounded-lg p-6 text-center mb-8">
            <h3 className="text-lg font-semibold mb-3">Need Help?</h3>
            <p className="opacity-75 text-sm mb-4">
              Chat with us on WhatsApp for instant support and product information
            </p>
            <a
              href="https://wa.me/917361033851?text=Hi%20Quadri%20Dryfruit%2C%20I%20need%20help"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-primary hover:bg-primary/90 text-background gap-2 inline-flex">
                <MessageCircle className="h-5 w-5" />
                Chat on WhatsApp
              </Button>
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-background/20 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm opacity-75">
          <p>
            &copy; {currentYear} Qadri Dryfruit. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://wa.me/917361033851"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-100 transition-opacity"
            >
              WhatsApp
            </a>
            <span>•</span>
            <a href="mailto:akhtarrazafaizi121@gmail.com" className="hover:opacity-100 transition-opacity">
              Email
            </a>
            <span>•</span>
            <a href="tel:+917361033851" className="hover:opacity-100 transition-opacity">
              Call
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
