
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
  DialogClose,
} from "@/components/ui/dialog";
import { Plus, ImageIcon, Loader2, ArrowLeft } from "lucide-react";
import { buildApiUrl } from "@/config/hosts";

interface CreateKahootDialogProps {
  onSuccess?: () => void;
}

export function CreateKahootDialog({ onSuccess }: CreateKahootDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [titre, setTitre] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const { token } = useAuth();
  const { t } = useTranslation();
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
        setIsOpen(false);
        resetForm();
        
        // Redirection automatique vers la configuration du jeu
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="secondary" 
          size="lg"
          className="w-full text-lg h-20 bg-white text-primary hover:bg-white/90 transition-all duration-200 transform hover:scale-[1.02] shadow-xl"
        >
          <Plus className="mr-2 h-6 w-6" />
          {t('create.kahoot')}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t('create.newKahoot')}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          <div className="space-y-2">
            <Label htmlFor="titre">{t('create.titleLabel')}</Label>
            <Input
              id="titre"
              placeholder={t('create.titlePlaceholder')}
              value={titre}
              onChange={(e) => setTitre(e.target.value)}
              disabled={isLoading}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="image">{t('create.imageLabel')}</Label>
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
                className="w-full"
                disabled={isLoading}
              >
                <ImageIcon className="mr-2 h-4 w-4" />
                {image ? t('create.changeImage') : t('create.addImage')}
              </Button>
              {image && (
                <span className="text-sm text-muted-foreground truncate max-w-[150px]">
                  {image.name}
                </span>
              )}
            </div>
          </div>

          <div className="flex gap-3">
            <DialogClose asChild>
              <Button type="button" variant="outline" className="w-full" disabled={isLoading}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                {t('create.cancel')}
              </Button>
            </DialogClose>
            
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t('create.creating')}
                </>
              ) : (
                t('create.kahoot')
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
