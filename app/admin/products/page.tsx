'use client'

import React from "react"

import { useState } from 'react'
import { useAdmin } from '@/lib/admin-context'
import { AdminSidebar } from '@/components/admin-sidebar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Trash2, Edit2, Plus } from 'lucide-react'

export default function ProductsPage() {
  const { products, addProduct, updateProduct, deleteProduct } = useAdmin()
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    category: 'Nuts' as const,
    price: '',
    originalPrice: '',
    weight: '',
    image: '',
    description: '',
    benefits: '' as string | string[],
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const benefits = Array.isArray(formData.benefits)
      ? formData.benefits
      : formData.benefits.split(',').map((b) => b.trim())

    if (editingId) {
      updateProduct(editingId, {
        ...formData,
        price: parseFloat(formData.price),
        originalPrice: parseFloat(formData.originalPrice),
        weight: formData.weight,
        benefits,
      })
      setEditingId(null)
    } else {
      addProduct({
        name: formData.name,
        category: formData.category,
        price: parseFloat(formData.price),
        originalPrice: parseFloat(formData.originalPrice),
        weight: formData.weight,
        image: formData.image,
        description: formData.description,
        benefits,
      })
    }

    setFormData({
      name: '',
      category: 'Nuts',
      price: '',
      originalPrice: '',
      image: '',
      description: '',
      benefits: '',
    })
    setIsFormOpen(false)
  }

  const handleEdit = (product: any) => {
    setFormData({
      ...product,
      price: product.price.toString(),
      originalPrice: product.originalPrice.toString(),
      benefits: Array.isArray(product.benefits)
        ? product.benefits.join(', ')
        : product.benefits,
    })
    setEditingId(product.id)
    setIsFormOpen(true)
  }

  const handleCancel = () => {
    setIsFormOpen(false)
    setEditingId(null)
    setFormData({
      name: '',
      category: 'Nuts',
      price: '',
      originalPrice: '',
      weight: '',
      image: '',
      description: '',
      benefits: '',
    })
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result as string })
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />

      <main className="flex-1 md:ml-64">
        <div className="p-4 md:p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Products</h1>
              <p className="text-muted-foreground">Manage your product catalog</p>
            </div>
            <Button
              onClick={() => setIsFormOpen(!isFormOpen)}
              className="bg-primary hover:bg-primary/90 gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Product
            </Button>
          </div>

          {/* Add/Edit Form */}
          {isFormOpen && (
            <Card className="mb-8 p-6">
              <h2 className="text-xl font-bold mb-4">
                {editingId ? 'Edit Product' : 'Add New Product'}
              </h2>
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Product Name</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Premium Almonds"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        category: e.target.value as 'Nuts' | 'Dried Fruits' | 'Mix',
                      })
                    }
                    className="w-full px-3 py-2 rounded-md border border-border bg-background text-foreground"
                  >
                    <option>Nuts</option>
                    <option>Dried Fruits</option>
                    <option>Mix</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Price (₹)</label>
                  <Input
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="0.00"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Original Price (₹)</label>
                  <Input
                    type="number"
                    step="0.01"
                    value={formData.originalPrice}
                    onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                    placeholder="0.00"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Weight</label>
                  <Input
                    type="text"
                    value={formData.weight}
                    onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                    placeholder="e.g., 250g, 500g, 1kg"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">Product Image</label>
                  <div className="space-y-3">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="flex-1 px-3 py-2 rounded-md border border-border bg-background text-foreground text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                    />
                    {formData.image && (
                      <div className="mt-3 flex gap-4 items-start">
                        <div className="relative">
                          <img
                            src={formData.image || "/placeholder.svg"}
                            alt="Preview"
                            className="h-24 w-24 object-cover rounded-lg border border-border"
                          />
                        </div>
                        <div className="flex flex-col justify-center">
                          <p className="text-xs text-muted-foreground">Image Preview</p>
                          <button
                            type="button"
                            onClick={() => setFormData({ ...formData, image: '' })}
                            className="mt-2 text-xs px-2 py-1 text-red-600 hover:bg-red-50 dark:hover:bg-red-950 rounded"
                          >
                            Remove Image
                          </button>
                        </div>
                      </div>
                    )}
                    {!formData.image && (
                      <p className="text-xs text-muted-foreground">PNG, JPG, GIF up to 5MB</p>
                    )}
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Product description..."
                    className="w-full px-3 py-2 rounded-md border border-border bg-background text-foreground"
                    rows={4}
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">Benefits (comma-separated)</label>
                  <Input
                    value={formData.benefits}
                    onChange={(e) => setFormData({ ...formData, benefits: e.target.value })}
                    placeholder="Rich in Protein, Boosts Energy, Organic"
                    required
                  />
                </div>

                <div className="md:col-span-2 flex gap-3">
                  <Button type="submit" className="bg-primary hover:bg-primary/90">
                    {editingId ? 'Update Product' : 'Add Product'}
                  </Button>
                  <Button type="button" variant="outline" onClick={handleCancel}>
                    Cancel
                  </Button>
                </div>
              </form>
            </Card>
          )}

          {/* Products Table */}
          <Card className="overflow-hidden">
            {products.length === 0 ? (
              <div className="p-6 text-center text-muted-foreground">No products yet</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-card">
                      <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">
                        Product Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">
                        Category
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">
                        Price
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">
                        Weight
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">
                        Stock
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-semibold text-muted-foreground">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product.id} className="border-b border-border hover:bg-card/50">
                        <td className="px-6 py-4 text-sm font-medium text-foreground">
                          {product.name}
                        </td>
                        <td className="px-6 py-4 text-sm text-foreground">{product.category}</td>
                        <td className="px-6 py-4 text-sm font-semibold text-foreground">
                          ₹{product.price.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 text-sm text-foreground">
                          {product.weight}
                        </td>
                        <td className="px-6 py-4 text-sm text-foreground">
                          <span className="px-3 py-1 rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 text-xs font-semibold">
                            In Stock
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <div className="flex items-center justify-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEdit(product)}
                              className="text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/20"
                            >
                              <Edit2 className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deleteProduct(product.id)}
                              className="text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card>
        </div>
      </main>
    </div>
  )
}
