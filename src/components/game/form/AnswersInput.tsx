
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Plus, Trash2, Check, CheckSquare } from 'lucide-react';
import { toast } from 'sonner';

interface AnswersInputProps {
  answers: string[];
  correctAnswer: number | null;
  correctAnswers?: number[]; // For multiple choice
  questionType: string;
  onAnswersChange: (answers: string[]) => void;
  onCorrectAnswerChange: (index: number) => void;
  onCorrectAnswersChange?: (indices: number[]) => void;
}

export function AnswersInput({ 
  answers, 
  correctAnswer, 
  correctAnswers = [],
  questionType,
  onAnswersChange, 
  onCorrectAnswerChange,
  onCorrectAnswersChange
}: AnswersInputProps) {
  const [shortAnswerText, setShortAnswerText] = useState('');

  // Reset form when question type changes
  useEffect(() => {
    if (questionType === 'REPONSE_COURTE') {
      onAnswersChange([]);
      setShortAnswerText('');
    } else if (answers.length === 0) {
      onAnswersChange(['', '']);
    }
  }, [questionType]);

  const handleAddAnswer = () => {
    if (answers.length < 6) {
      onAnswersChange([...answers, '']);
    }
  };

  const handleRemoveAnswer = (index: number) => {
    if (answers.length > 2) {
      const newAnswers = answers.filter((_, i) => i !== index);
      onAnswersChange(newAnswers);
      
      // Adjust correct answer indices
      if (questionType === 'CHOIX_MULTIPLE' && onCorrectAnswersChange) {
        const newCorrectAnswers = correctAnswers
          .map(i => i > index ? i - 1 : i)
          .filter(i => i !== index);
        onCorrectAnswersChange(newCorrectAnswers);
      } else if (correctAnswer === index) {
        onCorrectAnswerChange(0);
      } else if (correctAnswer && correctAnswer > index) {
        onCorrectAnswerChange(correctAnswer - 1);
      }
    }
  };

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    onAnswersChange(newAnswers);
  };

  const handleSetCorrectAnswer = (index: number) => {
    if (questionType === 'CHOIX_MULTIPLE' && onCorrectAnswersChange) {
      const newCorrectAnswers = correctAnswers.includes(index)
        ? correctAnswers.filter(i => i !== index)
        : [...correctAnswers, index];
      onCorrectAnswersChange(newCorrectAnswers);
    } else {
      onCorrectAnswerChange(index);
    }
  };

  const handleShortAnswerSubmit = () => {
    if (!shortAnswerText.trim()) {
      toast.error("Veuillez saisir la réponse attendue");
      return;
    }
    onAnswersChange([shortAnswerText.trim()]);
  };

  // Question à réponse courte
  if (questionType === 'REPONSE_COURTE') {
    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <Label className="text-base font-semibold text-gray-700">
            Réponse attendue *
          </Label>
          <Textarea
            value={shortAnswerText}
            onChange={(e) => setShortAnswerText(e.target.value)}
            placeholder="Saisissez la réponse exacte que vous attendez des apprenants. Cette réponse servira de référence pour l'évaluation automatique."
            className="min-h-[80px] text-base"
            rows={3}
          />
          <p className="text-sm text-gray-500">
            💡 Conseil : Pour une meilleure précision, saisissez la réponse la plus complète et exacte possible.
          </p>
        </div>
        
        {shortAnswerText.trim() && (
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Check className="h-4 w-4 text-blue-600" />
              <span className="font-medium text-blue-800">Réponse de référence</span>
            </div>
            <p className="text-blue-700 text-sm">"{shortAnswerText.trim()}"</p>
          </div>
        )}
      </div>
    );
  }

  // Questions à choix (unique ou multiple)
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <Label className="text-base font-semibold text-gray-700">
            Options de réponse *
          </Label>
          <p className="text-sm text-gray-500">
            {questionType === 'CHOIX_MULTIPLE' 
              ? "Créez les différentes options et sélectionnez toutes les bonnes réponses"
              : "Créez les différentes options et sélectionnez la bonne réponse"
            }
          </p>
        </div>
        {answers.length < 6 && (
          <Button 
            type="button" 
            variant="outline" 
            size="sm" 
            onClick={handleAddAnswer}
            className="shrink-0"
          >
            <Plus className="h-4 w-4 mr-1" /> Ajouter une option
          </Button>
        )}
      </div>

      <div className="space-y-3">
        {answers.map((answer, index) => {
          const isCorrectSingle = questionType === 'CHOIX_UNIQUE' && correctAnswer === index;
          const isCorrectMultiple = questionType === 'CHOIX_MULTIPLE' && correctAnswers.includes(index);
          const isCorrect = isCorrectSingle || isCorrectMultiple;

          return (
            <div key={index} className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-sm font-medium text-gray-600 shrink-0">
                {String.fromCharCode(65 + index)}
              </div>
              
              <div className={`flex-grow flex items-center p-4 rounded-lg border-2 transition-all ${
                isCorrect 
                  ? 'border-green-400 bg-green-50' 
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}>
                <Input
                  value={answer}
                  onChange={(e) => handleAnswerChange(index, e.target.value)}
                  placeholder={`Option ${String.fromCharCode(65 + index)} - Saisissez une réponse possible...`}
                  className="border-0 focus-visible:ring-0 p-0 text-base"
                  required
                />
              </div>

              <Button
                type="button"
                variant={isCorrect ? "default" : "outline"}
                size="icon"
                onClick={() => handleSetCorrectAnswer(index)}
                className={`shrink-0 ${
                  isCorrect 
                    ? "bg-green-500 hover:bg-green-600 text-white" 
                    : "hover:bg-green-50 hover:border-green-300"
                }`}
                title={questionType === 'CHOIX_MULTIPLE' ? "Marquer comme bonne réponse" : "Marquer comme LA bonne réponse"}
              >
                {questionType === 'CHOIX_MULTIPLE' ? (
                  <CheckSquare className="h-4 w-4" />
                ) : (
                  <Check className="h-4 w-4" />
                )}
              </Button>

              {answers.length > 2 && (
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => handleRemoveAnswer(index)}
                  className="shrink-0 hover:bg-red-50 hover:border-red-300 hover:text-red-600"
                  title="Supprimer cette option"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          );
        })}
      </div>

      {/* Instructions selon le type */}
      <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
        <p className="text-sm text-amber-800">
          {questionType === 'CHOIX_MULTIPLE' ? (
            <>
              <strong>📝 Instructions :</strong> Cliquez sur les cases à côté des options pour sélectionner toutes les bonnes réponses. 
              Vous pouvez avoir plusieurs réponses correctes.
            </>
          ) : (
            <>
              <strong>📝 Instructions :</strong> Cliquez sur la case à côté de l'option pour la marquer comme la bonne réponse. 
              Une seule réponse peut être correcte.
            </>
          )}
        </p>
      </div>

      {/* Résumé des réponses correctes */}
      {((questionType === 'CHOIX_UNIQUE' && correctAnswer !== null) || 
        (questionType === 'CHOIX_MULTIPLE' && correctAnswers.length > 0)) && (
        <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <Check className="h-4 w-4 text-green-600" />
            <span className="font-medium text-green-800">
              {questionType === 'CHOIX_MULTIPLE' ? 'Bonnes réponses sélectionnées' : 'Bonne réponse sélectionnée'}
            </span>
          </div>
          <div className="text-sm text-green-700">
            {questionType === 'CHOIX_MULTIPLE' 
              ? correctAnswers.map(i => `Option ${String.fromCharCode(65 + i)}`).join(', ')
              : `Option ${String.fromCharCode(65 + (correctAnswer || 0))}`
            }
          </div>
        </div>
      )}
    </div>
  );
}
