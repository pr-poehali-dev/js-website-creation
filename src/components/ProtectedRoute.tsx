import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

type UserRole = "client" | "operator" | "moderator" | "admin" | "super_admin";

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles: UserRole[];
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { user, hasAccess } = useAuth();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (!hasAccess(allowedRoles)) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <Card className="max-w-md w-full p-8 border-border text-center">
          <Icon name="ShieldAlert" size={64} className="text-destructive mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-foreground mb-2">Доступ запрещен</h1>
          <p className="text-muted-foreground mb-6">
            У вас недостаточно прав для просмотра этой страницы.
          </p>
          <p className="text-sm text-muted-foreground">
            Ваша роль: <span className="font-semibold">{user.role}</span>
          </p>
        </Card>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
