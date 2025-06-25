
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Sparkles } from 'lucide-react';
import { useTranslation } from '@/contexts/I18nContext';

export function CreateGameCard() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Card className="group transform transition-all duration-300 hover:scale-105 hover:shadow-2xl bg-gradient-to-br from-purple-500 via-blue-500 to-indigo-600 text-white border-none shadow-lg overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-br from-black/0 to-black/10"></div>
      <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
      <div className="absolute top-4 right-4 opacity-20">
        <Sparkles className="w-16 h-16" />
      </div>
      
      <CardContent className="relative z-10 flex flex-col items-center justify-center h-full p-8 text-center">
        <div className="mb-6 p-4 bg-white/20 rounded-full backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
          <Plus className="w-8 h-8" />
        </div>
        
        <Button 
          variant="secondary" 
          size="lg"
          className="w-full text-lg h-14 bg-white text-purple-700 hover:bg-white/90 transition-all duration-200 transform hover:scale-[1.02] shadow-xl font-semibold"
          onClick={() => navigate('/create-game')}
        >
          <Plus className="mr-2 h-5 w-5" />
          {t('create.kahoot')}
        </Button>
        
        <p className="text-white/80 text-sm mt-3 leading-relaxed">
          Lancez-vous dans la création d'un nouveau jeu interactif
        </p>
      </CardContent>
    </Card>
  );
}
