
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, Check, GamepadIcon, BookOpen, Users, GraduationCap } from 'lucide-react';
import { GameCreationStep1 } from '@/components/game/creation/GameCreationStep1';
import { GameCreationStep2 } from '@/components/game/creation/GameCreationStep2';
import { GameCreationStep3 } from '@/components/game/creation/GameCreationStep3';

export default function GameCreation() {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [gameData, setGameData] = useState({
    id: null,
    titre: '',
    description: '',
    niveau: '',
    theme: '',
    image: null as File | null,
  });

  const steps = [
    { number: 1, title: 'Création du jeu', description: 'Définissez les informations de base' },
    { number: 2, title: 'Questions & Réponses', description: 'Ajoutez vos questions' },
    { number: 3, title: 'Planification', description: 'Planifiez votre session (optionnel)' },
  ];

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleGameCreated = (gameId: string, gameTitle: string) => {
    setGameData(prev => ({ ...prev, id: gameId, titre: gameTitle }));
    handleNext();
  };

  const handleFinish = () => {
    navigate('/dashboard');
  };

  const progressPercentage = (currentStep / 3) * 100;

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Fond avec motifs et gradients - même style que Login */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600"></div>
      
      {/* Motifs décoratifs */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full blur-xl"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-white rounded-full blur-lg"></div>
        <div className="absolute bottom-32 left-40 w-40 h-40 bg-white rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 right-20 w-28 h-28 bg-white rounded-full blur-xl"></div>
      </div>

      {/* Icônes éducatives flottantes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <BookOpen className="absolute top-1/4 left-1/4 w-8 h-8 text-white/20 animate-pulse" />
        <Users className="absolute top-1/3 right-1/4 w-6 h-6 text-white/20 animate-pulse delay-1000" />
        <GraduationCap className="absolute bottom-1/3 left-1/3 w-7 h-7 text-white/20 animate-pulse delay-500" />
        <BookOpen className="absolute bottom-1/4 right-1/3 w-5 h-5 text-white/20 animate-pulse delay-1500" />
      </div>

      <div className="relative z-10 min-h-screen p-6">
        {/* Header avec bouton retour */}
        <div className="mb-8">
          <Button 
            variant="outline" 
            className="bg-white/90 hover:bg-white border-white/50 text-orange-600 hover:text-orange-700 shadow-lg hover:shadow-xl transition-all duration-200 backdrop-blur-sm"
            onClick={() => navigate('/dashboard')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour au tableau de bord
          </Button>
        </div>

        {/* Container principal */}
        <div className="max-w-4xl mx-auto">
          {/* Titre principal */}
          <div className="text-center mb-8">
            <div className="relative mb-4">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent blur-sm">
                <h1 className="text-4xl md:text-5xl font-black tracking-tight">
                  Création de jeu
                </h1>
              </div>
              <h1 className="relative text-4xl md:text-5xl font-black bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 bg-clip-text text-transparent drop-shadow-lg tracking-tight">
                Création de jeu
              </h1>
            </div>
            
            {/* Ligne décorative */}
            <div className="flex items-center justify-center space-x-2 mb-6">
              <div className="h-1 w-8 bg-gradient-to-r from-transparent to-orange-500 rounded-full"></div>
              <div className="h-1 w-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full shadow-lg"></div>
              <div className="h-1 w-8 bg-gradient-to-r from-orange-500 to-transparent rounded-full"></div>
            </div>
          </div>

          {/* Stepper */}
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-3xl transform rotate-1 scale-105"></div>
            <div className="absolute inset-0 bg-white/5 backdrop-blur-sm rounded-3xl transform -rotate-1 scale-102"></div>
            
            <Card className="relative backdrop-blur-xl bg-white/95 border-0 shadow-2xl shadow-orange-900/20 rounded-3xl p-6">
              <div className="mb-6">
                <Progress value={progressPercentage} className="h-3" />
              </div>
              
              <div className="flex justify-between">
                {steps.map((step) => (
                  <div key={step.number} className="flex flex-col items-center flex-1">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 mb-3 ${
                      step.number < currentStep 
                        ? 'bg-green-500 border-green-500 text-white' 
                        : step.number === currentStep 
                          ? 'bg-orange-500 border-orange-500 text-white' 
                          : 'bg-white border-gray-300 text-gray-400'
                    }`}>
                      {step.number < currentStep ? (
                        <Check className="h-6 w-6" />
                      ) : (
                        <span className="font-bold">{step.number}</span>
                      )}
                    </div>
                    <div className="text-center">
                      <p className={`font-semibold ${
                        step.number <= currentStep ? 'text-gray-800' : 'text-gray-400'
                      }`}>
                        {step.title}
                      </p>
                      <p className="text-sm text-gray-500">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Contenu des étapes */}
          <div className="relative">
            <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-3xl transform rotate-1 scale-105"></div>
            <div className="absolute inset-0 bg-white/5 backdrop-blur-sm rounded-3xl transform -rotate-1 scale-102"></div>
            
            <Card className="relative backdrop-blur-xl bg-white/95 border-0 shadow-2xl shadow-orange-900/20 rounded-3xl">
              <CardContent className="p-8">
                {currentStep === 1 && (
                  <GameCreationStep1 
                    gameData={gameData}
                    setGameData={setGameData}
                    onNext={handleGameCreated}
                    token={token}
                  />
                )}
                {currentStep === 2 && (
                  <GameCreationStep2 
                    gameId={gameData.id}
                    gameTitle={gameData.titre}
                    onNext={handleNext}
                    onPrevious={handlePrevious}
                    token={token}
                  />
                )}
                {currentStep === 3 && (
                  <GameCreationStep3 
                    gameId={gameData.id}
                    gameTitle={gameData.titre}
                    onFinish={handleFinish}
                    onPrevious={handlePrevious}
                    token={token}
                  />
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
