
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Gamepad2 } from "lucide-react";

export function CreateGameHeader() {
  const navigate = useNavigate();

  return (
    <div className="p-6 lg:p-8 border-b border-gray-200 bg-white">
      <Button 
        variant="ghost" 
        className="mb-6 text-gray-600 hover:text-gray-900 hover:bg-gray-100"
        onClick={() => navigate('/dashboard')}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Retour au tableau de bord
      </Button>
      
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
            <Gamepad2 className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Créer un nouveau Kahoot
            </h1>
            <p className="text-gray-600 text-lg">
              Transformez vos idées en expériences interactives
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
