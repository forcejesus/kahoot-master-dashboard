
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Sparkles, GamepadIcon } from "lucide-react";
import { buildApiUrl } from "@/config/api";

interface CreateGameModalProps {
  onSuccess?: () => void;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function CreateGameModal({ onSuccess, isOpen, onOpenChange }: CreateGameModalProps) {
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [internalOpen, setInternalOpen] = useState(false);
  const { token } = useAuth();
  const navigate = useNavigate();

  const open = isOpen !== undefined ? isOpen : internalOpen;
  const setOpen = onOpenChange || setInternalOpen;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!titre.trim()) {
      toast.error("Le titre est requis");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(buildApiUrl("/api/jeux"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          titre: titre.trim(),
          description: description.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erreur lors de la création du jeu");
      }

      toast.success("Jeu créé avec succès !");
      setTitre("");
      setDescription("");
      setOpen(false);
      onSuccess?.();
      
      // Navigation vers la configuration du jeu
      navigate(`/game/setup`, { state: { gameId: data.data._id } });
    } catch (error: any) {
      toast.error(error.message || "Erreur lors de la création du jeu");
      console.error("Erreur:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const TriggerButton = () => (
    <div className="relative group cursor-pointer">
      {/* Effet de profondeur */}
      <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-700 rounded-3xl transform rotate-1 scale-105 opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600 rounded-3xl transform -rotate-1 scale-102 opacity-30 group-hover:opacity-40 transition-opacity duration-300"></div>
      
      <div className="relative backdrop-blur-xl bg-gradient-to-br from-orange-50 via-white to-orange-100 border-2 border-orange-200/50 rounded-3xl p-8 shadow-2xl shadow-orange-900/20 hover:shadow-3xl hover:shadow-orange-900/30 transition-all duration-300 transform hover:scale-[1.02] h-32 flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center space-x-3">
            <div className="h-12 w-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Plus className="h-6 w-6 text-white" />
            </div>
            <Sparkles className="h-6 w-6 text-orange-500 animate-pulse" />
          </div>
          
          <div>
            <h3 className="text-xl font-bold bg-gradient-to-r from-orange-600 via-orange-700 to-orange-800 bg-clip-text text-transparent">
              Créer un nouveau jeu
            </h3>
            <p className="text-sm text-orange-600/80 font-medium">
              Concevez vos expériences éducatives
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {!isOpen && (
        <DialogTrigger asChild>
          <TriggerButton />
        </DialogTrigger>
      )}
      
      <DialogContent className="sm:max-w-[700px] bg-gradient-to-br from-orange-50 via-white to-orange-100 border-2 border-orange-200/50 rounded-3xl shadow-2xl">
        <DialogHeader className="text-center space-y-4 pb-6">
          <div className="mx-auto h-16 w-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
            <GamepadIcon className="h-8 w-8 text-white" />
          </div>
          
          <div>
            <DialogTitle className="text-3xl font-black bg-gradient-to-r from-orange-600 via-orange-700 to-orange-800 bg-clip-text text-transparent">
              Créer un nouveau jeu éducatif
            </DialogTitle>
            <p className="text-orange-600/70 mt-2 text-lg">
              Donnez vie à vos idées pédagogiques avec AKILI
            </p>
          </div>
          
          {/* Ligne décorative */}
          <div className="flex items-center justify-center space-x-2">
            <div className="h-1 w-8 bg-gradient-to-r from-transparent to-orange-500 rounded-full"></div>
            <div className="h-1 w-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full shadow-lg"></div>
            <div className="h-1 w-8 bg-gradient-to-r from-orange-500 to-transparent rounded-full"></div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-3">
            <label className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
              <span>Titre du jeu</span>
              <span className="text-orange-500">*</span>
            </label>
            <Input
              value={titre}
              onChange={(e) => setTitre(e.target.value)}
              placeholder="ex: Quiz sur la géographie mondiale"
              className="w-full h-14 text-lg border-2 border-orange-200 focus:border-orange-400 focus:ring-orange-200 bg-white/80 rounded-xl"
              required
            />
            <p className="text-sm text-orange-600/70 font-medium">
              Choisissez un titre accrocheur qui motivera vos apprenants
            </p>
          </div>

          <div className="space-y-3">
            <label className="text-lg font-semibold text-gray-800">
              Description (optionnelle)
            </label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Décrivez les objectifs pédagogiques, le niveau requis, ou toute information utile pour les apprenants..."
              className="w-full min-h-[120px] text-lg border-2 border-orange-200 focus:border-orange-400 focus:ring-orange-200 bg-white/80 rounded-xl resize-none"
            />
            <p className="text-sm text-orange-600/70 font-medium">
              Une description claire aidera vos étudiants à comprendre le contexte du jeu
            </p>
          </div>

          <div className="flex gap-4 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              className="w-full h-14 border-2 border-orange-200 hover:bg-orange-50 text-lg font-semibold rounded-xl"
              onClick={() => setOpen(false)}
            >
              Annuler
            </Button>
            <Button 
              type="submit" 
              className="w-full h-14 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Création en cours...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Plus className="h-5 w-5" />
                  <span>Créer le jeu</span>
                </div>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
