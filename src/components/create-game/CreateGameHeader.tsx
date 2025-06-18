
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Gamepad2, Sparkles } from "lucide-react";

export function CreateGameHeader() {
  const navigate = useNavigate();

  return (
    <div className="p-6 lg:p-8 border-b border-white/20 bg-white/5 backdrop-blur-sm">
      <Button 
        variant="ghost" 
        className="mb-6 text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200 backdrop-blur-sm"
        onClick={() => navigate('/dashboard')}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Retour au tableau de bord
      </Button>
      
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-14 h-14 bg-gradient-to-r from-violet-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-2xl">
              <Gamepad2 className="w-7 h-7 text-white" />
            </div>
            <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-yellow-400 animate-pulse" />
          </div>
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-white font-heading">
              Créer un nouveau Kahoot
            </h1>
            <p className="text-white/80 font-medium text-lg">
              Transformez vos idées en expériences interactives
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
