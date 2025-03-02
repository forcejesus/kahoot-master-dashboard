
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dot, Calendar, Play, Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Kahoot } from "@/types/game-details";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ScheduleDialog } from "../schedule/ScheduleDialog";

interface GameHeaderProps {
  jeu: Kahoot;
  onDeleteSuccess: () => void;
}

export function GameHeader({ jeu, onDeleteSuccess }: GameHeaderProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const { token } = useAuth();

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch(`http://kahoot.nos-apps.com/api/jeux/${jeu._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        toast.success("Jeu supprimé avec succès");
        onDeleteSuccess();
      } else {
        const data = await response.json();
        toast.error(data.message || "Erreur lors de la suppression");
      }
    } catch (error) {
      console.error("Erreur:", error);
      toast.error("Une erreur est survenue");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-8">
      <div className="flex flex-col md:flex-row md:items-start gap-6">
        <div className="w-full md:w-1/4 aspect-video md:aspect-square rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
          {jeu.image ? (
            <img
              src={jeu.image}
              alt={jeu.titre}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
              Pas d'image
            </div>
          )}
        </div>

        <div className="flex-1">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">{jeu.titre}</h1>
              <div className="flex items-center mt-2 text-sm text-gray-500">
                <span>Créé le {new Date(jeu.created_at).toLocaleDateString()}</span>
                <Dot className="mx-1" />
                <span>{jeu.questions?.length || 0} questions</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Badge variant={jeu.statut === "actif" ? "success" : "secondary"}>
                {jeu.statut === "actif" ? "Actif" : "Inactif"}
              </Badge>
              {jeu.est_public && (
                <Badge variant="outline">Public</Badge>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-500">Questions</div>
              <div className="text-2xl font-semibold">{jeu.questions?.length || 0}</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-500">Sessions planifiées</div>
              <div className="text-2xl font-semibold">{jeu.planifications?.length || 0}</div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mt-6">
            <Button variant="default" asChild className="gap-2">
              <Link to={`/game/${jeu._id}/play`}>
                <Play className="h-4 w-4" />
                Démarrer le jeu
              </Link>
            </Button>

            <ScheduleDialog gameId={jeu._id} gameTitle={jeu.titre} />

            <Button variant="outline" asChild className="gap-2">
              <Link to="#questions">
                <Pencil className="h-4 w-4" />
                Modifier les questions
              </Link>
            </Button>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" className="gap-2">
                  <Trash2 className="h-4 w-4" />
                  Supprimer
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Êtes-vous sûr de vouloir supprimer ce jeu?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Cette action est irréversible. Toutes les questions et données associées seront définitivement supprimées.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Annuler</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="bg-red-500 hover:bg-red-600"
                  >
                    {isDeleting ? "Suppression..." : "Supprimer"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>
    </div>
  );
}
