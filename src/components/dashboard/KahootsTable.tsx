
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ExternalLink, Loader2, Trash2 } from "lucide-react";
import { useState } from "react";
import { DeleteConfirmDialog } from "./DeleteConfirmDialog";
import { Kahoot } from "@/types/dashboard";

interface KahootsTableProps {
  kahoots: Kahoot[];
  isLoading: boolean;
  onKahootClick: (kahoot: Kahoot, e: React.MouseEvent) => void;
  onDeleteSelected: (selectedIds: string[]) => Promise<void>;
  isDeleting: boolean;
}

export const KahootsTable = ({
  kahoots,
  isLoading,
  onKahootClick,
  onDeleteSelected,
  isDeleting
}: KahootsTableProps) => {
  const [selectedKahoots, setSelectedKahoots] = useState<string[]>([]);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleSelectKahoot = (kahootId: string) => {
    setSelectedKahoots(prev => 
      prev.includes(kahootId) 
        ? prev.filter(id => id !== kahootId)
        : [...prev, kahootId]
    );
  };

  const handleSelectAll = () => {
    if (selectedKahoots.length === kahoots.length) {
      setSelectedKahoots([]);
    } else {
      setSelectedKahoots(kahoots.map(k => k._id));
    }
  };

  const handleDeleteConfirm = async () => {
    await onDeleteSelected(selectedKahoots);
    setSelectedKahoots([]);
    setIsDeleteDialogOpen(false);
  };

  return (
    <Card className="backdrop-blur-sm bg-white/80 border-t border-white/50 shadow-2xl">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Mes Kahoots
        </CardTitle>
        {selectedKahoots.length > 0 && (
          <Button
            variant="destructive"
            onClick={() => setIsDeleteDialogOpen(true)}
            className="gap-2"
            disabled={isDeleting}
          >
            {isDeleting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Suppression...
              </>
            ) : (
              <>
                <Trash2 className="h-4 w-4" />
                Supprimer ({selectedKahoots.length})
              </>
            )}
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="text-center py-12 text-gray-500">Chargement...</div>
        ) : kahoots.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            Aucun kahoot créé pour le moment
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="py-4 px-6 text-left">
                    <Checkbox 
                      checked={selectedKahoots.length === kahoots.length && kahoots.length > 0}
                      onCheckedChange={handleSelectAll}
                    />
                  </th>
                  <th className="text-left py-4 px-6 text-primary font-bold">Titre</th>
                  <th className="text-center py-4 px-6 text-primary font-bold">Questions</th>
                  <th className="text-center py-4 px-6 text-primary font-bold">Sessions</th>
                  <th className="text-center py-4 px-6 text-primary font-bold">Participants</th>
                </tr>
              </thead>
              <tbody>
                {kahoots.map((kahoot) => (
                  <tr 
                    key={kahoot._id} 
                    className="border-b last:border-0 hover:bg-gray-50/50 transition-colors cursor-pointer"
                    onClick={(e) => onKahootClick(kahoot, e)}
                  >
                    <td className="py-4 px-6 checkbox-cell">
                      <Checkbox 
                        checked={selectedKahoots.includes(kahoot._id)}
                        onCheckedChange={() => handleSelectKahoot(kahoot._id)}
                      />
                    </td>
                    <td className="py-4 px-6">
                      <div className="font-medium text-left flex items-center text-primary">
                        {kahoot.titre}
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </div>
                    </td>
                    <td className="py-4 px-6 text-center">
                      {kahoot.questions?.length || 0}
                    </td>
                    <td className="py-4 px-6 text-center">
                      {kahoot.planifications?.length || 0}
                    </td>
                    <td className="py-4 px-6 text-center">
                      {kahoot.planifications?.reduce((total, p) => total + (p.participants?.length || 0), 0) || 0}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>

      <DeleteConfirmDialog 
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={handleDeleteConfirm}
        count={selectedKahoots.length}
        isDeleting={isDeleting}
      />
    </Card>
  );
};
