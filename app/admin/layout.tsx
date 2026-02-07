import React from "react"
import { CartProvider } from '@/lib/cart-context'
import { AuthProvider } from '@/lib/auth-context'
import { AdminProvider } from '@/lib/admin-context'
import { AdminProtector } from '@/components/admin-protector'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <CartProvider>
      <AuthProvider>
        <AdminProvider>
          <AdminProtector>
            {children}
          </AdminProtector>
        </AdminProvider>
      </AuthProvider>
    </CartProvider>
  )
}
