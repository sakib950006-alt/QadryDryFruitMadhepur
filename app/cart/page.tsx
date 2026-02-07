'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useCart } from '@/lib/cart-context'
import { useAuth } from '@/lib/auth-context'
import { CartProvider } from '@/lib/cart-context'
import { AuthProvider } from '@/lib/auth-context'
import { Trash2, Plus, Minus, ArrowLeft, MessageCircle } from 'lucide-react'

function CartContent() {
  const { items, removeFromCart, updateQuantity, total } = useCart()
  const { user } = useAuth()
  const router = useRouter()

  const handleCheckout = () => {
    if (!user) {
      router.push('/login')
      return
    }

    const message = `I want to place an order for:\n${items
      .map((item) => `- ${item.name} x${item.quantity} (₹${item.price * item.quantity})`)
      .join('\n')}\n\nTotal: ₹${total}`

    const encoded = encodeURIComponent(message)
    window.open(
      `https://wa.me/917361033851?text=${encoded}`,
      '_blank'
    )
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-foreground mb-2">Shopping Cart</h1>
                <p className="text-muted-foreground">Your cart is empty</p>
              </div>

              <div className="bg-card p-8 rounded-lg max-w-md mx-auto">
                <p className="text-muted-foreground mb-6">
                  Looks like you haven't added anything yet. Start exploring our collection!
                </p>
                <Link href="/">
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground w-full">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <Link href="/" className="text-primary hover:underline inline-flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Continue Shopping
            </Link>
            <h1 className="text-3xl font-bold text-foreground mt-4 mb-2">Shopping Cart</h1>
            <p className="text-muted-foreground">
              You have {items.length} item{items.length !== 1 ? 's' : ''} in your cart
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <Card key={item.productId} className="p-4 flex gap-4">
                  <div className="flex-shrink-0">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={100}
                      height={100}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                  </div>

                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-foreground">{item.name}</h3>
                    <p className="text-primary font-bold text-lg">₹{item.price}</p>

                    <div className="flex items-center gap-2 mt-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                        className="h-8 w-8 p-0"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Input
                        type="number"
                        value={item.quantity}
                        onChange={(e) =>
                          updateQuantity(item.productId, parseInt(e.target.value) || 1)
                        }
                        className="w-12 h-8 text-center"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                        className="h-8 w-8 p-0"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                      <span className="ml-4 text-sm text-muted-foreground">
                        Subtotal: ₹{(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFromCart(item.productId)}
                    className="text-destructive hover:text-destructive/80 h-auto"
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="p-6 sticky top-20">
                <h2 className="text-xl font-bold text-foreground mb-6">Order Summary</h2>

                <div className="space-y-4 mb-6 pb-6 border-b border-border">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-foreground font-medium">₹{total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="text-foreground font-medium">FREE</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax</span>
                    <span className="text-foreground font-medium">Calculated at checkout</span>
                  </div>
                </div>

                <div className="flex justify-between mb-6">
                  <span className="font-bold text-lg text-foreground">Total</span>
                  <span className="text-2xl font-bold text-primary">₹{total.toLocaleString()}</span>
                </div>

                <Button
                  onClick={handleCheckout}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground mb-3 py-2 h-auto"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Checkout via WhatsApp
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  {user ? 'Click to complete your order on WhatsApp' : 'Sign in to checkout'}
                </p>

                {!user && (
                  <Button
                    variant="outline"
                    className="w-full mt-3 bg-transparent"
                    onClick={() => router.push('/login')}
                  >
                    Sign In to Continue
                  </Button>
                )}
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default function CartPage() {
  return (
    <CartProvider>
      <AuthProvider>
        <CartContent />
      </AuthProvider>
    </CartProvider>
  )
}
