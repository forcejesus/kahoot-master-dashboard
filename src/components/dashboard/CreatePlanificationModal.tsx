
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Kahoot } from "@/types/game-details";
import { usePlanificationForm } from "./planification/usePlanificationForm";
import { PlanificationTriggerButton } from "./planification/PlanificationTriggerButton";
import { PlanificationFormFields } from "./planification/PlanificationFormFields";
import { PlanificationFormActions } from "./planification/PlanificationFormActions";

interface CreatePlanificationModalProps {
  kahoots: Kahoot[];
  onSuccess?: () => void;
}

export function CreatePlanificationModal({ kahoots, onSuccess }: CreatePlanificationModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const isGameDetail = kahoots.length === 1;
  
  const {
    isLoading,
    selectedGame,
    setSelectedGame,
    dateDebut,
    setDateDebut,
    dateFin,
    setDateFin,
    heureDebut,
    setHeureDebut,
    heureFin,
    setHeureFin,
    limiteParticipant,
    setLimiteParticipant,
    resetForm,
    handleSubmit
  } = usePlanificationForm({
    gameId: isGameDetail ? kahoots[0]._id : undefined,
    onSuccess,
    onClose: () => setIsOpen(false)
  });

  const handleClose = () => {
    resetForm();
    setIsOpen(false);
  };

  const onSubmit = async (e: React.FormEvent) => {
    await handleSubmit(e);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <PlanificationTriggerButton isGameDetail={isGameDetail} />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] bg-gradient-to-br from-orange-50 via-white to-orange-100 border-orange-200">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
            {isGameDetail ? `Planifier une session pour ${kahoots[0].titre}` : "Créer une planification"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="pt-4">
          <PlanificationFormFields
            kahoots={kahoots}
            isGameDetail={isGameDetail}
            isLoading={isLoading}
            selectedGame={selectedGame}
            setSelectedGame={setSelectedGame}
            dateDebut={dateDebut}
            setDateDebut={setDateDebut}
            dateFin={dateFin}
            setDateFin={setDateFin}
            heureDebut={heureDebut}
            setHeureDebut={setHeureDebut}
            heureFin={heureFin}
            setHeureFin={setHeureFin}
            limiteParticipant={limiteParticipant}
            setLimiteParticipant={setLimiteParticipant}
          />
          <PlanificationFormActions
            isLoading={isLoading}
            onCancel={handleClose}
          />
        </form>
      </DialogContent>
    </Dialog>
  );
}
