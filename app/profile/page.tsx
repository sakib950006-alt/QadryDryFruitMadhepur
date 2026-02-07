'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useAuth } from '@/lib/auth-context'
import { CartProvider } from '@/lib/cart-context'
import { AuthProvider } from '@/lib/auth-context'
import { LogOut, User, Mail, ArrowLeft } from 'lucide-react'

function ProfileContent() {
  const { user, logout } = useAuth()
  const router = useRouter()

  if (!user) {
    return (
      <main className="flex-1 bg-background">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground mb-4">Access Denied</h1>
            <p className="text-muted-foreground mb-6">
              You need to sign in to view your profile
            </p>
            <Button
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
              onClick={() => router.push('/login')}
            >
              Sign In
            </Button>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  return (
    <main className="flex-1 bg-background">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/" className="text-primary hover:underline inline-flex items-center gap-2 mb-8">
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Profile Card */}
          <Card className="md:col-span-1 p-6">
            <div className="text-center">
              <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="h-10 w-10 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-1">{user.name}</h2>
              <p className="text-muted-foreground mb-6 flex items-center justify-center gap-2">
                <Mail className="h-4 w-4" />
                {user.email}
              </p>
              <Button
                variant="outline"
                className="w-full bg-transparent"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </Card>

          {/* Account Information */}
          <div className="md:col-span-2 space-y-6">
            <Card className="p-6">
              <h3 className="text-xl font-bold text-foreground mb-4">Account Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Full Name
                  </label>
                  <p className="text-foreground">{user.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Email Address
                  </label>
                  <p className="text-foreground">{user.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    User ID
                  </label>
                  <p className="text-foreground font-mono text-sm">{user.id}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-bold text-foreground mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link href="/">
                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground justify-start">
                    Continue Shopping
                  </Button>
                </Link>
                <Link href="/cart">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    View Cart
                  </Button>
                </Link>
                <a
                  href="https://wa.me/917361033851?text=Hi%20Quadri%2C%20I%20need%20help%20with%20my%20account"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    Contact Support
                  </Button>
                </a>
              </div>
            </Card>

            <Card className="p-6 bg-secondary/5">
              <h3 className="text-xl font-bold text-foreground mb-4">Need Help?</h3>
              <p className="text-muted-foreground mb-4">
                Our support team is available 24/7 on WhatsApp to assist you with any questions or concerns about your account.
              </p>
              <a
                href="https://wa.me/917361033851"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground w-full">
                  Contact Support on WhatsApp
                </Button>
              </a>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}

export default function ProfilePage() {
  return (
    <CartProvider>
      <AuthProvider>
        <ProfileContent />
      </AuthProvider>
    </CartProvider>
  )
}
