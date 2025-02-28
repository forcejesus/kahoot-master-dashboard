
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScheduleFormProvider, useScheduleForm } from "./ScheduleFormContext";
import { ScheduleFormInputs } from "./ScheduleFormInputs";
import { ScheduleSubmitButton } from "./ScheduleSubmitButton";
import { ScheduleSuccess } from "./ScheduleSuccess";

function ScheduleFormContent() {
  const { token } = useAuth();
  const { formData, setIsSubmitting, setCreatedPin } = useScheduleForm();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.jeu) {
      toast.error("L'ID du jeu est manquant");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch("http://kahoot.nos-apps.com/api/planification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      
      const responseData: PlanificationResponse = await response.json();
      console.log("Réponse API Planification:", responseData);
      
      if (response.ok && responseData.success) {
        toast.success("Planification créée avec succès");
        setCreatedPin(responseData.data.pin);
      } else {
        toast.error(`Erreur: ${responseData.message || "Échec de la création de la planification"}`);
      }
    } catch (error) {
      console.error("Erreur lors de la création de la planification:", error);
      toast.error("Erreur lors de la création de la planification");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Planifier un jeu</CardTitle>
        <CardDescription>
          Définissez quand et comment votre jeu sera accessible aux participants
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <ScheduleFormInputs />
          <ScheduleSubmitButton />
        </form>
      </CardContent>
      
      <ScheduleSuccess gameId={formData.jeu} />
    </Card>
  );
}

interface ScheduleFormProps {
  gameId: string;
}

export function ScheduleForm({ gameId }: ScheduleFormProps) {
  return (
    <ScheduleFormProvider gameId={gameId}>
      <ScheduleFormContent />
    </ScheduleFormProvider>
  );
}
