import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Icon from "@/components/ui/icon";
import TicketList from "@/components/TicketList";
import ChatWindow from "@/components/ChatWindow";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";

interface Ticket {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  status: "new" | "in_progress" | "closed";
  unreadCount: number;
}

const Index = () => {
  const [tickets, setTickets] = useState<Ticket[]>([
    {
      id: "1",
      name: "Иван Петров",
      lastMessage: "Не могу войти в личный кабинет",
      timestamp: "14:23",
      status: "new",
      unreadCount: 2,
    },
    {
      id: "2",
      name: "Мария Сидорова",
      lastMessage: "Спасибо за помощь!",
      timestamp: "13:45",
      status: "in_progress",
      unreadCount: 0,
    },
    {
      id: "3",
      name: "Алексей Николаев",
      lastMessage: "Проблема решена",
      timestamp: "12:10",
      status: "closed",
      unreadCount: 0,
    },
  ]);

  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTickets = tickets.filter((ticket) =>
    ticket.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedTicket = tickets.find((t) => t.id === selectedTicketId);

  const handleSelectTicket = (ticketId: string) => {
    setSelectedTicketId(ticketId);
    setTickets((prev) =>
      prev.map((ticket) =>
        ticket.id === ticketId ? { ...ticket, unreadCount: 0 } : ticket
      )
    );
  };

  const stats = {
    total: tickets.length,
    new: tickets.filter((t) => t.status === "new").length,
    inProgress: tickets.filter((t) => t.status === "in_progress").length,
    closed: tickets.filter((t) => t.status === "closed").length,
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary text-primary-foreground py-4 px-6 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Icon name="Headphones" size={28} />
            <h1 className="text-2xl font-bold">Служба поддержки</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm">
              <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse"></div>
              <span>Онлайн</span>
            </div>
            <Button variant="secondary" size="sm" asChild>
              <Link to="/admin/monitoring">
                <Icon name="Users" size={16} className="mr-2" />
                Мониторинг
              </Link>
            </Button>
            <Button variant="secondary" size="sm" asChild>
              <Link to="/admin/roles">
                <Icon name="Shield" size={16} className="mr-2" />
                Роли
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="p-4 border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Всего</p>
                <p className="text-2xl font-bold text-foreground">{stats.total}</p>
              </div>
              <Icon name="MessageSquare" size={32} className="text-muted-foreground" />
            </div>
          </Card>
          <Card className="p-4 border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Новые</p>
                <p className="text-2xl font-bold text-secondary">{stats.new}</p>
              </div>
              <Icon name="AlertCircle" size={32} className="text-secondary" />
            </div>
          </Card>
          <Card className="p-4 border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">В работе</p>
                <p className="text-2xl font-bold text-primary">{stats.inProgress}</p>
              </div>
              <Icon name="Clock" size={32} className="text-primary" />
            </div>
          </Card>
          <Card className="p-4 border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Закрыто</p>
                <p className="text-2xl font-bold text-muted-foreground">{stats.closed}</p>
              </div>
              <Icon name="CheckCircle" size={32} className="text-muted-foreground" />
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <Card className="p-4 border-border">
              <div className="mb-4">
                <div className="relative">
                  <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Поиск обращений..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="max-h-[600px] overflow-y-auto pr-2">
                <TicketList
                  tickets={filteredTickets}
                  selectedTicketId={selectedTicketId}
                  onSelectTicket={handleSelectTicket}
                />
              </div>
            </Card>
          </div>

          <div className="lg:col-span-2">
            {selectedTicket ? (
              <ChatWindow
                ticketId={selectedTicket.id}
                ticketName={selectedTicket.name}
                onClose={() => setSelectedTicketId(null)}
              />
            ) : (
              <Card className="p-12 border-border flex flex-col items-center justify-center h-full min-h-[500px]">
                <Icon name="MessageCircle" size={64} className="text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">Выберите обращение</h3>
                <p className="text-muted-foreground text-center">
                  Выберите обращение из списка слева, чтобы начать диалог
                </p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;