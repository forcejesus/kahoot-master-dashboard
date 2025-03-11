
import { Planification } from "@/types/game-details";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Search, Filter, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

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

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-sm p-6 border border-gray-100">
      <h2 className="text-xl font-bold text-primary mb-4">Toutes les planifications</h2>
      
      <div className="space-y-4 mb-6">
        {/* PIN Search */}
        <div className="relative">
          <Input
            type="text"
            placeholder="Rechercher par PIN..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        </div>
        
        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Status Filter */}
          <div>
            <Select
              value={statusFilter}
              onValueChange={setStatusFilter}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Filtrer par statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Tous les statuts</SelectItem>
                <SelectItem value="en cours">En cours</SelectItem>
                <SelectItem value="en attente">En attente</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Type Filter */}
          <div>
            <Select
              value={typeFilter}
              onValueChange={setTypeFilter}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Filtrer par type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Tous les types</SelectItem>
                <SelectItem value="attribuer">Attribuer</SelectItem>
                <SelectItem value="public">Public</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Clear filters button */}
        {(searchQuery || statusFilter || typeFilter) && (
          <div className="flex justify-end">
            <Button
              variant="outline"
              size="sm"
              onClick={handleClearFilters}
              className="text-xs"
            >
              Effacer les filtres
              <Filter className="ml-1 h-3 w-3" />
            </Button>
          </div>
        )}
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2 text-primary">Chargement des planifications...</span>
        </div>
      ) : filteredPlanifications && filteredPlanifications.length > 0 ? (
        <div className="space-y-4">
          {filteredPlanifications.map((planif) => (
            <div key={planif._id} className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">PIN:</span>
                    <code className="bg-gray-100 px-2 py-1 rounded">{planif.pin}</code>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onCopyPin(planif.pin)}
                      className="h-8 w-8 p-0"
                    >
                      <span className="sr-only">Copier le PIN</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 text-sm">
                    <div><span className="font-medium">Début:</span> {planif.date_debut} {planif.heure_debut}</div>
                    <div><span className="font-medium">Fin:</span> {planif.date_fin} {planif.heure_fin}</div>
                    <div><span className="font-medium">Type:</span> {planif.type}</div>
                    <div><span className="font-medium">Statut:</span> {planif.statut}</div>
                    <div><span className="font-medium">Limite:</span> {planif.limite_participation || planif.limite_participant || 0} participations</div>
                    <div><span className="font-medium">Participants:</span> {planif.participants?.length || 0}</div>
                  </div>
                </div>
                
                {/* Meilleur score */}
                {planif.participants && planif.participants.length > 0 && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-center min-w-[200px]">
                    <div className="text-xs text-yellow-600 uppercase font-semibold">Meilleur participant</div>
                    <div className="font-bold text-lg">{planif.participants[0]?.apprenant?.nom || 'N/A'}</div>
                    <div className="text-yellow-600 font-medium">{planif.participants[0]?.score || 0} points</div>
                  </div>
                )}
              </div>
              
              {/* Date de la session */}
              <div className="mt-3 text-xs text-gray-500">
                {new Date(planif.date_fin) > new Date() ? (
                  <span className="text-green-600 font-medium">Session active jusqu'au {planif.date_fin} {planif.heure_fin}</span>
                ) : (
                  <span>Session terminée le {planif.date_fin} {planif.heure_fin}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          {searchQuery || statusFilter || typeFilter ? (
            <p>Aucune planification ne correspond à vos critères de recherche.</p>
          ) : (
            <p>Aucune planification n'a encore été créée pour ce jeu.</p>
          )}
        </div>
      )}
    </div>
  );
}
