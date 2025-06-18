
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Trash2, CheckCircle, Circle, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

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
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  const handleAddAnswer = () => {
    if (answers.length >= 8) {
      toast.error("Maximum 8 réponses autorisées");
      return;
    }
    const newAnswers = [...answers, ''];
    onAnswersChange(newAnswers);
    
    // Auto-focus on the new input
    setTimeout(() => {
      setFocusedIndex(answers.length);
    }, 100);
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

  // Validation: Au moins une réponse doit être correcte
  useEffect(() => {
    if (correctAnswers.length === 0 && answers.some(answer => answer.trim())) {
      // Si toutes les réponses sont remplies mais aucune n'est marquée comme correcte
      const filledAnswers = answers.filter(answer => answer.trim()).length;
      if (filledAnswers > 0) {
        toast.error("Veuillez sélectionner au moins une réponse correcte", {
          duration: 2000,
        });
      }
    }
  }, [answers, correctAnswers]);

  return (
    <div className="space-y-8">
      {/* Header with Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-2">
          <Label className="text-xl font-bold text-gray-800 flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-xl">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            Réponses à choix multiples
          </Label>
          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="bg-blue-50 text-blue-700">
              {answers.length}/8 réponses
            </Badge>
            <Badge variant="secondary" className="bg-green-50 text-green-700">
              {correctAnswers.length} correcte(s)
            </Badge>
          </div>
        </div>
        
        {answers.length < 8 && (
          <Button 
            type="button" 
            variant="outline" 
            size="lg"
            onClick={handleAddAnswer}
            className="bg-gradient-to-r from-emerald-50 to-green-50 border-emerald-300 text-emerald-700 hover:bg-emerald-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <Plus className="h-5 w-5 mr-2" /> 
            Ajouter une réponse
          </Button>
        )}
      </div>
      
      {/* Answers List */}
      <div className="space-y-4">
        {answers.map((answer, index) => (
          <Card 
            key={index} 
            className={`border-2 transition-all duration-500 hover:shadow-2xl transform hover:scale-[1.02] ${
              correctAnswers.includes(index) 
                ? 'border-green-400 bg-gradient-to-r from-green-50 via-emerald-50 to-green-50 shadow-green-200/50 ring-2 ring-green-200' 
                : focusedIndex === index
                ? 'border-blue-400 bg-gradient-to-r from-blue-50 to-indigo-50 shadow-blue-200/50'
                : 'border-gray-200 bg-white hover:border-purple-300 hover:bg-gradient-to-r hover:from-purple-50/50 hover:to-blue-50/50'
            }`}
          >
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                {/* Checkbox for multiple correct answers */}
                <div className="flex items-center relative">
                  <Checkbox
                    checked={correctAnswers.includes(index)}
                    onCheckedChange={() => handleCorrectAnswerToggle(index)}
                    className={`h-7 w-7 border-2 transition-all duration-300 ${
                      correctAnswers.includes(index)
                        ? 'data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600 shadow-lg'
                        : 'border-gray-300 hover:border-green-400'
                    }`}
                  />
                  {correctAnswers.includes(index) && (
                    <div className="absolute -top-1 -right-1">
                      <Sparkles className="h-4 w-4 text-green-500 animate-pulse" />
                    </div>
                  )}
                </div>
                
                {/* Answer Input */}
                <div className="flex-1 relative">
                  <div className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg transition-all duration-300 ${
                    correctAnswers.includes(index)
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500'
                      : 'bg-gradient-to-r from-blue-500 to-purple-500'
                  }`}>
                    {String.fromCharCode(65 + index)}
                  </div>
                  <Input
                    value={answer}
                    onChange={(e) => handleAnswerChange(index, e.target.value)}
                    onFocus={() => setFocusedIndex(index)}
                    onBlur={() => setFocusedIndex(null)}
                    placeholder={`Tapez la réponse ${String.fromCharCode(65 + index)}...`}
                    className={`pl-16 h-14 text-base border-0 focus-visible:ring-2 bg-transparent placeholder:text-gray-400 transition-all duration-300 ${
                      focusedIndex === index 
                        ? 'focus-visible:ring-blue-400 placeholder:text-blue-300' 
                        : 'focus-visible:ring-purple-400'
                    }`}
                    required
                  />
                  
                  {/* Answer validation indicator */}
                  {answer.trim() && (
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    </div>
                  )}
                </div>
                
                {/* Correct answer indicator */}
                {correctAnswers.includes(index) && (
                  <div className="flex items-center text-green-600 animate-fade-in">
                    <CheckCircle className="h-6 w-6 drop-shadow-sm" />
                  </div>
                )}
                
                {/* Remove button */}
                {answers.length > 2 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveAnswer(index)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full w-10 h-10 p-0 transition-all duration-300 hover:scale-110"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Instructions */}
      <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 p-6 rounded-2xl border border-blue-200 shadow-lg">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-blue-100 rounded-xl">
            <Circle className="h-6 w-6 text-blue-600" />
          </div>
          <div className="space-y-3 flex-1">
            <p className="font-bold text-blue-800 text-lg">Instructions pour les questions à choix multiples :</p>
            <ul className="text-blue-700 space-y-2">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span>Cochez <strong>toutes</strong> les réponses correctes (plusieurs réponses possibles)</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span>Au moins une réponse doit être marquée comme correcte</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span>Les participants pourront sélectionner plusieurs réponses</span>
              </li>
            </ul>
            <div className="bg-white/60 p-3 rounded-lg border border-blue-200">
              <p className="text-sm font-semibold text-blue-800">
                📊 Réponses correctes actuelles : <span className="text-lg">{correctAnswers.length}</span>
                {correctAnswers.length > 0 && (
                  <span className="ml-2 text-green-600">
                    ({correctAnswers.map(i => String.fromCharCode(65 + i)).join(', ')})
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
