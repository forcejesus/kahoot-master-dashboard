
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Sparkles, Gamepad2 } from 'lucide-react';
import { useTranslation } from '@/contexts/I18nContext';

export function CreateGameCard() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Card className="card-modern group hover:shadow-strong transition-all duration-300 hover:scale-[1.02] bg-gradient-to-br from-secondary to-secondary-600 text-white border-0 overflow-hidden relative h-full">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/5 to-white/10"></div>
      <div className="absolute -top-8 -right-8 w-20 h-20 bg-white/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500"></div>
      <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-white/10 rounded-full blur-lg group-hover:scale-125 transition-transform duration-700"></div>
      
      {/* Floating icons */}
      <div className="absolute top-6 right-6 opacity-20 group-hover:opacity-30 transition-opacity">
        <Sparkles className="w-6 h-6 animate-bounce-subtle" />
      </div>
      <div className="absolute bottom-8 left-6 opacity-15 group-hover:opacity-25 transition-opacity">
        <Gamepad2 className="w-5 h-5 animate-bounce-subtle" style={{ animationDelay: '0.5s' }} />
      </div>
      
      <CardContent className="relative z-10 flex flex-col items-center justify-center h-full p-8 text-center">
        {/* Main icon */}
        <div className="mb-6 w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm group-hover:scale-110 group-hover:bg-white/30 transition-all duration-300 shadow-medium">
          <Plus className="w-8 h-8 group-hover:rotate-90 transition-transform duration-300" />
        </div>
        
        {/* Title */}
        <h3 className="text-2xl font-bold mb-4 text-white">
          Nouveau Kahoot
        </h3>
        
        {/* Action button */}
        <Button 
          onClick={() => navigate('/create-game')}
          className="w-full bg-white/90 hover:bg-white text-secondary-700 hover:text-secondary-800 transition-all duration-300 transform hover:scale-[1.05] shadow-medium hover:shadow-strong font-semibold h-12 rounded-lg border-2 border-white/20 hover:border-white/40"
        >
          <Plus className="mr-3 h-5 w-5" />
          {t('create.kahoot')}
        </Button>
        
        {/* Description */}
        <p className="text-secondary-100 text-sm mt-4 leading-relaxed">
          Créez un jeu interactif en quelques clics
        </p>
      </CardContent>
    </Card>
  );
}
