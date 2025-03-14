
import React from 'react';
import { CreateKahootDialog } from '@/components/CreateKahootDialog';

interface CreateKahootSectionProps {
  gamesLoading: boolean;
}

export function CreateKahootSection({ gamesLoading }: CreateKahootSectionProps) {
  return (
    <div className={`grid gap-6 md:grid-cols-2 lg:grid-cols-3 transition-all duration-700 ${gamesLoading ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
      <CreateKahootDialog />
    </div>
  );
}
