import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Icon from "@/components/ui/icon";
import { Badge } from "@/components/ui/badge";

const RoleSwitcher = () => {
  const { user, setUser } = useAuth();

  const roles = [
    { value: "client", label: "Клиент", icon: "User", color: "bg-muted" },
    { value: "operator", label: "Оператор", icon: "Headphones", color: "bg-blue-500" },
    { value: "moderator", label: "Модератор", icon: "Shield", color: "bg-yellow-500" },
    { value: "admin", label: "Администратор", icon: "Crown", color: "bg-orange-500" },
    { value: "super_admin", label: "Супер-админ", icon: "Zap", color: "bg-destructive" },
  ];

  const currentRole = roles.find(r => r.value === user?.role);

  const handleRoleChange = (role: string) => {
    if (!user) return;
    setUser({
      ...user,
      role: role as any,
    });
  };

  if (!user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Icon name={currentRole?.icon as any} size={16} />
          <span className="hidden md:inline">{currentRole?.label}</span>
          <Icon name="ChevronDown" size={14} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Переключить роль (демо)</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {roles.map((role) => (
          <DropdownMenuItem
            key={role.value}
            onClick={() => handleRoleChange(role.value)}
            className="cursor-pointer"
          >
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <Icon name={role.icon as any} size={16} />
                <span>{role.label}</span>
              </div>
              {user.role === role.value && (
                <Badge variant="secondary" className="text-xs">Текущая</Badge>
              )}
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default RoleSwitcher;
