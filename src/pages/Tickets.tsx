import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface UserTicket {
  id: string;
  subject: string;
  description: string;
  status: "new" | "in_progress" | "closed";
  createdAt: string;
  updatedAt: string;
}

const Tickets = () => {
  const [tickets, setTickets] = useState<UserTicket[]>([
    {
      id: "T-001",
      subject: "Не могу войти в личный кабинет",
      description: "После обновления пароля система не принимает новые данные",
      status: "in_progress",
      createdAt: "28.10.2024",
      updatedAt: "29.10.2024"
    },
    {
      id: "T-002",
      subject: "Вопрос по тарифам",
      description: "Хочу уточнить условия корпоративного тарифа",
      status: "closed",
      createdAt: "25.10.2024",
      updatedAt: "26.10.2024"
    },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newTicket, setNewTicket] = useState({ subject: "", description: "" });

  const handleCreateTicket = () => {
    if (!newTicket.subject.trim() || !newTicket.description.trim()) return;

    const ticket: UserTicket = {
      id: `T-${String(tickets.length + 1).padStart(3, "0")}`,
      subject: newTicket.subject,
      description: newTicket.description,
      status: "new",
      createdAt: new Date().toLocaleDateString("ru-RU"),
      updatedAt: new Date().toLocaleDateString("ru-RU"),
    };

    setTickets([ticket, ...tickets]);
    setNewTicket({ subject: "", description: "" });
    setIsDialogOpen(false);
  };

  const statusConfig = {
    new: { label: "Новое", color: "bg-secondary text-secondary-foreground" },
    in_progress: { label: "В работе", color: "bg-primary text-primary-foreground" },
    closed: { label: "Закрыто", color: "bg-muted text-muted-foreground" },
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary text-primary-foreground py-4 px-6 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Icon name="Ticket" size={28} />
            <h1 className="text-2xl font-bold">Мои обращения</h1>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="secondary">
                <Icon name="Plus" size={16} className="mr-2" />
                Создать обращение
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Новое обращение</DialogTitle>
                <DialogDescription>
                  Опишите вашу проблему или вопрос
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Тема обращения
                  </label>
                  <Input
                    placeholder="Кратко опишите проблему"
                    value={newTicket.subject}
                    onChange={(e) => setNewTicket({ ...newTicket, subject: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Описание
                  </label>
                  <Textarea
                    placeholder="Подробно опишите ситуацию"
                    value={newTicket.description}
                    onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })}
                    rows={5}
                  />
                </div>
                <Button onClick={handleCreateTicket} className="w-full">
                  Отправить обращение
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      <div className="max-w-5xl mx-auto p-6">
        <div className="space-y-4">
          {tickets.map((ticket) => (
            <Card key={ticket.id} className="p-6 border-border hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-foreground">{ticket.subject}</h3>
                    <Badge className={statusConfig[ticket.status].color}>
                      {statusConfig[ticket.status].label}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{ticket.description}</p>
                </div>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-border">
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Icon name="Hash" size={14} />
                    <span>{ticket.id}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Icon name="Calendar" size={14} />
                    <span>Создано: {ticket.createdAt}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Icon name="Clock" size={14} />
                    <span>Обновлено: {ticket.updatedAt}</span>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <Icon name="MessageSquare" size={14} className="mr-2" />
                  Открыть чат
                </Button>
              </div>
            </Card>
          ))}
          {tickets.length === 0 && (
            <Card className="p-12 border-border text-center">
              <Icon name="Inbox" size={48} className="text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Нет обращений</h3>
              <p className="text-muted-foreground mb-4">Создайте первое обращение, если у вас есть вопрос</p>
              <Button onClick={() => setIsDialogOpen(true)}>
                <Icon name="Plus" size={16} className="mr-2" />
                Создать обращение
              </Button>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tickets;
