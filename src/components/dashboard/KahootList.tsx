
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { KahootTable } from './KahootTable';
import { Kahoot } from '@/types/game-details';

interface KahootListProps {
  kahoots: Kahoot[];
  isLoading: boolean;
  onRefresh: () => Promise<void>;
}

export function KahootList({ kahoots, isLoading, onRefresh }: KahootListProps) {
  return (
    <Card className="backdrop-blur-sm bg-white/80 border-t border-white/50 shadow-2xl">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Mes Kahoots
        </CardTitle>
      </CardHeader>
      <CardContent>
        <KahootTable 
          kahoots={kahoots} 
          isLoading={isLoading} 
          onRefresh={onRefresh}
        />
      </CardContent>
    </Card>
  );
}
