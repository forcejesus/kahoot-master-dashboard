
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useTranslation } from "@/contexts/I18nContext";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { ArrowLeft, ImageIcon, Loader2, Sparkles, GamepadIcon } from "lucide-react";

export default function CreateGame() {
  const [isLoading, setIsLoading] = useState(false);
  const [titre, setTitre] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { token } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      
      // Créer une URL de prévisualisation
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header avec bouton retour */}
        <div className="mb-8">
          <Button 
            variant="outline" 
            className="mb-6 bg-white/80 backdrop-blur-sm border-gray-200 hover:bg-white hover:border-gray-300 transition-all duration-200 shadow-sm"
            onClick={() => navigate('/dashboard')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('game.backToDashboard')}
          </Button>
          
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl mb-4 shadow-lg">
              <GamepadIcon className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-purple-800 to-blue-800 bg-clip-text text-transparent mb-2">
              Créer un nouveau jeu
            </h1>
            <p className="text-lg text-gray-600">
              Donnez vie à vos idées avec un jeu interactif captivant
            </p>
          </div>
        </div>

        {/* Formulaire principal */}
        <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50 border-b border-gray-100 p-8">
            <CardTitle className="text-2xl font-bold text-gray-800 flex items-center gap-3">
              <Sparkles className="h-6 w-6 text-purple-600" />
              Informations du jeu
            </CardTitle>
          </CardHeader>
          
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Champ titre */}
              <div className="space-y-3">
                <Label htmlFor="titre" className="text-lg font-semibold text-gray-800">
                  Titre du jeu
                </Label>
                <Input
                  id="titre"
                  placeholder="Donnez un nom accrocheur à votre jeu..."
                  value={titre}
                  onChange={(e) => setTitre(e.target.value)}
                  disabled={isLoading}
                  className="h-14 text-lg border-2 border-gray-200 focus:border-purple-400 focus:ring-purple-200 transition-all duration-200"
                />
              </div>
              
              {/* Section image */}
              <div className="space-y-4">
                <Label className="text-lg font-semibold text-gray-800">
                  Image du jeu (optionnel)
                </Label>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Zone d'upload */}
                  <div className="space-y-4">
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
                      className="w-full h-32 border-2 border-dashed border-gray-300 hover:border-purple-400 hover:bg-purple-50 transition-all duration-200 text-gray-600 hover:text-purple-700"
                      disabled={isLoading}
                    >
                      <div className="text-center">
                        <ImageIcon className="mx-auto h-8 w-8 mb-2" />
                        <div className="text-sm font-medium">
                          {image ? 'Changer l\'image' : 'Ajouter une image'}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          PNG, JPG jusqu'à 10MB
                        </div>
                      </div>
                    </Button>
                    
                    {image && (
                      <div className="text-sm text-gray-600 p-3 bg-gray-50 rounded-lg">
                        <span className="font-medium">Fichier sélectionné:</span>
                        <br />
                        <span className="truncate">{image.name}</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Prévisualisation */}
                  {previewUrl && (
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700">
                        Aperçu
                      </Label>
                      <div className="relative overflow-hidden rounded-xl shadow-lg">
                        <img 
                          src={previewUrl}
                          alt="Aperçu" 
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Boutons d'action */}
              <div className="flex gap-4 pt-6 border-t">
                <Button 
                  type="button" 
                  variant="outline" 
                  className="flex-1 h-12 text-base"
                  onClick={() => navigate('/dashboard')}
                  disabled={isLoading}
                >
                  Annuler
                </Button>
                
                <Button 
                  type="submit" 
                  className="flex-1 h-12 text-base bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all duration-200 shadow-lg"
                  disabled={isLoading || !titre.trim()}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Création en cours...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-5 w-5" />
                      Créer le jeu
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
