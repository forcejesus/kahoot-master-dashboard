
import { useLocation } from "react-router-dom";
import { useTranslation } from "@/contexts/I18nContext";
import { Layout } from "@/components/Layout";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Kahoot } from "@/types/game-details";
import { ScheduleForm } from "@/components/game/schedule/ScheduleForm";
import { Home, CalendarClock } from "lucide-react";

export default function GameSchedule() {
  const location = useLocation();
  const { t } = useTranslation();
  const kahoot = location.state?.jeu as Kahoot | undefined;

  return (
    <Layout>
      <div className="flex-1 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <Breadcrumb className="mb-8">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard">
                  <Home className="h-4 w-4 mr-1" />
                  {t('breadcrumb.dashboard')}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href={`/game/${kahoot?._id}`}>
                  {kahoot?.titre || t('breadcrumb.game')}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <div className="flex items-center">
                  <CalendarClock className="h-4 w-4 mr-1" />
                  {t('breadcrumb.planification')}
                </div>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <div className="flex flex-col items-center">
            <div className="w-full max-w-4xl mb-8 text-center">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                {t('schedule.title')}
              </h1>
              {kahoot && (
                <p className="text-lg text-gray-600">
                  {t('schedule.sessionFor')} <span className="font-semibold">{kahoot.titre}</span>
                </p>
              )}
            </div>
            
            <div className="w-full max-w-4xl">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border-0 p-8">
                <ScheduleForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
