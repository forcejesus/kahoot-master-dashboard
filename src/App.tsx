
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import GameCreation from "./pages/GameCreation";
import GameDetails from "./pages/GameDetails";
import GameSetup from "./pages/GameSetup";
import GameSchedule from "./pages/GameSchedule";
import PlanificationDetails from "./pages/PlanificationDetails";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/" replace />;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      } />
      <Route path="/game/create" element={
        <PrivateRoute>
          <GameCreation />
        </PrivateRoute>
      } />
      <Route path="/game/setup" element={
        <PrivateRoute>
          <GameSetup />
        </PrivateRoute>
      } />
      <Route path="/game/:id" element={
        <PrivateRoute>
          <GameDetails />
        </PrivateRoute>
      } />
      <Route path="/game/:id/schedule" element={
        <PrivateRoute>
          <GameSchedule />
        </PrivateRoute>
      } />
      <Route path="/planification/:id" element={
        <PrivateRoute>
          <PlanificationDetails />
        </PrivateRoute>
      } />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
