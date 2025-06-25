
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/contexts/I18nContext';
import { Loader2, Plus } from 'lucide-react';

interface SubmitQuestionButtonProps {
  isLoading: boolean;
}

export function SubmitQuestionButton({ isLoading }: SubmitQuestionButtonProps) {
  const { t } = useTranslation();
  
  return (
    <Button type="submit" disabled={isLoading} className="w-full">
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {t('form.adding')}
        </>
      ) : (
        <>
          <Plus className="mr-2 h-4 w-4" />
          {t('form.addQuestion')}
        </>
      )}
    </Button>
  );
}
