"use client"

import type React from "react"

import { useState } from "react"
import { Send } from "lucide-react"
import { Button } from "~/components/ui/button"

interface ChatInputProps {
  onSendMessage: (message: string) => void
}

export function ChatInput({ onSendMessage }: ChatInputProps) {
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    setIsLoading(true)
    onSendMessage(input)
    setInput("")
    setIsLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 border-t border-border bg-card">
      <div className="max-w-4xl mx-auto flex gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter message ..."
          disabled={isLoading}
          className="flex-1 px-4 py-2 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
        />
        <Button type="submit" disabled={!input.trim() || isLoading} size="icon" className="flex-shrink-0">
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </form>
  )
}
