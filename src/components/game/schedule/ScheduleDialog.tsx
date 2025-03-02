
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ScheduleFormProvider } from "./ScheduleFormContext";
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

export function ScheduleDialog({ gameId, jeu, onSuccess }: ScheduleDialogProps) {
  const [open, setOpen] = useState(false);
  const { token } = useAuth();
  
  const handleSubmit = async (formData: any) => {
    try {
      const response = await fetch("http://kahoot.nos-apps.com/api/planifications/create", {
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

      return data;
    } catch (error) {
      console.error("Erreur:", error);
      throw error;
    }
  };
  
  const handleClose = () => {
    // Lorsque l'utilisateur ferme le dialogue après avoir créé une planification,
    // nous rafraîchissons les données du jeu
    onSuccess();
    setOpen(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="bg-white/10 hover:bg-white hover:text-primary transition-all duration-200 text-white border-white/20"
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
          <Card className="border-none shadow-none">
            <CardContent className="p-0 space-y-4">
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  const form = e.currentTarget;
                  const formElements = form.elements as HTMLFormControlsCollection;
                  
                  // Récupérer les données du contexte via l'attribut data
                  const contextData = (form as any).dataset.formData;
                  const formData = contextData ? JSON.parse(contextData) : {};
                  
                  try {
                    const { data } = await handleSubmit(formData);
                    toast.success("Planification créée avec succès !");
                    // Après création réussie, l'interface de succès s'affichera
                    // grâce au PIN stocké dans le contexte
                  } catch (error) {
                    toast.error("Erreur lors de la création de la planification");
                  }
                }}
                className="space-y-4"
              >
                <ScheduleFormInputs />
                <ScheduleSubmitButton />
              </form>
              <ScheduleSuccess gameId={gameId} onClose={handleClose} />
            </CardContent>
          </Card>
        </ScheduleFormProvider>
      </DialogContent>
    </Dialog>
  );
}
