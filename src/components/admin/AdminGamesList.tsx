
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { 
  Edit, 
  Trash2, 
  Eye, 
  Users, 
  Calendar, 
  Clock,
  MoreHorizontal,
  Settings
} from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Kahoot } from '@/types/game-details';

interface AdminGamesListProps {
  searchTerm: string;
}

export function AdminGamesList({ searchTerm }: AdminGamesListProps) {
  const { token } = useAuth();
  const [games, setGames] = useState<Kahoot[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState('date');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    fetchGames();
  }, [token]);

  const fetchGames = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://kahoot.nos-apps.com/api/jeux', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      setGames(data.data || []);
    } catch (error) {
      console.error('Erreur lors du chargement des jeux:', error);
      toast.error('Erreur lors du chargement des jeux');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteGame = async (gameId: string) => {
    try {
      const response = await fetch(`http://kahoot.nos-apps.com/api/jeux/delete/${gameId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        toast.success('Jeu supprimé avec succès');
        fetchGames();
      } else {
        throw new Error('Erreur lors de la suppression');
      }
    } catch (error) {
      console.error('Erreur:', error);
      toast.error('Erreur lors de la suppression du jeu');
    }
  };

  const filteredGames = games.filter(game => {
    const matchesSearch = game.titre.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || 
      (statusFilter === 'active' && game.planifications && game.planifications.length > 0) ||
      (statusFilter === 'draft' && (!game.questions || game.questions.length === 0));
    
    return matchesSearch && matchesStatus;
  });

  const getGameStatus = (game: Kahoot) => {
    if (!game.questions || game.questions.length === 0) {
      return { label: 'Brouillon', color: 'bg-gray-100 text-gray-600' };
    }
    if (game.planifications && game.planifications.some(p => new Date(p.date_fin) > new Date())) {
      return { label: 'Actif', color: 'bg-green-100 text-green-700' };
    }
    return { label: 'Prêt', color: 'bg-blue-100 text-blue-700' };
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Chargement des jeux...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <CardTitle>Gestion des Jeux ({filteredGames.length})</CardTitle>
          
          <div className="flex gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous</SelectItem>
                <SelectItem value="active">Actifs</SelectItem>
                <SelectItem value="draft">Brouillons</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Trier par" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Date</SelectItem>
                <SelectItem value="title">Titre</SelectItem>
                <SelectItem value="participants">Participants</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        {filteredGames.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Aucun jeu trouvé</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredGames.map((game) => {
              const status = getGameStatus(game);
              const participantsCount = game.planifications?.reduce((total, p) => 
                total + (p.participants?.length || 0), 0) || 0;
              
              return (
                <div 
                  key={game._id} 
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4 flex-1">
                    {game.image && (
                      <img 
                        src={`http://kahoot.nos-apps.com/${game.image}`}
                        alt={game.titre}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                    )}
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-gray-900 truncate">
                          {game.titre}
                        </h3>
                        <Badge className={status.color}>
                          {status.label}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {game.questions?.length || 0} questions
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {participantsCount} participants
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {game.planifications?.length || 0} sessions
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem className="gap-2">
                        <Eye className="w-4 h-4" />
                        Voir les détails
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2">
                        <Edit className="w-4 h-4" />
                        Modifier
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2">
                        <Settings className="w-4 h-4" />
                        Paramètres
                      </DropdownMenuItem>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <DropdownMenuItem 
                            className="gap-2 text-red-600 focus:text-red-600"
                            onSelect={(e) => e.preventDefault()}
                          >
                            <Trash2 className="w-4 h-4" />
                            Supprimer
                          </DropdownMenuItem>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
                            <AlertDialogDescription>
                              Êtes-vous sûr de vouloir supprimer le jeu "{game.titre}" ? Cette action est irréversible.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Annuler</AlertDialogCancel>
                            <AlertDialogAction 
                              onClick={() => handleDeleteGame(game._id)}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              Supprimer
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
