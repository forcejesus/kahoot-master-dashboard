
import { PlanificationDetail } from "@/types/planification-details";
import { Calendar, Clock, Users, Copy, Pin, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface PlanificationHeaderProps {
  planification: PlanificationDetail;
  onCopyPin: (pin: string) => void;
}

export function PlanificationHeader({ planification, onCopyPin }: PlanificationHeaderProps) {
  const isActive = new Date(planification.date_fin) > new Date();

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl shadow-lg">
              <Calendar className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-3xl lg:text-4xl font-black text-white">
              {planification.jeu.titre}
            </h1>
            <Sparkles className="h-6 w-6 text-yellow-300 animate-pulse" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
              <div className="flex items-center gap-3 mb-2">
                <Calendar className="h-5 w-5 text-blue-300" />
                <span className="text-white/80 font-semibold">Période</span>
              </div>
              <p className="text-white font-medium">
                Du {planification.date_debut} à {planification.heure_debut}
              </p>
              <p className="text-white font-medium">
                au {planification.date_fin} à {planification.heure_fin}
              </p>
            </div>
            
            <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
              <div className="flex items-center gap-3 mb-2">
                <Clock className="h-5 w-5 text-green-300" />
                <span className="text-white/80 font-semibold">Type</span>
              </div>
              <Badge 
                variant="outline" 
                className="bg-gradient-to-r from-green-500/20 to-teal-500/20 border-green-300/30 text-green-100 font-medium"
              >
                {planification.type || "Standard"}
              </Badge>
            </div>
            
            <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
              <div className="flex items-center gap-3 mb-2">
                <Users className="h-5 w-5 text-purple-300" />
                <span className="text-white/80 font-semibold">Limite</span>
              </div>
              <p className="text-white font-medium">
                {planification.limite_participant || "∞"} participants
              </p>
            </div>
            
            <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
              <div className="flex items-center gap-3 mb-2">
                <Users className="h-5 w-5 text-orange-300" />
                <span className="text-white/80 font-semibold">Statut</span>
              </div>
              <Badge 
                variant={isActive ? "default" : "secondary"}
                className={isActive 
                  ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white border-none shadow-lg" 
                  : "bg-gray-500/20 text-gray-300 border-gray-400/30"
                }
              >
                {isActive ? "Active" : "Terminée"}
              </Badge>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl p-6 border-2 border-white/20 shadow-2xl backdrop-blur-sm min-w-[280px]">
          <div className="flex items-center gap-2 mb-3">
            <Pin className="h-5 w-5 text-yellow-300" />
            <span className="text-sm text-white/80 uppercase font-bold tracking-wide">PIN d'accès</span>
          </div>
          
          <div className="bg-white/90 rounded-2xl p-4 mb-4 shadow-lg border border-white/30">
            <code className="text-3xl font-black text-gray-800 tracking-wider">
              {planification.pin}
            </code>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => onCopyPin(planification.pin)}
            className="bg-white/10 hover:bg-white/20 border-white/30 text-white hover:text-white backdrop-blur-sm transition-all duration-300 shadow-lg hover:shadow-xl group"
          >
            <Copy className="mr-2 h-4 w-4 group-hover:animate-pulse" />
            Copier le PIN
          </Button>
        </div>
      </div>
    </div>
  );
}
