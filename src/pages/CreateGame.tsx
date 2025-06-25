
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
import { ArrowLeft, Upload, Loader2, Sparkles, GamepadIcon, ImageIcon, X } from "lucide-react";

export default function CreateGame() {
  const [isLoading, setIsLoading] = useState(false);
  const [titre, setTitre] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const { token } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleImageChange = (file: File) => {
    setImage(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleImageChange(e.target.files[0]);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageChange(e.dataTransfer.files[0]);
    }
  };

  const removeImage = () => {
    setImage(null);
    setPreviewUrl(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
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
    <div className="min-h-screen relative overflow-hidden">
      {/* Arrière-plan moderne */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-50/70">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(236,72,153,0.1),transparent_50%)]"></div>
      </div>

      {/* Particules flottantes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400/20 rounded-full animate-float"></div>
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-purple-400/30 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-3/4 w-3 h-3 bg-pink-400/15 rounded-full animate-bounce" style={{ animationDelay: '2s' }}></div>
      </div>

      <Navbar />
      
      <main className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-fade-in">
          {/* Header */}
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
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-600 rounded-3xl mb-6 shadow-2xl">
                <GamepadIcon className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-5xl font-black bg-gradient-to-r from-gray-900 via-purple-800 to-blue-800 bg-clip-text text-transparent mb-4">
                {t('create.newKahoot')}
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                {t('create.subtitle') || "Donnez vie à vos idées avec un jeu interactif"}
              </p>
            </div>
          </div>

          {/* Formulaire principal */}
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
                
                {/* Zone d'upload d'image moderne */}
                <div className="space-y-4">
                  <Label className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <ImageIcon className="w-5 h-5 text-purple-600" />
                    {t('create.imageLabel')} 
                    <span className="text-sm font-normal text-gray-500">({t('create.optional') || "optionnel"})</span>
                  </Label>
                  
                  {!previewUrl ? (
                    <div
                      className={`relative border-2 border-dashed rounded-3xl p-12 text-center transition-all duration-300 cursor-pointer ${
                        dragActive 
                          ? 'border-purple-400 bg-purple-50 scale-105' 
                          : 'border-gray-300 bg-gray-50/50 hover:border-purple-300 hover:bg-purple-50/50'
                      }`}
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                      onClick={() => document.getElementById("image")?.click()}
                    >
                      <div className="space-y-4">
                        <div className="mx-auto w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
                          <Upload className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <p className="text-lg font-semibold text-gray-700 mb-2">
                            {dragActive ? "Déposez votre image ici" : "Ajoutez une image à votre jeu"}
                          </p>
                          <p className="text-gray-500">
                            Glissez-déposez ou cliquez pour sélectionner
                          </p>
                          <p className="text-sm text-gray-400 mt-2">
                            PNG, JPG jusqu'à 10MB
                          </p>
                        </div>
                      </div>
                      
                      <input
                        id="image"
                        type="file"
                        accept="image/*"
                        onChange={handleFileInput}
                        disabled={isLoading}
                        className="hidden"
                      />
                    </div>
                  ) : (
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                      <img 
                        src={previewUrl}
                        alt="Aperçu" 
                        className="w-full h-64 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute top-4 right-4 rounded-full w-10 h-10 p-0"
                        onClick={removeImage}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                      <div className="absolute bottom-4 left-4 text-white">
                        <p className="font-semibold">Image sélectionnée</p>
                        <p className="text-sm opacity-80">{image?.name}</p>
                      </div>
                    </div>
                  )}
                </div>

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
        </div>
      </main>
    </div>
  );
}
