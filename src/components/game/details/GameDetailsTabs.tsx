
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
      <TabsList className="mb-8 rounded-2xl p-1.5 bg-gradient-to-r from-primary/90 via-primary/70 to-secondary/90 shadow-lg backdrop-blur-md w-full justify-start border border-white/20">
        <TabsTrigger 
          value="planifications" 
          className="rounded-xl py-2.5 px-4 font-medium data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-md transition-all duration-300 ease-in-out hover:bg-white/20"
        >
          <Calendar className="w-4 h-4 mr-2" />
          Planifications ({jeu.planifications?.length || 0})
        </TabsTrigger>
        <TabsTrigger 
          value="questions" 
          className="rounded-xl py-2.5 px-4 font-medium data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-md transition-all duration-300 ease-in-out hover:bg-white/20"
        >
          <List className="w-4 h-4 mr-2" />
          Questions ({jeu.questions?.length || 0})
        </TabsTrigger>
        <TabsTrigger 
          value="sessions" 
          className="rounded-xl py-2.5 px-4 font-medium data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-md transition-all duration-300 ease-in-out hover:bg-white/20"
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
