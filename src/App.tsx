
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Index from "./pages/Index";
import ClientChat from "./pages/ClientChat";
import KnowledgeBase from "./pages/KnowledgeBase";
import Tickets from "./pages/Tickets";
import Contacts from "./pages/Contacts";
import AdminRoles from "./pages/AdminRoles";
import OperatorMonitoring from "./pages/OperatorMonitoring";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chat" element={<ClientChat />} />
            <Route 
              path="/support" 
              element={
                <ProtectedRoute allowedRoles={["operator", "moderator", "admin", "super_admin"]}>
                  <Index />
                </ProtectedRoute>
              } 
            />
            <Route path="/knowledge-base" element={<KnowledgeBase />} />
            <Route path="/tickets" element={<Tickets />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route 
              path="/admin/roles" 
              element={
                <ProtectedRoute allowedRoles={["admin", "super_admin"]}>
                  <AdminRoles />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/monitoring" 
              element={
                <ProtectedRoute allowedRoles={["moderator", "admin", "super_admin"]}>
                  <OperatorMonitoring />
                </ProtectedRoute>
              } 
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;