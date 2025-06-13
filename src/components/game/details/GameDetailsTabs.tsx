
import { TabsContent, Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, List, PlayCircle } from "lucide-react";
import { Kahoot, Planification } from "@/types/game-details";
import { QuestionsDisplay } from "./QuestionsDisplay";
import { PlanificationsTabContent } from "./PlanificationsTabContent";
import { SessionsTabContent } from "./SessionsTabContent";
import { useTranslation } from "@/contexts/I18nContext";

interface GameDetailsTabsProps {
  jeu: Kahoot;
  planificationsEnCours: Planification[];
  onCopyPin: (pin: string) => void;
}

export function GameDetailsTabs({ jeu, planificationsEnCours, onCopyPin }: GameDetailsTabsProps) {
  const { t } = useTranslation();

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <Tabs defaultValue="planifications" className="w-full">
        <TabsList className="mb-6 sm:mb-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-start w-full p-1 bg-gray-800/30 backdrop-blur-md rounded-xl sm:rounded-full shadow-lg border border-white/20 gap-1 sm:gap-0">
          <TabsTrigger 
            value="planifications" 
            className="flex-1 rounded-lg sm:rounded-full py-2 sm:py-3 px-4 sm:px-6 font-medium text-xs sm:text-sm text-white/60 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-blue-400 data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-300 ease-out hover:text-white"
          >
            <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
            <span className="truncate">{t('details.planifications')}</span>
          </TabsTrigger>
          <TabsTrigger 
            value="questions" 
            className="flex-1 rounded-lg sm:rounded-full py-2 sm:py-3 px-4 sm:px-6 font-medium text-xs sm:text-sm text-white/60 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-blue-400 data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-300 ease-out hover:text-white"
          >
            <List className="w-4 h-4 mr-2 flex-shrink-0" />
            <span className="truncate">{t('details.questions')} ({jeu.questions?.length || 0})</span>
          </TabsTrigger>
          <TabsTrigger 
            value="sessions" 
            className="flex-1 rounded-lg sm:rounded-full py-2 sm:py-3 px-4 sm:px-6 font-medium text-xs sm:text-sm text-white/60 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-blue-400 data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-300 ease-out hover:text-white"
          >
            <PlayCircle className="w-4 h-4 mr-2 flex-shrink-0" />
            <span className="truncate">{t('details.sessions')} ({planificationsEnCours.length})</span>
          </TabsTrigger>
        </TabsList>

        {/* Planifications Tab Content */}
        <TabsContent value="planifications" className="mt-0 animate-fade-in">
          <PlanificationsTabContent 
            jeuId={jeu._id}
            onCopyPin={onCopyPin} 
          />
        </TabsContent>

        {/* Questions Tab Content */}
        <TabsContent value="questions" className="mt-0 animate-fade-in">
          <QuestionsDisplay questions={jeu.questions} />
        </TabsContent>

        {/* Active Sessions Tab Content */}
        <TabsContent value="sessions" className="mt-0 animate-fade-in">
          <SessionsTabContent 
            planificationsEnCours={planificationsEnCours} 
            onCopyPin={onCopyPin} 
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
