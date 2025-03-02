
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { CardFooter } from "@/components/ui/card";
import { toast } from "sonner";
import { format } from "date-fns";
import { useScheduleForm } from "./ScheduleFormContext";
import { useState } from "react";

interface ScheduleSuccessProps {
  gameId: string;
  onClose?: () => void;
}

export function ScheduleSuccess({ gameId, onClose }: ScheduleSuccessProps) {
  const { createdPin, setCreatedPin, setFormData } = useScheduleForm();
  const [copied, setCopied] = useState(false);
  
  if (!createdPin) return null;
  
  const handleCopyPin = () => {
    if (createdPin) {
      navigator.clipboard.writeText(createdPin);
      toast.success("PIN copié dans le presse-papier");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleNewPlanification = () => {
    setCreatedPin(null);
    setFormData(prev => ({
      ...prev,
      date_debut: format(new Date(), "yyyy/MM/dd"),
      date_fin: format(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), "yyyy/MM/dd"),
    }));
  };
  
  return (
    <div className="flex flex-col space-y-6">
      <div className="p-6 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg border border-primary/20 text-center w-full shadow-md">
        <h3 className="text-lg font-semibold mb-2 text-primary">Planification créée avec succès !</h3>
        <p className="text-gray-600 mb-4">Voici le code PIN pour cette session :</p>
        
        <div className="bg-white py-6 px-4 rounded-lg border-2 border-primary/20 shadow-inner mb-6">
          <span className="font-mono text-3xl font-bold tracking-wider text-primary">{createdPin}</span>
        </div>
        
        <Button 
          size="lg" 
          variant={copied ? "secondary" : "default"}
          onClick={handleCopyPin}
          className="w-full gap-2 font-medium text-md py-6"
        >
          {copied ? (
            <>
              <Check className="h-5 w-5" />
              PIN Copié !
            </>
          ) : (
            <>
              <Copy className="h-5 w-5" />
              Copier le PIN
            </>
          )}
        </Button>
      </div>
      
      <CardFooter className="flex space-x-4 pt-4 px-0">
        <Button 
          variant="outline" 
          className="flex-1"
          onClick={onClose}
        >
          Fermer
        </Button>
        <Button 
          variant="secondary"
          className="flex-1"
          onClick={handleNewPlanification}
        >
          Nouvelle planification
        </Button>
      </CardFooter>
    </div>
  );
}
