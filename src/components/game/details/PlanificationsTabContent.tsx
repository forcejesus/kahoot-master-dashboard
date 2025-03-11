
import { Planification } from "@/types/game-details";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { SearchBar } from "./planifications/SearchBar";
import { FilterControls } from "./planifications/FilterControls";
import { PlanificationsList } from "./planifications/PlanificationsList";

interface PlanificationsTabContentProps {
  jeuId: string;
  onCopyPin: (pin: string) => void;
}

export function PlanificationsTabContent({ jeuId, onCopyPin }: PlanificationsTabContentProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [planifications, setPlanifications] = useState<Planification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { token } = useAuth();
  
  useEffect(() => {
    const fetchPlanifications = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`http://kahoot.nos-apps.com/api/planification/jeu/${jeuId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!response.ok) {
          throw new Error('Erreur lors du chargement des planifications');
        }
        
        const data = await response.json();
        setPlanifications(data);
      } catch (error) {
        console.error('Error fetching planifications:', error);
        toast.error("Impossible de charger les planifications");
      } finally {
        setIsLoading(false);
      }
    };
    
    if (jeuId) {
      fetchPlanifications();
    }
  }, [jeuId, token]);
  
  const filteredPlanifications = planifications.filter((planif) => {
    // Filter by PIN search
    const matchesSearch = searchQuery 
      ? planif.pin.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    
    // Filter by status
    const matchesStatus = statusFilter 
      ? planif.statut === statusFilter 
      : true;
    
    // Filter by type
    const matchesType = typeFilter 
      ? planif.type.toLowerCase() === typeFilter.toLowerCase() 
      : true;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const handleClearFilters = () => {
    setSearchQuery("");
    setStatusFilter("");
    setTypeFilter("");
  };

  const hasActiveFilters = searchQuery || statusFilter || typeFilter;

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-sm p-6 border border-gray-100">
      <h2 className="text-xl font-bold text-primary mb-4">Toutes les planifications</h2>
      
      <div className="space-y-4 mb-6">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        
        <FilterControls
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          typeFilter={typeFilter}
          setTypeFilter={setTypeFilter}
          onClearFilters={handleClearFilters}
          hasActiveFilters={!!hasActiveFilters}
        />
      </div>
      
      <PlanificationsList 
        planifications={filteredPlanifications} 
        isLoading={isLoading} 
        onCopyPin={onCopyPin}
        hasFilters={!!hasActiveFilters}
      />
    </div>
  );
}
