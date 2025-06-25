
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

interface MultipleChoiceInputProps {
  answers: string[];
  correctAnswers: number[];
  onAnswersChange: (answers: string[]) => void;
  onCorrectAnswersChange: (indices: number[]) => void;
}

export function MultipleChoiceInput({ 
  answers, 
  correctAnswers, 
  onAnswersChange, 
  onCorrectAnswersChange 
}: MultipleChoiceInputProps) {
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
    
    // Ajuster les indices des réponses correctes
    const newCorrectAnswers = correctAnswers
      .filter(i => i !== index)
      .map(i => i > index ? i - 1 : i);
    onCorrectAnswersChange(newCorrectAnswers);
  };

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    onAnswersChange(newAnswers);
  };

  const handleCorrectAnswerToggle = (index: number) => {
    const newCorrectAnswers = correctAnswers.includes(index)
      ? correctAnswers.filter(i => i !== index)
      : [...correctAnswers, index];
    onCorrectAnswersChange(newCorrectAnswers);
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
      
      <div className="space-y-3">
        {answers.map((answer, index) => (
          <Card 
            key={index} 
            className={`border-2 transition-all duration-200 ${
              correctAnswers.includes(index) 
                ? 'border-green-300 bg-green-50' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Checkbox
                  checked={correctAnswers.includes(index)}
                  onCheckedChange={() => handleCorrectAnswerToggle(index)}
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
      </div>
      
      <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
        <p className="font-medium">Instructions :</p>
        <p>• Cochez toutes les réponses correctes (plusieurs réponses possibles)</p>
        <p>• Au moins une réponse doit être marquée comme correcte</p>
      </div>
    </div>
  );
}
