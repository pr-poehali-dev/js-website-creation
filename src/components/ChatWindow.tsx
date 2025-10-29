import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import Icon from "@/components/ui/icon";
import ChatMessage from "./ChatMessage";

interface Message {
  id: string;
  message: string;
  sender: "user" | "operator";
  timestamp: string;
  senderName: string;
}

interface ChatWindowProps {
  ticketId: string;
  ticketName: string;
  onClose: () => void;
}

const ChatWindow = ({ ticketId, ticketName, onClose }: ChatWindowProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      message: "Здравствуйте! Чем могу помочь?",
      sender: "operator",
      timestamp: new Date().toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" }),
      senderName: "Оператор",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      message: inputValue,
      sender: "operator",
      timestamp: new Date().toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" }),
      senderName: "Оператор",
    };

    setMessages([...messages, newMessage]);
    setInputValue("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full bg-card border border-border rounded-lg">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div>
          <h3 className="font-semibold text-foreground">{ticketName}</h3>
          <p className="text-xs text-muted-foreground">ID: {ticketId}</p>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <Icon name="X" size={18} />
        </Button>
      </div>

      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        {messages.map((msg) => (
          <ChatMessage
            key={msg.id}
            message={msg.message}
            sender={msg.sender}
            timestamp={msg.timestamp}
            senderName={msg.senderName}
          />
        ))}
      </ScrollArea>

      <div className="p-4 border-t border-border">
        <div className="flex gap-2">
          <Input
            placeholder="Введите сообщение..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1"
          />
          <Button onClick={handleSendMessage} size="icon" disabled={!inputValue.trim()}>
            <Icon name="Send" size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
