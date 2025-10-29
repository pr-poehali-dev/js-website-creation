import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface ChatMessageProps {
  message: string;
  sender: "user" | "operator";
  timestamp: string;
  senderName: string;
}

const ChatMessage = ({ message, sender, timestamp, senderName }: ChatMessageProps) => {
  const isOperator = sender === "operator";

  return (
    <div className={cn("flex gap-3 mb-4 animate-fade-in", isOperator ? "flex-row" : "flex-row-reverse")}>
      <Avatar className="h-8 w-8 flex-shrink-0">
        <AvatarFallback className={cn(isOperator ? "bg-primary text-primary-foreground" : "bg-muted text-foreground")}>
          {senderName.charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div className={cn("flex flex-col", isOperator ? "items-start" : "items-end")}>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-medium text-muted-foreground">{senderName}</span>
          <span className="text-xs text-muted-foreground">{timestamp}</span>
        </div>
        <div
          className={cn(
            "px-4 py-2 rounded-lg max-w-[70%] break-words",
            isOperator ? "bg-card border border-border" : "bg-secondary text-secondary-foreground"
          )}
        >
          <p className="text-sm">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
