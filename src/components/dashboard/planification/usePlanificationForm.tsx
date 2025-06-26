
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { format } from "date-fns";
import { buildApiUrl } from "@/config/api";

interface UsePlanificationFormProps {
  gameId?: string;
  onSuccess?: () => void;
  onClose?: () => void;
}

export function usePlanificationForm({ gameId, onSuccess, onClose }: UsePlanificationFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedGame, setSelectedGame] = useState(gameId || "");
  const [dateDebut, setDateDebut] = useState(format(new Date(), "yyyy-MM-dd"));
  const [dateFin, setDateFin] = useState(format(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), "yyyy-MM-dd"));
  const [heureDebut, setHeureDebut] = useState("08:00");
  const [heureFin, setHeureFin] = useState("18:00");
  const [limiteParticipant, setLimiteParticipant] = useState("10");
  const { token } = useAuth();

  const resetForm = () => {
    setSelectedGame(gameId || "");
    setDateDebut(format(new Date(), "yyyy-MM-dd"));
    setDateFin(format(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), "yyyy-MM-dd"));
    setHeureDebut("08:00");
    setHeureFin("18:00");
    setLimiteParticipant("10");
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
        resetForm();
        onSuccess?.();
        onClose?.();
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

  return {
    isLoading,
    selectedGame,
    setSelectedGame,
    dateDebut,
    setDateDebut,
    dateFin,
    setDateFin,
    heureDebut,
    setHeureDebut,
    heureFin,
    setHeureFin,
    limiteParticipant,
    setLimiteParticipant,
    resetForm,
    handleSubmit
  };
}
