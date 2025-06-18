
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from '@/components/ui/button';
import { Trash2, Calendar, Users, HelpCircle } from 'lucide-react';
import { Kahoot } from '@/types/game-details';
import { ScheduleDialog } from '../schedule/ScheduleDialog';
import { EditGameDialog } from '../edit/EditGameDialog';
import { useTranslation } from '@/contexts/I18nContext';
import { Badge } from '@/components/ui/badge';

interface GameHeaderProps {
  jeu: Kahoot;
  token: string | null;
  onDelete: () => void;
  onRefresh: () => void;
}

export function GameHeader({ jeu, token, onDelete, onRefresh }: GameHeaderProps) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col space-y-6">
      {/* Titre et actions principales */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800 mb-2 break-words">
            {jeu.titre}
          </h1>
        </div>
        
        {/* Actions - responsive */}
        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          <EditGameDialog
            gameId={jeu._id}
            currentTitle={jeu.titre}
            currentImage={jeu.image}
            onSuccess={onRefresh}
          />
          <ScheduleDialog 
            gameId={jeu._id} 
            jeu={jeu} 
            onSuccess={onRefresh} 
          />
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button 
                variant="destructive"
                size="default"
                className="w-full sm:w-auto"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                {t('delete.delete')}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="max-w-md mx-4">
              <AlertDialogHeader>
                <AlertDialogTitle>{t('delete.confirm')}</AlertDialogTitle>
                <AlertDialogDescription>
                  {t('delete.confirmDescription')}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className="flex-col sm:flex-row gap-2">
                <AlertDialogCancel className="w-full sm:w-auto">
                  {t('delete.cancel')}
                </AlertDialogCancel>
                <AlertDialogAction 
                  onClick={onDelete}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90 w-full sm:w-auto"
                >
                  {t('delete.delete')}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      {/* Statistiques du jeu - responsive grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <HelpCircle className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-blue-900">{t('details.questions')}</p>
              <p className="text-2xl font-bold text-blue-700">{jeu.questions?.length || 0}</p>
            </div>
          </div>
        </div>

        <div className="bg-green-50 rounded-lg p-4 border border-green-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Calendar className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-green-900">{t('details.planifications')}</p>
              <p className="text-2xl font-bold text-green-700">{jeu.planifications?.length || 0}</p>
            </div>
          </div>
        </div>

        <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Users className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-purple-900">{t('details.sessions')}</p>
              <p className="text-2xl font-bold text-purple-700">
                {jeu.planifications?.filter(p => new Date(p.date_fin) > new Date()).length || 0}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Calendar className="h-5 w-5 text-orange-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-orange-900">Status</p>
              <Badge variant="outline" className="mt-1 text-orange-700 border-orange-300">
                {jeu.planifications?.some(p => new Date(p.date_fin) > new Date()) ? t('planification.inProgress') : t('planification.completed')}
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
