
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, GamepadIcon } from "lucide-react";

export function CreateGameHeader() {
  const navigate = useNavigate();

  return (
    <div className="p-6 lg:p-8 border-b border-gray-100">
      <Button 
        variant="ghost" 
        className="mb-6 text-gray-600 hover:text-gray-900 hover:bg-gray-50"
        onClick={() => navigate('/dashboard')}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Retour au tableau de bord
      </Button>
      
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-sm">
            <GamepadIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 font-heading">
              Créer un nouveau Kahoot
            </h1>
            <p className="text-gray-600 font-medium">
              Donnez vie à vos idées pédagogiques
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
