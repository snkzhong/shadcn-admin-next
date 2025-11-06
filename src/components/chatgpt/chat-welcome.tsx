"use client"

import { MessageSquare, Zap, BookOpen } from "lucide-react"

export function ChatWelcome() {
  return (
    <div className="h-full flex flex-col items-center justify-center p-6">
      <div className="text-center space-y-4 max-w-md">
        <div className="text-4xl font-bold text-foreground">ChatGPT Clone</div>
        <p className="text-muted-foreground">Welcome to ChatGPT style conversation app. Start a conversation with AI.</p>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 gap-3 pt-6">
          <div className="flex items-start gap-3 p-3 rounded-lg bg-card border border-border text-left">
            <Zap className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <div className="font-semibold text-sm text-foreground">Quick Start</div>
              <div className="text-xs text-muted-foreground">Enter your question directly to start the conversation</div>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-lg bg-card border border-border text-left">
            <MessageSquare className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <div className="font-semibold text-sm text-foreground">multi-turn conversation</div>
              <div className="text-xs text-muted-foreground">Keep conversation history and support multiple rounds of conversations</div>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-lg bg-card border border-border text-left">
            <BookOpen className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <div className="font-semibold text-sm text-foreground">conversation Management</div>
              <div className="text-xs text-muted-foreground">Create, save, and manage multiple conversations</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
