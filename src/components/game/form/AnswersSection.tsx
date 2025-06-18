
import { Award } from 'lucide-react';
import { AnswersInput } from './AnswersInput';
import { QuestionType } from '@/types/game';

interface AnswersSectionProps {
  questionType: string;
  questionTypes: QuestionType[];
  answers: string[];
  correctAnswer: number | null;
  correctAnswers: number[];
  shortAnswer: string;
  onAnswersChange: (answers: string[]) => void;
  onCorrectAnswerChange: (index: number) => void;
  onCorrectAnswersChange: (indices: number[]) => void;
  onShortAnswerChange: (answer: string) => void;
}

export function AnswersSection({ 
  questionType,
  questionTypes,
  answers,
  correctAnswer,
  correctAnswers,
  shortAnswer,
  onAnswersChange,
  onCorrectAnswerChange,
  onCorrectAnswersChange,
  onShortAnswerChange
}: AnswersSectionProps) {
  return (
    <div className="p-8 bg-gradient-to-r from-orange-50/30 to-red-50/30 border-b">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-orange-100 rounded-xl">
          <Award className="w-5 h-5 text-orange-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-800">Réponses</h3>
        <span className="text-sm text-gray-500">Configurez les options de réponse</span>
      </div>
      
      <AnswersInput
        questionType={questionType}
        questionTypes={questionTypes}
        answers={answers}
        correctAnswer={correctAnswer}
        correctAnswers={correctAnswers}
        shortAnswer={shortAnswer}
        onAnswersChange={onAnswersChange}
        onCorrectAnswerChange={onCorrectAnswerChange}
        onCorrectAnswersChange={onCorrectAnswersChange}
        onShortAnswerChange={onShortAnswerChange}
      />
    </div>
  );
}
