import React from 'react';
import { useTranslation } from '@/contexts/I18nContext';
import { Loader2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface DeleteConfirmDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirmDelete: () => Promise<void>;
  selectedCount: number;
  isDeleting: boolean;
}

export function DeleteConfirmDialog({
  isOpen,
  onOpenChange,
  onConfirmDelete,
  selectedCount,
  isDeleting
}: DeleteConfirmDialogProps) {
  const { t } = useTranslation();

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t('delete.confirm')}</AlertDialogTitle>
          <AlertDialogDescription>
            {selectedCount > 1 
              ? t('delete.confirmDescriptionPlural', { count: selectedCount })
              : t('delete.confirmDescription', { count: selectedCount })
            }
            {' '}Cette action est irréversible.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>{t('delete.cancel')}</AlertDialogCancel>
          <AlertDialogAction 
            onClick={onConfirmDelete}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            disabled={isDeleting}
          >
            {isDeleting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t('delete.deleting')}
              </>
            ) : (
              t('delete.delete')
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
