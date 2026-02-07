'use client'

import { useState } from 'react'
import { useAdmin } from '@/lib/admin-context'
import { AdminSidebar } from '@/components/admin-sidebar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ChevronDown } from 'lucide-react'

export default function OrdersPage() {
  const { orders, updateOrderStatus } = useAdmin()
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null)

  const statuses: Array<'pending' | 'processing' | 'shipped' | 'delivered'> = [
    'pending',
    'processing',
    'shipped',
    'delivered',
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
      case 'processing':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
      case 'shipped':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400'
      case 'delivered':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
    }
  }

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />

      <main className="flex-1 md:ml-64">
        <div className="p-4 md:p-8">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Orders</h1>
            <p className="text-muted-foreground mb-8">Manage and track customer orders</p>
          </div>

          {/* Orders List */}
          <Card className="overflow-hidden">
            {orders.length === 0 ? (
              <div className="p-6 text-center text-muted-foreground">
                No orders yet. Orders will appear here when customers place them.
              </div>
            ) : (
              <div className="divide-y divide-border">
                {orders.map((order) => (
                  <div key={order.id} className="p-6 hover:bg-card/50 transition-colors">
                    {/* Order Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-2">
                          <h3 className="font-mono font-semibold text-foreground">{order.id}</h3>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}
                          >
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {order.userName} • {order.userEmail}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-foreground">₹{order.total.toFixed(2)}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(order.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    {/* Expandable Details */}
                    <button
                      onClick={() =>
                        setExpandedOrder(expandedOrder === order.id ? null : order.id)
                      }
                      className="flex items-center gap-2 text-sm text-primary hover:underline mb-4"
                    >
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${expandedOrder === order.id ? 'rotate-180' : ''}`}
                      />
                      {expandedOrder === order.id ? 'Hide Details' : 'Show Details'}
                    </button>

                    {expandedOrder === order.id && (
                      <div className="space-y-4 mt-4 pt-4 border-t border-border">
                        {/* Items */}
                        <div>
                          <h4 className="font-semibold text-sm mb-3">Order Items</h4>
                          <div className="space-y-2">
                            {order.items.map((item, idx) => (
                              <div
                                key={idx}
                                className="flex items-center justify-between p-3 bg-card rounded-lg"
                              >
                                <div>
                                  <p className="font-medium text-sm">{item.productName}</p>
                                  <p className="text-xs text-muted-foreground">
                                    Qty: {item.quantity} × ₹{item.price.toFixed(2)}
                                  </p>
                                </div>
                                <p className="font-semibold text-sm">
                                  ₹{(item.quantity * item.price).toFixed(2)}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Update Status */}
                        <div>
                          <h4 className="font-semibold text-sm mb-3">Update Status</h4>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                            {statuses.map((status) => (
                              <Button
                                key={status}
                                variant={
                                  order.status === status
                                    ? 'default'
                                    : 'outline'
                                }
                                size="sm"
                                onClick={() => updateOrderStatus(order.id, status)}
                                className={
                                  order.status === status
                                    ? 'bg-primary hover:bg-primary/90 text-primary-foreground'
                                    : ''
                                }
                              >
                                {status.charAt(0).toUpperCase() + status.slice(1)}
                              </Button>
                            ))}
                          </div>
                        </div>

                        {/* Customer Info */}
                        <div className="bg-card p-4 rounded-lg">
                          <h4 className="font-semibold text-sm mb-2">Customer Information</h4>
                          <p className="text-sm text-foreground">
                            <span className="text-muted-foreground">Name: </span>
                            {order.userName}
                          </p>
                          <p className="text-sm text-foreground">
                            <span className="text-muted-foreground">Email: </span>
                            {order.userEmail}
                          </p>
                          <p className="text-sm text-foreground">
                            <span className="text-muted-foreground">Order Date: </span>
                            {new Date(order.date).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </main>
    </div>
  )
}
