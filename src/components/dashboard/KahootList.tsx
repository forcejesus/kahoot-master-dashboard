
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, Loader2, Search, BarChart3 } from 'lucide-react';
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

  const filteredKahoots = kahoots.filter(kahoot =>
    kahoot.titre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Card className="bg-white border border-gray-200 shadow-sm">
        <CardHeader className="bg-gray-50 border-b border-gray-200 p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <CardTitle className="text-xl font-semibold text-gray-900">
                  {t('dashboard.myKahoots')}
                </CardTitle>
                <p className="text-gray-600 text-sm">
                  Gérez vos jeux interactifs
                </p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder={t('dashboard.searchKahoots')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-200"
                />
              </div>
              
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-200">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{kahoots.length}</div>
              <div className="text-gray-600 text-sm">Jeux créés</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">
                {kahoots.reduce((total, k) => total + (k.planifications?.length || 0), 0)}
              </div>
              <div className="text-gray-600 text-sm">Sessions totales</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">
                {kahoots.reduce((total, k) => 
                  total + (k.planifications?.reduce((sum, p) => sum + (p.participants?.length || 0), 0) || 0), 0
                )}
              </div>
              <div className="text-gray-600 text-sm">Participants</div>
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
