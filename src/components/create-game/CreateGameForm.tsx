
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useTranslation } from "@/contexts/I18nContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2, Sparkles, GamepadIcon, Image as ImageIcon, Wand2 } from "lucide-react";
import { ImageUpload } from "./ImageUpload";

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

      const response = await fetch("http://kahoot.nos-apps.com/api/jeux", {
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
    <div className="h-full flex flex-col">
      {/* Header Section */}
      <div className="text-center mb-8 lg:mb-12">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-purple-500/80 to-blue-600/80 rounded-3xl mb-6 shadow-2xl backdrop-blur-sm border border-white/20 hover:scale-105 transition-transform duration-300">
          <Wand2 className="w-12 h-12 text-white" />
        </div>
        <h1 className="text-4xl lg:text-6xl font-black bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent mb-4">
          Créer votre Kahoot
        </h1>
        <p className="text-xl text-white/80 max-w-3xl mx-auto">
          Donnez vie à vos idées pédagogiques avec un jeu interactif captivant
        </p>
      </div>

      {/* Main Form */}
      <div className="flex-1 max-w-4xl mx-auto w-full">
        <form onSubmit={handleSubmit} className="h-full flex flex-col">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 flex-1">
            
            {/* Left Column - Game Information */}
            <div className="space-y-8">
              <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm overflow-hidden h-fit">
                <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6">
                  <CardTitle className="text-2xl font-bold flex items-center gap-3">
                    <GamepadIcon className="w-6 h-6" />
                    Informations du jeu
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="p-8 space-y-8">
                  {/* Game Title */}
                  <div className="space-y-4">
                    <Label htmlFor="titre" className="text-xl font-bold text-gray-800 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-purple-600" />
                      {t('create.titleLabel')}
                    </Label>
                    <Input
                      id="titre"
                      placeholder={t('create.titlePlaceholder')}
                      value={titre}
                      onChange={(e) => setTitre(e.target.value)}
                      disabled={isLoading}
                      className="h-16 text-lg border-2 border-gray-200 focus:border-purple-400 focus:ring-purple-200 transition-all duration-200 bg-white rounded-xl"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Media Upload */}
            <div className="space-y-8">
              <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm overflow-hidden h-fit">
                <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6">
                  <CardTitle className="text-2xl font-bold flex items-center gap-3">
                    <ImageIcon className="w-6 h-6" />
                    Image du jeu
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="p-8">
                  <ImageUpload 
                    image={image}
                    onImageChange={setImage}
                    isLoading={isLoading}
                  />
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 lg:mt-12 pt-8 border-t border-white/20">
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Button 
                type="button" 
                variant="outline" 
                className="flex-1 h-16 text-lg border-2 bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30 transition-all duration-200"
                onClick={() => navigate('/dashboard')}
                disabled={isLoading}
              >
                {t('create.cancel')}
              </Button>
              
              <Button 
                type="submit" 
                className="flex-1 h-16 text-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all duration-200 shadow-xl transform hover:scale-[1.02] disabled:transform-none"
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
          </div>
        </form>
      </div>
    </div>
  );
}
