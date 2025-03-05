
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Kahoot } from '@/types/game-details';
import { useState } from 'react';
import { TableHeader } from './kahoots/TableHeader';
import { TableRow } from './kahoots/TableRow';
import { DeleteButton } from './kahoots/DeleteButton';
import { DeleteDialog } from './kahoots/DeleteDialog';

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
    // Check if clicked on checkbox area
    if (e.target instanceof HTMLElement && 
       (e.target.closest('.checkbox-cell') || 
        e.target.closest('button') || 
        e.target.tagName === 'INPUT')) {
      return; // Don't navigate if clicking on checkbox, button or input
    }
    
    console.log(`Navigating to game details for game ID: ${kahoot._id}`);
    
    try {
      // Show loading toast
      const loadingToast = toast.loading("Chargement des détails du jeu...");
      
      // Fetch complete game details
      const response = await fetch(`http://kahoot.nos-apps.com/api/jeux/${kahoot._id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Erreur lors du chargement des détails du jeu');
      }
      
      const gameDetails = await response.json();
      
      // Dismiss loading toast
      toast.dismiss(loadingToast);
      
      // Navigate to details page with complete data
      navigate(`/game/${kahoot._id}`, { state: { jeu: gameDetails.data } });
    } catch (error) {
      console.error('Error loading game details:', error);
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

  return (
    <>
      <div className="flex flex-row items-center justify-between mb-4">
        {selectedKahoots.length > 0 && (
          <DeleteButton 
            count={selectedKahoots.length}
            onClick={() => setIsDeleteDialogOpen(true)}
            isDeleting={isDeleting}
          />
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
            <TableHeader 
              hasKahoots={kahoots.length > 0}
              areAllSelected={selectedKahoots.length === kahoots.length && kahoots.length > 0}
              onSelectAll={handleSelectAll}
            />
            <tbody>
              {kahoots.map((kahoot) => (
                <TableRow 
                  key={kahoot._id}
                  kahoot={kahoot}
                  isSelected={selectedKahoots.includes(kahoot._id)}
                  onSelect={handleSelectKahoot}
                  onClick={handleKahootClick}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}

      <DeleteDialog 
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        selectedIds={selectedKahoots}
        onSuccess={async () => {
          setSelectedKahoots([]);
          return onRefresh();
        }}
      />
    </>
  );
}
