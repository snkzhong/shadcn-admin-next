"use client"

import { useState } from "react"
import { Download, TrendingUp, Package, ShoppingCart, DollarSign } from "lucide-react"
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
import StatCard from "~/components/dashboard/stat-card"
import SalesChart from "~/components/dashboard/sales-chart"
import RecentOrdersTable from "~/components/dashboard/recent-orders-table"
import TopProductsTable from "~/components/dashboard/top-products-table"
import { exportToPDF, exportToExcel } from "~/lib/export"

export default function DashboardPage() {
  const [isExporting, setIsExporting] = useState(false)

  const handleExportPDF = async () => {
    setIsExporting(true)
    try {
      await exportToPDF("dashboard-report")
    } finally {
      setIsExporting(false)
    }
  }

  const handleExportExcel = async () => {
    setIsExporting(true)
    try {
      await exportToExcel("dashboard-data")
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <div className="">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome to your e-commerce dashboard</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleExportPDF} disabled={isExporting}>
            <Download className="w-4 h-4 mr-2" />
            PDF
          </Button>
          <Button variant="outline" size="sm" onClick={handleExportExcel} disabled={isExporting}>
            <Download className="w-4 h-4 mr-2" />
            Excel
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Revenue" value={156234} icon={DollarSign} format="currency" trend={12} />
        <StatCard title="Total Orders" value={1243} icon={ShoppingCart} format="number" trend={8} />
        <StatCard title="Total Products" value={582} icon={Package} format="number" trend={-2} />
        <StatCard title="Growth" value={23.5} icon={TrendingUp} format="percent" trend={5} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Sales Overview</CardTitle>
            <CardDescription>Monthly sales data for the past year</CardDescription>
          </CardHeader>
          <CardContent>
            <SalesChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Conversion Rate</span>
                <span className="font-semibold">3.24%</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: "32.4%" }}></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Avg Order Value</span>
                <span className="font-semibold">$125.60</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div className="bg-accent h-2 rounded-full" style={{ width: "65%" }}></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Customer Satisfaction</span>
                <span className="font-semibold">94%</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div className="bg-chart-1 h-2 rounded-full" style={{ width: "94%" }}></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders and Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Your latest orders this month</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentOrdersTable />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Products</CardTitle>
            <CardDescription>Best selling products</CardDescription>
          </CardHeader>
          <CardContent>
            <TopProductsTable />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
