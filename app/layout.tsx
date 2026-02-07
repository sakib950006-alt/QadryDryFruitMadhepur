import React from "react"
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'

import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { AdminProvider } from '@/lib/admin-context'

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700']
})

export const metadata: Metadata = {
  title: 'Quadri Dryfruit - Premium Dry Fruits',
  description: 'Shop the finest quality dry fruits online. Fresh, organic, and delivered to your door.',
  generator: 'v0.app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.className} antialiased bg-background text-foreground transition-colors duration-300`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <AdminProvider>
            {children}
          </AdminProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
