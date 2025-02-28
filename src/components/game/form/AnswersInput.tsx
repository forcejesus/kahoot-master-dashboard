
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Trash2, Check } from 'lucide-react';
import { toast } from 'sonner';

interface AnswersInputProps {
  answers: string[];
  correctAnswer: number | null;
  onAnswersChange: (answers: string[]) => void;
  onCorrectAnswerChange: (index: number) => void;
}

export function AnswersInput({ 
  answers, 
  correctAnswer, 
  onAnswersChange, 
  onCorrectAnswerChange 
}: AnswersInputProps) {
  const handleAddAnswer = () => {
    onAnswersChange([...answers, '']);
  };

  const handleRemoveAnswer = (index: number) => {
    const newAnswers = answers.filter((_, i) => i !== index);
    onAnswersChange(newAnswers);
  };

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    onAnswersChange(newAnswers);
  };

  const handleSetCorrectAnswer = (index: number) => {
    onCorrectAnswerChange(index);
  };

  const validateAnswers = () => {
    if (answers.some(answer => !answer.trim())) {
      toast.error("Toutes les réponses doivent être remplies");
      return false;
    }

    if (correctAnswer === null) {
      toast.error("Veuillez sélectionner une réponse correcte");
      return false;
    }

    return true;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium">Réponses</label>
        {answers.length < 4 && (
          <Button 
            type="button" 
            variant="outline" 
            size="sm" 
            onClick={handleAddAnswer}
          >
            <Plus className="h-4 w-4 mr-1" /> Ajouter une réponse
          </Button>
        )}
      </div>
      
      {answers.map((answer, index) => (
        <div key={index} className="flex items-center gap-2">
          <div 
            className={`flex-grow flex items-center p-3 rounded-md border ${
              correctAnswer === index ? 'border-green-500 bg-green-50' : 'border-gray-200'
            }`}
          >
            <Input
              value={answer}
              onChange={(e) => handleAnswerChange(index, e.target.value)}
              placeholder={`Réponse ${index + 1}`}
              className="border-0 focus-visible:ring-0 p-0"
              required
            />
          </div>
          <Button
            type="button"
            variant={correctAnswer === index ? "default" : "outline"}
            size="icon"
            onClick={() => handleSetCorrectAnswer(index)}
            className={correctAnswer === index ? "bg-green-500 hover:bg-green-600" : ""}
          >
            <Check className="h-4 w-4" />
          </Button>
          {answers.length > 2 && (
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => handleRemoveAnswer(index)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      ))}
    </div>
  );
}
