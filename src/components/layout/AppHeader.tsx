
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { LogOut, User, Plus, Calendar } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { CreateGameModal } from "@/components/dashboard/CreateGameModal";
import { ScheduleGameModal } from "@/components/dashboard/ScheduleGameModal";
import { useState } from "react";

interface AppHeaderProps {
  kahoots?: any[];
  onGameCreated?: () => void;
  onPlanificationCreated?: () => void;
}

export function AppHeader({ kahoots = [], onGameCreated, onPlanificationCreated }: AppHeaderProps) {
  const { user, logout } = useAuth();
  const [isCreateGameOpen, setIsCreateGameOpen] = useState(false);
  const [isScheduleGameOpen, setIsScheduleGameOpen] = useState(false);

  const handleGameCreated = () => {
    onGameCreated?.();
    setIsCreateGameOpen(false);
  };

  const handlePlanificationCreated = () => {
    onPlanificationCreated?.();
    setIsScheduleGameOpen(false);
  };

  return (
    <header className="h-16 border-b border-orange-200/50 bg-white/90 backdrop-blur-sm shadow-sm">
      <div className="flex h-full items-center justify-between px-6">
        <div className="flex items-center space-x-4">
          <SidebarTrigger className="h-8 w-8 text-orange-600 hover:bg-orange-50" />
          <div className="h-6 w-px bg-orange-200"></div>
          <h1 className="text-xl font-semibold text-gray-800">Tableau de bord</h1>
        </div>

        <div className="flex items-center space-x-4">
          {/* Actions rapides */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg">
                <Plus className="h-4 w-4 mr-2" />
                Actions rapides
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem onClick={() => setIsCreateGameOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Créer un jeu
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setIsScheduleGameOpen(true)}>
                <Calendar className="h-4 w-4 mr-2" />
                Planifier une session
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Profil utilisateur */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-2 hover:bg-orange-50">
                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center">
                  <User className="h-5 w-5 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-700">{user?.name}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem disabled>
                <User className="h-4 w-4 mr-2" />
                Profil
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout}>
                <LogOut className="h-4 w-4 mr-2" />
                Se déconnecter
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Modals */}
      <CreateGameModal 
        isOpen={isCreateGameOpen}
        onOpenChange={setIsCreateGameOpen}
        onSuccess={handleGameCreated}
      />
      <ScheduleGameModal 
        kahoots={kahoots}
        isOpen={isScheduleGameOpen}
        onOpenChange={setIsScheduleGameOpen}
        onSuccess={handlePlanificationCreated}
      />
    </header>
  );
}
