
import { useNavigate } from "react-router-dom";
import { Plus, Sparkles, GamepadIcon } from "lucide-react";

interface CreateGameModalProps {
  onSuccess?: () => void;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function CreateGameModal({ onSuccess, isOpen, onOpenChange }: CreateGameModalProps) {
  const navigate = useNavigate();

  const handleCreateGame = () => {
    navigate('/game/create');
  };

  const TriggerButton = () => (
    <div 
      className="relative group cursor-pointer"
      onClick={handleCreateGame}
    >
      {/* Effet de profondeur */}
      <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-700 rounded-3xl transform rotate-1 scale-105 opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600 rounded-3xl transform -rotate-1 scale-102 opacity-30 group-hover:opacity-40 transition-opacity duration-300"></div>
      
      <div className="relative backdrop-blur-xl bg-gradient-to-br from-orange-50 via-white to-orange-100 border-2 border-orange-200/50 rounded-3xl p-8 shadow-2xl shadow-orange-900/20 hover:shadow-3xl hover:shadow-orange-900/30 transition-all duration-300 transform hover:scale-[1.02] h-32 flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center space-x-3">
            <div className="h-12 w-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Plus className="h-6 w-6 text-white" />
            </div>
            <Sparkles className="h-6 w-6 text-orange-500 animate-pulse" />
          </div>
          
          <div>
            <h3 className="text-xl font-bold bg-gradient-to-r from-orange-600 via-orange-700 to-orange-800 bg-clip-text text-transparent">
              Créer un nouveau jeu
            </h3>
            <p className="text-sm text-orange-600/80 font-medium">
              Concevez vos expériences éducatives
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return <TriggerButton />;
}
