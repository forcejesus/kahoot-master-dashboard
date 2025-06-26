
import { Button } from "@/components/ui/button";
import { Calendar, Clock } from "lucide-react";

interface PlanificationTriggerButtonProps {
  isGameDetail: boolean;
}

export function PlanificationTriggerButton({ isGameDetail }: PlanificationTriggerButtonProps) {
  if (isGameDetail) {
    return (
      <Button
        variant="outline"
        className="bg-white/10 hover:bg-white hover:text-primary transition-all duration-200 text-white border-white/20"
      >
        <Clock className="mr-2 h-4 w-4" />
        Planifier une session
      </Button>
    );
  }

  return (
    <Button 
      size="lg"
      className="w-full h-20 bg-gradient-to-r from-violet-500 to-violet-600 hover:from-violet-600 hover:to-violet-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
    >
      <Calendar className="mr-2 h-6 w-6" />
      Créer une planification
    </Button>
  );
}
