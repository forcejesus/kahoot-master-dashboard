
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
      <div className="relative">
        {/* Effet de profondeur */}
        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-3xl transform rotate-1 scale-105"></div>
        <div className="absolute inset-0 bg-white/5 backdrop-blur-sm rounded-3xl transform -rotate-1 scale-102"></div>
        
        <Card className="relative backdrop-blur-xl bg-white/95 border-0 shadow-2xl shadow-orange-900/20 rounded-3xl">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 bg-clip-text text-transparent">
                Mes Jeux
              </CardTitle>
              <div className="flex items-center justify-center space-x-2 mt-2">
                <div className="h-1 w-8 bg-gradient-to-r from-transparent to-orange-500 rounded-full"></div>
                <div className="h-1 w-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full shadow-lg"></div>
                <div className="h-1 w-8 bg-gradient-to-r from-orange-500 to-transparent rounded-full"></div>
              </div>
            </div>
            {selectedKahoots.length > 0 && (
              <Button
                variant="destructive"
                onClick={() => setIsDeleteDialogOpen(true)}
                className="gap-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-lg"
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
          <CardContent className="p-8">
            <KahootTable
              kahoots={kahoots}
              selectedKahoots={selectedKahoots}
              onSelectKahoot={handleSelectKahoot}
              onSelectAll={handleSelectAll}
              onKahootClick={handleKahootClick}
              onDelete={onDelete}
              isLoading={isLoading}
            />
          </CardContent>
        </Card>
      </div>

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
