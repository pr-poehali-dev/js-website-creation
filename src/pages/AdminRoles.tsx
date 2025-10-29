import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";

interface Admin {
  id: string;
  name: string;
  email: string;
  role: "super_admin" | "admin" | "moderator" | "operator";
  status: "active" | "inactive";
  permissions: string[];
  createdAt: string;
}

const AdminRoles = () => {
  const [admins, setAdmins] = useState<Admin[]>([
    {
      id: "1",
      name: "Александр Иванов",
      email: "ivanov@company.com",
      role: "super_admin",
      status: "active",
      permissions: ["all"],
      createdAt: "01.01.2024"
    },
    {
      id: "2",
      name: "Мария Петрова",
      email: "petrova@company.com",
      role: "admin",
      status: "active",
      permissions: ["manage_users", "view_reports", "manage_tickets"],
      createdAt: "15.02.2024"
    },
    {
      id: "3",
      name: "Сергей Сидоров",
      email: "sidorov@company.com",
      role: "moderator",
      status: "active",
      permissions: ["manage_tickets", "view_reports"],
      createdAt: "20.03.2024"
    },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newAdmin, setNewAdmin] = useState({ name: "", email: "", role: "operator" as Admin["role"] });

  const roleConfig = {
    super_admin: { label: "Супер-админ", color: "bg-destructive text-destructive-foreground", permissions: "Все права" },
    admin: { label: "Администратор", color: "bg-primary text-primary-foreground", permissions: "Управление пользователями, отчеты" },
    moderator: { label: "Модератор", color: "bg-secondary text-secondary-foreground", permissions: "Управление обращениями" },
    operator: { label: "Оператор", color: "bg-muted text-muted-foreground", permissions: "Только чат" },
  };

  const handleAddAdmin = () => {
    if (!newAdmin.name.trim() || !newAdmin.email.trim()) return;

    const admin: Admin = {
      id: String(admins.length + 1),
      name: newAdmin.name,
      email: newAdmin.email,
      role: newAdmin.role,
      status: "active",
      permissions: getDefaultPermissions(newAdmin.role),
      createdAt: new Date().toLocaleDateString("ru-RU"),
    };

    setAdmins([...admins, admin]);
    setNewAdmin({ name: "", email: "", role: "operator" });
    setIsDialogOpen(false);
  };

  const getDefaultPermissions = (role: Admin["role"]): string[] => {
    switch (role) {
      case "super_admin":
        return ["all"];
      case "admin":
        return ["manage_users", "view_reports", "manage_tickets"];
      case "moderator":
        return ["manage_tickets", "view_reports"];
      case "operator":
        return ["chat_only"];
      default:
        return [];
    }
  };

  const toggleStatus = (adminId: string) => {
    setAdmins(prev => prev.map(admin =>
      admin.id === adminId
        ? { ...admin, status: admin.status === "active" ? "inactive" : "active" }
        : admin
    ));
  };

  const changeRole = (adminId: string, newRole: Admin["role"]) => {
    setAdmins(prev => prev.map(admin =>
      admin.id === adminId
        ? { ...admin, role: newRole, permissions: getDefaultPermissions(newRole) }
        : admin
    ));
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary text-primary-foreground py-4 px-6 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Icon name="Shield" size={28} />
            <h1 className="text-2xl font-bold">Управление ролями</h1>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="secondary">
                <Icon name="UserPlus" size={16} className="mr-2" />
                Добавить администратора
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Новый администратор</DialogTitle>
                <DialogDescription>
                  Добавьте нового администратора и назначьте роль
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Имя
                  </label>
                  <Input
                    placeholder="Введите имя"
                    value={newAdmin.name}
                    onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Email
                  </label>
                  <Input
                    type="email"
                    placeholder="email@company.com"
                    value={newAdmin.email}
                    onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Роль
                  </label>
                  <Select
                    value={newAdmin.role}
                    onValueChange={(value) => setNewAdmin({ ...newAdmin, role: value as Admin["role"] })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="operator">Оператор</SelectItem>
                      <SelectItem value="moderator">Модератор</SelectItem>
                      <SelectItem value="admin">Администратор</SelectItem>
                      <SelectItem value="super_admin">Супер-админ</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground mt-2">
                    {roleConfig[newAdmin.role].permissions}
                  </p>
                </div>
                <Button onClick={handleAddAdmin} className="w-full">
                  Добавить администратора
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        <Card className="border-border">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">Список администраторов</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Имя</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Роль</TableHead>
                  <TableHead>Права</TableHead>
                  <TableHead>Статус</TableHead>
                  <TableHead>Дата добавления</TableHead>
                  <TableHead className="text-right">Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {admins.map((admin) => (
                  <TableRow key={admin.id}>
                    <TableCell className="font-medium">{admin.name}</TableCell>
                    <TableCell className="text-muted-foreground">{admin.email}</TableCell>
                    <TableCell>
                      <Select
                        value={admin.role}
                        onValueChange={(value) => changeRole(admin.id, value as Admin["role"])}
                        disabled={admin.role === "super_admin"}
                      >
                        <SelectTrigger className="w-[150px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="operator">Оператор</SelectItem>
                          <SelectItem value="moderator">Модератор</SelectItem>
                          <SelectItem value="admin">Администратор</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {admin.permissions.includes("all") ? (
                          <Badge variant="secondary" className="text-xs">Все права</Badge>
                        ) : (
                          admin.permissions.map((perm, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {perm === "manage_users" && "Управление"}
                              {perm === "view_reports" && "Отчеты"}
                              {perm === "manage_tickets" && "Обращения"}
                              {perm === "chat_only" && "Только чат"}
                            </Badge>
                          ))
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={admin.status === "active"}
                          onCheckedChange={() => toggleStatus(admin.id)}
                          disabled={admin.role === "super_admin"}
                        />
                        <span className="text-sm text-muted-foreground">
                          {admin.status === "active" ? "Активен" : "Неактивен"}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{admin.createdAt}</TableCell>
                    <TableCell className="text-right">
                      {admin.role !== "super_admin" && (
                        <Button variant="ghost" size="sm">
                          <Icon name="Trash2" size={16} className="text-destructive" />
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          {Object.entries(roleConfig).map(([role, config]) => {
            const count = admins.filter(a => a.role === role).length;
            return (
              <Card key={role} className="p-4 border-border">
                <Badge className={config.color + " mb-2"}>{config.label}</Badge>
                <p className="text-2xl font-bold text-foreground">{count}</p>
                <p className="text-xs text-muted-foreground mt-1">{config.permissions}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AdminRoles;
