
import { useTranslation } from "@/contexts/I18nContext";

interface PlanificationsEmptyProps {
  hasFilters: boolean;
}

export function PlanificationsEmpty({ hasFilters }: PlanificationsEmptyProps) {
  const { t } = useTranslation();
  
  return (
    <div className="text-center py-8 text-gray-500">
      {hasFilters ? (
        <p>{t('planification.noMatchingResults') || "No planifications match your search."}</p>
      ) : (
        <p>{t('details.noPlanifications')}</p>
      )}
    </div>
  );
}
