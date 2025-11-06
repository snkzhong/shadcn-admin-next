"use client";

import { useState } from "react";
import { ChatSidebar } from "~/components/chat/chat-sidebar";
import { ChatMessages } from "~/components/chat/chat-messages";
import { ChatInput } from "~/components/chat/chat-input";
import { Button } from "~/components/ui/button";
import { Menu, X } from "lucide-react";

interface Message {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  isOwn: boolean;
  images?: string[];
  isRead?: boolean;
}

const defaultMessages: Message[] = [
  {
    id: "1",
    author: "Nickola Peever",
    content:
      "Sorry :( send you as soon as possible. I know how important this file is to you. You can trust me :) I know how important this file is to you. You can trust me :)",
    timestamp: "05:23 PM",
    isOwn: false,
    isRead: true,
  },
  {
    id: "2",
    author: "You",
    content:
      "I know how important this file is to you. You can trust me :) I know how important this file is to you. You can trust me :)",
    timestamp: "05:23 PM",
    isOwn: true,
    isRead: true,
  },
  {
    id: "3",
    author: "You",
    content: "I know how important this file is to you. You can trust me :) :)",
    timestamp: "05:23 PM",
    isOwn: true,
    images: [
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='96' height='96'%3E%3Crect fill='%23000' width='96' height='96'/%3E%3Ctext x='50%' y='50%' font-size='14' fill='%23fff' text-anchor='middle' dominant-baseline='middle'%3EImage 1%3C/text%3E%3C/svg%3E",
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='96' height='96'%3E%3Crect fill='%23333' width='96' height='96'/%3E%3Ctext x='50%' y='50%' font-size='14' fill='%23fff' text-anchor='middle' dominant-baseline='middle'%3EImage 2%3C/text%3E%3C/svg%3E",
    ],
    isRead: true,
  },
];

export default function Index() {
  const [selectedChatId, setSelectedChatId] = useState("2");
  const [messages, setMessages] = useState<Message[]>(defaultMessages);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSendMessage = (content: string) => {
    const newMessage: Message = {
      id: String(messages.length + 1),
      author: "You",
      content,
      timestamp: new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
      isOwn: true,
      isRead: true,
    };
    setMessages([...messages, newMessage]);
  };

  return (
    <div className="h-screen flex bg-white overflow-hidden">
      {/* Mobile sidebar toggle */}
      <div className="md:hidden absolute top-4 left-4 z-50">
        <Button
          size="icon"
          variant="ghost"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="h-10 w-10 rounded-full hover:bg-gray-100"
        >
          {sidebarOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </Button>
      </div>

      {/* Sidebar */}
      <div
        className={`absolute inset-y-0 left-0 z-40 w-80 md:relative md:z-0 md:block transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <ChatSidebar
          conversations={[]}
          selectedId={selectedChatId}
          onSelectConversation={(id) => {
            setSelectedChatId(id);
            setSidebarOpen(false);
          }}
        />
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="absolute inset-0 bg-black/20 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main chat area */}
      <div className="flex-1 flex flex-col min-h-screen md:border-l md:border-gray-200">
        <ChatMessages
          selectedContactName="Nickola Peever"
          messages={messages}
        />
        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
}
