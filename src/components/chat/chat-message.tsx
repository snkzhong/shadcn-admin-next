import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import { Check } from "lucide-react";

interface ChatMessageProps {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  isOwn: boolean;
  images?: string[];
  isRead?: boolean;
}

export function ChatMessage({
  author,
  content,
  timestamp,
  isOwn,
  images,
  isRead,
}: ChatMessageProps) {
  return (
    <div className={`flex gap-3 mb-4 ${isOwn ? "flex-row-reverse" : ""}`}>
      {!isOwn && (
        <Avatar className="h-8 w-8 flex-shrink-0">
          <AvatarFallback className="bg-purple-400 text-white text-xs font-semibold">
            NP
          </AvatarFallback>
        </Avatar>
      )}

      <div className={`flex flex-col gap-2 ${isOwn ? "items-end" : "items-start"}`}>
        {/* Message bubble */}
        <div
          className={`rounded-2xl px-4 py-2 max-w-md ${
            isOwn
              ? "bg-gray-100 text-gray-900 rounded-br-none"
              : "bg-white text-gray-900 rounded-bl-none border border-gray-200"
          }`}
        >
          <p className="text-sm leading-relaxed">{content}</p>
        </div>

        {/* Images if present */}
        {images && images.length > 0 && (
          <div className="flex gap-2 flex-wrap max-w-md">
            {images.map((img, idx) => (
              <div key={idx} className="rounded-lg overflow-hidden">
                <img
                  src={img}
                  alt={`Attachment ${idx + 1}`}
                  className="h-24 w-24 object-cover"
                />
              </div>
            ))}
          </div>
        )}

        {/* Timestamp and read receipt */}
        <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
          <span>{timestamp}</span>
          {isOwn && isRead && (
            <svg className="h-3 w-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
            </svg>
          )}
          {isOwn && isRead && (
            <svg className="h-3 w-3 text-green-500 -ml-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
            </svg>
          )}
        </div>
      </div>
    </div>
  );
}
