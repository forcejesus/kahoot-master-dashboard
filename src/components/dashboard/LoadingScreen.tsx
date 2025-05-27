
import React from 'react';
import { AdvancedLoading } from '@/components/ui/advanced-loading';
import { useTranslation } from '@/contexts/I18nContext';

interface LoadingScreenProps {
  progress: number;
}

export function LoadingScreen({ progress }: LoadingScreenProps) {
  const { t } = useTranslation();
  
  return (
    <div className="mb-8 flex justify-center">
      <AdvancedLoading 
        progress={progress}
        title={t('loading.statsTitle')}
        description={t('loading.statsDescription')}
        showIcons={true}
      />
    </div>
  );
}
