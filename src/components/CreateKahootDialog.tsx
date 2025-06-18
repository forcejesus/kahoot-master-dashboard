
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useTranslation } from "@/contexts/I18nContext";
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
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Upload, X, Sparkles, GamepadIcon, Image as ImageIcon } from "lucide-react";

interface CreateKahootDialogProps {
  onSuccess?: () => void;
}

export function CreateKahootDialog({ onSuccess }: CreateKahootDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [titre, setTitre] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const { token } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const resetForm = () => {
    setTitre("");
    setImage(null);
    setPreviewUrl(null);
  };

  const handleClose = () => {
    resetForm();
    setIsOpen(false);
  };

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
        setIsOpen(false);
        resetForm();
        if (data.jeu) {
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
        toast.error(data.message || t('create.error'));
        console.error("API Error:", data);
      }
    } catch (error) {
      console.error("Request Error:", error);
      toast.error(t('create.error'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Card className="group relative overflow-hidden border-2 border-dashed border-gray-200 hover:border-blue-400 transition-all duration-300 cursor-pointer hover:shadow-xl bg-gradient-to-br from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100">
          <CardContent className="flex flex-col items-center justify-center p-12 text-center space-y-6">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Plus className="h-10 w-10 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center animate-pulse">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors">
                {t('create.kahoot')}
              </h3>
              <p className="text-gray-600 max-w-sm">
                Créez un nouveau quiz interactif et engageant pour vos participants
              </p>
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto p-0 gap-0">
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 text-white">
          <DialogHeader className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <GamepadIcon className="h-6 w-6 text-white" />
              </div>
              <div>
                <DialogTitle className="text-2xl font-bold text-white">
                  {t('create.newKahoot')}
                </DialogTitle>
                <p className="text-blue-100 mt-1">
                  Donnez vie à vos idées pédagogiques
                </p>
              </div>
            </div>
          </DialogHeader>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          {/* Titre du jeu */}
          <div className="space-y-4">
            <Label htmlFor="titre" className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              {t('create.titleLabel')} *
            </Label>
            <Input
              id="titre"
              placeholder={t('create.titlePlaceholder')}
              value={titre}
              onChange={(e) => setTitre(e.target.value)}
              disabled={isLoading}
              className="h-14 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-xl px-6 font-medium bg-gray-50/50 focus:bg-white transition-all duration-200"
              autoFocus
            />
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Sparkles className="h-4 w-4" />
              <span>Un titre accrocheur attire l'attention et donne envie de jouer</span>
            </div>
          </div>

          {/* Upload d'image */}
          <div className="space-y-4">
            <Label className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
              {t('create.imageLabel')}
              <span className="text-sm font-normal text-gray-500 ml-2">({t('create.optional') || "optionnel"})</span>
            </Label>
            
            {!previewUrl ? (
              <div
                className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 cursor-pointer ${
                  dragActive 
                    ? 'border-blue-400 bg-blue-50/80 scale-105' 
                    : 'border-gray-300 bg-gray-50/50 hover:border-blue-300 hover:bg-blue-50/30'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => document.getElementById("image")?.click()}
              >
                <div className="space-y-6">
                  <div className="mx-auto w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <Upload className="w-10 h-10 text-white" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-gray-800">
                      {dragActive ? "Déposez votre image ici" : "Ajoutez une image à votre quiz"}
                    </h3>
                    <p className="text-gray-600">
                      Glissez-déposez ou cliquez pour sélectionner une image
                    </p>
                    <p className="text-sm text-gray-500">
                      PNG, JPG, GIF jusqu'à 10MB
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
              <Card className="overflow-hidden border-2 border-gray-200">
                <div className="relative">
                  <img 
                    src={previewUrl}
                    alt="Aperçu" 
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute top-4 right-4 rounded-full w-10 h-10 p-0 shadow-lg hover:scale-110 transition-transform"
                    onClick={removeImage}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                  <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm text-white px-4 py-2 rounded-lg">
                    <div className="flex items-center gap-2">
                      <ImageIcon className="h-4 w-4" />
                      <div>
                        <p className="font-semibold text-sm">Image sélectionnée</p>
                        <p className="text-xs opacity-90">{image?.name}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            )}
          </div>

          {/* Boutons d'action */}
          <div className="flex gap-4 pt-6 border-t border-gray-200">
            <Button 
              type="button" 
              variant="outline" 
              className="flex-1 h-12 text-base font-semibold border-2"
              onClick={handleClose}
              disabled={isLoading}
            >
              {t('create.cancel')}
            </Button>
            
            <Button 
              type="submit" 
              className="flex-1 h-12 text-base font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-200"
              disabled={isLoading || !titre.trim()}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  {t('create.creating')}
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-5 w-5" />
                  {t('create.kahoot')}
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
