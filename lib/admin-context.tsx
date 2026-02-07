'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { Product } from './products'

export interface Order {
  id: string
  userId: string
  userName: string
  userEmail: string
  items: Array<{
    productId: string
    productName: string
    quantity: number
    price: number
  }>
  total: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered'
  date: string
}

interface AdminContextType {
  products: Product[]
  orders: Order[]
  addProduct: (product: Omit<Product, 'id' | 'rating'>) => void
  updateProduct: (id: string, product: Partial<Product>) => void
  deleteProduct: (id: string) => void
  addOrder: (order: Omit<Order, 'id' | 'date'>) => void
  updateOrderStatus: (id: string, status: Order['status']) => void
  getAllStats: () => {
    totalProducts: number
    totalOrders: number
    totalRevenue: number
    totalCustomers: number
  }
}

const AdminContext = createContext<AdminContextType | undefined>(undefined)

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [isInitialized, setIsInitialized] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    const savedProducts = localStorage.getItem('admin_products')
    const savedOrders = localStorage.getItem('admin_orders')

    if (savedProducts) {
      try {
        setProducts(JSON.parse(savedProducts))
      } catch (e) {
        console.error('Failed to load products:', e)
        // Load default products if parsing fails
        const { products: defaultProducts } = require('./products')
        setProducts(defaultProducts)
      }
    } else {
      // Load default products on first run
      const { products: defaultProducts } = require('./products')
      setProducts(defaultProducts)
      localStorage.setItem('admin_products', JSON.stringify(defaultProducts))
    }

    if (savedOrders) {
      try {
        setOrders(JSON.parse(savedOrders))
      } catch (e) {
        console.error('Failed to load orders:', e)
      }
    }
    
    setIsInitialized(true)
  }, [])

  const addProduct = (product: Omit<Product, 'id' | 'rating'>) => {
    const newProduct: Product = {
      ...product,
      id: `prod_${Date.now()}`,
      rating: 4.5,
    }
    const updated = [...products, newProduct]
    setProducts(updated)
    localStorage.setItem('admin_products', JSON.stringify(updated))
  }

  const updateProduct = (id: string, product: Partial<Product>) => {
    const updated = products.map((p) => (p.id === id ? { ...p, ...product } : p))
    setProducts(updated)
    localStorage.setItem('admin_products', JSON.stringify(updated))
  }

  const deleteProduct = (id: string) => {
    const updated = products.filter((p) => p.id !== id)
    setProducts(updated)
    localStorage.setItem('admin_products', JSON.stringify(updated))
  }

  const addOrder = (order: Omit<Order, 'id' | 'date'>) => {
    const newOrder: Order = {
      ...order,
      id: `order_${Date.now()}`,
      date: new Date().toISOString(),
    }
    const updated = [...orders, newOrder]
    setOrders(updated)
    localStorage.setItem('admin_orders', JSON.stringify(updated))
  }

  const updateOrderStatus = (id: string, status: Order['status']) => {
    const updated = orders.map((o) => (o.id === id ? { ...o, status } : o))
    setOrders(updated)
    localStorage.setItem('admin_orders', JSON.stringify(updated))
  }

  const getAllStats = () => {
    const customers = new Set(orders.map((o) => o.userId))
    const revenue = orders.reduce((sum, o) => sum + o.total, 0)

    return {
      totalProducts: products.length,
      totalOrders: orders.length,
      totalRevenue: revenue,
      totalCustomers: customers.size,
    }
  }

  return (
    <AdminContext.Provider
      value={{
        products,
        orders,
        addProduct,
        updateProduct,
        deleteProduct,
        addOrder,
        updateOrderStatus,
        getAllStats,
      }}
    >
      {children}
    </AdminContext.Provider>
  )
}

export function useAdmin() {
  const context = useContext(AdminContext)
  if (!context) {
    throw new Error('useAdmin must be used within AdminProvider')
  }
  return context
}
