
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Loader2, Plus } from "lucide-react";

interface CreateGameActionsProps {
  isLoading: boolean;
  isValid: boolean;
  onCancel?: () => void;
}

export function CreateGameActions({ isLoading, isValid, onCancel }: CreateGameActionsProps) {
  const navigate = useNavigate();

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="p-6 lg:p-8 border-t border-gray-100 bg-gray-50/50">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Button 
          type="button" 
          variant="outline" 
          className="h-14 text-lg font-semibold border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 rounded-xl"
          onClick={handleCancel}
          disabled={isLoading}
        >
          Annuler
        </Button>
        
        <Button 
          type="submit" 
          className="h-14 text-lg font-semibold bg-blue-600 hover:bg-blue-700 transition-all duration-200 shadow-lg rounded-xl group"
          disabled={isLoading || !isValid}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-3 h-6 w-6 animate-spin" />
              Création en cours...
            </>
          ) : (
            <>
              <Plus className="mr-3 h-6 w-6 group-hover:rotate-90 transition-transform duration-300" />
              Créer le Kahoot
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
