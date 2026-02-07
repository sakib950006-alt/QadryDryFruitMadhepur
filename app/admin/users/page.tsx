'use client'

import { AdminSidebar } from '@/components/admin-sidebar'
import { Card } from '@/components/ui/card'
import { User as UserIcon, Mail, Calendar } from 'lucide-react'
import { useEffect, useState } from 'react'

interface StoredUser {
  id: string
  name: string
  email: string
  createdAt?: string
}

export default function UsersPage() {
  const [users, setUsers] = useState<StoredUser[]>([])

  useEffect(() => {
    const storedUsers = localStorage.getItem('users')
    if (storedUsers) {
      try {
        const usersData = JSON.parse(storedUsers)
        const usersList = Object.values(usersData) as StoredUser[]
        setUsers(usersList)
      } catch (e) {
        console.error('Failed to load users:', e)
      }
    }
  }, [])

  const totalSpend = 0 // Would be calculated from orders

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />

      <main className="flex-1 md:ml-64">
        <div className="p-4 md:p-8">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Users</h1>
            <p className="text-muted-foreground mb-8">Manage registered customers</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Users</p>
                  <p className="text-3xl font-bold text-foreground">{users.length}</p>
                </div>
                <UserIcon className="h-8 w-8 text-blue-600" />
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Active This Month</p>
                  <p className="text-3xl font-bold text-foreground">{Math.max(0, users.length - 1)}</p>
                </div>
                <UserIcon className="h-8 w-8 text-green-600" />
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">New This Week</p>
                  <p className="text-3xl font-bold text-foreground">{Math.min(2, users.length)}</p>
                </div>
                <UserIcon className="h-8 w-8 text-purple-600" />
              </div>
            </Card>
          </div>

          {/* Users Table */}
          <Card className="overflow-hidden">
            {users.length === 0 ? (
              <div className="p-6 text-center text-muted-foreground">
                No registered users yet. Users will appear here after they sign up.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-card">
                      <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">
                        User ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">
                        Join Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user, idx) => (
                      <tr key={user.id} className="border-b border-border hover:bg-card/50">
                        <td className="px-6 py-4 text-sm font-mono text-foreground">
                          {user.id}
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-foreground">
                          {user.name}
                        </td>
                        <td className="px-6 py-4 text-sm text-foreground">{user.email}</td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">
                          {user.createdAt
                            ? new Date(user.createdAt).toLocaleDateString()
                            : new Date().toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <span className="px-3 py-1 rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 text-xs font-semibold">
                            Active
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card>

          {/* User Activity */}
          {users.length > 0 && (
            <Card className="mt-8 p-6">
              <h2 className="text-xl font-bold text-foreground mb-4">Recent Users</h2>
              <div className="space-y-4">
                {users.slice(-5).reverse().map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between p-4 bg-card rounded-lg hover:bg-card/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <UserIcon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{user.name}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {user.email}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground flex items-center gap-1 justify-end">
                        <Calendar className="h-3 w-3" />
                        Joined recently
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
