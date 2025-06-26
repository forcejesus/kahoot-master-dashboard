
import React, { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Kahoot } from '@/types/game-details';
import { KahootRowActions } from './KahootRowActions';
import { DeleteConfirmDialog } from './DeleteConfirmDialog';

interface KahootTableProps {
  kahoots: Kahoot[];
  selectedKahoots: string[];
  onSelectKahoot: (kahootId: string) => void;
  onSelectAll: () => void;
  onKahootClick: (kahoot: Kahoot, e: React.MouseEvent) => void;
  onDelete: (kahootIds: string[]) => Promise<void>;
  isLoading: boolean;
}

export function KahootTable({ 
  kahoots, 
  selectedKahoots, 
  onSelectKahoot, 
  onSelectAll, 
  onKahootClick,
  onDelete,
  isLoading 
}: KahootTableProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [kahootToDelete, setKahootToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleSingleDelete = (kahootId: string) => {
    setKahootToDelete(kahootId);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!kahootToDelete) return;
    
    setIsDeleting(true);
    try {
      await onDelete([kahootToDelete]);
    } finally {
      setIsDeleting(false);
      setIsDeleteDialogOpen(false);
      setKahootToDelete(null);
    }
  };

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-orange-500 bg-orange-100 transition ease-in-out duration-150">
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-orange-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Chargement des jeux...
        </div>
      </div>
    );
  }
  
  if (kahoots.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-8 border border-orange-200">
          <div className="text-orange-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Aucun jeu créé</h3>
          <p className="text-gray-500">Commencez par créer votre premier jeu Kahoot</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-orange-50 to-orange-100 border-b border-orange-200">
              <tr>
                <th className="py-4 px-6 text-left w-12">
                  <Checkbox 
                    checked={selectedKahoots.length === kahoots.length && kahoots.length > 0}
                    onCheckedChange={onSelectAll}
                    className="border-orange-300 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                  />
                </th>
                <th className="text-left py-4 px-6 text-orange-800 font-bold text-sm uppercase tracking-wide">Titre</th>
                <th className="text-center py-4 px-6 text-orange-800 font-bold text-sm uppercase tracking-wide">Questions</th>
                <th className="text-center py-4 px-6 text-orange-800 font-bold text-sm uppercase tracking-wide">Sessions</th>
                <th className="text-center py-4 px-6 text-orange-800 font-bold text-sm uppercase tracking-wide">Participants</th>
                <th className="text-center py-4 px-6 text-orange-800 font-bold text-sm uppercase tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {kahoots.map((kahoot, index) => (
                <tr 
                  key={kahoot._id} 
                  className={`hover:bg-gradient-to-r hover:from-orange-50/50 hover:to-transparent transition-all duration-200 cursor-pointer group ${
                    selectedKahoots.includes(kahoot._id) ? 'bg-orange-50/30' : ''
                  } ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}`}
                  onClick={(e) => onKahootClick(kahoot, e)}
                >
                  <td className="py-4 px-6 checkbox-cell">
                    <Checkbox 
                      checked={selectedKahoots.includes(kahoot._id)}
                      onCheckedChange={() => onSelectKahoot(kahoot._id)}
                      className="border-orange-300 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                    />
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-3">
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors flex items-center">
                          {kahoot.titre}
                          <ExternalLink className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        {!kahoot.questions?.length && (
                          <div className="text-xs text-orange-600 bg-orange-100 px-2 py-1 rounded-full inline-block mt-1">
                            Configuration requise
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      (kahoot.questions?.length || 0) > 0 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {kahoot.questions?.length || 0}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {kahoot.planifications?.length || 0}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                      {kahoot.planifications?.reduce((total, p) => total + (p.participants?.length || 0), 0) || 0}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <KahootRowActions 
                      kahoot={kahoot} 
                      onDelete={handleSingleDelete}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <DeleteConfirmDialog
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirmDelete={handleConfirmDelete}
        selectedCount={1}
        isDeleting={isDeleting}
      />
    </>
  );
}
