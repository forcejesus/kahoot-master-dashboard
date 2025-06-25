
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Trash2, CheckCircle, Circle } from 'lucide-react';
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
    if (answers.length >= 8) {
      toast.error("Maximum 8 réponses autorisées");
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
        <Label className="text-lg font-bold text-gray-800 flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-green-600" />
          Réponses possibles ({answers.length}/8)
        </Label>
        {answers.length < 8 && (
          <Button 
            type="button" 
            variant="outline" 
            size="sm" 
            onClick={handleAddAnswer}
            className="bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100 transition-all duration-200 shadow-sm"
          >
            <Plus className="h-4 w-4 mr-2" /> 
            Ajouter une réponse
          </Button>
        )}
      </div>
      
      <div className="space-y-4">
        {answers.map((answer, index) => (
          <Card 
            key={index} 
            className={`border-2 transition-all duration-300 hover:shadow-lg ${
              correctAnswers.includes(index) 
                ? 'border-green-400 bg-gradient-to-r from-green-50 to-emerald-50 shadow-green-100/50' 
                : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50/30'
            }`}
          >
            <CardContent className="p-5">
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <Checkbox
                    checked={correctAnswers.includes(index)}
                    onCheckedChange={() => handleCorrectAnswerToggle(index)}
                    className="h-6 w-6 border-2 data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                  />
                </div>
                
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
                
                {correctAnswers.includes(index) && (
                  <div className="flex items-center text-green-600">
                    <CheckCircle className="h-5 w-5" />
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
      </div>
      
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200">
        <div className="flex items-start gap-3">
          <Circle className="h-5 w-5 text-blue-600 mt-0.5" />
          <div className="space-y-2">
            <p className="font-semibold text-blue-800">Instructions pour les questions à choix multiples :</p>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Cochez <strong>toutes</strong> les réponses correctes (plusieurs réponses possibles)</li>
              <li>• Au moins une réponse doit être marquée comme correcte</li>
              <li>• Les participants pourront sélectionner plusieurs réponses</li>
              <li>• Réponses correctes actuelles : <span className="font-semibold">{correctAnswers.length}</span></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
