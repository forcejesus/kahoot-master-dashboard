
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Plus, ImageIcon, Loader2 } from 'lucide-react';
import { buildApiUrl } from '@/config/api';

interface GameCreationStep1Props {
  gameData: any;
  setGameData: (data: any) => void;
  onNext: (gameId: string, gameTitle: string) => void;
  token: string | null;
}

export function GameCreationStep1({ gameData, setGameData, onNext, token }: GameCreationStep1Props) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!gameData.titre.trim()) {
      toast.error("Le titre est requis");
      return;
    }

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("titre", gameData.titre);
      if (gameData.description) formData.append("description", gameData.description);
      if (gameData.niveau) formData.append("niveau", gameData.niveau);
      if (gameData.theme) formData.append("theme", gameData.theme);
      if (gameData.image) formData.append("image", gameData.image);

      const response = await fetch(buildApiUrl("/api/jeux"), {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erreur lors de la création du jeu");
      }

      toast.success("Jeu créé avec succès !");
      onNext(data.jeu._id, data.jeu.titre);
    } catch (error: any) {
      toast.error(error.message || "Erreur lors de la création du jeu");
      console.error("Erreur:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setGameData({ ...gameData, image: e.target.files[0] });
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Informations du jeu
        </h2>
        <p className="text-gray-600">
          Définissez les caractéristiques principales de votre jeu éducatif
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <Label className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
              <span>Titre du jeu</span>
              <span className="text-orange-500">*</span>
            </Label>
            <Input
              value={gameData.titre}
              onChange={(e) => setGameData({ ...gameData, titre: e.target.value })}
              placeholder="ex: Quiz sur la géographie mondiale"
              className="h-12 text-lg border-2 border-orange-200 focus:border-orange-400"
              required
            />
          </div>

          <div className="space-y-3">
            <Label className="text-lg font-semibold text-gray-800">
              Niveau
            </Label>
            <Select onValueChange={(value) => setGameData({ ...gameData, niveau: value })}>
              <SelectTrigger className="h-12 text-lg border-2 border-orange-200 focus:border-orange-400">
                <SelectValue placeholder="Sélectionnez un niveau" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="primaire">Primaire</SelectItem>
                <SelectItem value="college">Collège</SelectItem>
                <SelectItem value="lycee">Lycée</SelectItem>
                <SelectItem value="universite">Université</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-3">
          <Label className="text-lg font-semibold text-gray-800">
            Thème
          </Label>
          <Input
            value={gameData.theme}
            onChange={(e) => setGameData({ ...gameData, theme: e.target.value })}
            placeholder="ex: Géographie, Histoire, Sciences..."
            className="h-12 text-lg border-2 border-orange-200 focus:border-orange-400"
          />
        </div>

        <div className="space-y-3">
          <Label className="text-lg font-semibold text-gray-800">
            Description
          </Label>
          <Textarea
            value={gameData.description}
            onChange={(e) => setGameData({ ...gameData, description: e.target.value })}
            placeholder="Décrivez les objectifs pédagogiques et le contenu du jeu..."
            className="min-h-[100px] text-lg border-2 border-orange-200 focus:border-orange-400 resize-none"
          />
        </div>

        <div className="space-y-3">
          <Label className="text-lg font-semibold text-gray-800">
            Image de couverture
          </Label>
          <div className="flex items-center gap-4">
            <Input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              id="game-image"
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => document.getElementById("game-image")?.click()}
              className="w-full h-12 border-2 border-orange-200 hover:bg-orange-50"
            >
              <ImageIcon className="mr-2 h-5 w-5" />
              {gameData.image ? "Changer l'image" : "Ajouter une image"}
            </Button>
            {gameData.image && (
              <span className="text-sm text-gray-600 truncate max-w-[200px]">
                {gameData.image.name}
              </span>
            )}
          </div>
        </div>

        <div className="flex justify-end pt-6">
          <Button 
            type="submit" 
            className="px-8 h-12 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Création en cours...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <span>Continuer</span>
                <Plus className="h-5 w-5" />
              </div>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
