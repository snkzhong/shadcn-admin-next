"use client"

import Link from "next/link"
import { Badge } from "~/components/ui/badge"
import { Button } from "~/components/ui/button"

const recentOrders = [
  {
    id: "ORD-001",
    customer: "John Doe",
    amount: 1299,
    status: "completed",
    date: "2025-01-04",
  },
  {
    id: "ORD-002",
    customer: "Jane Smith",
    amount: 899,
    status: "pending",
    date: "2025-01-03",
  },
  {
    id: "ORD-003",
    customer: "Bob Johnson",
    amount: 2499,
    status: "shipped",
    date: "2025-01-02",
  },
  {
    id: "ORD-004",
    customer: "Alice Williams",
    amount: 599,
    status: "completed",
    date: "2025-01-01",
  },
]

const statusColors: Record<string, string> = {
  completed: "bg-green-100 text-green-800",
  pending: "bg-yellow-100 text-yellow-800",
  shipped: "bg-blue-100 text-blue-800",
}

export default function RecentOrdersTable() {
  return (
    <div className="space-y-4">
      {recentOrders.map((order) => (
        <div
          key={order.id}
          className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-secondary/50 transition-colors"
        >
          <div className="flex-1">
            <p className="font-semibold text-sm">{order.customer}</p>
            <p className="text-xs text-muted-foreground">{order.id}</p>
          </div>
          <div className="text-right">
            <p className="font-semibold">${order.amount.toLocaleString()}</p>
            <Badge className={statusColors[order.status]}>{order.status}</Badge>
          </div>
          <Link href={`/orders/${order.id}`}>
            <Button variant="ghost" size="sm">
              View
            </Button>
          </Link>
        </div>
      ))}
    </div>
  )
}
