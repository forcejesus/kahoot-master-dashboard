
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Sparkles, Zap } from 'lucide-react';
import { useTranslation } from '@/contexts/I18nContext';

export function CreateGameCard() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Card className="group transform transition-all duration-500 hover:scale-105 hover:shadow-2xl bg-gradient-to-br from-emerald-400 via-blue-500 to-purple-600 text-white border-none shadow-xl overflow-hidden relative h-full">
      {/* Effets de fond animés */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/0 via-black/5 to-black/20"></div>
      <div className="absolute -top-6 -right-6 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
      <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-white/10 rounded-full blur-xl group-hover:scale-125 transition-transform duration-500"></div>
      
      {/* Icônes décoratives flottantes */}
      <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-30 transition-opacity duration-300">
        <Sparkles className="w-8 h-8 animate-pulse" />
      </div>
      <div className="absolute bottom-6 left-4 opacity-15 group-hover:opacity-25 transition-opacity duration-300">
        <Zap className="w-6 h-6 animate-bounce" style={{ animationDelay: '0.5s' }} />
      </div>
      
      <CardContent className="relative z-10 flex flex-col items-center justify-center h-full p-8 text-center">
        {/* Icône principale avec animation */}
        <div className="mb-6 p-5 bg-white/20 rounded-full backdrop-blur-sm group-hover:scale-110 group-hover:bg-white/30 transition-all duration-300 shadow-lg">
          <Plus className="w-10 h-10 group-hover:rotate-90 transition-transform duration-300" />
        </div>
        
        {/* Titre avec gradient */}
        <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
          Nouveau Kahoot
        </h3>
        
        {/* Bouton principal */}
        <Button 
          variant="secondary" 
          size="lg"
          className="w-full text-lg h-14 bg-white/90 text-purple-700 hover:bg-white hover:text-purple-800 transition-all duration-300 transform hover:scale-[1.05] shadow-xl font-bold border-2 border-white/20 hover:border-white/40"
          onClick={() => navigate('/create-game')}
        >
          <Plus className="mr-3 h-6 w-6" />
          {t('create.kahoot')}
        </Button>
        
        {/* Description */}
        <p className="text-white/80 text-sm mt-4 leading-relaxed font-medium">
          Créez un jeu interactif en quelques clics
        </p>
        
        {/* Indicateur de mouvement */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
          <div className="w-8 h-1 bg-white/30 rounded-full"></div>
        </div>
      </CardContent>
    </Card>
  );
}
