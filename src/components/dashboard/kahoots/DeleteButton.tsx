
import { Button } from '@/components/ui/button';
import { Loader2, Trash2 } from 'lucide-react';

interface DeleteButtonProps {
  count: number;
  onClick: () => void;
  isDeleting: boolean;
}

export function DeleteButton({ count, onClick, isDeleting }: DeleteButtonProps) {
  return (
    <Button
      variant="destructive"
      onClick={onClick}
      className="gap-2"
      disabled={isDeleting}
    >
      {isDeleting ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Suppression...
        </>
      ) : (
        <>
          <Trash2 className="h-4 w-4" />
          Supprimer ({count})
        </>
      )}
    </Button>
  );
}
