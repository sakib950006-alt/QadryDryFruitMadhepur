'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

export interface User {
  id: string
  name: string
  email: string
  isAdmin?: boolean
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  signup: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  isLoading: boolean
  isAdmin: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('user')
    if (saved) {
      try {
        setUser(JSON.parse(saved))
      } catch (e) {
        console.error('Failed to load user:', e)
      }
    }
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Check if it's admin login
      if (email === 'admin@quadri.com' && password === 'admin123') {
        const adminUser = {
          id: 'admin_001',
          name: 'Admin',
          email: 'admin@quadri.com',
          isAdmin: true,
        }
        setUser(adminUser)
        localStorage.setItem('user', JSON.stringify(adminUser))
        return
      }

      // In a real app, you'd validate credentials against a backend
      const users = JSON.parse(localStorage.getItem('users') || '{}')
      const userData = users[email]

      if (!userData || userData.password !== password) {
        throw new Error('Invalid credentials')
      }

      const newUser = {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        isAdmin: userData.isAdmin || false,
      }

      setUser(newUser)
      localStorage.setItem('user', JSON.stringify(newUser))
    } finally {
      setIsLoading(false)
    }
  }

  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Check if user already exists
      const users = JSON.parse(localStorage.getItem('users') || '{}')
      if (users[email]) {
        throw new Error('Email already registered')
      }

      const id = `user_${Date.now()}`
      users[email] = { id, name, email, password }
      localStorage.setItem('users', JSON.stringify(users))

      const newUser = { id, name, email }
      setUser(newUser)
      localStorage.setItem('user', JSON.stringify(newUser))
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading, isAdmin: user?.isAdmin ?? false }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
