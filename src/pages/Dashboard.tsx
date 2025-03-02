
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Navbar } from '@/components/Navbar';
import { toast } from 'sonner';
import { StatsCards } from '@/components/dashboard/StatsCards';
import { KahootsTable } from '@/components/dashboard/KahootsTable';
import { Kahoot } from '@/types/dashboard';

export default function Dashboard() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [kahoots, setKahoots] = useState<Kahoot[]>([]);
  const [totalApprenants, setTotalApprenants] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchData = async () => {
    try {
      const kahootsResponse = await fetch('http://kahoot.nos-apps.com/api/jeux', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const kahootsData = await kahootsResponse.json();
      setKahoots(kahootsData.data);

      const apprenantResponse = await fetch('http://kahoot.nos-apps.com/api/apprenant', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const apprenantData = await apprenantResponse.json();
      setTotalApprenants(apprenantData.data.length);
    } catch (error) {
      toast.error("Erreur lors du chargement des données");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  const handleKahootClick = (kahoot: Kahoot, e: React.MouseEvent) => {
    if (e.target instanceof HTMLElement && e.target.closest('.checkbox-cell')) {
      return; // Ne pas naviguer si on clique sur la case à cocher
    }
    
    // Make sure we have the complete kahoot data before navigating
    console.log("Navigating to game details with data:", kahoot);
    navigate(`/game/${kahoot._id}`, { state: { jeu: kahoot } });
  };

  const handleDeleteSelected = async (selectedIds: string[]) => {
    setIsDeleting(true);
    try {
      for (const id of selectedIds) {
        await fetch(`http://kahoot.nos-apps.com/api/jeux/delete/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      }
      toast.success(`${selectedIds.length} kahoot(s) supprimé(s)`);
      fetchData();
    } catch (error) {
      toast.error("Erreur lors de la suppression");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <StatsCards 
          isLoading={isLoading}
          kahootsCount={kahoots.length}
          totalApprenants={totalApprenants}
          onSuccess={fetchData}
        />

        <KahootsTable 
          kahoots={kahoots}
          isLoading={isLoading}
          onKahootClick={handleKahootClick}
          onDeleteSelected={handleDeleteSelected}
          isDeleting={isDeleting}
        />
      </main>
    </div>
  );
}
