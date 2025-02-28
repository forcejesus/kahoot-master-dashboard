
import { toast } from 'sonner';
import { Question } from '@/types/game';

export const validateQuestionForm = (
  question: Question,
  answers: string[],
  correctAnswer: number | null,
  selectedFile: File | null
): boolean => {
  if (!question.libelle.trim()) {
    toast.error("Veuillez saisir une question");
    return false;
  }

  if (answers.some(answer => !answer.trim())) {
    toast.error("Toutes les réponses doivent être remplies");
    return false;
  }

  if (correctAnswer === null) {
    toast.error("Veuillez sélectionner une réponse correcte");
    return false;
  }

  if (!question.typeQuestion) {
    toast.error("Veuillez sélectionner un type de question");
    return false;
  }

  if (!question.point) {
    toast.error("Veuillez sélectionner les points");
    return false;
  }

  return true;
};
