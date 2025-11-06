"use client"

import Link from "next/link"
import { Button } from "~/components/ui/button"

const topProducts = [
  {
    id: "PRD-001",
    name: "Premium Wireless Headphones",
    sales: 342,
    revenue: 12690,
  },
  {
    id: "PRD-002",
    name: "USB-C Hub",
    sales: 289,
    revenue: 5202,
  },
  {
    id: "PRD-003",
    name: "Laptop Stand",
    sales: 156,
    revenue: 2340,
  },
  {
    id: "PRD-004",
    name: "Mechanical Keyboard",
    sales: 128,
    revenue: 6400,
  },
]

export default function TopProductsTable() {
  return (
    <div className="space-y-4">
      {topProducts.map((product) => (
        <div
          key={product.id}
          className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-secondary/50 transition-colors"
        >
          <div className="flex-1">
            <p className="font-semibold text-sm">{product.name}</p>
            <p className="text-xs text-muted-foreground">{product.id}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">{product.sales} sales</p>
            <p className="font-semibold">${product.revenue.toLocaleString()}</p>
          </div>
          <Link href={`/products/${product.id}`}>
            <Button variant="ghost" size="sm">
              View
            </Button>
          </Link>
        </div>
      ))}
    </div>
  )
}
