"use client"

import { Card, CardContent } from "~/components/ui/card"
import type { LucideIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { cn } from "~/lib/utils"

interface StatCardProps {
  title: string
  value: number
  icon: LucideIcon
  format: "currency" | "number" | "percent"
  trend?: number
  className?: string
}

export default function StatCard({ title, value, icon: Icon, format, trend, className }: StatCardProps) {
  const [displayValue, setDisplayValue] = useState(0)

  // Animated counter effect
  useEffect(() => {
    let current = 0
    const increment = value / 30
    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setDisplayValue(value)
        clearInterval(timer)
      } else {
        setDisplayValue(Math.floor(current))
      }
    }, 30)

    return () => clearInterval(timer)
  }, [value])

  const formatValue = (val: number) => {
    switch (format) {
      case "currency":
        return `$${val.toLocaleString()}`
      case "percent":
        return `${val.toFixed(1)}%`
      default:
        return val.toLocaleString()
    }
  }

  return (
    <Card className={cn(className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-3xl font-bold mt-2">{formatValue(displayValue)}</p>
            {trend !== undefined && (
              <p className={`text-xs mt-2 ${trend >= 0 ? "text-green-600" : "text-red-600"}`}>
                {trend >= 0 ? "↑" : "↓"} {Math.abs(trend)}% from last month
              </p>
            )}
          </div>
          <div className="p-3 bg-primary/10 rounded-lg">
            <Icon className="w-6 h-6 text-primary" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
