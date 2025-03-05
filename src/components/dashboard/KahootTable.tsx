
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2, Trash2, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';
import { Kahoot } from '@/types/game-details';
import { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface KahootTableProps {
  kahoots: Kahoot[];
  isLoading: boolean;
  onRefresh: () => Promise<void>;
}

export function KahootTable({ kahoots, isLoading, onRefresh }: KahootTableProps) {
  const { token } = useAuth();
  const navigate = useNavigate();
  
  const [selectedKahoots, setSelectedKahoots] = useState<string[]>([]);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleKahootClick = async (kahoot: Kahoot, e: React.MouseEvent) => {
    if (e.target instanceof HTMLElement && e.target.closest('.checkbox-cell')) {
      return; // Ne pas naviguer si on clique sur la case à cocher
    }
    
    try {
      // Afficher un toast de chargement
      const loadingToast = toast.loading("Chargement des détails du jeu...");
      
      // Récupérer les détails complets du jeu
      const response = await fetch(`http://kahoot.nos-apps.com/api/jeux/${kahoot._id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Erreur lors du chargement des détails du jeu');
      }
      
      const gameDetails = await response.json();
      
      // Fermer le toast de chargement
      toast.dismiss(loadingToast);
      
      // Naviguer vers la page de détails avec les données complètes
      navigate(`/game/${kahoot._id}`, { state: { jeu: gameDetails.data } });
    } catch (error) {
      toast.error("Erreur lors du chargement des détails du jeu");
    }
  };

  const handleSelectKahoot = (kahootId: string) => {
    setSelectedKahoots(prev => 
      prev.includes(kahootId) 
        ? prev.filter(id => id !== kahootId)
        : [...prev, kahootId]
    );
  };

  const handleSelectAll = () => {
    if (selectedKahoots.length === kahoots.length) {
      setSelectedKahoots([]);
    } else {
      setSelectedKahoots(kahoots.map(k => k._id));
    }
  };

  const handleDeleteSelected = async () => {
    setIsDeleting(true);
    try {
      for (const id of selectedKahoots) {
        await fetch(`http://kahoot.nos-apps.com/api/jeux/delete/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      }
      toast.success(`${selectedKahoots.length} kahoot(s) supprimé(s)`);
      setSelectedKahoots([]);
      onRefresh();
    } catch (error) {
      toast.error("Erreur lors de la suppression");
    } finally {
      setIsDeleting(false);
      setIsDeleteDialogOpen(false);
    }
  };

  return (
    <>
      <div className="flex flex-row items-center justify-between mb-4">
        {selectedKahoots.length > 0 && (
          <Button
            variant="destructive"
            onClick={() => setIsDeleteDialogOpen(true)}
            className="gap-2"
            disabled={isDeleting}
          >
            {isDeleting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Suppression...
              </>
            ) : (
              <>
                <Trash2 className="h-4 w-4" />
                Supprimer ({selectedKahoots.length})
              </>
            )}
          </Button>
        )}
      </div>

      {isLoading ? (
        <div className="text-center py-12 text-gray-500">Chargement...</div>
      ) : kahoots.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          Aucun kahoot créé pour le moment
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="py-4 px-6 text-left">
                  <Checkbox 
                    checked={selectedKahoots.length === kahoots.length && kahoots.length > 0}
                    onCheckedChange={handleSelectAll}
                  />
                </th>
                <th className="text-left py-4 px-6 text-primary font-bold">Titre</th>
                <th className="text-center py-4 px-6 text-primary font-bold">Questions</th>
                <th className="text-center py-4 px-6 text-primary font-bold">Sessions</th>
                <th className="text-center py-4 px-6 text-primary font-bold">Participants</th>
              </tr>
            </thead>
            <tbody>
              {kahoots.map((kahoot) => (
                <tr 
                  key={kahoot._id} 
                  className="border-b last:border-0 hover:bg-gray-50/50 transition-colors cursor-pointer"
                  onClick={(e) => handleKahootClick(kahoot, e)}
                >
                  <td className="py-4 px-6 checkbox-cell">
                    <Checkbox 
                      checked={selectedKahoots.includes(kahoot._id)}
                      onCheckedChange={() => handleSelectKahoot(kahoot._id)}
                    />
                  </td>
                  <td className="py-4 px-6">
                    <div className="font-medium text-left flex items-center text-primary">
                      {kahoot.titre}
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </div>
                  </td>
                  <td className="py-4 px-6 text-center">
                    {kahoot.questions?.length || 0}
                  </td>
                  <td className="py-4 px-6 text-center">
                    {kahoot.planifications?.length || 0}
                  </td>
                  <td className="py-4 px-6 text-center">
                    {kahoot.planifications?.reduce((total, p) => total + (p.participants?.length || 0), 0) || 0}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action va supprimer {selectedKahoots.length} kahoot{selectedKahoots.length > 1 ? 's' : ''} de manière permanente.
              Cette action est irréversible.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Annuler</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteSelected}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              disabled={isDeleting}
            >
              {isDeleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Suppression...
                </>
              ) : (
                "Supprimer"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
