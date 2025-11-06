"use client"

import { useRef, useEffect } from "react"
import { ChatMessages } from "./chat-messages"
import { ChatInput } from "./chat-input"
import { ChatWelcome } from "./chat-welcome"
import type { Message } from "~/types/chat"

interface ChatAreaProps {
  messages: Message[]
  onUpdateMessages: (messages: Message[]) => void
}

export function ChatArea({ messages, onUpdateMessages }: ChatAreaProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
      timestamp: new Date(),
    }

    const updatedMessages = [...messages, userMessage]
    onUpdateMessages(updatedMessages)

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `This is a simulated AI response. Your question is: "${content}" . \n\nIn practical applications, real APIs (such as OpenAI, Claude, etc.) will be called here to obtain intelligent replies.`,
        timestamp: new Date(),
      }
      onUpdateMessages([...updatedMessages, aiMessage])
    }, 1000)
  }

  return (
    <div className="flex-1 flex flex-col bg-background h-screen">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto">
        {messages.length === 0 ? <ChatWelcome /> : <ChatMessages messages={messages} />}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  )
}
