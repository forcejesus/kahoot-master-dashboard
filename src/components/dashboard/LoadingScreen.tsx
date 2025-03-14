
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Loader, GamepadIcon, Zap, Stars } from 'lucide-react';

interface LoadingScreenProps {
  progress: number;
}

export function LoadingScreen({ progress }: LoadingScreenProps) {
  // Animated icons that appear during loading
  const icons = [
    <GamepadIcon key="gamepad" className="text-primary animate-bounce" size={36} />,
    <Zap key="zap" className="text-secondary animate-pulse" size={36} />,
    <Stars key="stars" className="text-primary animate-spin" size={36} />
  ];

  return (
    <div className="mb-6 relative overflow-hidden bg-white/50 p-6 rounded-lg shadow-sm border border-gray-100">
      <div className="text-center mb-6 text-primary font-medium flex items-center justify-center">
        <Loader className="mr-2 h-5 w-5 animate-spin" />
        <span>Chargement de vos Kahoots...</span>
      </div>
      <div className="absolute top-1/2 left-1/4 transform -translate-y-1/2 opacity-30 animate-bounce" style={{ animationDelay: '0.1s' }}>
        {icons[0]}
      </div>
      <div className="absolute top-1/3 right-1/4 transform -translate-y-1/2 opacity-30 animate-pulse" style={{ animationDelay: '0.3s' }}>
        {icons[1]}
      </div>
      <div className="absolute bottom-1/4 right-1/3 transform -translate-y-1/2 opacity-30 animate-spin" style={{ animationDelay: '0.5s' }}>
        {icons[2]}
      </div>
      <Progress 
        value={progress} 
        className="h-3 w-full max-w-md mx-auto rounded-full overflow-hidden bg-gray-200" 
      />
      <div className="text-sm text-center mt-3 font-medium text-primary">
        {Math.round(progress)}%
      </div>
    </div>
  );
}
