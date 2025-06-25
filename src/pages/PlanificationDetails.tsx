import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useTranslation } from "@/contexts/I18nContext";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { PlanificationDetail, StatisticsData } from "@/types/planification-details";
import { PlanificationHeader } from "@/components/planification/PlanificationHeader";
import { PlanificationStats } from "@/components/planification/PlanificationStats";
import { ParticipantsList } from "@/components/planification/ParticipantsList";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";

export default function PlanificationDetails() {
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

  const handleCancelDelete = () => {
    setShowDeleteDialog(false);
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
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
        <Navbar />
        <div className="flex flex-col items-center justify-center h-[calc(100vh-5rem)]">
          <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
          <p className="text-lg text-gray-600">{t('planDetails.loading')}</p>
        </div>
      </div>
    );
  }

  if (!planification) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('planDetails.notFound')}</h2>
            <p className="text-gray-600 mb-8">{t('planDetails.notFoundDesc')}</p>
            <Button onClick={() => navigate("/dashboard")}>
              {t('details.backToDashboard')}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">{t('breadcrumb.dashboard')}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={`/game/${planification.jeu._id}`}>
                {planification.jeu.titre}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <span>{t('planDetails.title')}</span>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex items-center justify-between mb-6">
          <Button
            variant="outline"
            onClick={handleGoBack}
            className="bg-white shadow-sm hover:bg-gray-50"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('planDetails.backButton')}
          </Button>
          
          <Button
            variant="destructive"
            onClick={handleDeleteClick}
            className="shadow-sm"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            {t('planDetails.deleteButton')}
          </Button>
        </div>

        <div className="space-y-8 animate-fade-in">
          {/* En-tête de la planification */}
          <PlanificationHeader 
            planification={planification} 
            onCopyPin={handleCopyPin} 
          />

          {/* Statistiques de la planification */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-primary mb-4">{t('planDetails.sessionStats')}</h2>
            <PlanificationStats stats={stats} />
          </div>

          {/* Liste des participants */}
          <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-md p-6 border border-gray-200">
            <h2 className="text-xl font-bold text-primary mb-4">{t('planDetails.participants')}</h2>
            {planification.participants && planification.participants.length > 0 ? (
              <ParticipantsList participants={planification.participants} />
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>{t('planDetails.noParticipants')}</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('planDetails.confirmDelete')}</DialogTitle>
            <DialogDescription>
              {t('planDetails.confirmDeleteDesc')}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-col sm:flex-row sm:justify-end gap-2 mt-4">
            <Button variant="outline" onClick={handleCancelDelete}>
              {t('delete.cancel')}
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleConfirmDelete}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t('planDetails.deleting')}
                </>
              ) : (
                <>
                  <Trash2 className="mr-2 h-4 w-4" />
                  {t('delete.delete')}
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
