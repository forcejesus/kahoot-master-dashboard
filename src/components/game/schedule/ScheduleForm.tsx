
import { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { PlanificationFormData, PlanificationResponse, Kahoot } from "@/types/game-details";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Copy, Loader2 } from "lucide-react";
import { format } from "date-fns";

export function ScheduleForm() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const kahoot = location.state?.jeu as Kahoot | undefined;
  const { token } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdPin, setCreatedPin] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<PlanificationFormData>({
    statut: "en attente",
    date_debut: format(new Date(), "yyyy/MM/dd"),
    date_fin: format(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), "yyyy/MM/dd"), // 7 jours plus tard
    heure_debut: "08h00",
    heure_fin: "18h00",
    limite_participant: 10,
    type: "attribuer",
    jeu: id || "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCopyPin = () => {
    if (createdPin) {
      navigator.clipboard.writeText(createdPin);
      toast.success("PIN copié dans le presse-papier");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.jeu) {
      toast.error("L'ID du jeu est manquant");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch("http://kahoot.nos-apps.com/api/planification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      
      const responseData: PlanificationResponse = await response.json();
      console.log("Réponse API Planification:", responseData);
      
      if (response.ok && responseData.success) {
        toast.success("Planification créée avec succès");
        setCreatedPin(responseData.data.pin);
      } else {
        toast.error(`Erreur: ${responseData.message || "Échec de la création de la planification"}`);
      }
    } catch (error) {
      console.error("Erreur lors de la création de la planification:", error);
      toast.error("Erreur lors de la création de la planification");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Planifier un jeu</CardTitle>
        <CardDescription>
          Définissez quand et comment votre jeu sera accessible aux participants
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
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
          
          {!createdPin && (
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Création en cours...
                </>
              ) : (
                "Créer la planification"
              )}
            </Button>
          )}
        </form>
      </CardContent>
      
      {createdPin && (
        <CardFooter className="flex flex-col space-y-4">
          <div className="p-4 bg-green-50 rounded-lg border border-green-200 text-center w-full">
            <p className="text-green-600 mb-2">Planification créée avec succès !</p>
            <div className="flex items-center justify-center space-x-2">
              <span className="font-mono text-xl font-bold">{createdPin}</span>
              <Button 
                size="sm" 
                variant="outline" 
                onClick={handleCopyPin}
                className="gap-1"
              >
                <Copy className="h-4 w-4" />
                Copier le PIN
              </Button>
            </div>
          </div>
          <div className="flex space-x-4 w-full">
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => navigate(`/game/${id}`)}
            >
              Retour au jeu
            </Button>
            <Button 
              className="flex-1"
              onClick={() => {
                setCreatedPin(null);
                setFormData({
                  ...formData,
                  date_debut: format(new Date(), "yyyy/MM/dd"),
                  date_fin: format(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), "yyyy/MM/dd"),
                });
              }}
            >
              Nouvelle planification
            </Button>
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
