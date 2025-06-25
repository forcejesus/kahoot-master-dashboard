import React from 'react';
import { useTranslation } from '@/contexts/I18nContext';
import { useNavigate } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
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

  if (isLoading) {
    return <div className="text-center py-12 text-gray-500">{t('dashboard.loading')}</div>;
  }
  
  if (kahoots.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        {t('dashboard.noKahoots')}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="py-4 px-6 text-left">
              <Checkbox 
                checked={selectedKahoots.length === kahoots.length && kahoots.length > 0}
                onCheckedChange={onSelectAll}
              />
            </th>
            <th className="text-left py-4 px-6 text-primary font-bold">{t('table.title')}</th>
            <th className="text-center py-4 px-6 text-primary font-bold">{t('table.questions')}</th>
            <th className="text-center py-4 px-6 text-primary font-bold">{t('table.sessions')}</th>
            <th className="text-center py-4 px-6 text-primary font-bold">{t('table.participants')}</th>
          </tr>
        </thead>
        <tbody>
          {kahoots.map((kahoot) => (
            <tr 
              key={kahoot._id} 
              className="border-b last:border-0 hover:bg-gray-50/50 transition-colors cursor-pointer"
              onClick={(e) => onKahootClick(kahoot, e)}
            >
              <td className="py-4 px-6 checkbox-cell">
                <Checkbox 
                  checked={selectedKahoots.includes(kahoot._id)}
                  onCheckedChange={() => onSelectKahoot(kahoot._id)}
                />
              </td>
              <td className="py-4 px-6">
                <div className="font-medium text-left flex items-center text-primary">
                  {kahoot.titre}
                  <ExternalLink className="ml-2 h-4 w-4" />
                </div>
              </td>
              <td className="py-4 px-6 text-center">
                {kahoot.questions?.length || 0}
              </td>
              <td className="py-4 px-6 text-center">
                {kahoot.planifications?.length || 0}
              </td>
              <td className="py-4 px-6 text-center">
                {kahoot.planifications?.reduce((total, p) => total + (p.participants?.length || 0), 0) || 0}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
