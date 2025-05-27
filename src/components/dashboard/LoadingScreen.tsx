
import React from 'react';
import { AdvancedLoading } from '@/components/ui/advanced-loading';

interface LoadingScreenProps {
  progress: number;
}

export function LoadingScreen({ progress }: LoadingScreenProps) {
  return (
    <div className="mb-8 flex justify-center">
      <AdvancedLoading 
        progress={progress}
        title="Chargement de vos données statistiques..."
        description="Préparation de votre tableau de bord personnalisé"
        showIcons={true}
      />
    </div>
  );
}
