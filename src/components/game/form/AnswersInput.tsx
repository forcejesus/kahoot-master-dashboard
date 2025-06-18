
import { QuestionType } from '@/types/game';
import { MultipleChoiceInput } from './MultipleChoiceInput';
import { SingleChoiceInput } from './SingleChoiceInput';
import { ShortAnswerInput } from './ShortAnswerInput';

interface AnswersInputProps {
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

export function AnswersInput({ 
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
}: AnswersInputProps) {
  // Trouver le type de question sélectionné
  const selectedQuestionType = questionTypes.find(type => type._id === questionType);
  const questionTypeLibelle = selectedQuestionType?.libelle;

  if (!questionTypeLibelle) {
    return (
      <div className="text-center p-8 text-gray-500 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
        <p className="text-lg font-medium">Sélectionnez d'abord un type de question</p>
        <p className="text-sm mt-2">Le formulaire de réponses s'adaptera automatiquement</p>
      </div>
    );
  }

  switch (questionTypeLibelle) {
    case 'CHOIX_MULTIPLE':
      return (
        <MultipleChoiceInput
          answers={answers}
          correctAnswers={correctAnswers}
          onAnswersChange={onAnswersChange}
          onCorrectAnswersChange={onCorrectAnswersChange}
        />
      );
    
    case 'CHOIX_UNIQUE':
      return (
        <SingleChoiceInput
          answers={answers}
          correctAnswer={correctAnswer}
          onAnswersChange={onAnswersChange}
          onCorrectAnswerChange={onCorrectAnswerChange}
        />
      );
    
    case 'REPONSE_COURTE':
      return (
        <ShortAnswerInput
          answer={shortAnswer}
          onAnswerChange={onShortAnswerChange}
        />
      );
    
    default:
      return (
        <div className="text-center p-8 text-amber-600 bg-amber-50 rounded-lg border-2 border-amber-200">
          <p className="text-lg font-medium">Type de question non reconnu</p>
          <p className="text-sm mt-2">Type détecté : {questionTypeLibelle}</p>
        </div>
      );
  }
}
