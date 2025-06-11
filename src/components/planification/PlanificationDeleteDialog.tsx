
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2, Trash2 } from "lucide-react";
import { useTranslation } from "@/contexts/I18nContext";

interface PlanificationDeleteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirmDelete: () => void;
  isDeleting: boolean;
}

export function PlanificationDeleteDialog({ 
  open, 
  onOpenChange, 
  onConfirmDelete, 
  isDeleting 
}: PlanificationDeleteDialogProps) {
  const { t } = useTranslation();

  const handleCancelDelete = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('planDetails.confirmDelete')}</DialogTitle>
          <DialogDescription>
            {t('planDetails.confirmDeleteDesc')}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-col sm:flex-row sm:justify-end gap-2 mt-4">
          <Button variant="outline" onClick={handleCancelDelete}>
            {t('delete.cancel')}
          </Button>
          <Button 
            variant="destructive" 
            onClick={onConfirmDelete}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t('planDetails.deleting')}
              </>
            ) : (
              <>
                <Trash2 className="mr-2 h-4 w-4" />
                {t('delete.delete')}
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
