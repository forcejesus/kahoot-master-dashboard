
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Calendar, Loader2, Clock } from "lucide-react";
import { buildApiUrl } from "@/config/api";
import { Kahoot } from "@/types/game-details";
import { format } from "date-fns";

interface CreatePlanificationModalProps {
  kahoots: Kahoot[];
  onSuccess?: () => void;
}

export function CreatePlanificationModal({ kahoots, onSuccess }: CreatePlanificationModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedGame, setSelectedGame] = useState(kahoots.length === 1 ? kahoots[0]._id : "");
  const [dateDebut, setDateDebut] = useState(format(new Date(), "yyyy-MM-dd"));
  const [dateFin, setDateFin] = useState(format(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), "yyyy-MM-dd"));
  const [heureDebut, setHeureDebut] = useState("08:00");
  const [heureFin, setHeureFin] = useState("18:00");
  const [limiteParticipant, setLimiteParticipant] = useState("10");
  const { token } = useAuth();

  // Reset selected game when kahoots change
  useState(() => {
    if (kahoots.length === 1) {
      setSelectedGame(kahoots[0]._id);
    }
  });

  const resetForm = () => {
    setSelectedGame(kahoots.length === 1 ? kahoots[0]._id : "");
    setDateDebut(format(new Date(), "yyyy-MM-dd"));
    setDateFin(format(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), "yyyy-MM-dd"));
    setHeureDebut("08:00");
    setHeureFin("18:00");
    setLimiteParticipant("10");
  };

  const handleClose = () => {
    resetForm();
    setIsOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedGame) {
      toast.error("Veuillez sélectionner un jeu");
      return;
    }

    setIsLoading(true);

    try {
      const planificationData = {
        statut: "en attente",
        date_debut: dateDebut.replace(/-/g, '/'),
        date_fin: dateFin.replace(/-/g, '/'),
        heure_debut: heureDebut.replace(':', 'h'),
        heure_fin: heureFin.replace(':', 'h'),
        limite_participant: parseInt(limiteParticipant),
        type: "attribuer",
        jeu: selectedGame,
      };

      const response = await fetch(buildApiUrl("/api/planification"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(planificationData),
      });

      const data = await response.json();
      
      if (response.ok && data.success) {
        toast.success("Planification créée avec succès");
        if (data.data?.pin) {
          toast.success(`PIN généré: ${data.data.pin}`);
        }
        setIsOpen(false);
        resetForm();
        onSuccess?.();
      } else {
        toast.error(data.message || "Erreur lors de la création de la planification");
      }
    } catch (error) {
      console.error("Request Error:", error);
      toast.error("Erreur lors de la création de la planification");
    } finally {
      setIsLoading(false);
    }
  };

  // Determine trigger button style based on context
  const isGameDetail = kahoots.length === 1;
  const triggerButton = isGameDetail ? (
    <Button
      variant="outline"
      className="bg-white/10 hover:bg-white hover:text-primary transition-all duration-200 text-white border-white/20"
    >
      <Clock className="mr-2 h-4 w-4" />
      Planifier une session
    </Button>
  ) : (
    <Button 
      size="lg"
      className="w-full h-20 bg-gradient-to-r from-violet-500 to-violet-600 hover:from-violet-600 hover:to-violet-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
    >
      <Calendar className="mr-2 h-6 w-6" />
      Créer une planification
    </Button>
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {triggerButton}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] bg-gradient-to-br from-orange-50 via-white to-orange-100 border-orange-200">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
            {isGameDetail ? `Planifier une session pour ${kahoots[0].titre}` : "Créer une planification"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          {!isGameDetail && (
            <div className="space-y-2">
              <Label htmlFor="game" className="text-gray-700 font-medium">Sélectionner un jeu</Label>
              <Select value={selectedGame} onValueChange={setSelectedGame} disabled={isLoading}>
                <SelectTrigger className="border-orange-200 focus:border-orange-400 focus:ring-orange-200">
                  <SelectValue placeholder="Choisir un jeu" />
                </SelectTrigger>
                <SelectContent>
                  {kahoots.map((kahoot) => (
                    <SelectItem key={kahoot._id} value={kahoot._id}>
                      {kahoot.titre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dateDebut" className="text-gray-700 font-medium">Date de début</Label>
              <Input
                id="dateDebut"
                type="date"
                value={dateDebut}
                onChange={(e) => setDateDebut(e.target.value)}
                disabled={isLoading}
                className="border-orange-200 focus:border-orange-400 focus:ring-orange-200"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dateFin" className="text-gray-700 font-medium">Date de fin</Label>
              <Input
                id="dateFin"
                type="date"
                value={dateFin}
                onChange={(e) => setDateFin(e.target.value)}
                disabled={isLoading}
                className="border-orange-200 focus:border-orange-400 focus:ring-orange-200"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="heureDebut" className="text-gray-700 font-medium">Heure de début</Label>
              <Input
                id="heureDebut"
                type="time"
                value={heureDebut}
                onChange={(e) => setHeureDebut(e.target.value)}
                disabled={isLoading}
                className="border-orange-200 focus:border-orange-400 focus:ring-orange-200"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="heureFin" className="text-gray-700 font-medium">Heure de fin</Label>
              <Input
                id="heureFin"
                type="time"
                value={heureFin}
                onChange={(e) => setHeureFin(e.target.value)}
                disabled={isLoading}
                className="border-orange-200 focus:border-orange-400 focus:ring-orange-200"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="limite" className="text-gray-700 font-medium">Limite de participants</Label>
            <Input
              id="limite"
              type="number"
              min="1"
              value={limiteParticipant}
              onChange={(e) => setLimiteParticipant(e.target.value)}
              disabled={isLoading}
              className="border-orange-200 focus:border-orange-400 focus:ring-orange-200"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              className="w-full border-orange-200 hover:bg-orange-50" 
              disabled={isLoading}
              onClick={handleClose}
            >
              Annuler
            </Button>
            
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-violet-500 to-violet-600 hover:from-violet-600 hover:to-violet-700" 
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Création...
                </>
              ) : (
                "Créer la planification"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
