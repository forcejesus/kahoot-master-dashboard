
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ExternalLink, Trash2, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
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

interface Kahoot {
  _id: string;
  titre: string;
  questions?: {
    libelle: string;
    reponses: string[];
    reponse_correcte: string;
  }[];
  planifications?: {
    _id: string;
    pin: string;
    participants: {
      apprenant: string;
      score: number;
    }[];
  }[];
}

interface KahootListProps {
  kahoots: Kahoot[];
  isLoading: boolean;
  onDelete: (kahootIds: string[]) => Promise<void>;
}

export function KahootList({ kahoots, isLoading, onDelete }: KahootListProps) {
  const navigate = useNavigate();
  const [selectedKahoots, setSelectedKahoots] = useState<string[]>([]);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleKahootClick = (kahoot: Kahoot, e: React.MouseEvent) => {
    if (e.target instanceof HTMLElement && e.target.closest('.checkbox-cell')) {
      return; // Don't navigate if clicking on the checkbox
    }
    navigate(`/game/${kahoot._id}`, { state: { jeu: kahoot } });
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
      await onDelete(selectedKahoots);
      setSelectedKahoots([]);
    } catch (error) {
      console.error("Error deleting kahoots:", error);
    } finally {
      setIsDeleting(false);
      setIsDeleteDialogOpen(false);
    }
  };

  return (
    <>
      <Card className="backdrop-blur-sm bg-white/80 border-t border-white/50 shadow-2xl">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Mes Kahoots
          </CardTitle>
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
        </CardHeader>
        <CardContent>
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
        </CardContent>
      </Card>

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
