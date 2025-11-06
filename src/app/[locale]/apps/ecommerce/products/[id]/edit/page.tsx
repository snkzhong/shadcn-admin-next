"use client"

import type React from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { Textarea } from "~/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select"
import { useState } from "react"

const mockProductData = {
  "PRD-001": {
    id: "PRD-001",
    name: "Premium Wireless Headphones",
    category: "Electronics",
    price: 299.99,
    cost: 120,
    stock: 45,
    description: "High-quality wireless headphones with active noise cancellation and 30-hour battery life.",
    image: "/premium-wireless-headphones.png",
    rating: 4.8,
    reviews: 324,
    sku: "WH-1000XM5",
  },
  "PRD-002": {
    id: "PRD-002",
    name: "USB-C Hub",
    category: "Accessories",
    price: 49.99,
    cost: 15,
    stock: 120,
    description: "Compact USB-C hub with multiple ports for connectivity.",
    image: "/usb-c-hub.jpg",
    rating: 4.5,
    reviews: 189,
    sku: "HUB-UC01",
  },
}

export default function EditProductPage({ params }: { params: { id: string } }) {
  const product = mockProductData[params.id as keyof typeof mockProductData] || mockProductData["PRD-001"]

  const [formData, setFormData] = useState({
    name: product.name,
    category: product.category,
    price: product.price.toString(),
    cost: product.cost.toString(),
    stock: product.stock.toString(),
    sku: product.sku,
    description: product.description,
  })

  const [isSaving, setIsSaving] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    console.log("Product updated:", formData)
    // Simulate save
    setTimeout(() => {
      setIsSaving(false)
      // Redirect back to product detail
      window.history.back()
    }, 500)
  }

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Link href={`/apps/ecommerce/products/${product.id}`} className="flex items-center gap-2 text-primary hover:underline">
          <ArrowLeft className="w-4 h-4" />
          Back to Product
        </Link>
      </div>

      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle>Edit Product: {product.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Product Name */}
              <div className="space-y-2">
                <Label htmlFor="name">Product Name *</Label>
                <Input
                  id="name"
                  placeholder="Enter product name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Electronics">Electronics</SelectItem>
                    <SelectItem value="Accessories">Accessories</SelectItem>
                    <SelectItem value="Office">Office</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Price */}
              <div className="space-y-2">
                <Label htmlFor="price">Price ($) *</Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="0.00"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  required
                />
              </div>

              {/* Cost */}
              <div className="space-y-2">
                <Label htmlFor="cost">Cost ($) *</Label>
                <Input
                  id="cost"
                  type="number"
                  placeholder="0.00"
                  step="0.01"
                  value={formData.cost}
                  onChange={(e) => setFormData({ ...formData, cost: e.target.value })}
                  required
                />
              </div>

              {/* Stock */}
              <div className="space-y-2">
                <Label htmlFor="stock">Stock Quantity *</Label>
                <Input
                  id="stock"
                  type="number"
                  placeholder="0"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  required
                />
              </div>

              {/* SKU */}
              <div className="space-y-2">
                <Label htmlFor="sku">SKU *</Label>
                <Input
                  id="sku"
                  placeholder="e.g., PROD-001"
                  value={formData.sku}
                  onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                  required
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Enter product description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-2 pt-4">
              <Button type="submit" disabled={isSaving}>
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
              <Link href={`/apps/ecommerce/products/${product.id}`}>
                <Button variant="outline">Cancel</Button>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
