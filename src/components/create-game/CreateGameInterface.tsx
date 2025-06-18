
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2, Sparkles, ArrowLeft, GamepadIcon, Plus, Save } from "lucide-react";
import { ImageUpload } from "./ImageUpload";
import { CreateGamePreview } from "./CreateGamePreview";

export function CreateGameInterface() {
  const [isLoading, setIsLoading] = useState(false);
  const [titre, setTitre] = useState("");
  const [image, setImage] = useState<File | null>(null);
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
    <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 h-full">
      {/* Configuration Panel - Left Side */}
      <div className="flex flex-col h-full p-4 lg:p-8 space-y-6 overflow-y-auto">
        {/* Header */}
        <div className="space-y-6">
          <Button 
            variant="ghost" 
            className="self-start text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300"
            onClick={() => navigate('/dashboard')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour au tableau de bord
          </Button>
          
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl mb-4 shadow-2xl">
              <GamepadIcon className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl lg:text-4xl font-black text-white mb-2">
              Créer un nouveau Kahoot
            </h1>
            <p className="text-lg text-white/70">
              Donnez vie à vos idées pédagogiques
            </p>
          </div>
        </div>

        {/* Configuration Form */}
        <form onSubmit={handleSubmit} className="flex-1 flex flex-col space-y-8">
          {/* Game Information Card */}
          <Card className="bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl hover:bg-white/15 transition-all duration-300">
            <CardContent className="p-6 lg:p-8 space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-8 bg-gradient-to-b from-purple-400 to-blue-500 rounded-full"></div>
                <h2 className="text-xl font-bold text-white">Informations du jeu</h2>
              </div>
              
              <div className="space-y-4">
                <Label htmlFor="titre" className="text-white font-semibold text-base">
                  Titre du jeu *
                </Label>
                <Input
                  id="titre"
                  placeholder="Entrez un titre accrocheur pour votre Kahoot..."
                  value={titre}
                  onChange={(e) => setTitre(e.target.value)}
                  disabled={isLoading}
                  className="h-14 text-lg bg-white/90 border-white/30 focus:bg-white focus:border-purple-400 transition-all duration-300 rounded-xl"
                  autoFocus
                />
              </div>
            </CardContent>
          </Card>

          {/* Media Upload Card */}
          <Card className="bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl hover:bg-white/15 transition-all duration-300">
            <CardContent className="p-6 lg:p-8 space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-8 bg-gradient-to-b from-indigo-400 to-purple-500 rounded-full"></div>
                <h2 className="text-xl font-bold text-white">Image du jeu</h2>
                <span className="text-sm text-white/60">(Optionnel)</span>
              </div>
              
              <ImageUpload 
                image={image}
                onImageChange={setImage}
                isLoading={isLoading}
              />
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex-1 flex items-end">
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button 
                type="button" 
                variant="outline" 
                className="h-14 text-lg bg-white/10 border-white/30 text-white hover:bg-white/20 transition-all duration-300 rounded-xl"
                onClick={() => navigate('/dashboard')}
                disabled={isLoading}
              >
                Annuler
              </Button>
              
              <Button 
                type="submit" 
                className="h-14 text-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-xl rounded-xl group"
                disabled={isLoading || !titre.trim()}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-3 h-6 w-6 animate-spin" />
                    Création en cours...
                  </>
                ) : (
                  <>
                    <Plus className="mr-3 h-6 w-6 group-hover:rotate-90 transition-transform duration-300" />
                    Créer le Kahoot
                  </>
                )}
              </Button>
            </div>
          </div>
        </form>
      </div>

      {/* Preview Panel - Right Side */}
      <div className="bg-black/20 backdrop-blur-sm border-l border-white/10 h-full">
        <CreateGamePreview 
          title={titre}
          image={image}
        />
      </div>
    </div>
  );
}
