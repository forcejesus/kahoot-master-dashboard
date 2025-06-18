
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Plus, Trash2, Target, Circle } from 'lucide-react';
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
        <Label className="text-lg font-bold text-gray-800 flex items-center gap-2">
          <Target className="w-5 h-5 text-blue-600" />
          Réponses possibles ({answers.length}/6)
        </Label>
        {answers.length < 6 && (
          <Button 
            type="button" 
            variant="outline" 
            size="sm" 
            onClick={handleAddAnswer}
            className="bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100 transition-all duration-200 shadow-sm"
          >
            <Plus className="h-4 w-4 mr-2" /> 
            Ajouter une réponse
          </Button>
        )}
      </div>
      
      <RadioGroup 
        value={correctAnswer?.toString() || ""} 
        onValueChange={(value) => onCorrectAnswerChange(parseInt(value))}
        className="space-y-4"
      >
        {answers.map((answer, index) => (
          <Card 
            key={index} 
            className={`border-2 transition-all duration-300 hover:shadow-lg ${
              correctAnswer === index 
                ? 'border-green-400 bg-gradient-to-r from-green-50 to-emerald-50 shadow-green-100/50' 
                : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50/30'
            }`}
          >
            <CardContent className="p-5">
              <div className="flex items-center gap-4">
                <RadioGroupItem 
                  value={index.toString()} 
                  id={`answer-${index}`}
                  className="h-6 w-6 border-2"
                />
                
                <div className="flex-1 relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-sm font-bold">
                    {index + 1}
                  </div>
                  <Input
                    value={answer}
                    onChange={(e) => handleAnswerChange(index, e.target.value)}
                    placeholder={`Tapez la réponse ${index + 1}...`}
                    className="pl-12 h-12 text-base border-0 focus-visible:ring-2 focus-visible:ring-blue-400 bg-transparent placeholder:text-gray-400"
                    required
                  />
                </div>
                
                {correctAnswer === index && (
                  <div className="flex items-center text-green-600">
                    <Target className="h-5 w-5" />
                  </div>
                )}
                
                {answers.length > 2 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveAnswer(index)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50 rounded-full w-8 h-8 p-0"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </RadioGroup>
      
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-xl border border-amber-200">
        <div className="flex items-start gap-3">
          <Circle className="h-5 w-5 text-amber-600 mt-0.5" />
          <div className="space-y-2">
            <p className="font-semibold text-amber-800">Instructions pour les questions à choix unique :</p>
            <ul className="text-sm text-amber-700 space-y-1">
              <li>• Sélectionnez la <strong>seule</strong> réponse correcte</li>
              <li>• Une seule réponse peut être choisie par les participants</li>
              <li>• Réponse correcte sélectionnée : {correctAnswer !== null ? `Réponse ${correctAnswer + 1}` : 'Aucune'}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
