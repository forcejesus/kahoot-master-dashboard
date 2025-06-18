
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Sparkles, Zap, Gamepad2, Wand2 } from 'lucide-react';
import { useTranslation } from '@/contexts/I18nContext';

export function CreateGameCard() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Card className="group relative overflow-hidden bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-600 border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 h-full">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute -top-6 -right-6 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
        <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-white/10 rounded-full blur-xl group-hover:scale-125 transition-transform duration-500"></div>
      </div>
      
      {/* Floating icons */}
      <div className="absolute inset-0 overflow-hidden">
        <Sparkles className="absolute top-6 right-6 w-6 h-6 text-white/30 group-hover:text-white/50 animate-pulse transition-colors" />
        <Zap className="absolute bottom-8 left-6 w-5 h-5 text-white/20 group-hover:text-white/40 animate-bounce transition-colors" style={{ animationDelay: '0.5s' }} />
        <Wand2 className="absolute top-1/2 right-8 w-4 h-4 text-white/25 group-hover:text-white/45 animate-pulse transition-colors" style={{ animationDelay: '1s' }} />
      </div>
      
      <CardContent className="relative z-10 flex flex-col items-center justify-center h-full p-8 text-center">
        {/* Main icon with glow effect */}
        <div className="mb-6 relative">
          <div className="absolute inset-0 bg-white/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300"></div>
          <div className="relative p-6 bg-white/20 backdrop-blur-sm rounded-full group-hover:scale-110 group-hover:bg-white/30 transition-all duration-300 shadow-xl">
            <Gamepad2 className="w-12 h-12 text-white group-hover:rotate-12 transition-transform duration-300" />
          </div>
        </div>
        
        {/* Title with enhanced styling */}
        <h3 className="text-2xl font-bold mb-4 text-white drop-shadow-lg">
          Créer un Kahoot
        </h3>
        
        {/* Subtitle */}
        <p className="text-white/80 text-sm mb-6 leading-relaxed font-medium">
          Donnez vie à vos idées pédagogiques avec un quiz interactif
        </p>
        
        {/* Action button */}
        <Button 
          size="lg"
          className="w-full bg-white/90 hover:bg-white text-violet-700 hover:text-violet-800 font-bold text-lg h-12 rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border-2 border-white/20 hover:border-white/40 backdrop-blur-sm"
          onClick={() => navigate('/create-game')}
        >
          <Plus className="mr-3 h-6 w-6 group-hover:rotate-90 transition-transform duration-300" />
          {t('create.kahoot')}
        </Button>
        
        {/* Decorative bottom element */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-white/30 rounded-full"></div>
            <div className="w-2 h-2 bg-white/50 rounded-full"></div>
            <div className="w-2 h-2 bg-white/30 rounded-full"></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
