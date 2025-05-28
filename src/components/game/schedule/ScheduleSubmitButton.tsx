
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/contexts/I18nContext";
import { Loader2 } from "lucide-react";
import { useScheduleForm } from "./ScheduleFormContext";

export function ScheduleSubmitButton() {
  const { t } = useTranslation();
  const { isSubmitting, createdPin } = useScheduleForm();
  
  if (createdPin) return null;
  
  return (
    <Button type="submit" className="w-full" disabled={isSubmitting}>
      {isSubmitting ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {t('create.creating')}
        </>
      ) : (
        t('schedule.createSession')
      )}
    </Button>
  );
}
