
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { I18nProvider } from "./contexts/I18nContext";
import { setGlobalToken } from "./lib/api";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import CreateGame from "./pages/CreateGame";
import GameDetails from "./pages/GameDetails";
import EditGame from "./pages/EditGame";
import GameSetup from "./pages/GameSetup";
import GameSchedule from "./pages/GameSchedule";
import PlanificationDetails from "./pages/PlanificationDetails";
import NotFound from "./pages/NotFound";
import { useEffect } from "react";

const queryClient = new QueryClient();

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/" replace />;
}

function AppRoutes() {
  const { token } = useAuth();

  useEffect(() => {
    if (token) {
      setGlobalToken(token);
    }
  }, [token]);

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/dashboard" element={
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      } />
      <Route path="/create-game" element={
        <PrivateRoute>
          <CreateGame />
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
      <Route path="/game/:id/edit" element={
        <PrivateRoute>
          <EditGame />
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
      <I18nProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </AuthProvider>
      </I18nProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
