'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ShoppingCart, LogOut, User, Menu, X, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme-toggle'
import { useCart } from '@/lib/cart-context'
import { useAuth } from '@/lib/auth-context'
import { useState } from 'react'
import Image from 'next/image'

export function Header() {
  const { items } = useCart()
  const { user, logout } = useAuth()
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <header className="sticky top-0 z-40 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center group-hover:bg-primary/90 transition-colors">
              
               <Image
        src="/logo.png"
        alt="Logo"
        width={120}
        height={120}
        priority
      />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-foreground">Qadri</h1>
              <p className="text-xs text-muted-foreground">Premium Dry Fruits</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <Link
              href="/"
              className="px-3 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Home
            </Link>
            <Link
              href="/#products"
              className="px-3 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Shop
            </Link>
            <Link
              href="/about"
              className="px-3 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              About
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <ThemeToggle />

            {/* Cart Button */}
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center font-semibold">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>

            {/* Auth Buttons / User Menu */}
            {user ? (
              <div className="flex items-center gap-2">
                {user.isAdmin && (
                  <Link href="/admin">
                    <Button variant="outline" size="sm" className="hidden sm:flex gap-2 bg-transparent">
                      <Settings className="h-4 w-4" />
                      Admin
                    </Button>
                  </Link>
                )}
                <Button variant="ghost" size="icon" onClick={() => router.push('/profile')}>
                  <User className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleLogout}
                  className="hidden sm:flex"
                >
                  <LogOut className="h-5 w-5" />
                </Button>
              </div>
            ) : (
              <Button
                className="hidden sm:flex bg-primary hover:bg-primary/90 text-primary-foreground"
                onClick={() => router.push('/login')}
              >
                Sign In
              </Button>
            )}

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 border-t border-border">
            <nav className="flex flex-col gap-2">
              <Link
                href="/"
                className="px-3 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                Home
              </Link>
              <Link
                href="/#products"
                className="px-3 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                Shop
              </Link>
              <Link
                href="/about"
                className="px-3 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                About
              </Link>
              {user && (
                <button
                  onClick={handleLogout}
                  className="px-3 py-2 text-sm font-medium text-destructive hover:text-destructive/80 transition-colors text-left"
                >
                  Logout
                </button>
              )}
              {!user && (
                <Button
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  onClick={() => router.push('/login')}
                >
                  Sign In
                </Button>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
