
import { Planification } from "@/types/game-details";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Search, Loader2, ExternalLink, Filter } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  
  // Fetch planifications from API
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
  
  // Get unique status values for the dropdown
  const statusOptions = Array.from(new Set(planifications.map(p => p.statut || "Non défini"))).sort();
  
  // Get unique type values for the dropdown
  const typeOptions = Array.from(new Set(planifications.map(p => p.type || "Standard"))).sort();
  
  const filteredPlanifications = planifications.filter((planif) => {
    const matchesSearch = [
      planif.pin,
      planif.meilleur_score?.apprenant,
      planif.type,
      planif.statut
    ].filter(Boolean).join(" ").toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = !statusFilter || planif.statut === statusFilter || 
      (!planif.statut && statusFilter === "Non défini");
    
    const matchesType = !typeFilter || planif.type === typeFilter || 
      (!planif.type && typeFilter === "Standard");
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const handleViewPlanification = (planificationId: string) => {
    navigate(`/planification/${planificationId}`);
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-sm p-6 border border-gray-100">
      <h2 className="text-xl font-bold text-primary mb-4">Toutes les planifications</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Search input */}
        <div className="relative col-span-1 md:col-span-3 lg:col-span-1">
          <Input
            type="text"
            placeholder="Rechercher par PIN, statut ou type..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        </div>
        
        {/* Status filter */}
        <div className="col-span-1">
          <Select 
            value={statusFilter} 
            onValueChange={setStatusFilter}
          >
            <SelectTrigger className="w-full">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-400" />
                <SelectValue placeholder="Statut : Tous" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Tous les statuts</SelectItem>
              {statusOptions.map(status => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {/* Type filter */}
        <div className="col-span-1">
          <Select 
            value={typeFilter} 
            onValueChange={setTypeFilter}
          >
            <SelectTrigger className="w-full">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-400" />
                <SelectValue placeholder="Type : Tous" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Tous les types</SelectItem>
              {typeOptions.map(type => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
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
                    <div><span className="font-medium">Début:</span> {planif.date_debut} {planif.heure_debut || ""}</div>
                    <div><span className="font-medium">Fin:</span> {planif.date_fin} {planif.heure_fin || ""}</div>
                    <div><span className="font-medium">Type:</span> {planif.type || "Standard"}</div>
                    <div><span className="font-medium">Statut:</span> {planif.statut || "Non défini"}</div>
                    <div><span className="font-medium">Limite:</span> {planif.limite_participation || "∞"} participations</div>
                    <div><span className="font-medium">Participants:</span> {planif.participants?.length || 0}</div>
                  </div>
                </div>
                
                {/* Meilleur score */}
                {planif.participants && planif.participants.length > 0 && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-center min-w-[200px]">
                    <div className="text-xs text-yellow-600 uppercase font-semibold">Meilleur participant</div>
                    <div className="font-bold text-lg">
                      {typeof planif.participants[0]?.apprenant === 'string' 
                        ? planif.participants[0]?.apprenant 
                        : planif.participants[0]?.apprenant 
                          ? (planif.participants[0]?.apprenant as any).prenom + ' ' + (planif.participants[0]?.apprenant as any).nom
                          : 'N/A'}
                    </div>
                    <div className="text-yellow-600 font-medium">{planif.participants[0]?.score || 0} points</div>
                  </div>
                )}
              </div>
              
              {/* Date de la session et bouton consulter */}
              <div className="mt-3 flex justify-between items-center">
                <div className="text-xs text-gray-500">
                  {new Date(planif.date_fin) > new Date() ? (
                    <span className="text-green-600 font-medium">Session active jusqu'au {planif.date_fin} {planif.heure_fin}</span>
                  ) : (
                    <span>Session terminée le {planif.date_fin} {planif.heure_fin}</span>
                  )}
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-xs" 
                  onClick={() => handleViewPlanification(planif._id)}
                >
                  <ExternalLink className="mr-1 h-3 w-3" />
                  Consulter la planification
                </Button>
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
