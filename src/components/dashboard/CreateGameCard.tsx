
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Sparkles, Gamepad2 } from 'lucide-react';
import { useTranslation } from '@/contexts/I18nContext';

export function CreateGameCard() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Card className="card-modern group hover:shadow-strong transition-all duration-300 hover:scale-105 bg-gradient-to-br from-secondary to-secondary-600 text-white border-0 overflow-hidden relative min-h-[140px]">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/5 to-white/10"></div>
      <div className="absolute -top-6 -right-6 w-16 h-16 bg-white/10 rounded-full blur-lg group-hover:scale-150 transition-transform duration-500"></div>
      <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-white/10 rounded-full blur-md group-hover:scale-125 transition-transform duration-700"></div>
      
      {/* Floating icons */}
      <div className="absolute top-3 right-3 opacity-20 group-hover:opacity-30 transition-opacity">
        <Sparkles className="w-5 h-5 animate-bounce-subtle" />
      </div>
      <div className="absolute bottom-3 left-3 opacity-15 group-hover:opacity-25 transition-opacity">
        <Gamepad2 className="w-4 h-4 animate-bounce-subtle" style={{ animationDelay: '0.5s' }} />
      </div>
      
      <CardContent className="relative z-10 flex flex-col items-center justify-center h-full p-4 text-center">
        {/* Main icon */}
        <div className="mb-3 w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm group-hover:scale-110 group-hover:bg-white/30 transition-all duration-300 shadow-medium">
          <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
        </div>
        
        {/* Title */}
        <h3 className="text-lg font-bold mb-3 text-white leading-tight">
          Nouveau Kahoot
        </h3>
        
        {/* Action button */}
        <Button 
          onClick={() => navigate('/create-game')}
          className="w-full bg-white/90 hover:bg-white text-secondary-700 hover:text-secondary-800 transition-all duration-300 transform hover:scale-105 shadow-medium hover:shadow-strong font-semibold h-10 rounded-lg border-2 border-white/20 hover:border-white/40 text-sm"
        >
          <Plus className="mr-2 h-4 w-4" />
          {t('create.kahoot')}
        </Button>
      </CardContent>
    </Card>
  );
}
