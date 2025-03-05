
import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navbar } from '@/components/Navbar';
import { toast } from 'sonner';
import { Kahoot } from '@/types/game-details';
import { DashboardStats } from '@/components/dashboard/DashboardStats';
import { KahootList } from '@/components/dashboard/KahootList';

export default function Dashboard() {
  const { token } = useAuth();
  const [kahoots, setKahoots] = useState<Kahoot[]>([]);
  const [totalApprenants, setTotalApprenants] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <DashboardStats
          kahoots={kahoots}
          totalApprenants={totalApprenants}
          isLoading={isLoading}
          onCreateSuccess={fetchData}
        />

        <KahootList 
          kahoots={kahoots}
          isLoading={isLoading}
          onRefresh={fetchData}
        />
      </main>
    </div>
  );
}
