
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { useTranslation } from "@/contexts/I18nContext";
import { PlanificationDetail } from "@/types/planification-details";

interface PlanificationBreadcrumbProps {
  planification: PlanificationDetail;
}

export function PlanificationBreadcrumb({ planification }: PlanificationBreadcrumbProps) {
  const { t } = useTranslation();

  return (
    <Breadcrumb className="mb-6">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/dashboard">{t('breadcrumb.dashboard')}</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href={`/game/${planification.jeu._id}`}>
            {planification.jeu.titre}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <span>{t('planDetails.title')}</span>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
