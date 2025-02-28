
import { useAuth } from "@/contexts/AuthContext";
import { Kahoot, PlanificationResponse } from "@/types/game-details";
import { toast } from "sonner";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, CalendarClock, Copy, X } from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogClose,
  DialogTrigger
} from "@/components/ui/dialog";
import { ScheduleFormProvider } from "./ScheduleFormContext";
import { ScheduleFormInputs } from "./ScheduleFormInputs";
import { ScheduleSubmitButton } from "./ScheduleSubmitButton";
import { ScheduleSuccess } from "./ScheduleSuccess";
import { useState } from "react";

interface ScheduleDialogProps {
  gameId: string;
  gameTitle: string;
}

export function ScheduleDialog({ gameId, gameTitle }: ScheduleDialogProps) {
  const [open, setOpen] = useState(false);
  
  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="default" className="gap-2">
          <Calendar className="h-4 w-4" />
          Planifier une session
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Planifier une session</DialogTitle>
          <p className="text-sm text-muted-foreground">
            Vous planifiez une session pour: <span className="font-semibold">{gameTitle}</span>
          </p>
        </DialogHeader>
        
        <ScheduleFormProvider gameId={gameId}>
          <form className="space-y-4 py-4">
            <ScheduleFormInputs />
            <ScheduleSubmitButton />
          </form>
          <ScheduleSuccess gameId={gameId} onSuccess={() => setOpen(false)} />
        </ScheduleFormProvider>
        
        <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
