
import { useState, useEffect } from 'react';
import { StatCard } from './StatCard';
import { CreateKahootDialog } from '@/components/CreateKahootDialog';
import { useAuth } from '@/contexts/AuthContext';
import { buildApiUrl } from '@/config/hosts';

interface StatsSectionProps {
  onKahootCreated: () => void;
}

export function StatsSection({ onKahootCreated }: StatsSectionProps) {
  const { token } = useAuth();
  const [kahoots, setKahoots] = useState([]);
  const [totalApprenants, setTotalApprenants] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const kahootsResponse = await fetch(buildApiUrl('/api/jeux'), {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const kahootsData = await kahootsResponse.json();
      setKahoots(kahootsData.data);

      const apprenantResponse = await fetch(buildApiUrl('/api/apprenant'), {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const apprenantData = await apprenantResponse.json();
      setTotalApprenants(apprenantData.data.length);
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, [token]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
      <StatCard 
        title="Total des Kahoots" 
        value={kahoots.length} 
        isLoading={isLoading}
      />
      
      <StatCard 
        title="Total des Apprenants" 
        value={totalApprenants} 
        isLoading={isLoading}
      />

      <Card className="transform transition-all duration-300 hover:scale-105 hover:shadow-xl bg-gradient-to-r from-primary to-secondary text-white border-none">
        <CardContent className="flex items-center justify-center h-full p-8">
          <CreateKahootDialog onSuccess={onKahootCreated} />
        </CardContent>
      </Card>
    </div>
  );
}

import { Card, CardContent } from '@/components/ui/card';
