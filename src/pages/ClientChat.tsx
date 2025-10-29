import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: string;
  text: string;
  sender: "client" | "operator";
  timestamp: string;
}

const ClientChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Здравствуйте! Чем могу помочь?",
      sender: "operator",
      timestamp: new Date().toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [inputValue, setInputValue] = useState("");

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "client",
      timestamp: new Date().toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages([...messages, newMessage]);
    setInputValue("");

    setTimeout(() => {
      const autoReply: Message = {
        id: (Date.now() + 1).toString(),
        text: "Спасибо за ваше сообщение! Оператор ответит в течение 2-3 минут.",
        sender: "operator",
        timestamp: new Date().toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages(prev => [...prev, autoReply]);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary text-primary-foreground py-4 px-6 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Icon name="MessageCircle" size={28} />
            <div>
              <h1 className="text-2xl font-bold">Чат с поддержкой</h1>
              <p className="text-sm opacity-90">Онлайн • Средний ответ 2 мин</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse"></div>
            <span>Оператор на линии</span>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-6">
        <Card className="border-border">
          <div className="flex flex-col h-[600px]">
            <ScrollArea className="flex-1 p-6">
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex gap-3 ${msg.sender === "client" ? "flex-row-reverse" : "flex-row"}`}
                  >
                    <Avatar className="h-8 w-8 flex-shrink-0">
                      <AvatarFallback className={msg.sender === "operator" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}>
                        {msg.sender === "operator" ? "О" : "Я"}
                      </AvatarFallback>
                    </Avatar>
                    <div className={`flex flex-col ${msg.sender === "client" ? "items-end" : "items-start"}`}>
                      <div
                        className={`px-4 py-2 rounded-lg max-w-[70%] ${
                          msg.sender === "operator"
                            ? "bg-card border border-border"
                            : "bg-secondary text-secondary-foreground"
                        }`}
                      >
                        <p className="text-sm">{msg.text}</p>
                      </div>
                      <span className="text-xs text-muted-foreground mt-1">{msg.timestamp}</span>
                    </div>
                  </div>
                ))}
              </div>
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
              <p className="text-xs text-muted-foreground mt-2">
                Нажмите Enter для отправки сообщения
              </p>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <Card className="p-4 border-border">
            <div className="flex items-center gap-3">
              <Icon name="Clock" size={24} className="text-secondary" />
              <div>
                <p className="text-sm text-muted-foreground">Время ответа</p>
                <p className="font-semibold text-foreground">2-3 мин</p>
              </div>
            </div>
          </Card>
          <Card className="p-4 border-border">
            <div className="flex items-center gap-3">
              <Icon name="Users" size={24} className="text-secondary" />
              <div>
                <p className="text-sm text-muted-foreground">Операторов онлайн</p>
                <p className="font-semibold text-foreground">5 из 8</p>
              </div>
            </div>
          </Card>
          <Card className="p-4 border-border">
            <div className="flex items-center gap-3">
              <Icon name="Star" size={24} className="text-yellow-500" />
              <div>
                <p className="text-sm text-muted-foreground">Рейтинг поддержки</p>
                <p className="font-semibold text-foreground">4.9 / 5.0</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ClientChat;
