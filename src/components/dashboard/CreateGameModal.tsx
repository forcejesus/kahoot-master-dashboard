
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
import { Plus, ImageIcon, Loader2, Gamepad2, Sparkles } from "lucide-react";
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
        <div className="relative group cursor-pointer">
          {/* Effet de profondeur */}
          <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-700 rounded-3xl transform rotate-1 scale-105 opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600 rounded-3xl transform -rotate-1 scale-102 opacity-30 group-hover:opacity-40 transition-opacity duration-300"></div>
          
          <div className="relative backdrop-blur-xl bg-gradient-to-br from-orange-50 via-white to-orange-100 border-2 border-orange-200/50 rounded-3xl p-8 shadow-2xl shadow-orange-900/20 hover:shadow-3xl hover:shadow-orange-900/30 transition-all duration-300 transform hover:scale-[1.02] h-32 flex items-center justify-center">
            <div className="text-center space-y-3">
              <div className="flex items-center justify-center space-x-3">
                <div className="h-12 w-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Gamepad2 className="h-6 w-6 text-white" />
                </div>
                <Sparkles className="h-6 w-6 text-orange-500 animate-pulse" />
              </div>
              
              <div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-orange-600 via-orange-700 to-orange-800 bg-clip-text text-transparent">
                  Créer un nouveau jeu
                </h3>
                <p className="text-sm text-orange-600/80 font-medium">
                  Démarrez votre aventure éducative
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[600px] bg-gradient-to-br from-orange-50 via-white to-orange-100 border-2 border-orange-200/50 rounded-3xl shadow-2xl">
        <DialogHeader className="text-center space-y-4 pb-6">
          <div className="mx-auto h-16 w-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
            <Gamepad2 className="h-8 w-8 text-white" />
          </div>
          
          <div>
            <DialogTitle className="text-3xl font-black bg-gradient-to-r from-orange-600 via-orange-700 to-orange-800 bg-clip-text text-transparent">
              Créer un nouveau jeu
            </DialogTitle>
            <p className="text-orange-600/70 mt-2 text-lg">
              Donnez vie à vos idées éducatives
            </p>
          </div>
          
          {/* Ligne décorative */}
          <div className="flex items-center justify-center space-x-2">
            <div className="h-1 w-8 bg-gradient-to-r from-transparent to-orange-500 rounded-full"></div>
            <div className="h-1 w-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full shadow-lg"></div>
            <div className="h-1 w-8 bg-gradient-to-r from-orange-500 to-transparent rounded-full"></div>
          </div>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="titre" className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
                <span>Nom du jeu</span>
                <span className="text-orange-500">*</span>
              </Label>
              <Input
                id="titre"
                placeholder="Ex: Quiz sur l'Histoire de France, Mathématiques niveau 5ème..."
                value={titre}
                onChange={(e) => setTitre(e.target.value)}
                disabled={isLoading}
                className="h-14 text-lg border-2 border-orange-200 focus:border-orange-400 focus:ring-orange-200 bg-white/80 rounded-xl px-4 placeholder:text-gray-400"
              />
              <p className="text-sm text-orange-600/70">
                Choisissez un nom attractif et descriptif pour votre jeu
              </p>
            </div>
            
            <div className="space-y-3">
              <Label htmlFor="image" className="text-lg font-semibold text-gray-800">
                Image du jeu (optionnel)
              </Label>
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
                  className="w-full h-14 border-2 border-orange-200 hover:bg-orange-50 hover:border-orange-300 rounded-xl text-lg"
                  disabled={isLoading}
                >
                  <ImageIcon className="mr-3 h-5 w-5" />
                  {image ? "Changer l'image" : "Ajouter une image"}
                </Button>
              </div>
              {image && (
                <div className="flex items-center space-x-3 p-3 bg-orange-50 rounded-xl border border-orange-200">
                  <ImageIcon className="h-5 w-5 text-orange-600" />
                  <span className="text-sm text-orange-700 font-medium truncate">
                    {image.name}
                  </span>
                </div>
              )}
              <p className="text-sm text-orange-600/70">
                Une image attrayante rendra votre jeu plus engageant
              </p>
            </div>
          </div>

          <div className="flex gap-4 pt-6">
            <Button 
              type="button" 
              variant="outline" 
              className="w-full h-14 border-2 border-orange-200 hover:bg-orange-50 text-lg font-semibold rounded-xl" 
              disabled={isLoading}
              onClick={handleClose}
            >
              Annuler
            </Button>
            
            <Button 
              type="submit" 
              className="w-full h-14 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200" 
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                  Création en cours...
                </>
              ) : (
                <>
                  <Plus className="mr-3 h-5 w-5" />
                  Créer le jeu
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
