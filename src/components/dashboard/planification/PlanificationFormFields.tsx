
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Kahoot } from "@/types/game-details";

interface PlanificationFormFieldsProps {
  kahoots: Kahoot[];
  isGameDetail: boolean;
  isLoading: boolean;
  selectedGame: string;
  setSelectedGame: (value: string) => void;
  dateDebut: string;
  setDateDebut: (value: string) => void;
  dateFin: string;
  setDateFin: (value: string) => void;
  heureDebut: string;
  setHeureDebut: (value: string) => void;
  heureFin: string;
  setHeureFin: (value: string) => void;
  limiteParticipant: string;
  setLimiteParticipant: (value: string) => void;
}

export function PlanificationFormFields({
  kahoots,
  isGameDetail,
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
  setLimiteParticipant
}: PlanificationFormFieldsProps) {
  return (
    <div className="space-y-6">
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
    </div>
  );
}
