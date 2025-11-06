"use client"

import { MessageCircle, Copy, Check } from "lucide-react"
import { useState } from "react"
import type { Message } from "~/types/chat"

interface ChatMessagesProps {
  messages: Message[]
}

export function ChatMessages({ messages }: ChatMessagesProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const handleCopy = (id: string, content: string) => {
    navigator.clipboard.writeText(content)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <div className="space-y-4 p-6 max-w-4xl mx-auto w-full">
      {messages.map((message) => (
        <div key={message.id} className={`flex gap-4 ${message.role === "user" ? "justify-end" : "justify-start"}`}>
          {message.role === "assistant" && (
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-1">
              <MessageCircle className="w-5 h-5 text-primary-foreground" />
            </div>
          )}

          <div
            className={`max-w-2xl rounded-lg p-4 ${
              message.role === "user"
                ? "bg-primary text-primary-foreground"
                : "bg-card text-foreground border border-border"
            }`}
          >
            <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>

            {message.role === "assistant" && (
              <button
                onClick={() => handleCopy(message.id, message.content)}
                className="mt-2 p-1.5 hover:bg-muted rounded transition-colors"
              >
                {copiedId === message.id ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
