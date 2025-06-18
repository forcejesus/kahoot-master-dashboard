
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Edit } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { QuestionReponse } from '@/types/game-details';

interface EditResponseDialogProps {
  response: QuestionReponse;
  onSuccess: () => void;
  trigger?: React.ReactNode;
}

export function EditResponseDialog({ response, onSuccess, trigger }: EditResponseDialogProps) {
  const { token } = useAuth();
  const [open, setOpen] = useState(false);
  const [reponseTexte, setReponseTexte] = useState(response.reponse_texte);
  // Convert etat to boolean for checkbox
  const [etat, setEtat] = useState(!!response.etat);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response_data = await fetch(`http://kahoot.nos-apps.com/api/reponse/update/${response._id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          reponse_texte: reponseTexte,
          etat: etat
        })
      });

      if (!response_data.ok) {
        throw new Error('Erreur lors de la mise à jour de la réponse');
      }

      toast.success('Réponse mise à jour avec succès !');
      setOpen(false);
      onSuccess();
    } catch (error) {
      console.error('Erreur:', error);
      toast.error('Erreur lors de la mise à jour de la réponse');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setReponseTexte(response.reponse_texte);
    setEtat(!!response.etat);
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
            Modifier la réponse
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="reponse_texte">Texte de la réponse</Label>
            <Input
              id="reponse_texte"
              value={reponseTexte}
              onChange={(e) => setReponseTexte(e.target.value)}
              placeholder="Texte de la réponse"
              required
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="etat"
              checked={etat}
              onCheckedChange={(checked) => setEtat(!!checked)}
            />
            <Label htmlFor="etat" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Réponse correcte
            </Label>
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
              disabled={isSubmitting || !reponseTexte.trim()}
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
