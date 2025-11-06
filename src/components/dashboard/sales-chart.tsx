"use client"

import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from "recharts"

const data = [
  { month: "Jan", sales: 4000, revenue: 2400 },
  { month: "Feb", sales: 3000, revenue: 1398 },
  { month: "Mar", sales: 2000, revenue: 9800 },
  { month: "Apr", sales: 2780, revenue: 3908 },
  { month: "May", sales: 1890, revenue: 4800 },
  { month: "Jun", sales: 2390, revenue: 3800 },
  { month: "Jul", sales: 3490, revenue: 4300 },
  { month: "Aug", sales: 3200, revenue: 5100 },
  { month: "Sep", sales: 3800, revenue: 4200 },
  { month: "Oct", sales: 4200, revenue: 5800 },
  { month: "Nov", sales: 4900, revenue: 6200 },
  { month: "Dec", sales: 5200, revenue: 7100 },
]

export default function SalesChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="sales" fill="hsl(var(--color-primary))" />
        <Bar dataKey="revenue" fill="hsl(var(--color-accent))" />
      </BarChart>
    </ResponsiveContainer>
  )
}
