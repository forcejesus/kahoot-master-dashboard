
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Edit } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { Question } from '@/types/game-details';

interface EditQuestionDialogProps {
  question: Question;
  onSuccess: () => void;
  trigger?: React.ReactNode;
}

export function EditQuestionDialog({ question, onSuccess, trigger }: EditQuestionDialogProps) {
  const { token } = useAuth();
  const [open, setOpen] = useState(false);
  const [libelle, setLibelle] = useState(question.libelle);
  const [temps, setTemps] = useState(question.temps);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('libelle', libelle);
      formData.append('temps', temps.toString());
      
      if (selectedFile) {
        formData.append('fichier', selectedFile);
      }

      const response = await fetch(`http://kahoot.nos-apps.com/api/questions/update/${question._id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la mise à jour de la question');
      }

      toast.success('Question mise à jour avec succès !');
      setOpen(false);
      onSuccess();
    } catch (error) {
      console.error('Erreur:', error);
      toast.error('Erreur lors de la mise à jour de la question');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setLibelle(question.libelle);
    setTemps(question.temps);
    setSelectedFile(null);
  };

  return (
    <Dialog open={open} onOpenChange={(newOpen) => {
      setOpen(newOpen);
      if (!newOpen) resetForm();
    }}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm">
            <Edit className="w-3 h-3 mr-1" />
            Modifier
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Edit className="w-5 h-5" />
            Modifier la question
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="libelle">Question</Label>
            <Input
              id="libelle"
              value={libelle}
              onChange={(e) => setLibelle(e.target.value)}
              placeholder="Votre question"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="temps">Durée (secondes)</Label>
            <Input
              id="temps"
              type="number"
              value={temps}
              onChange={(e) => setTemps(Number(e.target.value))}
              min={1}
              max={300}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fichier">Fichier (optionnel)</Label>
            <Input
              id="fichier"
              type="file"
              accept="image/*,video/*"
              onChange={handleFileChange}
              className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
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
              disabled={isSubmitting || !libelle.trim()}
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
