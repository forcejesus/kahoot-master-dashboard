
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from '@/components/ui/button';
import { Trash2, Calendar, Sparkles } from 'lucide-react';
import { Kahoot } from '@/types/game-details';
import { CreatePlanificationModal } from '@/components/dashboard/CreatePlanificationModal';

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
        {/* Bouton Planifier avec le même style que le tableau de bord */}
        <div className="relative group cursor-pointer">
          {/* Effet de profondeur */}
          <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-violet-700 rounded-2xl transform rotate-1 scale-105 opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-violet-600 rounded-2xl transform -rotate-1 scale-102 opacity-30 group-hover:opacity-40 transition-opacity duration-300"></div>
          
          <div className="relative backdrop-blur-xl bg-gradient-to-br from-violet-50 via-white to-violet-100 border-2 border-violet-200/50 rounded-2xl px-6 py-3 shadow-xl shadow-violet-900/20 hover:shadow-2xl hover:shadow-violet-900/30 transition-all duration-300 transform hover:scale-[1.02]">
            <CreatePlanificationModal 
              kahoots={[jeu]} 
              onSuccess={onRefresh}
            />
          </div>
        </div>

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
