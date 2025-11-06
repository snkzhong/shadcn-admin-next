"use client"

import type { LucideIcon } from "lucide-react"

interface TimelineItemProps {
  item: {
    id: number
    year: string
    title: string
    description: string
    icon: LucideIcon
    color: string
  }
  isActive: boolean
  onHover: () => void
  isLeft: boolean
}

export default function TimelineItem({ item, isActive, onHover, isLeft }: TimelineItemProps) {
  const Icon = item.icon

  return (
    <div className={`relative flex items-center justify-between gap-8 ${isLeft ? "" : "flex-row-reverse"}`} onMouseEnter={onHover} onMouseLeave={() => {}}>
      {/* Content - Left side on even indices, right side on odd */}
      <div className={`w-5/12 ${isLeft ? "text-right" : "text-left"}`}>
        <div
          className={`p-6 rounded-lg border transition-all duration-300 ${
            isActive
              ? "bg-card border-primary shadow-lg scale-105"
              : "bg-card/50 border-border hover:border-primary/50 hover:shadow-md"
          }`}
        >
          <div className="flex items-center gap-3 mb-2" dir={isLeft ? "rtl" : "ltr"}>
            <span className={`text-sm font-semibold bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>
              {item.year}
            </span>
          </div>
          <h3 className="text-xl font-bold text-foreground mb-2">{item.title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
        </div>
      </div>

      {/* Center dot and icon */}
      <div className="w-2/12 flex justify-center">
        <div
          className={`relative flex items-center justify-center w-16 h-16 rounded-full border-4 transition-all duration-300 ${
            isActive
              ? `border-primary bg-gradient-to-r ${item.color} shadow-lg scale-125`
              : "border-border bg-card hover:border-primary"
          }`}
        >
          <Icon size={24} className={`transition-colors duration-300 ${isActive ? "text-white" : "text-primary"}`} />
        </div>
      </div>

      {/* Spacer for layout */}
      <div className="w-5/12"></div>
    </div>
  )
}
