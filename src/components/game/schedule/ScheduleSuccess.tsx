
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { CardFooter } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { format } from "date-fns";
import { useScheduleForm } from "./ScheduleFormContext";

interface ScheduleSuccessProps {
  gameId: string;
}

export function ScheduleSuccess({ gameId }: ScheduleSuccessProps) {
  const navigate = useNavigate();
  const { createdPin, setCreatedPin, setFormData } = useScheduleForm();
  
  if (!createdPin) return null;
  
  const handleCopyPin = () => {
    if (createdPin) {
      navigator.clipboard.writeText(createdPin);
      toast.success("PIN copié dans le presse-papier");
    }
  };
  
  return (
    <CardFooter className="flex flex-col space-y-4">
      <div className="p-4 bg-green-50 rounded-lg border border-green-200 text-center w-full">
        <p className="text-green-600 mb-2">Planification créée avec succès !</p>
        <div className="flex items-center justify-center space-x-2">
          <span className="font-mono text-xl font-bold">{createdPin}</span>
          <Button 
            size="sm" 
            variant="outline" 
            onClick={handleCopyPin}
            className="gap-1"
          >
            <Copy className="h-4 w-4" />
            Copier le PIN
          </Button>
        </div>
      </div>
      <div className="flex space-x-4 w-full">
        <Button 
          variant="outline" 
          className="flex-1"
          onClick={() => navigate(`/game/${gameId}`)}
        >
          Retour au jeu
        </Button>
        <Button 
          className="flex-1"
          onClick={() => {
            setCreatedPin(null);
            setFormData(prev => ({
              ...prev,
              date_debut: format(new Date(), "yyyy/MM/dd"),
              date_fin: format(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), "yyyy/MM/dd"),
            }));
          }}
        >
          Nouvelle planification
        </Button>
      </div>
    </CardFooter>
  );
}
