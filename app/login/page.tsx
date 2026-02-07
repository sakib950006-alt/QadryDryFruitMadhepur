'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { LoginForm } from '@/components/login-form'
import { SignupForm } from '@/components/signup-form'
import { CartProvider } from '@/lib/cart-context'
import { AuthProvider } from '@/lib/auth-context'

function AuthContent() {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-background">
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12">
          <div className="w-full max-w-md">
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold text-foreground mb-2">
                {isLogin ? 'Welcome to Quadri' : 'Join Quadri'}
              </h1>
              <p className="text-muted-foreground">
                {isLogin
                  ? 'Sign in to explore our premium dry fruits'
                  : 'Create your account to start shopping'}
              </p>
            </div>

            {isLogin ? (
              <LoginForm onSwitchToSignup={() => setIsLogin(false)} />
            ) : (
              <SignupForm onSwitchToLogin={() => setIsLogin(true)} />
            )}

            <div className="mt-8 p-4 bg-card rounded-lg border border-border">
              <p className="text-sm text-muted-foreground mb-3 font-semibold">Demo Credentials:</p>
              <div className="text-xs space-y-2 text-muted-foreground">
                <p>
                  <span className="font-medium">Email:</span> test@example.com
                </p>
                <p>
                  <span className="font-medium">Password:</span> password123
                </p>
                <p className="mt-3 text-foreground">
                  First time? You can{' '}
                  <button
                    onClick={() => setIsLogin(false)}
                    className="text-primary font-semibold hover:underline"
                  >
                    create a new account
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default function LoginPage() {
  return (
    <CartProvider>
      <AuthProvider>
        <AuthContent />
      </AuthProvider>
    </CartProvider>
  )
}
