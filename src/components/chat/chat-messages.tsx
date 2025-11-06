import { useRef, useEffect } from "react";
import { ChatMessage } from "./chat-message";
import { Button } from "~/components/ui/button";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import {
  MoreVertical,
  Phone,
  Video,
} from "lucide-react";

interface Message {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  isOwn: boolean;
  images?: string[];
  isRead?: boolean;
}

interface ChatMessagesProps {
  selectedContactName: string;
  messages: Message[];
}

export function ChatMessages({
  selectedContactName,
  messages,
}: ChatMessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-gradient-to-br from-purple-400 to-purple-500 text-white font-semibold text-sm">
              NP
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-semibold text-gray-900 text-sm">{selectedContactName}</h2>
            <div className="flex items-center gap-1">
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
              <p className="text-xs text-gray-600 font-medium">Online</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="icon"
            variant="ghost"
            className="h-9 w-9 rounded-full hover:bg-gray-100"
          >
            <Video className="h-5 w-5 text-gray-600" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="h-9 w-9 rounded-full hover:bg-gray-100"
          >
            <Phone className="h-5 w-5 text-gray-600" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="h-9 w-9 rounded-full hover:bg-gray-100"
          >
            <MoreVertical className="h-5 w-5 text-gray-600" />
          </Button>
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        {messages.map((message) => (
          <ChatMessage key={message.id} {...message} />
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}
