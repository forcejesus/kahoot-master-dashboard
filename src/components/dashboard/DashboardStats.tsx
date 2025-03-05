
import { StatCard } from './StatCard';
import { CreateKahootCard } from './CreateKahootCard';
import { Kahoot } from '@/types/game-details';

interface DashboardStatsProps {
  kahoots: Kahoot[];
  totalApprenants: number;
  isLoading: boolean;
  onCreateSuccess: () => void;
}

export function DashboardStats({ 
  kahoots, 
  totalApprenants, 
  isLoading, 
  onCreateSuccess 
}: DashboardStatsProps) {
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

      <CreateKahootCard onSuccess={onCreateSuccess} />
    </div>
  );
}
