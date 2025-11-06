"use client"

import Link from "next/link"
import { ArrowLeft, Printer } from "lucide-react"
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { Separator } from "~/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select"
import { useState } from "react"

const mockOrderData = {
  "ORD-001": {
    id: "ORD-001",
    customer: "John Doe",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
    status: "completed",
    date: "2025-01-04",
    shippingAddress: "123 Main St, New York, NY 10001",
    items: [
      { id: "PRD-001", name: "Premium Wireless Headphones", quantity: 1, price: 299.99 },
      { id: "PRD-002", name: "USB-C Hub", quantity: 2, price: 49.99 },
    ],
    subtotal: 399.97,
    shipping: 15,
    tax: 884.03,
    total: 1299,
  },
  "ORD-002": {
    id: "ORD-002",
    customer: "Jane Smith",
    email: "jane@example.com",
    phone: "+1 (555) 234-5678",
    status: "pending",
    date: "2025-01-03",
    shippingAddress: "456 Oak Ave, Los Angeles, CA 90001",
    items: [{ id: "PRD-003", name: "Laptop Stand", quantity: 1, price: 79.99 }],
    subtotal: 79.99,
    shipping: 10,
    tax: 809.01,
    total: 899,
  },
}

const statusColors: Record<string, string> = {
  completed: "bg-green-100 text-green-800",
  pending: "bg-yellow-100 text-yellow-800",
  shipped: "bg-blue-100 text-blue-800",
  processing: "bg-purple-100 text-purple-800",
}

export default function OrderDetailPage({ params }: { params: { id: string } }) {
  const order = mockOrderData[params.id as keyof typeof mockOrderData] || mockOrderData["ORD-001"]
  const [status, setStatus] = useState(order.status)

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Link href="/apps/ecommerce/orders" className="flex items-center gap-2 text-primary hover:underline">
          <ArrowLeft className="w-4 h-4" />
          Back to Orders
        </Link>
        <Button variant="outline" size="sm">
          <Printer className="w-4 h-4 mr-2" />
          Print
        </Button>
      </div>

      {/* Order Info Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">{order.id}</h1>
              <p className="text-muted-foreground mt-1">Placed on {new Date(order.date).toLocaleDateString()}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Order Status</p>
              <div className="mt-2">
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="shipped">Shipped</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Customer Information */}
          <Card>
            <CardHeader>
              <CardTitle>Customer Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Name</p>
                <p className="font-semibold">{order.customer}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-semibold">{order.email}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <p className="font-semibold">{order.phone}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Shipping Address</p>
                <p className="font-semibold">{order.shippingAddress}</p>
              </div>
            </CardContent>
          </Card>

          {/* Order Items */}
          <Card>
            <CardHeader>
              <CardTitle>Order Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <Link
                    key={item.id}
                    href={`/apps/ecommerce/products/${item.id}`}
                    className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-secondary/50 transition-colors"
                  >
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${order.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span>${order.shipping.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Tax</span>
                <span>${order.tax.toFixed(2)}</span>
              </div>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <span className="font-semibold">Total</span>
              <span className="text-2xl font-bold text-primary">${order.total.toFixed(2)}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
