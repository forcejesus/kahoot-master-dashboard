
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, Eye, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Kahoot } from '@/types/game-details';

interface KahootRowActionsProps {
  kahoot: Kahoot;
  onDelete: (kahootId: string) => void;
}

export function KahootRowActions({ kahoot, onDelete }: KahootRowActionsProps) {
  const navigate = useNavigate();

  const handleConfigure = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate('/game/setup', {
      state: {
        gameId: kahoot._id,
        gameTitle: kahoot.titre,
        gameImage: kahoot.image
      }
    });
  };

  const handleViewDetails = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/game/${kahoot._id}`, { state: { jeu: kahoot } });
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(kahoot._id);
  };

  const hasQuestions = kahoot.questions && kahoot.questions.length > 0;

  return (
    <div className="flex items-center space-x-2">
      {!hasQuestions && (
        <Button
          variant="outline"
          size="sm"
          onClick={handleConfigure}
          className="h-8 px-3 text-xs bg-orange-50 border-orange-200 text-orange-600 hover:bg-orange-100 hover:border-orange-300"
        >
          <Settings className="h-3 w-3 mr-1" />
          Configurer
        </Button>
      )}
      
      <Button
        variant="outline"
        size="sm"
        onClick={handleViewDetails}
        className="h-8 px-3 text-xs bg-blue-50 border-blue-200 text-blue-600 hover:bg-blue-100 hover:border-blue-300"
      >
        <Eye className="h-3 w-3 mr-1" />
        Détails
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        onClick={handleDelete}
        className="h-8 px-3 text-xs bg-red-50 border-red-200 text-red-600 hover:bg-red-100 hover:border-red-300"
      >
        <Trash2 className="h-3 w-3 mr-1" />
        Supprimer
      </Button>
    </div>
  );
}
