
import { useNavigate } from "react-router-dom";
import { useTranslation } from "@/contexts/I18nContext";
import { Button } from "@/components/ui/button";
import { ArrowLeft, GamepadIcon } from "lucide-react";

export function CreateGameHeader() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="mb-8">
      <Button 
        variant="outline" 
        className="mb-6 bg-white/80 backdrop-blur-sm border-gray-200 hover:bg-white hover:border-gray-300 transition-all duration-200 shadow-sm"
        onClick={() => navigate('/dashboard')}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        {t('game.backToDashboard')}
      </Button>
      
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-600 rounded-3xl mb-6 shadow-2xl">
          <GamepadIcon className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-5xl font-black bg-gradient-to-r from-gray-900 via-purple-800 to-blue-800 bg-clip-text text-transparent mb-4">
          {t('create.newKahoot')}
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          {t('create.subtitle') || "Donnez vie à vos idées avec un jeu interactif"}
        </p>
      </div>
    </div>
  );
}
