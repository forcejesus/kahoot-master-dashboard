
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2, ArrowLeft, GamepadIcon, Plus, Upload, X, ImageIcon } from "lucide-react";
import { CreateGamePreview } from "./CreateGamePreview";

export function CreateGameInterface() {
  const [isLoading, setIsLoading] = useState(false);
  const [titre, setTitre] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const { token } = useAuth();
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
    <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 h-full bg-white">
      {/* Configuration Panel - Left Side */}
      <div className="flex flex-col h-full border-r border-gray-100">
        {/* Header */}
        <div className="p-6 lg:p-8 border-b border-gray-100">
          <Button 
            variant="ghost" 
            className="mb-6 text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            onClick={() => navigate('/dashboard')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour au tableau de bord
          </Button>
          
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-sm">
                <GamepadIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 font-heading">
                  Créer un nouveau Kahoot
                </h1>
                <p className="text-gray-600 font-medium">
                  Donnez vie à vos idées pédagogiques
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Configuration Form */}
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
                onChange={(e) => setTitre(e.target.value)}
                disabled={isLoading}
                className="h-14 text-lg font-medium border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-200 rounded-xl px-6 shadow-sm hover:border-gray-300 transition-all duration-200"
                autoFocus
              />
              <p className="text-sm text-gray-500 flex items-center gap-1">
                💡 <span>Un bon titre attire l'attention et donne envie de jouer</span>
              </p>
            </div>

            {/* Image Upload */}
            <div className="space-y-4">
              <Label className="text-lg font-semibold text-gray-900 font-heading flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-blue-600" />
                Image du jeu
                <span className="text-sm font-normal text-gray-500">(Optionnel)</span>
              </Label>
              
              {!previewUrl ? (
                <div
                  className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 cursor-pointer ${
                    dragActive 
                      ? 'border-blue-400 bg-blue-50' 
                      : 'border-gray-300 bg-gray-50 hover:border-blue-300 hover:bg-blue-50/50'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => document.getElementById("image")?.click()}
                >
                  <div className="space-y-4">
                    <div className="mx-auto w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                      <Upload className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-gray-700 mb-2 font-heading">
                        {dragActive ? "Déposez votre image ici" : "Ajoutez une image à votre jeu"}
                      </p>
                      <p className="text-gray-500 font-medium">
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
                <div className="relative rounded-2xl overflow-hidden shadow-lg border border-gray-200">
                  <img 
                    src={previewUrl}
                    alt="Aperçu" 
                    className="w-full h-64 object-cover"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute top-4 right-4 rounded-full w-10 h-10 p-0 shadow-lg"
                    onClick={removeImage}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                  <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm text-white px-4 py-2 rounded-lg">
                    <p className="font-semibold text-sm">Image sélectionnée</p>
                    <p className="text-xs opacity-90">{image?.name}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="p-6 lg:p-8 border-t border-gray-100 bg-gray-50/50">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button 
                type="button" 
                variant="outline" 
                className="h-14 text-lg font-semibold border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 rounded-xl"
                onClick={() => navigate('/dashboard')}
                disabled={isLoading}
              >
                Annuler
              </Button>
              
              <Button 
                type="submit" 
                className="h-14 text-lg font-semibold bg-blue-600 hover:bg-blue-700 transition-all duration-200 shadow-lg rounded-xl group"
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
      <div className="bg-gray-50 h-full">
        <CreateGamePreview 
          title={titre}
          image={image}
        />
      </div>
    </div>
  );
}
