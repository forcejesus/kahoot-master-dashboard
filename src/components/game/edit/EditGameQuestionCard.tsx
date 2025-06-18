
import { useState } from 'react';
import { Question, QuestionReponse } from "@/types/game-details";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Edit, Save, X, Plus, Trash2 } from "lucide-react";
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

interface EditGameQuestionCardProps {
  question: Question;
  index: number;
  onUpdate: () => void;
  onDelete?: () => void;
}

export function EditGameQuestionCard({ question, index, onUpdate, onDelete }: EditGameQuestionCardProps) {
  const { token } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  
  // Form states
  const [libelle, setLibelle] = useState(question.libelle);
  const [temps, setTemps] = useState(question.temps || 30);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  // Gérer les réponses selon le format
  const [responses, setResponses] = useState<QuestionReponse[]>(() => {
    if (!question.reponses || !Array.isArray(question.reponses)) {
      return [];
    }
    
    // Si c'est des objets avec propriétés
    if (typeof question.reponses[0] === 'object' && question.reponses[0] !== null) {
      return question.reponses as QuestionReponse[];
    }
    
    // Si c'est des strings simples, les convertir
    return (question.reponses as string[]).map((rep, idx) => ({
      _id: `temp-${idx}`,
      reponse_texte: rep,
      etat: rep === question.reponse_correcte
    }));
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSaveQuestion = async () => {
    if (!libelle.trim()) {
      toast.error('Le libellé de la question est requis');
      return;
    }

    setIsSubmitting(true);
    try {
      // Préparer les données de la question
      const formData = new FormData();
      formData.append('libelle', libelle);
      formData.append('temps', temps.toString());
      
      if (selectedFile) {
        formData.append('fichier', selectedFile);
      }

      console.log('Mise à jour de la question:', question._id, { libelle, temps });

      // Sauvegarder la question
      const questionResponse = await fetch(`http://kahoot.nos-apps.com/api/questions/update/${question._id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      const questionData = await questionResponse.json();
      console.log('Réponse mise à jour question:', questionData);

      if (!questionResponse.ok || !questionData.success) {
        throw new Error(questionData.message || 'Erreur lors de la mise à jour de la question');
      }

      // Sauvegarder chaque réponse
      for (const response of responses) {
        if (response._id && !response._id.startsWith('temp-')) {
          console.log('Mise à jour de la réponse:', response._id, {
            reponse_texte: response.reponse_texte,
            etat: !!response.etat
          });

          const responseUpdate = await fetch(`http://kahoot.nos-apps.com/api/reponse/update/${response._id}`, {
            method: 'PUT',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              reponse_texte: response.reponse_texte,
              etat: !!response.etat
            })
          });

          const responseData = await responseUpdate.json();
          console.log('Réponse mise à jour:', responseData);

          if (!responseUpdate.ok || !responseData.success) {
            console.warn(`Erreur lors de la mise à jour de la réponse ${response._id}:`, responseData.message);
          }
        }
      }

      toast.success('Question mise à jour avec succès !');
      setIsEditing(false);
      setSelectedFile(null);
      onUpdate();
    } catch (error) {
      console.error('Erreur:', error);
      toast.error('Erreur lors de la mise à jour de la question');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteQuestion = async () => {
    if (!question._id) return;

    setIsDeleting(true);
    try {
      console.log('Suppression de la question:', question._id);

      const response = await fetch(`http://kahoot.nos-apps.com/api/questions/delete/${question._id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      console.log('Réponse suppression question:', data);

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Erreur lors de la suppression de la question');
      }

      toast.success('Question supprimée avec succès !');
      onDelete?.();
      onUpdate();
    } catch (error) {
      console.error('Erreur:', error);
      toast.error('Erreur lors de la suppression de la question');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteResponse = async (responseId: string, responseIndex: number) => {
    if (!responseId || responseId.startsWith('temp-')) {
      // Supprimer localement si c'est une réponse temporaire
      removeResponse(responseIndex);
      return;
    }

    try {
      console.log('Suppression de la réponse:', responseId);

      const response = await fetch(`http://kahoot.nos-apps.com/api/reponse/delete/${responseId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      console.log('Réponse suppression réponse:', data);

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Erreur lors de la suppression de la réponse');
      }

      toast.success('Réponse supprimée avec succès !');
      removeResponse(responseIndex);
    } catch (error) {
      console.error('Erreur:', error);
      toast.error('Erreur lors de la suppression de la réponse');
    }
  };

  const handleResponseChange = (index: number, field: 'reponse_texte' | 'etat', value: string | boolean) => {
    setResponses(prev => prev.map((response, idx) => 
      idx === index ? { ...response, [field]: value } : response
    ));
  };

  const addResponse = () => {
    setResponses(prev => [...prev, {
      _id: `temp-${Date.now()}`,
      reponse_texte: '',
      etat: false
    }]);
  };

  const removeResponse = (index: number) => {
    setResponses(prev => prev.filter((_, idx) => idx !== index));
  };

  const imageUrl = question.fichier 
    ? `http://kahoot.nos-apps.com/${question.fichier}`
    : question.image 
      ? `http://kahoot.nos-apps.com/${question.image}`
      : null;

  return (
    <Card className="border border-gray-200 hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-lg">Question {index + 1}</h3>
          <div className="flex gap-2">
            {!isEditing ? (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditing(true)}
                >
                  <Edit className="w-3 h-3 mr-1" />
                  Modifier
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="destructive"
                      size="sm"
                      disabled={isDeleting}
                    >
                      <Trash2 className="w-3 h-3 mr-1" />
                      Supprimer
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
                      <AlertDialogDescription>
                        Êtes-vous sûr de vouloir supprimer cette question ? Cette action est irréversible.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Annuler</AlertDialogCancel>
                      <AlertDialogAction onClick={handleDeleteQuestion}>
                        Supprimer
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditing(false)}
                >
                  <X className="w-3 h-3 mr-1" />
                  Annuler
                </Button>
                <Button
                  size="sm"
                  onClick={handleSaveQuestion}
                  disabled={isSubmitting || !libelle.trim()}
                >
                  <Save className="w-3 h-3 mr-1" />
                  {isSubmitting ? 'Sauvegarde...' : 'Sauvegarder'}
                </Button>
              </>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Image de la question */}
        {imageUrl && (
          <div>
            <img
              src={imageUrl}
              alt={`Question ${index + 1}`}
              className="w-full max-w-md h-48 object-cover rounded-lg border"
            />
          </div>
        )}

        {/* Fichier pour la question */}
        {isEditing && (
          <div>
            <Label htmlFor={`fichier-${index}`}>Fichier (optionnel)</Label>
            <Input
              id={`fichier-${index}`}
              type="file"
              accept="image/*,video/*"
              onChange={handleFileChange}
              className="mt-1"
            />
          </div>
        )}

        {/* Libellé de la question */}
        <div>
          <Label htmlFor={`question-${index}`}>Libellé de la question</Label>
          {isEditing ? (
            <Input
              id={`question-${index}`}
              value={libelle}
              onChange={(e) => setLibelle(e.target.value)}
              className="mt-1"
            />
          ) : (
            <p className="mt-1 p-2 bg-gray-50 rounded border">{question.libelle}</p>
          )}
        </div>

        {/* Paramètres de la question */}
        <div>
          <Label htmlFor={`temps-${index}`}>Durée (secondes)</Label>
          {isEditing ? (
            <Input
              id={`temps-${index}`}
              type="number"
              value={temps}
              onChange={(e) => setTemps(Number(e.target.value))}
              min="1"
              max="300"
              className="mt-1"
            />
          ) : (
            <p className="mt-1 p-2 bg-gray-50 rounded border">{question.temps || 30} secondes</p>
          )}
        </div>

        {/* Réponses */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <Label>Réponses</Label>
            {isEditing && (
              <Button
                variant="outline"
                size="sm"
                onClick={addResponse}
              >
                <Plus className="w-3 h-3 mr-1" />
                Ajouter
              </Button>
            )}
          </div>
          
          <div className="space-y-2">
            {responses.map((response, responseIndex) => (
              <div 
                key={responseIndex}
                className={`p-3 rounded-lg border transition-colors ${
                  response.etat
                    ? 'bg-green-50 border-green-200'
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  {isEditing ? (
                    <>
                      <Checkbox
                        checked={!!response.etat}
                        onCheckedChange={(checked) => 
                          handleResponseChange(responseIndex, 'etat', !!checked)
                        }
                      />
                      <Input
                        value={response.reponse_texte}
                        onChange={(e) => 
                          handleResponseChange(responseIndex, 'reponse_texte', e.target.value)
                        }
                        placeholder="Texte de la réponse"
                        className="flex-1"
                      />
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteResponse(response._id || '', responseIndex)}
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </>
                  ) : (
                    <>
                      <div className={`w-4 h-4 rounded border ${response.etat ? 'bg-green-600 border-green-600' : 'border-gray-300'}`}>
                        {response.etat && (
                          <div className="w-full h-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-sm"></div>
                          </div>
                        )}
                      </div>
                      <span className={`flex-1 ${response.etat ? 'text-green-800 font-medium' : 'text-gray-700'}`}>
                        {response.reponse_texte}
                      </span>
                      {response.etat && (
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                          Correcte
                        </span>
                      )}
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
