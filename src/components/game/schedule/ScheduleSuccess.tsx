
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { useScheduleForm } from "./ScheduleFormContext";
import { SchedulePinDialog } from "./SchedulePinDialog";
import { useState } from "react";

interface ScheduleSuccessProps {
  gameId: string;
  onSuccess?: () => void;
}

export function ScheduleSuccess({ gameId, onSuccess }: ScheduleSuccessProps) {
  const navigate = useNavigate();
  const { createdPin, setCreatedPin, setFormData } = useScheduleForm();
  const [pinDialogOpen, setPinDialogOpen] = useState(false);
  
  if (!createdPin) return null;

  // Ouvrir automatiquement le dialogue PIN quand un PIN est créé
  if (createdPin && !pinDialogOpen) {
    setPinDialogOpen(true);
  }
  
  const handleCloseDialog = () => {
    setPinDialogOpen(false);
    onSuccess?.();
  };
  
  const handleNewSchedule = () => {
    setPinDialogOpen(false);
    setCreatedPin(null);
    setFormData(prev => ({
      ...prev,
      date_debut: format(new Date(), "yyyy/MM/dd"),
      date_fin: format(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), "yyyy/MM/dd"),
    }));
  };
  
  return (
    <>
      <SchedulePinDialog 
        pin={createdPin} 
        open={pinDialogOpen} 
        onOpenChange={setPinDialogOpen}
        onClose={handleCloseDialog}
      />
      
      <div className="flex space-x-4 pt-4">
        <Button 
          variant="outline" 
          className="flex-1"
          onClick={() => {
            navigate(`/game/${gameId}`);
          }}
        >
          Retourner au jeu
        </Button>
        <Button 
          className="flex-1"
          onClick={handleNewSchedule}
        >
          Nouvelle planification
        </Button>
      </div>
    </>
  );
}
