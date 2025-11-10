"use client"

import { useState } from "react"
import Link from "next/link"
import { Plus, Search } from "lucide-react"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Card, CardContent } from "~/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select"

const mockProducts = [
  {
    id: "PRD-001",
    name: "Premium Wireless Headphones",
    category: "Electronics",
    price: 299.99,
    stock: 45,
    image: "/imgs/ecommerce/wireless-headphones.png",
  },
  {
    id: "PRD-002",
    name: "USB-C Hub",
    category: "Accessories",
    price: 49.99,
    stock: 120,
    image: "/imgs/ecommerce/usb-hub.png",
  },
  {
    id: "PRD-003",
    name: "Laptop Stand",
    category: "Office",
    price: 79.99,
    stock: 30,
    image: "/imgs/ecommerce/laptop-stand.png",
  },
  {
    id: "PRD-004",
    name: "Mechanical Keyboard",
    category: "Electronics",
    price: 149.99,
    stock: 25,
    image: "/imgs/ecommerce/mechanical-keyboard.png",
  },
  {
    id: "PRD-005",
    name: "Wireless Mouse",
    category: "Accessories",
    price: 39.99,
    stock: 85,
    image: "/imgs/ecommerce/wireless-mouse.png",
  },
  {
    id: "PRD-006",
    name: "4K Monitor",
    category: "Electronics",
    price: 499.99,
    stock: 12,
    image: "/imgs/ecommerce/4k-monitor.jpg",
  },
]

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [category, setCategory] = useState("all")

  const filteredProducts = mockProducts.filter((product) => {
    const matchSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchCategory = category === "all" || product.category === category
    return matchSearch && matchCategory
  })

  return (
    <div className="">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Products</h1>
          <p className="text-muted-foreground mt-1">Manage your product catalog</p>
        </div>
        <Link href="/apps/ecommerce/products/add">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="flex gap-4 items-center my-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="Electronics">Electronics</SelectItem>
            <SelectItem value="Accessories">Accessories</SelectItem>
            <SelectItem value="Office">Office</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <Link key={product.id} href={`/apps/ecommerce/products/${product.id}`}>
            <Card className="hover:shadow-lg transition-shadow h-full cursor-pointer">
              <CardContent className="p-4">
                <div className="aspect-square bg-secondary rounded-lg mb-4 overflow-hidden">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold truncate">{product.name}</h3>
                  <p className="text-sm text-muted-foreground">{product.category}</p>
                  <div className="flex items-center justify-between mt-3">
                    <p className="text-lg font-bold">${product.price.toFixed(2)}</p>
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded ${
                        product.stock > 20 ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {product.stock} in stock
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
