import { useState } from "react";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "~/components/ui/avatar";
import { Plus, Check } from "lucide-react";
import { cn } from "~/lib/utils";

interface Conversation {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  avatar?: string;
  initials: string;
  isRead: boolean;
  bgColor: string;
}

interface ChatSidebarProps {
  conversations: Conversation[];
  selectedId: string;
  onSelectConversation: (id: string) => void;
}

const conversations: Conversation[] = [
  {
    id: "1",
    name: "Jacquenetta Slowgrave",
    lastMessage: "Great! Looking forward to it. Se...",
    time: "10 minutes",
    initials: "JS",
    isRead: true,
    bgColor: "bg-red-400",
  },
  {
    id: "2",
    name: "Nickola Peever",
    lastMessage: "Sounds perfect! I've been wanti...",
    time: "40 minutes",
    initials: "NP",
    isRead: true,
    bgColor: "bg-purple-400",
  },
  {
    id: "3",
    name: "Farand Hume",
    lastMessage: "How about 7 PM at the new Italian pl...",
    time: "Yesterday",
    initials: "FH",
    isRead: false,
    bgColor: "bg-gray-400",
  },
  {
    id: "4",
    name: "Ossie Peasey",
    lastMessage: "Hey Bonnie, yes, definitely! What tim...",
    time: "13 days",
    initials: "OP",
    isRead: false,
    bgColor: "bg-orange-400",
  },
  {
    id: "5",
    name: "Hall Negri",
    lastMessage: "No worries at all! I'll grab a table and ...",
    time: "2 days",
    initials: "HN",
    isRead: false,
    bgColor: "bg-blue-600",
  },
  {
    id: "6",
    name: "Elyssa Segot",
    lastMessage: "She just told me today.",
    time: "Yesterday",
    initials: "ES",
    isRead: false,
    bgColor: "bg-pink-400",
  },
  {
    id: "7",
    name: "Gil Wilfung",
    lastMessage: "See you in 5 minutes!",
    time: "1 day",
    initials: "GW",
    isRead: false,
    bgColor: "bg-purple-500",
  },
  {
    id: "8",
    name: "Bab Cleaton",
    lastMessage: "If it turns out you can't ...",
    time: "3 hours",
    initials: "BC",
    isRead: false,
    bgColor: "bg-red-500",
  },
];

export function ChatSidebar({
  selectedId,
  onSelectConversation,
}: ChatSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredConversations = conversations.filter((conv) =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="w-full h-full max-w-sm flex flex-col bg-white border-r border-gray-200">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-900">Chats</h1>
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8 rounded-full hover:bg-gray-100"
          >
            <Plus className="h-5 w-5" />
          </Button>
        </div>

        {/* Search */}
        <div className="relative">
          <Input
            type="text"
            placeholder="Chats search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-gray-100 border-gray-200 placeholder:text-gray-500 pl-10"
          />
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto">
        {filteredConversations.map((conv) => (
          <button
            key={conv.id}
            onClick={() => onSelectConversation(conv.id)}
            className={cn(
              "w-full px-4 py-3 flex items-start gap-3 border-b border-gray-100 hover:bg-gray-50 transition-colors text-left",
              selectedId === conv.id && "bg-gray-50",
            )}
          >
            {/* Avatar */}
            <Avatar className="h-12 w-12 flex-shrink-0">
              <AvatarFallback className={`${conv.bgColor} text-white font-semibold`}>
                {conv.initials}
              </AvatarFallback>
            </Avatar>

            {/* Message content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2 mb-1">
                <p className="font-medium text-gray-900 truncate">
                  {conv.name}
                </p>
                <span className="text-xs text-gray-500 flex-shrink-0">
                  {conv.time}
                </span>
              </div>
              <div className="flex items-center gap-1">
                {conv.isRead && (
                  <Check className="h-3.5 w-3.5 text-green-500 flex-shrink-0" />
                )}
                <p className="text-sm text-gray-600 truncate">
                  {conv.lastMessage}
                </p>
              </div>
            </div>

            {/* Unread indicator */}
            {!conv.isRead && !conv.isRead && (
              <div className="h-2.5 w-2.5 rounded-full bg-green-500 flex-shrink-0 mt-2" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
