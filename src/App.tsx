
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { I18nProvider } from './contexts/I18nContext';
import { Toaster } from './components/ui/sonner';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Pages
import Index from './pages/Index';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Dashboard from './pages/Dashboard';
import CreateGame from './pages/CreateGame';
import GameSetup from './pages/GameSetup';
import GameSchedule from './pages/GameSchedule';
import GameDetails from './pages/GameDetails';
import EditGame from './pages/EditGame';
import PlanificationDetails from './pages/PlanificationDetails';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <I18nProvider>
        <AuthProvider>
          <Router>
            <div className="min-h-screen bg-background">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/create-game" element={<CreateGame />} />
                <Route path="/game/:id/setup" element={<GameSetup />} />
                <Route path="/game/:id/schedule" element={<GameSchedule />} />
                <Route path="/game/:id" element={<GameDetails />} />
                <Route path="/game/:id/edit" element={<EditGame />} />
                <Route path="/planification/:id" element={<PlanificationDetails />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
            <Toaster />
          </Router>
        </AuthProvider>
      </I18nProvider>
    </QueryClientProvider>
  );
}

export default App;
