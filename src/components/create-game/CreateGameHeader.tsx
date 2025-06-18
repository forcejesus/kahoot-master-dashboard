
import { useNavigate } from "react-router-dom";
import { useTranslation } from "@/contexts/I18nContext";
import { Button } from "@/components/ui/button";
import { ArrowLeft, GamepadIcon, Sparkles } from "lucide-react";

export function CreateGameHeader() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="mb-8">
      <Button 
        variant="outline" 
        className="mb-6 bg-white/90 backdrop-blur-sm border-white/30 hover:bg-white hover:border-white/50 transition-all duration-300 shadow-2xl text-slate-700"
        onClick={() => navigate('/dashboard')}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        {t('game.backToDashboard')}
      </Button>
      
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500/80 to-blue-600/80 rounded-3xl mb-6 shadow-2xl backdrop-blur-sm border border-white/20 hover:scale-105 transition-transform duration-300">
          <GamepadIcon className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-5xl font-black bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent mb-4 drop-shadow-lg flex items-center justify-center gap-3">
          {t('create.newKahoot')}
          <Sparkles className="h-8 w-8 text-yellow-300 animate-pulse" />
        </h1>
        <p className="text-xl text-white/80 max-w-2xl mx-auto">
          {t('create.subtitle') || "Donnez vie à vos idées avec un jeu interactif"}
        </p>
      </div>
    </div>
  );
}
