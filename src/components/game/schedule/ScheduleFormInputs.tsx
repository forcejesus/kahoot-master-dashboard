
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useScheduleForm } from "./ScheduleFormContext";
import { useEffect, useRef } from "react";

export function ScheduleFormInputs() {
  const { formData, handleInputChange, handleSelectChange, submitForm } = useScheduleForm();
  const formRef = useRef<HTMLFormElement>(null);
  
  // Sauvegarder les données du formulaire dans l'attribut data du formulaire
  useEffect(() => {
    if (formRef.current) {
      formRef.current.dataset.formData = JSON.stringify(formData);
    }
  }, [formData]);
  
  return (
    <form ref={formRef} onSubmit={submitForm} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="date_debut">Date de début</Label>
          <Input
            id="date_debut"
            name="date_debut"
            value={formData.date_debut}
            onChange={handleInputChange}
            placeholder="AAAA/MM/JJ"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="date_fin">Date de fin</Label>
          <Input
            id="date_fin"
            name="date_fin"
            value={formData.date_fin}
            onChange={handleInputChange}
            placeholder="AAAA/MM/JJ"
            required
          />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="heure_debut">Heure de début</Label>
          <Input
            id="heure_debut"
            name="heure_debut"
            value={formData.heure_debut}
            onChange={handleInputChange}
            placeholder="HHhMM"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="heure_fin">Heure de fin</Label>
          <Input
            id="heure_fin"
            name="heure_fin"
            value={formData.heure_fin}
            onChange={handleInputChange}
            placeholder="HHhMM"
            required
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="limite_participant">Nombre maximum de participants</Label>
        <Input
          id="limite_participant"
          name="limite_participant"
          type="number"
          min="1"
          value={formData.limite_participant}
          onChange={handleInputChange}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="type">Type de planification</Label>
        <Select
          value={formData.type}
          onValueChange={(value) => handleSelectChange("type", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Sélectionner le type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="attribuer">Attribuer</SelectItem>
            <SelectItem value="public">Public</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="statut">Statut</Label>
        <Select
          value={formData.statut}
          onValueChange={(value) => handleSelectChange("statut", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Sélectionner le statut" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en attente">En attente</SelectItem>
            <SelectItem value="en cours">En cours</SelectItem>
            <SelectItem value="terminé">Terminé</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </form>
  );
}
