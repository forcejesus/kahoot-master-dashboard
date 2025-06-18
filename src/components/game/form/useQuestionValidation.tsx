
import { toast } from 'sonner';
import { QuestionType } from '@/types/game';

interface ValidationResult {
  isValid: boolean;
  finalAnswers: string[];
  finalCorrectAnswer: number;
  finalCorrectAnswers: number[];
}

export const useQuestionValidation = () => {
  const validateAndPrepareQuestion = (
    questionTypes: QuestionType[],
    typeQuestionId: string,
    answers: string[],
    correctAnswer: number | null,
    correctAnswers: number[],
    shortAnswer: string
  ): ValidationResult => {
    // Déterminer le type de question
    const selectedQuestionType = questionTypes.find(type => type._id === typeQuestionId);
    const questionTypeLibelle = selectedQuestionType?.libelle;

    let finalAnswers: string[] = [];
    let finalCorrectAnswer: number = 0;
    let finalCorrectAnswers: number[] = [];

    switch (questionTypeLibelle) {
      case 'CHOIX_MULTIPLE':
        // Validation spécifique pour les choix multiples
        if (correctAnswers.length === 0) {
          toast.error("Veuillez sélectionner au moins une réponse correcte pour les choix multiples");
          return { isValid: false, finalAnswers: [], finalCorrectAnswer: 0, finalCorrectAnswers: [] };
        }
        if (answers.some(answer => !answer.trim())) {
          toast.error("Toutes les réponses doivent être remplies");
          return { isValid: false, finalAnswers: [], finalCorrectAnswer: 0, finalCorrectAnswers: [] };
        }
        finalAnswers = answers;
        finalCorrectAnswer = correctAnswers[0]; // Pour compatibilité
        finalCorrectAnswers = correctAnswers;
        break;
      
      case 'CHOIX_UNIQUE':
        if (correctAnswer === null) {
          toast.error("Veuillez sélectionner une réponse correcte");
          return { isValid: false, finalAnswers: [], finalCorrectAnswer: 0, finalCorrectAnswers: [] };
        }
        if (answers.some(answer => !answer.trim())) {
          toast.error("Toutes les réponses doivent être remplies");
          return { isValid: false, finalAnswers: [], finalCorrectAnswer: 0, finalCorrectAnswers: [] };
        }
        finalAnswers = answers;
        finalCorrectAnswer = correctAnswer;
        finalCorrectAnswers = [correctAnswer];
        break;
      
      case 'REPONSE_COURTE':
        if (!shortAnswer.trim()) {
          toast.error("Veuillez saisir une réponse courte");
          return { isValid: false, finalAnswers: [], finalCorrectAnswer: 0, finalCorrectAnswers: [] };
        }
        finalAnswers = [shortAnswer];
        finalCorrectAnswer = 0;
        finalCorrectAnswers = [0];
        break;
      
      default:
        toast.error("Veuillez sélectionner un type de question");
        return { isValid: false, finalAnswers: [], finalCorrectAnswer: 0, finalCorrectAnswers: [] };
    }

    return {
      isValid: true,
      finalAnswers,
      finalCorrectAnswer,
      finalCorrectAnswers
    };
  };

  return { validateAndPrepareQuestion };
};
