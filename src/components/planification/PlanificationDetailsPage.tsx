import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useTranslation } from "@/contexts/I18nContext";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Loader2, Sparkles } from "lucide-react";
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
  const { token, user } = useAuth();
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

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return t('dashboard.goodMorning');
    if (hour < 18) return t('dashboard.goodAfternoon');
    return t('dashboard.goodEvening');
  };

  const getFirstName = () => {
    if (user?.prenom) {
      return user.prenom.split(' ')[0];
    }
    return user?.name?.split(' ')[0] || t('dashboard.user');
  };

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
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
        {/* Enhanced Loading Background */}
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-400/30 to-purple-500/30 rounded-full -translate-y-48 translate-x-48 blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-br from-pink-400/30 to-indigo-500/30 rounded-full translate-y-36 -translate-x-36 blur-2xl animate-float"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-br from-teal-400/20 to-blue-500/20 rounded-full -translate-x-32 -translate-y-32 animate-pulse"></div>
        
        <Navbar />
        <div className="flex flex-col items-center justify-center h-[calc(100vh-5rem)] relative z-10">
          <div className="text-center space-y-6 p-8 bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 shadow-2xl">
            <div className="relative">
              <Loader2 className="h-16 w-16 animate-spin text-white mx-auto mb-4" />
              <Sparkles className="h-8 w-8 text-yellow-300 absolute -top-2 -right-2 animate-pulse" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">
                {getGreeting()} {getFirstName()}
              </h2>
              <p className="text-lg text-white/80">{t('planDetails.loading')}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!planification) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
        <PlanificationBackground />
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
          <div className="text-center py-12 bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 shadow-2xl">
            <h2 className="text-3xl font-bold text-white mb-4">{t('planDetails.notFound')}</h2>
            <p className="text-white/80 mb-8 text-lg">{t('planDetails.notFoundDesc')}</p>
            <Button 
              onClick={() => navigate("/dashboard")}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-none shadow-xl px-8 py-3 text-lg font-semibold"
            >
              {t('details.backToDashboard')}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-500/20 rounded-full -translate-y-48 translate-x-48 blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-br from-pink-400/20 to-indigo-500/20 rounded-full translate-y-36 -translate-x-36 blur-2xl animate-float"></div>
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-br from-teal-400/10 to-blue-500/10 rounded-full -translate-x-32 -translate-y-32 animate-pulse"></div>
      
      {/* Floating Sparkles */}
      <div className="absolute top-20 left-20 opacity-30 animate-float">
        <Sparkles className="w-6 h-6 text-yellow-300" />
      </div>
      <div className="absolute top-40 right-32 opacity-20 animate-pulse-slow">
        <Sparkles className="w-8 h-8 text-pink-300" />
      </div>
      <div className="absolute bottom-32 right-20 opacity-25 animate-float" style={{ animationDelay: '1s' }}>
        <Sparkles className="w-5 h-5 text-blue-300" />
      </div>
      
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {/* Welcome Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-black mb-3 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent drop-shadow-lg">
            {getGreeting()} {getFirstName()}
          </h1>
          <p className="text-white/80 text-lg">Détails de votre planification</p>
        </div>

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
