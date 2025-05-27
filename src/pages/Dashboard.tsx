
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navbar } from '@/components/Navbar';
import { modernToasts } from '@/components/ui/modern-alerts';
import { StatsSection } from '@/components/dashboard/StatsSection';
import { KahootList } from '@/components/dashboard/KahootList';
import { Kahoot } from '@/types/game-details';

export default function Dashboard() {
  const { token } = useAuth();
  const [kahoots, setKahoots] = useState<Kahoot[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    const loadingToast = modernToasts.loading(
      "Chargement des données...", 
      "Récupération de vos Kahoots"
    );

    try {
      const response = await fetch('http://kahoot.nos-apps.com/api/jeux', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      setKahoots(data.data);
      
      // Dismiss loading toast and show success
      loadingToast.dismiss();
      modernToasts.success(
        "Données chargées avec succès !",
        `${data.data.length} Kahoot(s) trouvé(s)`
      );
    } catch (error) {
      loadingToast.dismiss();
      modernToasts.error(
        "Erreur lors du chargement",
        "Impossible de récupérer vos données. Veuillez réessayer."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  const handleDeleteKahoots = async (kahootIds: string[]) => {
    const loadingToast = modernToasts.loading(
      "Suppression en cours...",
      `Suppression de ${kahootIds.length} Kahoot(s)`
    );

    try {
      for (const id of kahootIds) {
        await fetch(`http://kahoot.nos-apps.com/api/jeux/delete/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      }
      
      loadingToast.dismiss();
      modernToasts.success(
        "Suppression réussie !",
        `${kahootIds.length} Kahoot(s) supprimé(s) avec succès`
      );
      fetchData();
    } catch (error) {
      loadingToast.dismiss();
      modernToasts.error(
        "Erreur lors de la suppression",
        "Une erreur est survenue. Veuillez réessayer."
      );
      throw error;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <StatsSection onKahootCreated={fetchData} />
        <KahootList 
          kahoots={kahoots} 
          isLoading={isLoading} 
          onDelete={handleDeleteKahoots} 
        />
      </main>
    </div>
  );
}
