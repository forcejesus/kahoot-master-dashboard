
import { Planification } from "@/types/game-details";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { PlanificationsFilters } from "./planifications/PlanificationsFilters";
import { PlanificationCard } from "./planifications/PlanificationCard";
import { PlanificationsLoading } from "./planifications/PlanificationsLoading";
import { PlanificationsEmpty } from "./planifications/PlanificationsEmpty";

interface PlanificationsTabContentProps {
  jeuId: string;
  onCopyPin: (pin: string) => void;
}

export function PlanificationsTabContent({ jeuId, onCopyPin }: PlanificationsTabContentProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [planifications, setPlanifications] = useState<Planification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlanifications = async () => {
      setIsLoading(true);
      try {
        console.log("Fetching planifications for jeuId:", jeuId);
        const response = await fetch(`https://kahoot.nos-apps.com/api/planification/jeu/${jeuId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!response.ok) {
          throw new Error('Erreur lors du chargement des planifications');
        }
        
        const data = await response.json();
        console.log("Planifications fetched:", data);
        setPlanifications(data);
      } catch (error) {
        console.error('Error fetching planifications:', error);
        toast.error("Impossible de charger les planifications");
      } finally {
        setIsLoading(false);
      }
    };
    
    if (jeuId && token) {
      fetchPlanifications();
    } else {
      console.log("Missing jeuId or token for fetching planifications:", { jeuId, hasToken: !!token });
    }
  }, [jeuId, token]);

  const filteredPlanifications = planifications.filter((planif) => {
    const searchableText = [
      planif.pin,
      planif.meilleur_score?.apprenant,
      planif.type,
      planif.statut
    ].filter(Boolean).join(" ").toLowerCase();
    
    const matchesSearch = searchableText.includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || (planif.statut?.toLowerCase() === statusFilter.toLowerCase());
    const matchesType = typeFilter === "all" || (planif.type?.toLowerCase() === typeFilter.toLowerCase());
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const handleViewPlanification = (planificationId: string) => {
    navigate(`/planification/${planificationId}`);
  };

  // Extract unique statuses and types for filter options
  const statuses = ["all", ...new Set(planifications.map(p => p.statut?.toLowerCase()).filter(Boolean))] as string[];
  const types = ["all", ...new Set(planifications.map(p => p.type?.toLowerCase()).filter(Boolean))] as string[];

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-sm p-6 border border-gray-100">
      <h2 className="text-xl font-bold text-primary mb-4">Toutes les planifications</h2>
      
      <PlanificationsFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        typeFilter={typeFilter}
        onTypeFilter={setTypeFilter}
        availableStatuses={statuses}
        availableTypes={types}
      />
      
      {isLoading ? (
        <PlanificationsLoading />
      ) : filteredPlanifications.length > 0 ? (
        <div className="space-y-4">
          {filteredPlanifications.map((planif) => (
            <PlanificationCard
              key={planif._id}
              planification={planif}
              onCopyPin={onCopyPin}
              onViewPlanification={handleViewPlanification}
            />
          ))}
        </div>
      ) : (
        <PlanificationsEmpty 
          hasFilters={searchQuery !== "" || statusFilter !== "all" || typeFilter !== "all"} 
        />
      )}
    </div>
  );
}
