
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, Loader2, Search, Filter, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Kahoot } from '@/types/game-details';
import { KahootTable } from './KahootTable';
import { DeleteConfirmDialog } from './DeleteConfirmDialog';
import { useTranslation } from '@/contexts/I18nContext';

interface KahootListProps {
  kahoots: Kahoot[];
  isLoading: boolean;
  onDelete: (kahootIds: string[]) => Promise<void>;
}

export function KahootList({ kahoots, isLoading, onDelete }: KahootListProps) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [selectedKahoots, setSelectedKahoots] = useState<string[]>([]);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

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

  const filteredKahoots = kahoots.filter(kahoot =>
    kahoot.titre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Card className="backdrop-blur-sm bg-white/95 border border-gray-200/50 shadow-2xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 text-white border-b-0 p-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <BarChart3 className="w-6 h-6" />
              </div>
              <div>
                <CardTitle className="text-3xl font-bold text-white mb-1">
                  {t('dashboard.myKahoots')}
                </CardTitle>
                <p className="text-blue-100 text-lg">
                  Gérez vos jeux interactifs et suivez leurs performances
                </p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1 min-w-0">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 h-4 w-4" />
                <Input
                  placeholder={t('dashboard.searchKahoots')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white/20 border-white/30 focus:border-white focus:ring-white/20 text-white placeholder:text-white/70 backdrop-blur-sm"
                />
              </div>
              
              {selectedKahoots.length > 0 && (
                <Button
                  variant="secondary"
                  onClick={() => setIsDeleteDialogOpen(true)}
                  className="gap-2 bg-red-500 hover:bg-red-600 text-white border-none shadow-lg hover:shadow-xl transition-all duration-200"
                  disabled={isDeleting}
                >
                  {isDeleting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      {t('dashboard.deleting')}
                    </>
                  ) : (
                    <>
                      <Trash2 className="h-4 w-4" />
                      {t('dashboard.delete')} ({selectedKahoots.length})
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>

          {/* Statistiques rapides */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-6 border-t border-white/20">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{kahoots.length}</div>
              <div className="text-blue-100 text-sm">Jeux créés</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">
                {kahoots.reduce((total, k) => total + (k.planifications?.length || 0), 0)}
              </div>
              <div className="text-blue-100 text-sm">Sessions totales</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">
                {kahoots.reduce((total, k) => 
                  total + (k.planifications?.reduce((sum, p) => sum + (p.participants?.length || 0), 0) || 0), 0
                )}
              </div>
              <div className="text-blue-100 text-sm">Participants</div>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-0">
          <KahootTable
            kahoots={filteredKahoots}
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
