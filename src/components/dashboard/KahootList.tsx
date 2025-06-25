
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Kahoot } from '@/types/game-details';
import { KahootTable } from './KahootTable';
import { DeleteConfirmDialog } from './DeleteConfirmDialog';

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
          <KahootTable
            kahoots={kahoots}
            selectedKahoots={selectedKahoots}
            onSelectKahoot={handleSelectKahoot}
            onSelectAll={handleSelectAll}
            onKahootClick={handleKahootClick}
            isLoading={isLoading}
          />
        </CardContent>
      </Card>

      <DeleteConfirmDialog
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirmDelete={handleDeleteSelected}
        selectedCount={selectedKahoots.length}
        isDeleting={isDeleting}
      />
    </>
  );
}
