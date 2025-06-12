
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/contexts/I18nContext';
import { Loader2, Plus, Sparkles } from 'lucide-react';

interface SubmitQuestionButtonProps {
  isLoading: boolean;
}

export function SubmitQuestionButton({ isLoading }: SubmitQuestionButtonProps) {
  const { t } = useTranslation();
  
  return (
    <div className="flex justify-center">
      <Button 
        type="submit" 
        disabled={isLoading} 
        className="h-14 px-12 text-lg font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-700 hover:via-teal-700 hover:to-cyan-700 text-white shadow-2xl border-0 transition-all duration-300 transform hover:scale-105 hover:shadow-3xl"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-3 h-6 w-6 animate-spin" />
            <span>{t('form.adding')}</span>
          </>
        ) : (
          <>
            <div className="flex items-center gap-3">
              <div className="p-1 bg-white/20 rounded-lg">
                <Plus className="h-5 w-5" />
              </div>
              <span>{t('form.addQuestion')}</span>
              <Sparkles className="h-5 w-5" />
            </div>
          </>
        )}
      </Button>
    </div>
  );
}
