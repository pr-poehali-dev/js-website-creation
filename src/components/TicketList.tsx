import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

interface Ticket {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  status: "new" | "in_progress" | "closed";
  unreadCount: number;
}

interface TicketListProps {
  tickets: Ticket[];
  selectedTicketId: string | null;
  onSelectTicket: (ticketId: string) => void;
}

const statusConfig = {
  new: { label: "Новый", color: "bg-secondary text-secondary-foreground" },
  in_progress: { label: "В работе", color: "bg-primary text-primary-foreground" },
  closed: { label: "Закрыт", color: "bg-muted text-muted-foreground" },
};

const TicketList = ({ tickets, selectedTicketId, onSelectTicket }: TicketListProps) => {
  return (
    <div className="space-y-2">
      {tickets.map((ticket) => (
        <Card
          key={ticket.id}
          className={cn(
            "p-4 cursor-pointer transition-all hover:shadow-md",
            selectedTicketId === ticket.id ? "border-primary bg-accent/10" : "border-border"
          )}
          onClick={() => onSelectTicket(ticket.id)}
        >
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-sm text-foreground truncate">{ticket.name}</h4>
              <p className="text-xs text-muted-foreground mt-1 truncate">{ticket.lastMessage}</p>
            </div>
            {ticket.unreadCount > 0 && (
              <Badge variant="secondary" className="ml-2 flex-shrink-0 h-5 min-w-[20px] flex items-center justify-center">
                {ticket.unreadCount}
              </Badge>
            )}
          </div>
          <div className="flex items-center justify-between mt-3">
            <Badge className={cn("text-xs", statusConfig[ticket.status].color)}>
              {statusConfig[ticket.status].label}
            </Badge>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Icon name="Clock" size={12} />
              <span>{ticket.timestamp}</span>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default TicketList;
