
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { KahootTable } from './KahootTable';
import { Kahoot } from '@/types/game-details';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { CreateKahootDialog } from '@/components/CreateKahootDialog';

interface KahootListProps {
  kahoots: Kahoot[];
  isLoading: boolean;
  onRefresh: () => Promise<void>;
}

export function KahootList({ kahoots, isLoading, onRefresh }: KahootListProps) {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  return (
    <Card className="backdrop-blur-sm bg-white/80 border-t border-white/50 shadow-2xl">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Mes Kahoots
        </CardTitle>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Créer un Kahoot
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <CreateKahootDialog 
              onSuccess={() => {
                setIsCreateDialogOpen(false);
                onRefresh();
              }} 
            />
          </DialogContent>
        </Dialog>
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
