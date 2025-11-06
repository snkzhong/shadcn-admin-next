"use client"

import { useState } from "react"
import TimelineItem from "./timeline-item"
import { Calendar, Zap, Users, Trophy, Rocket, Target, Play, Flag } from "lucide-react"

const timelineData = [
  {
    id: 1,
    year: "2019",
    title: "Foundation",
    description: "We started with a vision to revolutionize the industry and build something meaningful.",
    icon: Rocket,
    color: "from-blue-500 to-blue-600",
  },
  {
    id: 2,
    year: "2020",
    title: "First Launch",
    description: "Launched our flagship product to the market with great reception from early adopters.",
    icon: Zap,
    color: "from-purple-500 to-purple-600",
  },
  {
    id: 3,
    year: "2021",
    title: "Team Growth",
    description: "Expanded our team to 50+ talented professionals across multiple continents.",
    icon: Users,
    color: "from-pink-500 to-pink-600",
  },
  {
    id: 4,
    year: "2022",
    title: "Market Leader",
    description: "Became the market leader in our segment with 100K+ satisfied customers worldwide.",
    icon: Trophy,
    color: "from-amber-500 to-amber-600",
  },
  {
    id: 5,
    year: "2023",
    title: "Global Expansion",
    description: "Established offices in 15 countries and expanded our presence across 6 continents.",
    icon: Target,
    color: "from-green-500 to-green-600",
  },
  {
    id: 6,
    year: "2024",
    title: "Innovation Peak",
    description: "Launched AI-powered features and achieved record-breaking growth metrics.",
    icon: Calendar,
    color: "from-slate-500 to-slate-600",
  },
]

export default function Timeline() {
  const [activeId, setActiveId] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-card/30 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Timeline Container */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500/20 via-purple-500/20 to-transparent"></div>

          <div className="flex justify-center mb-16">
            <div className="flex flex-col items-center gap-3">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center border-4 border-background shadow-lg">
                <Play size={32} className="text-white ml-1" />
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold text-muted-foreground">START</p>
                <p className="text-xs text-muted-foreground">2019</p>
              </div>
            </div>
          </div>

          {/* Timeline Items */}
          <div className="space-y-12">
            {timelineData.map((item, index) => (
              <TimelineItem
                key={item.id}
                item={item}
                isActive={activeId === item.id}
                onHover={() => setActiveId(item.id)}
                isLeft={index % 2 === 0}
              />
            ))}
          </div>

          <div className="flex justify-center mt-16">
            <div className="flex flex-col items-center gap-3">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-slate-500 to-slate-600 flex items-center justify-center border-4 border-background shadow-lg">
                <Flag size={32} className="text-white" />
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold text-muted-foreground">PRESENT</p>
                <p className="text-xs text-muted-foreground">2024</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
