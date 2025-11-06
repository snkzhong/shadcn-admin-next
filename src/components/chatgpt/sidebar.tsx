"use client"

import { Plus, Trash2 } from "lucide-react"
import { Button } from "~/components/ui/button"

interface Conversation {
  id: string
  title: string
  messages: unknown[]
}

interface SidebarProps {
  conversations: Conversation[]
  currentConversationId: string
  onSelectConversation: (id: string) => void
  onNewConversation: () => void
  onDeleteConversation: (id: string) => void
}

export function Sidebar({
  conversations,
  currentConversationId,
  onSelectConversation,
  onNewConversation,
  onDeleteConversation,
}: SidebarProps) {
  return (
    <aside className="w-64 bg-card border-r border-border flex flex-col h-screen">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <Button
          onClick={onNewConversation}
          className="w-full flex items-center justify-center gap-2 bg-transparent"
          variant="outline"
        >
          <Plus className="w-4 h-4" />
          New chat
        </Button>
      </div>

      {/* Conversation List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {conversations.map((conv) => (
          <div
            key={conv.id}
            className={`group relative p-3 rounded-lg cursor-pointer transition-colors ${
              currentConversationId === conv.id
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted text-foreground"
            }`}
            onClick={() => onSelectConversation(conv.id)}
          >
            <p className="text-sm truncate">{conv.title}</p>
            <button
              onClick={(e) => {
                e.stopPropagation()
                onDeleteConversation(conv.id)
              }}
              className="absolute right-3 top-3 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-border text-xs text-muted-foreground">
        <p>ChatGPT Clone v1.0</p>
      </div>
    </aside>
  )
}
