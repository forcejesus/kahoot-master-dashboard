
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, Loader2, Search, Filter, Gamepad2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const filteredKahoots = useMemo(() => {
    let filtered = kahoots.filter(kahoot =>
      kahoot.titre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    switch (filterType) {
      case 'with-planifications':
        filtered = filtered.filter(kahoot => 
          kahoot.planifications && kahoot.planifications.length > 0
        );
        break;
      case 'without-planifications':
        filtered = filtered.filter(kahoot => 
          !kahoot.planifications || kahoot.planifications.length === 0
        );
        break;
      case 'configured':
        filtered = filtered.filter(kahoot => 
          kahoot.questions && kahoot.questions.length > 0
        );
        break;
      case 'not-configured':
        filtered = filtered.filter(kahoot => 
          !kahoot.questions || kahoot.questions.length === 0
        );
        break;
      default:
        break;
    }

    // Sort by planifications (games with planifications first)
    return filtered.sort((a, b) => {
      const aPlanifications = a.planifications?.length || 0;
      const bPlanifications = b.planifications?.length || 0;
      return bPlanifications - aPlanifications;
    });
  }, [kahoots, searchTerm, filterType]);

  const handleKahootClick = (kahoot: Kahoot, e: React.MouseEvent) => {
    if (e.target instanceof HTMLElement && e.target.closest('.checkbox-cell')) {
      return;
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
    if (selectedKahoots.length === filteredKahoots.length) {
      setSelectedKahoots([]);
    } else {
      setSelectedKahoots(filteredKahoots.map(k => k._id));
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
          <CardHeader className="flex flex-row items-center justify-between p-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Gamepad2 className="h-6 w-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-3xl font-black bg-gradient-to-r from-orange-600 via-orange-700 to-orange-800 bg-clip-text text-transparent">
                    Mes Jeux
                  </CardTitle>
                  <p className="text-orange-600/70 font-medium">
                    Gérez et organisez vos créations éducatives
                  </p>
                </div>
              </div>
              
              {/* Ligne décorative */}
              <div className="flex items-center space-x-2">
                <div className="h-1 w-8 bg-gradient-to-r from-transparent to-orange-500 rounded-full"></div>
                <div className="h-1 w-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full shadow-lg"></div>
                <div className="h-1 w-8 bg-gradient-to-r from-orange-500 to-transparent rounded-full"></div>
              </div>
            </div>
            
            {selectedKahoots.length > 0 && (
              <Button
                variant="destructive"
                onClick={() => setIsDeleteDialogOpen(true)}
                className="gap-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-lg rounded-xl h-12 px-6"
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
          
          <CardContent className="p-8 pt-0">
            {/* Search and Filter Section */}
            <div className="mb-8 space-y-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    placeholder="Rechercher un jeu par nom..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 h-14 bg-white/80 border-2 border-orange-200 focus:border-orange-400 focus:ring-orange-200 rounded-xl text-lg"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <Filter className="h-5 w-5 text-gray-500" />
                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger className="w-56 h-14 bg-white/80 border-2 border-orange-200 rounded-xl text-lg">
                      <SelectValue placeholder="Filtrer par..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les jeux</SelectItem>
                      <SelectItem value="with-planifications">Avec planifications</SelectItem>
                      <SelectItem value="without-planifications">Sans planifications</SelectItem>
                      <SelectItem value="configured">Configurés</SelectItem>
                      <SelectItem value="not-configured">Non configurés</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              {searchTerm && (
                <div className="flex items-center space-x-2 p-3 bg-orange-50 rounded-xl border border-orange-200">
                  <Search className="h-4 w-4 text-orange-600" />
                  <span className="text-sm text-orange-700 font-medium">
                    {filteredKahoots.length} résultat(s) pour "{searchTerm}"
                  </span>
                </div>
              )}
            </div>

            <KahootTable
              kahoots={filteredKahoots}
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
