
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Gamepad2 } from 'lucide-react';
import { useTranslation } from '@/contexts/I18nContext';

export function CreateGameCard() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Card className="p-6 bg-gradient-to-br from-blue-600 to-blue-700 border-0 shadow-sm hover:shadow-md transition-all duration-200 text-white">
      <CardContent className="p-0 flex flex-col items-center justify-center text-center h-full min-h-[160px]">
        <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mb-4">
          <Gamepad2 className="w-5 h-5 text-white" />
        </div>
        
        <h3 className="text-lg font-semibold mb-2">
          Créer un Kahoot
        </h3>
        
        <p className="text-blue-100 text-sm mb-4 opacity-90">
          Nouveau quiz interactif
        </p>
        
        <Button 
          size="sm"
          className="bg-white hover:bg-gray-50 text-blue-600 hover:text-blue-700 font-medium px-4 py-2 rounded-lg shadow-none border-0"
          onClick={() => navigate('/create-game')}
        >
          <Plus className="mr-2 h-4 w-4" />
          {t('create.kahoot')}
        </Button>
      </CardContent>
    </Card>
  );
}
