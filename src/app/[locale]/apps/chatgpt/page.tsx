"use client"

import { useState } from "react"
import { Sidebar } from "~/components/chatgpt/sidebar"
import { ChatArea } from "~/components/chatgpt/chat-area"
import type { Message } from "~/types/chat"

export default function ChatgptPager() {
  const [conversations, setConversations] = useState<Array<{ id: string; title: string; messages: Message[] }>>([
    {
      id: "1",
      title: "New conversation",
      messages: [],
    },
  ])
  const [currentConversationId, setCurrentConversationId] = useState("1")

  const currentConversation = conversations.find((c) => c.id === currentConversationId)

  const handleNewConversation = () => {
    const newId = Date.now().toString()
    setConversations((prev) => [
      ...prev,
      {
        id: newId,
        title: "New conversation",
        messages: [],
      },
    ])
    setCurrentConversationId(newId)
  }

  const handleDeleteConversation = (id: string) => {
    const remaining = conversations.filter((c) => c.id !== id)
    setConversations(remaining)
    if (currentConversationId === id) {
      setCurrentConversationId(remaining[0]?.id || "")
    }
  }

  const handleUpdateMessages = (messages: Message[]) => {
    setConversations((prev) =>
      prev.map((c) =>
        c.id === currentConversationId
          ? { ...c, messages, title: messages[0]?.content.slice(0, 30) || "New conversation" }
          : c,
      ),
    )
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar
        conversations={conversations}
        currentConversationId={currentConversationId}
        onSelectConversation={setCurrentConversationId}
        onNewConversation={handleNewConversation}
        onDeleteConversation={handleDeleteConversation}
      />
      {currentConversation && (
        <ChatArea messages={currentConversation.messages} onUpdateMessages={handleUpdateMessages} />
      )}
    </div>
  )
}
