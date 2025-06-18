
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Edit } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

interface EditGameDialogProps {
  gameId: string;
  currentTitle: string;
  currentImage?: string;
  onSuccess: () => void;
  trigger?: React.ReactNode;
}

export function EditGameDialog({ gameId, currentTitle, currentImage, onSuccess, trigger }: EditGameDialogProps) {
  const { token } = useAuth();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(currentTitle);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('titre', title);
      
      if (selectedFile) {
        formData.append('image', selectedFile);
      }

      const response = await fetch(`http://kahoot.nos-apps.com/api/jeux/update/${gameId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la mise à jour du jeu');
      }

      toast.success('Jeu mis à jour avec succès !');
      setOpen(false);
      onSuccess();
    } catch (error) {
      console.error('Erreur:', error);
      toast.error('Erreur lors de la mise à jour du jeu');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setTitle(currentTitle);
    setSelectedFile(null);
    setPreviewUrl('');
  };

  return (
    <Dialog open={open} onOpenChange={(newOpen) => {
      setOpen(newOpen);
      if (!newOpen) resetForm();
    }}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm">
            <Edit className="w-4 h-4 mr-2" />
            Modifier
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Edit className="w-5 h-5" />
            Modifier le jeu
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Titre du jeu</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Nom de votre jeu"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Image du jeu</Label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            
            {/* Preview current or new image */}
            {(previewUrl || currentImage) && (
              <div className="mt-3">
                <img
                  src={previewUrl || `http://kahoot.nos-apps.com/${currentImage}`}
                  alt="Aperçu"
                  className="w-full h-32 object-cover rounded-lg border"
                />
              </div>
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="flex-1"
            >
              Annuler
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || !title.trim()}
              className="flex-1"
            >
              {isSubmitting ? 'Mise à jour...' : 'Mettre à jour'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
