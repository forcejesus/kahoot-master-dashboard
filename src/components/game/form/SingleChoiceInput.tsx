
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

interface SingleChoiceInputProps {
  answers: string[];
  correctAnswer: number | null;
  onAnswersChange: (answers: string[]) => void;
  onCorrectAnswerChange: (index: number) => void;
}

export function SingleChoiceInput({ 
  answers, 
  correctAnswer, 
  onAnswersChange, 
  onCorrectAnswerChange 
}: SingleChoiceInputProps) {
  const handleAddAnswer = () => {
    if (answers.length >= 6) {
      toast.error("Maximum 6 réponses autorisées");
      return;
    }
    onAnswersChange([...answers, '']);
  };

  const handleRemoveAnswer = (index: number) => {
    if (answers.length <= 2) {
      toast.error("Minimum 2 réponses requises");
      return;
    }
    
    const newAnswers = answers.filter((_, i) => i !== index);
    onAnswersChange(newAnswers);
    
    // Ajuster l'indice de la réponse correcte
    if (correctAnswer === index) {
      onCorrectAnswerChange(0); // Sélectionner la première réponse par défaut
    } else if (correctAnswer !== null && correctAnswer > index) {
      onCorrectAnswerChange(correctAnswer - 1);
    }
  };

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    onAnswersChange(newAnswers);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Label className="text-base font-semibold text-gray-800">
          Réponses possibles
        </Label>
        {answers.length < 6 && (
          <Button 
            type="button" 
            variant="outline" 
            size="sm" 
            onClick={handleAddAnswer}
            className="bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100"
          >
            <Plus className="h-4 w-4 mr-2" /> 
            Ajouter une réponse
          </Button>
        )}
      </div>
      
      <RadioGroup 
        value={correctAnswer?.toString() || ""} 
        onValueChange={(value) => onCorrectAnswerChange(parseInt(value))}
        className="space-y-3"
      >
        {answers.map((answer, index) => (
          <Card 
            key={index} 
            className={`border-2 transition-all duration-200 ${
              correctAnswer === index 
                ? 'border-green-300 bg-green-50' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <RadioGroupItem 
                  value={index.toString()} 
                  id={`answer-${index}`}
                  className="h-5 w-5"
                />
                <Input
                  value={answer}
                  onChange={(e) => handleAnswerChange(index, e.target.value)}
                  placeholder={`Réponse ${index + 1}`}
                  className="flex-grow border-0 focus-visible:ring-0 text-base"
                  required
                />
                {answers.length > 2 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveAnswer(index)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </RadioGroup>
      
      <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
        <p className="font-medium">Instructions :</p>
        <p>• Sélectionnez la seule réponse correcte</p>
        <p>• Une seule réponse peut être choisie par les participants</p>
      </div>
    </div>
  );
}
