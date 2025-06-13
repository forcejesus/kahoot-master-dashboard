
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ScheduleFormProvider, useScheduleForm } from "./ScheduleFormContext";
import { ScheduleFormInputs } from "./ScheduleFormInputs";
import { ScheduleSubmitButton } from "./ScheduleSubmitButton";
import { ScheduleSuccess } from "./ScheduleSuccess";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Kahoot, PlanificationResponse } from "@/types/game-details";

interface ScheduleDialogProps {
  gameId: string;
  jeu: Kahoot;
  onSuccess: () => void;
}

function ScheduleDialogContent({ gameId, onSuccess }: { gameId: string, onSuccess: () => void }) {
  const { token } = useAuth();
  const { formData, setCreatedPin, isSubmitting, setIsSubmitting } = useScheduleForm();
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Updated API endpoint
      const response = await fetch("http://kahoot.nos-apps.com/api/planification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data: PlanificationResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erreur lors de la création de la planification");
      }

      // Stocker le PIN généré
      setCreatedPin(data.data.pin);
      toast.success("Planification créée avec succès !");
      onSuccess();
    } catch (error) {
      toast.error("Erreur lors de la création de la planification");
      console.error("Erreur:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <>
      <Card className="border-none shadow-none">
        <CardContent className="p-0 space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <ScheduleFormInputs />
            <ScheduleSubmitButton />
          </form>
          <ScheduleSuccess gameId={gameId} onClose={onSuccess} />
        </CardContent>
      </Card>
    </>
  );
}

export function ScheduleDialog({ gameId, jeu, onSuccess }: ScheduleDialogProps) {
  const [open, setOpen] = useState(false);
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="default"
          className="bg-blue-600 hover:bg-blue-700 text-white border-none font-semibold px-6 py-2 shadow-lg hover:shadow-xl transition-all duration-200 w-full sm:w-auto"
        >
          <Clock className="mr-2 h-4 w-4" />
          Planifier une session
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Planifier une session pour {jeu.titre}</DialogTitle>
          <DialogDescription>
            Configurez les détails de la session pour permettre aux apprenants de participer.
          </DialogDescription>
        </DialogHeader>
        
        <ScheduleFormProvider gameId={gameId}>
          <ScheduleDialogContent gameId={gameId} onSuccess={onSuccess} />
        </ScheduleFormProvider>
      </DialogContent>
    </Dialog>
  );
}
