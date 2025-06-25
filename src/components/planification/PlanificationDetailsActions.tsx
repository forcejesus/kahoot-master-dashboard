
import { Button } from "@/components/ui/button";
import { ArrowLeft, Trash2 } from "lucide-react";
import { useTranslation } from "@/contexts/I18nContext";

interface PlanificationDetailsActionsProps {
  onGoBack: () => void;
  onDeleteClick: () => void;
}

export function PlanificationDetailsActions({ onGoBack, onDeleteClick }: PlanificationDetailsActionsProps) {
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-between mb-6">
      <Button
        variant="outline"
        onClick={onGoBack}
        className="bg-white/90 shadow-sm hover:bg-slate-50 backdrop-blur-sm"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        {t('planDetails.backButton')}
      </Button>
      
      <Button
        variant="destructive"
        onClick={onDeleteClick}
        className="shadow-sm"
      >
        <Trash2 className="mr-2 h-4 w-4" />
        {t('planDetails.deleteButton')}
      </Button>
    </div>
  );
}
