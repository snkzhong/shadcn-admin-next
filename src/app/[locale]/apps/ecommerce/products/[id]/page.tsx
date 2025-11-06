"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Edit, Trash2 } from "lucide-react"
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { Badge } from "~/components/ui/badge"

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

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = mockProductData[params.id as keyof typeof mockProductData] || mockProductData["PRD-001"]
  const [isDeleting, setIsDeleting] = useState(false)

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Link href="/apps/ecommerce/products" className="flex items-center gap-2 text-primary hover:underline">
          <ArrowLeft className="w-4 h-4" />
          Back to Products
        </Link>
        <div className="flex gap-2">
          <Link href={`/apps/ecommerce/products/${product.id}/edit`}>
            <Button variant="outline">
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
          </Link>
          <Button
            variant="destructive"
            disabled={isDeleting}
            onClick={() => {
              setIsDeleting(true)
              setTimeout(() => window.history.back(), 500)
            }}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Product Image */}
        <Card>
          <CardContent className="p-6">
            <div className="aspect-square bg-secondary rounded-lg overflow-hidden">
              <img
                src={`/imgs/ecommerce/${product.image}` || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </CardContent>
        </Card>

        {/* Product Info */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="space-y-4">
              <div>
                <h1 className="text-3xl font-bold">{product.name}</h1>
                <Badge className="mt-2">{product.category}</Badge>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-primary">${product.price.toFixed(2)}</span>
                <span className="text-sm text-muted-foreground">Cost: ${product.cost.toFixed(2)}</span>
              </div>
              <div className="flex gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Rating</p>
                  <p className="text-lg font-semibold">
                    {product.rating} ⭐ ({product.reviews} reviews)
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Stock</p>
                  <p className="text-lg font-semibold">{product.stock} units</p>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-semibold text-muted-foreground">SKU</p>
                <p className="font-mono">{product.sku}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-muted-foreground">Description</p>
                <p className="text-sm">{product.description}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">${(product.price * 342).toLocaleString()}</p>
            <p className="text-xs text-muted-foreground mt-1">342 sales</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Profit Margin</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{Math.round(((product.price - product.cost) / product.price) * 100)}%</p>
            <p className="text-xs text-muted-foreground mt-1">Per unit</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Inventory Value</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">${(product.price * product.stock).toLocaleString()}</p>
            <p className="text-xs text-muted-foreground mt-1">At current price</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
