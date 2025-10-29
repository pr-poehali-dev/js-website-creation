import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Icon from "@/components/ui/icon";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";

interface Operator {
  id: string;
  name: string;
  email: string;
  status: "online" | "busy" | "away" | "offline";
  activeChats: number;
  totalChats: number;
  avgResponseTime: number;
  satisfactionRate: number;
  lastActivity: string;
  workload: number;
}

const OperatorMonitoring = () => {
  const [operators] = useState<Operator[]>([
    {
      id: "1",
      name: "Анна Смирнова",
      email: "smirnova@company.com",
      status: "online",
      activeChats: 3,
      totalChats: 45,
      avgResponseTime: 2.5,
      satisfactionRate: 98,
      lastActivity: "Только что",
      workload: 75
    },
    {
      id: "2",
      name: "Дмитрий Козлов",
      email: "kozlov@company.com",
      status: "busy",
      activeChats: 5,
      totalChats: 38,
      avgResponseTime: 3.2,
      satisfactionRate: 95,
      lastActivity: "1 мин назад",
      workload: 100
    },
    {
      id: "3",
      name: "Елена Волкова",
      email: "volkova@company.com",
      status: "online",
      activeChats: 2,
      totalChats: 52,
      avgResponseTime: 1.8,
      satisfactionRate: 99,
      lastActivity: "Только что",
      workload: 50
    },
    {
      id: "4",
      name: "Игорь Морозов",
      email: "morozov@company.com",
      status: "away",
      activeChats: 0,
      totalChats: 31,
      avgResponseTime: 4.1,
      satisfactionRate: 92,
      lastActivity: "15 мин назад",
      workload: 0
    },
    {
      id: "5",
      name: "Ольга Новикова",
      email: "novikova@company.com",
      status: "offline",
      activeChats: 0,
      totalChats: 28,
      avgResponseTime: 3.5,
      satisfactionRate: 96,
      lastActivity: "2 часа назад",
      workload: 0
    },
  ]);

  const statusConfig = {
    online: { label: "Онлайн", color: "bg-green-500", textColor: "text-green-500" },
    busy: { label: "Занят", color: "bg-red-500", textColor: "text-red-500" },
    away: { label: "Отошел", color: "bg-yellow-500", textColor: "text-yellow-500" },
    offline: { label: "Оффлайн", color: "bg-gray-400", textColor: "text-gray-400" },
  };

  const stats = {
    total: operators.length,
    online: operators.filter(o => o.status === "online" || o.status === "busy").length,
    activeChats: operators.reduce((sum, o) => sum + o.activeChats, 0),
    avgSatisfaction: Math.round(operators.reduce((sum, o) => sum + o.satisfactionRate, 0) / operators.length),
  };

  const getWorkloadColor = (workload: number) => {
    if (workload >= 80) return "text-red-500";
    if (workload >= 50) return "text-yellow-500";
    return "text-green-500";
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary text-primary-foreground py-4 px-6 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Icon name="Users" size={28} />
            <h1 className="text-2xl font-bold">Мониторинг операторов</h1>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse"></div>
            <span>Обновление в реальном времени</span>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="p-4 border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Всего операторов</p>
                <p className="text-2xl font-bold text-foreground">{stats.total}</p>
              </div>
              <Icon name="Users" size={32} className="text-muted-foreground" />
            </div>
          </Card>
          <Card className="p-4 border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">На линии</p>
                <p className="text-2xl font-bold text-green-500">{stats.online}</p>
              </div>
              <Icon name="UserCheck" size={32} className="text-green-500" />
            </div>
          </Card>
          <Card className="p-4 border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Активных чатов</p>
                <p className="text-2xl font-bold text-secondary">{stats.activeChats}</p>
              </div>
              <Icon name="MessageSquare" size={32} className="text-secondary" />
            </div>
          </Card>
          <Card className="p-4 border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Средняя оценка</p>
                <p className="text-2xl font-bold text-foreground">{stats.avgSatisfaction}%</p>
              </div>
              <Icon name="Star" size={32} className="text-yellow-500" />
            </div>
          </Card>
        </div>

        <Card className="border-border">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">Операторы в реальном времени</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Оператор</TableHead>
                  <TableHead>Статус</TableHead>
                  <TableHead>Активные чаты</TableHead>
                  <TableHead>Загрузка</TableHead>
                  <TableHead>Среднее время ответа</TableHead>
                  <TableHead>Удовлетворенность</TableHead>
                  <TableHead>Всего чатов</TableHead>
                  <TableHead>Последняя активность</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {operators.map((operator) => (
                  <TableRow key={operator.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback className="bg-primary/10 text-primary">
                              {operator.name.split(" ").map(n => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className={`absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-background ${statusConfig[operator.status].color}`}></div>
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{operator.name}</p>
                          <p className="text-xs text-muted-foreground">{operator.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={`${statusConfig[operator.status].color} text-white`}>
                        {statusConfig[operator.status].label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Icon name="MessageCircle" size={16} className="text-muted-foreground" />
                        <span className="font-medium text-foreground">{operator.activeChats}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className={getWorkloadColor(operator.workload)}>{operator.workload}%</span>
                        </div>
                        <Progress value={operator.workload} className="h-2" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Icon name="Clock" size={16} className="text-muted-foreground" />
                        <span className="text-sm text-foreground">{operator.avgResponseTime} мин</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Icon name="Star" size={16} className="text-yellow-500" />
                        <span className="text-sm font-medium text-foreground">{operator.satisfactionRate}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-muted-foreground">{operator.totalChats}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-xs text-muted-foreground">{operator.lastActivity}</span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <Card className="p-6 border-border">
            <div className="flex items-center gap-2 mb-4">
              <Icon name="TrendingUp" size={24} className="text-secondary" />
              <h3 className="text-lg font-semibold text-foreground">Топ операторов по скорости</h3>
            </div>
            <div className="space-y-3">
              {[...operators]
                .sort((a, b) => a.avgResponseTime - b.avgResponseTime)
                .slice(0, 3)
                .map((operator, index) => (
                  <div key={operator.id} className="flex items-center justify-between p-3 bg-accent/5 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary/10 text-secondary font-bold">
                        {index + 1}
                      </div>
                      <span className="font-medium text-foreground">{operator.name}</span>
                    </div>
                    <Badge variant="outline">{operator.avgResponseTime} мин</Badge>
                  </div>
                ))}
            </div>
          </Card>

          <Card className="p-6 border-border">
            <div className="flex items-center gap-2 mb-4">
              <Icon name="Award" size={24} className="text-yellow-500" />
              <h3 className="text-lg font-semibold text-foreground">Топ операторов по оценке</h3>
            </div>
            <div className="space-y-3">
              {[...operators]
                .sort((a, b) => b.satisfactionRate - a.satisfactionRate)
                .slice(0, 3)
                .map((operator, index) => (
                  <div key={operator.id} className="flex items-center justify-between p-3 bg-accent/5 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-yellow-500/10 text-yellow-500 font-bold">
                        {index + 1}
                      </div>
                      <span className="font-medium text-foreground">{operator.name}</span>
                    </div>
                    <Badge variant="outline">{operator.satisfactionRate}%</Badge>
                  </div>
                ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OperatorMonitoring;
