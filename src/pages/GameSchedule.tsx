
import { useLocation } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Kahoot } from "@/types/game-details";
import { ScheduleForm } from "@/components/game/schedule/ScheduleForm";
import { HomeIcon, CalendarClock } from "lucide-react";

export default function GameSchedule() {
  const location = useLocation();
  const kahoot = location.state?.jeu as Kahoot | undefined;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumb className="mb-8">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">
                <HomeIcon className="h-4 w-4 mr-1" />
                Dashboard
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={`/game/${kahoot?._id}`}>
                {kahoot?.titre || "Jeu"}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <div className="flex items-center">
                <CalendarClock className="h-4 w-4 mr-1" />
                Planification
              </div>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        
        <div className="flex flex-col items-center">
          <div className="w-full max-w-4xl mb-8 text-center">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent mb-4">
              Planifier une session de jeu
            </h1>
            {kahoot && (
              <p className="text-lg text-gray-600">
                Vous planifiez une session pour: <span className="font-semibold text-orange-600">{kahoot.titre}</span>
              </p>
            )}
          </div>
          
          <ScheduleForm />
        </div>
      </main>
    </div>
  );
}
