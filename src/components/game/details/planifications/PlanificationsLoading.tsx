
import { Loader2 } from "lucide-react";
import { useTranslation } from "@/contexts/I18nContext";

export function PlanificationsLoading() {
  const { t } = useTranslation();
  
  return (
    <div className="flex justify-center items-center py-12">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <span className="ml-2 text-primary font-medium">{t('planification.loading') || "Loading planifications..."}</span>
    </div>
  );
}
