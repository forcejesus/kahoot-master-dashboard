
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
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  const handleAddAnswer = () => {
    if (answers.length >= 6) {
      toast.error("Maximum 6 réponses autorisées");
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
        <Label className="text-lg font-bold text-gray-900 flex items-center gap-2 font-heading">
          <Target className="w-5 h-5 text-blue-600" />
          Réponses possibles ({answers.length}/6)
        </Label>
        {answers.length < 6 && (
          <Button 
            type="button" 
            variant="outline" 
            size="sm" 
            onClick={handleAddAnswer}
            className="bg-blue-50 border-2 border-blue-200 text-blue-700 hover:bg-blue-100 transition-all duration-200 shadow-sm font-medium rounded-xl"
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
                ? 'border-green-400 bg-green-50 shadow-green-100/50' 
                : focusedIndex === index
                ? 'border-blue-400 bg-blue-50 shadow-blue-100/50'
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
                  <div className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg transition-all duration-300 ${
                    correctAnswer === index
                      ? 'bg-green-500'
                      : 'bg-blue-600'
                  }`}>
                    {String.fromCharCode(65 + index)}
                  </div>
                  <Input
                    value={answer}
                    onChange={(e) => handleAnswerChange(index, e.target.value)}
                    onFocus={() => setFocusedIndex(index)}
                    onBlur={() => setFocusedIndex(null)}
                    placeholder={`Tapez la réponse ${String.fromCharCode(65 + index)}...`}
                    className="pl-16 h-14 text-base font-medium border-0 focus-visible:ring-2 focus-visible:ring-blue-400 bg-transparent placeholder:text-gray-400 transition-all duration-200"
                    required
                  />
                  
                  {/* Answer validation indicator */}
                  {answer.trim() && (
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    </div>
                  )}
                </div>
                
                {correctAnswer === index && (
                  <div className="flex items-center text-green-600 animate-fade-in">
                    <Target className="h-5 w-5" />
                  </div>
                )}
                
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
      </RadioGroup>
      
      <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
        <div className="flex items-start gap-3">
          <Circle className="h-5 w-5 text-blue-600 mt-0.5" />
          <div className="space-y-3">
            <p className="font-bold text-blue-900 text-lg font-heading">Instructions pour les questions à choix unique :</p>
            <ul className="text-blue-800 space-y-2 font-medium">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Sélectionnez la <strong>seule</strong> réponse correcte</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Une seule réponse peut être choisie par les participants</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Réponse correcte sélectionnée : {correctAnswer !== null ? `Réponse ${String.fromCharCode(65 + correctAnswer)}` : 'Aucune'}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
