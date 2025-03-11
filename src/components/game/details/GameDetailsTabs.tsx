
import { TabsContent, Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, List, PlayCircle } from "lucide-react";
import { Kahoot, Planification } from "@/types/game-details";
import { QuestionsDisplay } from "./QuestionsDisplay";
import { PlanificationsTabContent } from "./PlanificationsTabContent";
import { SessionsTabContent } from "./SessionsTabContent";

interface GameDetailsTabsProps {
  jeu: Kahoot;
  planificationsEnCours: Planification[];
  onCopyPin: (pin: string) => void;
}

export function GameDetailsTabs({ jeu, planificationsEnCours, onCopyPin }: GameDetailsTabsProps) {
  return (
    <Tabs defaultValue="planifications" className="w-full">
      <TabsList className="mb-6 bg-gradient-to-r from-primary/80 to-secondary/80 shadow-md backdrop-blur-sm w-full justify-start rounded-xl p-1">
        <TabsTrigger 
          value="planifications" 
          className="data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all duration-200"
        >
          <Calendar className="w-4 h-4 mr-2" />
          Planifications ({jeu.planifications?.length || 0})
        </TabsTrigger>
        <TabsTrigger 
          value="questions" 
          className="data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all duration-200"
        >
          <List className="w-4 h-4 mr-2" />
          Questions ({jeu.questions?.length || 0})
        </TabsTrigger>
        <TabsTrigger 
          value="sessions" 
          className="data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all duration-200"
        >
          <PlayCircle className="w-4 h-4 mr-2" />
          Sessions actives ({planificationsEnCours.length})
        </TabsTrigger>
      </TabsList>

      {/* Planifications Tab Content */}
      <TabsContent value="planifications" className="mt-0 animate-fade-in">
        <PlanificationsTabContent 
          planifications={jeu.planifications || []} 
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
  );
}
