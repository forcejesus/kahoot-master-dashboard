
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, ImageIcon, Loader2 } from "lucide-react";
import { buildApiUrl } from "@/config/api";

interface CreateGameModalProps {
  onSuccess?: () => void;
}

export function CreateGameModal({ onSuccess }: CreateGameModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [titre, setTitre] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const { token } = useAuth();
  const navigate = useNavigate();

  const resetForm = () => {
    setTitre("");
    setImage(null);
  };

  const handleClose = () => {
    resetForm();
    setIsOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!titre.trim()) {
      toast.error("Le titre est requis");
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("titre", titre);
      if (image) {
        formData.append("image", image);
      }

      console.log('Creating game with title:', titre);

      const response = await fetch(buildApiUrl("/api/jeux"), {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      const data = await response.json();
      
      console.log('Game creation response:', data);
      
      if (response.ok && data.statut === 200) {
        toast.success(data.message || "Jeu créé avec succès");
        setIsOpen(false);
        resetForm();
        
        if (data.jeu) {
          console.log('Navigating to game setup with:', {
            gameId: data.jeu._id,
            gameTitle: data.jeu.titre,
            gameImage: data.jeu.image
          });
          
          // Navigation vers la page de configuration avec les données du jeu
          navigate('/game/setup', {
            state: {
              gameId: data.jeu._id,
              gameTitle: data.jeu.titre,
              gameImage: data.jeu.image
            }
          });
        }
        onSuccess?.();
      } else {
        console.error('Game creation failed:', data);
        toast.error(data.message || "Erreur lors de la création du jeu");
      }
    } catch (error) {
      console.error("Request Error:", error);
      toast.error("Erreur lors de la création du jeu");
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          size="lg"
          className="w-full h-20 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
        >
          <Plus className="mr-2 h-6 w-6" />
          Créer un nouveau jeu
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-gradient-to-br from-orange-50 via-white to-orange-100 border-orange-200">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
            Créer un nouveau jeu
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          <div className="space-y-2">
            <Label htmlFor="titre" className="text-gray-700 font-medium">Nom du jeu</Label>
            <Input
              id="titre"
              placeholder="Entrez le nom du jeu"
              value={titre}
              onChange={(e) => setTitre(e.target.value)}
              disabled={isLoading}
              className="border-orange-200 focus:border-orange-400 focus:ring-orange-200"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="image" className="text-gray-700 font-medium">Image du jeu</Label>
            <div className="flex items-center gap-4">
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                disabled={isLoading}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById("image")?.click()}
                className="w-full border-orange-200 hover:bg-orange-50 hover:border-orange-300"
                disabled={isLoading}
              >
                <ImageIcon className="mr-2 h-4 w-4" />
                {image ? "Changer l'image" : "Ajouter une image"}
              </Button>
              {image && (
                <span className="text-sm text-gray-600 truncate max-w-[150px]">
                  {image.name}
                </span>
              )}
            </div>
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
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700" 
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Création...
                </>
              ) : (
                "Créer le jeu"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
