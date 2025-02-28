
import { Button } from '@/components/ui/button';
import { Loader2, Plus } from 'lucide-react';

interface SubmitQuestionButtonProps {
  isLoading: boolean;
}

export function SubmitQuestionButton({ isLoading }: SubmitQuestionButtonProps) {
  return (
    <Button type="submit" disabled={isLoading} className="w-full">
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Ajout en cours...
        </>
      ) : (
        <>
          <Plus className="mr-2 h-4 w-4" />
          Ajouter la question
        </>
      )}
    </Button>
  );
}
