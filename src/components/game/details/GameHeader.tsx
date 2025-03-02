
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { Kahoot } from '@/types/game-details';
import { ScheduleDialog } from '../schedule/ScheduleDialog';

interface GameHeaderProps {
  jeu: Kahoot;
  token: string | null;
  onDelete: () => void;
  onRefresh: () => void;
}

export function GameHeader({ jeu, token, onDelete, onRefresh }: GameHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-bold text-white">
          {jeu.titre}
        </h1>
      </div>
      <div className="flex space-x-4">
        <ScheduleDialog 
          gameId={jeu._id} 
          jeu={jeu} 
          onSuccess={onRefresh} 
        />
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button 
              variant="outline"
              className="bg-white/10 hover:bg-destructive hover:text-destructive-foreground transition-all duration-200 text-white border-white/20"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Supprimer
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
              <AlertDialogDescription>
                Cette action est irréversible. Cela supprimera définitivement le jeu
                et toutes ses données associées.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Annuler</AlertDialogCancel>
              <AlertDialogAction 
                onClick={onDelete}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Supprimer
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
