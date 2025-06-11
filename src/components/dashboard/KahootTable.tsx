
import React from 'react';
import { useTranslation } from '@/contexts/I18nContext';
import { useApiTranslation } from '@/hooks/useApiTranslation';
import { ExternalLink, Star, Users, Clock, Trophy } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { EnhancedTable, EnhancedTableHeader, EnhancedTableRow, EnhancedTableCell } from '@/components/ui/enhanced-table';
import { TableHead, TableBody } from '@/components/ui/table';
import { Kahoot } from '@/types/game-details';

interface KahootTableProps {
  kahoots: Kahoot[];
  selectedKahoots: string[];
  onSelectKahoot: (kahootId: string) => void;
  onSelectAll: () => void;
  onKahootClick: (kahoot: Kahoot, e: React.MouseEvent) => void;
  isLoading: boolean;
}

export function KahootTable({ 
  kahoots, 
  selectedKahoots, 
  onSelectKahoot, 
  onSelectAll, 
  onKahootClick,
  isLoading 
}: KahootTableProps) {
  const { t } = useTranslation();
  const { translateField } = useApiTranslation();

  if (isLoading) {
    return (
      <div className="text-center py-16">
        <div className="inline-flex items-center gap-3 text-gray-500">
          <div className="w-6 h-6 border-2 border-purple-300 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-lg font-medium">{t('dashboard.loading')}</span>
        </div>
      </div>
    );
  }
  
  if (kahoots.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Star className="w-8 h-8 text-purple-500" />
        </div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">Aucun jeu créé</h3>
        <p className="text-gray-500 max-w-md mx-auto">
          Commencez par créer votre premier jeu interactif pour engager vos apprenants
        </p>
      </div>
    );
  }

  return (
    <EnhancedTable priority="high" className="w-full">
      <EnhancedTableHeader priority="high">
        <EnhancedTableRow priority="high">
          <TableHead className="w-12">
            <Checkbox 
              checked={selectedKahoots.length === kahoots.length && kahoots.length > 0}
              onCheckedChange={onSelectAll}
              className="border-white/30 data-[state=checked]:bg-white data-[state=checked]:text-purple-600"
            />
          </TableHead>
          <TableHead className="min-w-[300px]">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4" />
              {t('table.title')}
            </div>
          </TableHead>
          <TableHead className="text-center w-24">
            <div className="flex items-center justify-center gap-2">
              <Trophy className="w-4 h-4" />
              {t('table.questions')}
            </div>
          </TableHead>
          <TableHead className="text-center w-24">
            <div className="flex items-center justify-center gap-2">
              <Clock className="w-4 h-4" />
              {t('table.sessions')}
            </div>
          </TableHead>
          <TableHead className="text-center w-32">
            <div className="flex items-center justify-center gap-2">
              <Users className="w-4 h-4" />
              {t('table.participants')}
            </div>
          </TableHead>
          <TableHead className="text-center w-20">Statut</TableHead>
        </EnhancedTableRow>
      </EnhancedTableHeader>
      <TableBody>
        {kahoots.map((kahoot) => {
          const questionsCount = kahoot.questions?.length || 0;
          const sessionsCount = kahoot.planifications?.length || 0;
          const participantsCount = kahoot.planifications?.reduce((total, p) => total + (p.participants?.length || 0), 0) || 0;
          const isPopular = participantsCount > 10;
          
          return (
            <EnhancedTableRow 
              key={kahoot._id} 
              priority="high"
              isSelected={selectedKahoots.includes(kahoot._id)}
              className="cursor-pointer group"
              onClick={(e) => onKahootClick(kahoot, e)}
            >
              <EnhancedTableCell priority="high" className="checkbox-cell">
                <Checkbox 
                  checked={selectedKahoots.includes(kahoot._id)}
                  onCheckedChange={() => onSelectKahoot(kahoot._id)}
                  className="border-gray-300"
                />
              </EnhancedTableCell>
              
              <EnhancedTableCell priority="high" highlight>
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-gray-900 group-hover:text-purple-700 transition-colors">
                        {translateField(kahoot, 'titre') || kahoot.titre}
                      </span>
                      {isPopular && (
                        <Badge variant="secondary" className="bg-purple-100 text-purple-700 text-xs">
                          Populaire
                        </Badge>
                      )}
                      <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-purple-500 transition-colors" />
                    </div>
                    {kahoot.image && (
                      <div className="text-xs text-gray-500 flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        Avec image
                      </div>
                    )}
                  </div>
                </div>
              </EnhancedTableCell>
              
              <EnhancedTableCell priority="high" className="text-center">
                <div className="flex flex-col items-center">
                  <span className={`text-lg font-bold ${questionsCount > 0 ? 'text-purple-600' : 'text-gray-400'}`}>
                    {questionsCount}
                  </span>
                  {questionsCount > 5 && (
                    <Badge variant="outline" className="text-xs mt-1">
                      Complet
                    </Badge>
                  )}
                </div>
              </EnhancedTableCell>
              
              <EnhancedTableCell priority="high" className="text-center">
                <div className="flex flex-col items-center">
                  <span className={`text-lg font-bold ${sessionsCount > 0 ? 'text-blue-600' : 'text-gray-400'}`}>
                    {sessionsCount}
                  </span>
                  {sessionsCount > 0 && (
                    <div className="flex items-center gap-1 mt-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-xs text-green-600">Actif</span>
                    </div>
                  )}
                </div>
              </EnhancedTableCell>
              
              <EnhancedTableCell priority="high" className="text-center">
                <div className="flex flex-col items-center">
                  <span className={`text-lg font-bold ${participantsCount > 0 ? 'text-green-600' : 'text-gray-400'}`}>
                    {participantsCount}
                  </span>
                  {participantsCount > 0 && (
                    <div className="text-xs text-gray-500 mt-1">
                      participants
                    </div>
                  )}
                </div>
              </EnhancedTableCell>
              
              <EnhancedTableCell priority="high" className="text-center">
                <Badge 
                  variant={questionsCount > 0 ? "default" : "secondary"}
                  className={`${questionsCount > 0 ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}
                >
                  {questionsCount > 0 ? 'Prêt' : 'Brouillon'}
                </Badge>
              </EnhancedTableCell>
            </EnhancedTableRow>
          );
        })}
      </TableBody>
    </EnhancedTable>
  );
}
