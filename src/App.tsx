
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Index from "./pages/Index";
import KnowledgeBase from "./pages/KnowledgeBase";
import Tickets from "./pages/Tickets";
import Contacts from "./pages/Contacts";
import AdminRoles from "./pages/AdminRoles";
import OperatorMonitoring from "./pages/OperatorMonitoring";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/support" element={<Index />} />
          <Route path="/knowledge-base" element={<KnowledgeBase />} />
          <Route path="/tickets" element={<Tickets />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/admin/roles" element={<AdminRoles />} />
          <Route path="/admin/monitoring" element={<OperatorMonitoring />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;