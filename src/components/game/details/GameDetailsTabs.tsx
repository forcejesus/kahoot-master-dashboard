
import { TabsContent, Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, Calendar, List, PlayCircle } from "lucide-react";
import { Kahoot, Planification } from "@/types/game-details";
import { GameStats } from "./GameStats";
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
    <Tabs defaultValue="dashboard" className="w-full">
      <TabsList className="mb-6 bg-white/80 backdrop-blur-sm w-full justify-start">
        <TabsTrigger value="dashboard" className="data-[state=active]:bg-primary data-[state=active]:text-white">
          <BarChart3 className="w-4 h-4 mr-2" />
          Tableau de bord
        </TabsTrigger>
        <TabsTrigger value="planifications" className="data-[state=active]:bg-primary data-[state=active]:text-white">
          <Calendar className="w-4 h-4 mr-2" />
          Planifications ({jeu.planifications?.length || 0})
        </TabsTrigger>
        <TabsTrigger value="questions" className="data-[state=active]:bg-primary data-[state=active]:text-white">
          <List className="w-4 h-4 mr-2" />
          Questions ({jeu.questions?.length || 0})
        </TabsTrigger>
        <TabsTrigger value="sessions" className="data-[state=active]:bg-primary data-[state=active]:text-white">
          <PlayCircle className="w-4 h-4 mr-2" />
          Sessions actives ({planificationsEnCours.length})
        </TabsTrigger>
      </TabsList>

      {/* Dashboard Tab Content */}
      <TabsContent value="dashboard" className="mt-0">
        <GameStats 
          jeu={jeu} 
          planificationsEnCours={planificationsEnCours} 
          onCopyPin={onCopyPin} 
        />
      </TabsContent>

      {/* Planifications Tab Content */}
      <TabsContent value="planifications" className="mt-0">
        <PlanificationsTabContent 
          planifications={jeu.planifications || []} 
          onCopyPin={onCopyPin} 
        />
      </TabsContent>

      {/* Questions Tab Content */}
      <TabsContent value="questions" className="mt-0">
        <QuestionsDisplay questions={jeu.questions} />
      </TabsContent>

      {/* Active Sessions Tab Content */}
      <TabsContent value="sessions" className="mt-0">
        <SessionsTabContent 
          planificationsEnCours={planificationsEnCours} 
          onCopyPin={onCopyPin} 
        />
      </TabsContent>
    </Tabs>
  );
}
