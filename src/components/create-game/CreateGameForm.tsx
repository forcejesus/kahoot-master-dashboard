
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { CreateGameImageUpload } from "./CreateGameImageUpload";
import { CreateGameActions } from "./CreateGameActions";

interface CreateGameFormProps {
  titre: string;
  onTitreChange: (titre: string) => void;
  image: File | null;
  onImageChange: (image: File | null) => void;
}

export function CreateGameForm({ titre, onTitreChange, image, onImageChange }: CreateGameFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!titre.trim()) {
      toast.error('Le titre du jeu est requis');
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("titre", titre);
      if (image) {
        formData.append("image", image);
      }

      const response = await fetch("http://kahoot.nos-apps.com/api/jeux", {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      const data = await response.json();
      
      if (response.ok && data.statut === 200) {
        toast.success(data.message || 'Jeu créé avec succès !');
        if (data.jeu) {
          navigate('/game/setup', {
            state: {
              gameId: data.jeu._id,
              gameTitle: data.jeu.titre,
              gameImage: data.jeu.image
            }
          });
        }
      } else {
        toast.error(data.message || 'Erreur lors de la création du jeu');
      }
    } catch (error) {
      console.error("Request Error:", error);
      toast.error('Erreur lors de la création du jeu');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
      <div className="flex-1 p-6 lg:p-8 space-y-8 overflow-y-auto">
        {/* Game Title */}
        <div className="space-y-4">
          <Label htmlFor="titre" className="text-lg font-semibold text-gray-900 font-heading">
            Titre du jeu *
          </Label>
          <Input
            id="titre"
            placeholder="Entrez un titre accrocheur pour votre Kahoot..."
            value={titre}
            onChange={(e) => onTitreChange(e.target.value)}
            disabled={isLoading}
            className="h-14 text-lg font-medium border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-200 rounded-xl px-6 shadow-sm hover:border-gray-300 transition-all duration-200"
            autoFocus
          />
          <p className="text-sm text-gray-500 flex items-center gap-1">
            💡 <span>Un bon titre attire l'attention et donne envie de jouer</span>
          </p>
        </div>

        {/* Image Upload */}
        <CreateGameImageUpload 
          image={image}
          onImageChange={onImageChange}
          disabled={isLoading}
        />
      </div>

      {/* Action Buttons */}
      <CreateGameActions 
        isLoading={isLoading}
        isValid={!!titre.trim()}
      />
    </form>
  );
}
