
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface PlanificationFormActionsProps {
  isLoading: boolean;
  onCancel: () => void;
}

export function PlanificationFormActions({ isLoading, onCancel }: PlanificationFormActionsProps) {
  return (
    <div className="flex gap-3 pt-4">
      <Button 
        type="button" 
        variant="outline" 
        className="w-full border-orange-200 hover:bg-orange-50" 
        disabled={isLoading}
        onClick={onCancel}
      >
        Annuler
      </Button>
      
      <Button 
        type="submit" 
        className="w-full bg-gradient-to-r from-violet-500 to-violet-600 hover:from-violet-600 hover:to-violet-700" 
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Création...
          </>
        ) : (
          "Créer la planification"
        )}
      </Button>
    </div>
  );
}
