
import { useState } from 'react';
import { Question, QuestionReponse } from "@/types/game-details";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Edit, Save, X, Plus } from "lucide-react";
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

interface EditGameQuestionCardProps {
  question: Question;
  index: number;
  onUpdate: () => void;
}

export function EditGameQuestionCard({ question, index, onUpdate }: EditGameQuestionCardProps) {
  const { token } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form states
  const [libelle, setLibelle] = useState(question.libelle);
  const [temps, setTemps] = useState(question.temps || 30);
  const [limiteResponse, setLimiteResponse] = useState(!!question.limite_response);
  
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

  const handleSaveQuestion = async () => {
    if (!libelle.trim()) {
      toast.error('Le libellé de la question est requis');
      return;
    }

    setIsSubmitting(true);
    try {
      // Sauvegarder la question
      const questionResponse = await fetch(`http://kahoot.nos-apps.com/api/questions/update/${question._id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          libelle,
          temps,
          limite_response: limiteResponse
        })
      });

      if (!questionResponse.ok) {
        throw new Error('Erreur lors de la mise à jour de la question');
      }

      // Sauvegarder chaque réponse
      for (const response of responses) {
        if (response._id && !response._id.startsWith('temp-')) {
          const responseUpdate = await fetch(`http://kahoot.nos-apps.com/api/reponse/update/${response._id}`, {
            method: 'PUT',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              reponse_texte: response.reponse_texte,
              etat: response.etat
            })
          });

          if (!responseUpdate.ok) {
            console.warn(`Erreur lors de la mise à jour de la réponse ${response._id}`);
          }
        }
      }

      toast.success('Question mise à jour avec succès !');
      setIsEditing(false);
      onUpdate();
    } catch (error) {
      console.error('Erreur:', error);
      toast.error('Erreur lors de la mise à jour de la question');
    } finally {
      setIsSubmitting(false);
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
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(true)}
              >
                <Edit className="w-3 h-3 mr-1" />
                Modifier
              </Button>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
          
          <div className="flex items-center space-x-2 mt-6">
            {isEditing ? (
              <Checkbox
                id={`limite-${index}`}
                checked={limiteResponse}
                onCheckedChange={(checked) => setLimiteResponse(!!checked)}
              />
            ) : (
              <div className={`w-4 h-4 rounded border ${question.limite_response ? 'bg-blue-600 border-blue-600' : 'border-gray-300'}`}>
                {question.limite_response && (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-sm"></div>
                  </div>
                )}
              </div>
            )}
            <Label htmlFor={`limite-${index}`} className="text-sm">
              Chronomètre activé
            </Label>
          </div>
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
                        onClick={() => removeResponse(responseIndex)}
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
