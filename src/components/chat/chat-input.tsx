import { useState } from "react";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Smile, Paperclip, Send, Zap } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

export function ChatInput({ onSendMessage }: ChatInputProps) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t border-gray-200 px-6 py-4 bg-white">
      <div className="flex items-center gap-3">
        <Input
          type="text"
          placeholder="Enter message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          className="bg-gray-50 border-gray-200 placeholder:text-gray-400"
        />
        <Button
          size="icon"
          variant="ghost"
          className="h-9 w-9 rounded-full hover:bg-gray-100 flex-shrink-0"
        >
          <Smile className="h-5 w-5 text-gray-400" />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          className="h-9 w-9 rounded-full hover:bg-gray-100 flex-shrink-0"
        >
          <Paperclip className="h-5 w-5 text-gray-400" />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          className="h-9 w-9 rounded-full hover:bg-gray-100 flex-shrink-0"
        >
          <Zap className="h-5 w-5 text-gray-400" />
        </Button>
        <Button
          onClick={handleSend}
          disabled={!message.trim()}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-full h-9 px-6 flex-shrink-0"
        >
          <span className="text-sm font-medium">Send</span>
        </Button>
      </div>
    </div>
  );
}
