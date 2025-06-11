
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useTranslation } from "@/contexts/I18nContext";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { PlanificationDetail, StatisticsData } from "@/types/planification-details";
import { PlanificationBackground } from "@/components/planification/PlanificationBackground";
import { PlanificationBreadcrumb } from "@/components/planification/PlanificationBreadcrumb";
import { PlanificationDetailsActions } from "@/components/planification/PlanificationDetailsActions";
import { PlanificationDetailsContent } from "@/components/planification/PlanificationDetailsContent";
import { PlanificationDeleteDialog } from "@/components/planification/PlanificationDeleteDialog";

export function PlanificationDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { token } = useAuth();
  const { t } = useTranslation();
  const [planification, setPlanification] = useState<PlanificationDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [stats, setStats] = useState<StatisticsData>({
    bestScore: null,
    worstScore: null,
    totalParticipants: 0
  });

  // Récupérer les détails de la planification
  useEffect(() => {
    const fetchPlanificationDetails = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`http://kahoot.nos-apps.com/api/planification/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Erreur lors du chargement des détails de la planification');
        }

        const data = await response.json();
        setPlanification(data);
        
        // Calculer les statistiques
        if (data.participants && data.participants.length > 0) {
          const sortedParticipants = [...data.participants].sort((a, b) => b.score - a.score);
          
          const bestScore = {
            participant: sortedParticipants[0]
          };
          
          // Worst score only if there's more than one participant and the worst score is different from the best score
          const worstScore = sortedParticipants.length > 1 && sortedParticipants[0].score > sortedParticipants[sortedParticipants.length - 1].score
            ? { participant: sortedParticipants[sortedParticipants.length - 1] }
            : null;
          
          setStats({
            bestScore,
            worstScore,
            totalParticipants: data.participants.length
          });
        }
      } catch (error) {
        console.error('Error fetching planification details:', error);
        toast.error("Impossible de charger les détails de la planification");
      } finally {
        setIsLoading(false);
      }
    };
    
    if (id) {
      fetchPlanificationDetails();
    }
  }, [id, token]);

  const handleCopyPin = (pin: string) => {
    navigator.clipboard.writeText(pin);
    toast.success("PIN copié !");
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleDeleteClick = () => {
    setShowDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    if (!id) return;
    
    setIsDeleting(true);
    try {
      const response = await fetch(`http://kahoot.nos-apps.com/api/planification/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la suppression de la planification');
      }

      toast.success("Planification supprimée avec succès");
      
      if (planification?.jeu?._id) {
        navigate(`/game/${planification.jeu._id}`);
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Error deleting planification:', error);
      toast.error("Impossible de supprimer la planification");
    } finally {
      setIsDeleting(false);
      setShowDeleteDialog(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/30 to-blue-50/40 relative overflow-hidden">
        <PlanificationBackground />
        <Navbar />
        <div className="flex flex-col items-center justify-center h-[calc(100vh-5rem)] relative z-10">
          <Loader2 className="h-12 w-12 animate-spin text-teal-600 mb-4" />
          <p className="text-lg text-slate-600">{t('planDetails.loading')}</p>
        </div>
      </div>
    );
  }

  if (!planification) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/30 to-blue-50/40 relative overflow-hidden">
        <PlanificationBackground />
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">{t('planDetails.notFound')}</h2>
            <p className="text-slate-600 mb-8">{t('planDetails.notFoundDesc')}</p>
            <Button onClick={() => navigate("/dashboard")}>
              {t('details.backToDashboard')}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/30 to-blue-50/40 relative overflow-hidden">
      <PlanificationBackground />
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <PlanificationBreadcrumb planification={planification} />
        
        <PlanificationDetailsActions 
          onGoBack={handleGoBack}
          onDeleteClick={handleDeleteClick}
        />

        <PlanificationDetailsContent 
          planification={planification}
          stats={stats}
          onCopyPin={handleCopyPin}
        />
      </main>

      <PlanificationDeleteDialog 
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirmDelete={handleConfirmDelete}
        isDeleting={isDeleting}
      />
    </div>
  );
}
