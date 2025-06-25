import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useTranslation } from "@/contexts/I18nContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2, Sparkles, GamepadIcon } from "lucide-react";
import { ImageUpload } from "./ImageUpload";
import { buildApiUrl } from "@/config/hosts";

export function CreateGameForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [titre, setTitre] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const { token } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!titre.trim()) {
      toast.error(t('create.titleRequired'));
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("titre", titre);
      if (image) {
        formData.append("image", image);
      }

      const response = await fetch(buildApiUrl("/jeux"), {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      const data = await response.json();
      
      if (response.ok && data.statut === 200) {
        toast.success(data.message || t('create.success'));
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
        toast.error(data.message || t('create.error'));
      }
    } catch (error) {
      console.error("Request Error:", error);
      toast.error(t('create.error'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50 border-b border-gray-100 p-8">
        <CardTitle className="text-3xl font-bold text-gray-800 flex items-center gap-4">
          <div className="p-3 bg-white/60 rounded-2xl backdrop-blur-sm">
            <Sparkles className="h-8 w-8 text-purple-600" />
          </div>
          <div>
            <span>{t('create.gameInfo') || "Informations du jeu"}</span>
            <p className="text-purple-600/70 text-lg font-normal mt-1">
              Configurez votre nouveau Kahoot
            </p>
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Titre du jeu */}
          <div className="space-y-4">
            <Label htmlFor="titre" className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <GamepadIcon className="w-5 h-5 text-blue-600" />
              {t('create.titleLabel')}
            </Label>
            <Input
              id="titre"
              placeholder={t('create.titlePlaceholder')}
              value={titre}
              onChange={(e) => setTitre(e.target.value)}
              disabled={isLoading}
              className="h-16 text-lg border-2 border-gray-200 focus:border-purple-400 focus:ring-purple-200 transition-all duration-200 bg-white/80"
            />
          </div>
          
          {/* Zone d'upload d'image */}
          <ImageUpload 
            image={image}
            onImageChange={setImage}
            isLoading={isLoading}
          />

          {/* Boutons d'action */}
          <div className="flex gap-4 pt-8 border-t border-gray-100">
            <Button 
              type="button" 
              variant="outline" 
              className="flex-1 h-14 text-lg border-2"
              onClick={() => navigate('/dashboard')}
              disabled={isLoading}
            >
              {t('create.cancel')}
            </Button>
            
            <Button 
              type="submit" 
              className="flex-1 h-14 text-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all duration-200 shadow-xl transform hover:scale-[1.02]"
              disabled={isLoading || !titre.trim()}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-3 h-6 w-6 animate-spin" />
                  {t('create.creating')}
                </>
              ) : (
                <>
                  <Sparkles className="mr-3 h-6 w-6" />
                  {t('create.kahoot')}
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
