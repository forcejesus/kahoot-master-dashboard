
import { useNavigate } from 'react-router-dom';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from '@/components/ui/button';
import { ArrowLeft, Clock, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { Kahoot } from '@/types/game-details';

interface GameHeaderProps {
  jeu: Kahoot;
  token: string | null;
  onDelete: () => void;
}

export function GameHeader({ jeu, token, onDelete }: GameHeaderProps) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-bold text-white">
          {jeu.titre}
        </h1>
      </div>
      <div className="flex space-x-4">
        <Button 
          variant="outline"
          className="bg-white/10 hover:bg-white hover:text-primary transition-all duration-200 text-white border-white/20"
          onClick={() => navigate(`/game/${jeu._id}/schedule`, { state: { jeu } })}
        >
          <Clock className="mr-2 h-4 w-4" />
          Planifier une session
        </Button>
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
