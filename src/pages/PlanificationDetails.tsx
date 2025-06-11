
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/30 to-blue-50/40 relative overflow-hidden">
        {/* Motifs de fond paisibles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-teal-200/20 to-blue-200/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-slate-200/25 to-teal-200/25 rounded-full blur-3xl"></div>
        </div>
        
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
        {/* Motifs de fond paisibles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-teal-200/20 to-blue-200/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-slate-200/25 to-teal-200/25 rounded-full blur-3xl"></div>
        </div>
        
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
      {/* Motifs de fond paisibles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-teal-200/20 to-blue-200/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-slate-200/25 to-teal-200/25 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-gradient-to-br from-blue-100/20 to-slate-100/20 rounded-full blur-2xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-gradient-to-br from-teal-100/25 to-blue-100/25 rounded-full blur-2xl"></div>
      </div>

      {/* Motif géométrique subtil */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `radial-gradient(circle at 2px 2px, rgb(71, 85, 105) 1px, transparent 0)`,
        backgroundSize: '32px 32px'
      }}></div>

      {/* Lignes ondulées */}
      <div className="absolute inset-0 opacity-[0.03]">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0,15 Q25,8 50,15 T100,15 L100,0 L0,0 Z" fill="currentColor" className="text-teal-300"/>
          <path d="M0,85 Q25,78 50,85 T100,85 L100,100 L0,100 Z" fill="currentColor" className="text-blue-300"/>
        </svg>
      </div>
      
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
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
            className="bg-white/90 shadow-sm hover:bg-slate-50 backdrop-blur-sm"
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
            <h2 className="text-xl font-bold text-slate-700 mb-4">{t('planDetails.sessionStats')}</h2>
            <PlanificationStats stats={stats} />
          </div>

          {/* Liste des participants */}
          <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-6 border border-slate-200/50">
            <h2 className="text-xl font-bold text-slate-700 mb-4">{t('planDetails.participants')}</h2>
            {planification.participants && planification.participants.length > 0 ? (
              <ParticipantsList participants={planification.participants} />
            ) : (
              <div className="text-center py-8 text-slate-500">
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
