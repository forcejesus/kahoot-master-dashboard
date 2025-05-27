
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Loader, GamepadIcon, Zap, Stars, BookOpen, Users, Trophy, Clock } from 'lucide-react';

interface LoadingScreenProps {
  progress: number;
}

export function LoadingScreen({ progress }: LoadingScreenProps) {
  // Collection plus variée d'icônes animées
  const icons = [
    <GamepadIcon key="gamepad" className="text-primary animate-bounce" size={36} />,
    <Zap key="zap" className="text-secondary animate-pulse" size={36} />,
    <Stars key="stars" className="text-primary animate-spin" size={36} />,
    <BookOpen key="book" className="text-accent animate-bounce" size={36} />,
    <Users key="users" className="text-secondary animate-pulse" size={36} />,
    <Trophy key="trophy" className="text-primary animate-bounce" size={36} />,
    <Clock key="clock" className="text-accent animate-spin" size={36} />
  ];

  // Sélection aléatoire de positions pour les icônes
  const positions = [
    "absolute top-1/4 left-1/5 transform -translate-y-1/2 opacity-30",
    "absolute top-1/3 right-1/5 transform -translate-y-1/2 opacity-30",
    "absolute bottom-1/4 right-1/4 transform -translate-y-1/2 opacity-30",
    "absolute top-1/2 left-1/4 transform -translate-y-1/2 opacity-30",
    "absolute bottom-1/3 left-1/3 transform -translate-y-1/2 opacity-30",
    "absolute top-1/5 right-1/3 transform -translate-y-1/2 opacity-30",
    "absolute bottom-1/5 right-2/5 transform -translate-y-1/2 opacity-30"
  ];

  return (
    <div className="mb-6 relative overflow-hidden bg-white/50 p-6 rounded-lg shadow-sm border border-gray-100 backdrop-blur-sm transition-all duration-500">
      <div className="text-center mb-6 text-primary font-medium flex items-center justify-center">
        <Loader className="mr-2 h-5 w-5 animate-spin" />
        <span className="animate-pulse">Chargement de vos données statistiques...</span>
      </div>
      
      {/* Icônes animées positionnées de manière aléatoire */}
      {icons.map((icon, index) => (
        <div 
          key={index} 
          className={positions[index % positions.length]} 
          style={{ 
            animationDelay: `${0.1 * index}s`,
            animationDuration: `${1 + 0.5 * (index % 3)}s` 
          }}
        >
          {icon}
        </div>
      ))}
      
      {/* Barre de progression avec dégradé */}
      <div className="relative">
        <Progress 
          value={progress} 
          className="h-3 w-full max-w-md mx-auto rounded-full overflow-hidden bg-gray-200" 
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent shimmer" />
      </div>
      
      <div className="text-sm text-center mt-3 font-medium text-primary">
        <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          {Math.round(progress)}%
        </span>
      </div>
    </div>
  );
}
