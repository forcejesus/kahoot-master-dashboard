
import { useState } from 'react';
import { Question } from '@/types/game';
import { toast } from 'sonner';
import { validateQuestionForm } from './validation';
import { submitQuestionWithAnswers } from './questionService';

interface UseQuestionFormProps {
  gameId: string;
  token: string;
  onQuestionAdded: (question: Question) => void;
}

export function useQuestionForm({ gameId, token, onQuestionAdded }: UseQuestionFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  const [currentQuestion, setCurrentQuestion] = useState<Question>({
    libelle: '',
    temps: 30,
    limite_response: true,
    typeQuestion: '',
    point: '',
    jeu: gameId,
    type_fichier: ''
  });

  // State for answers management
  const [answers, setAnswers] = useState<string[]>(['', '']);
  const [correctAnswer, setCorrectAnswer] = useState<number | null>(null);

  const handleFileChange = (file: File | null, fileType: string) => {
    setSelectedFile(file);
    setCurrentQuestion(prev => ({
      ...prev,
      type_fichier: fileType
    }));
  };

  const resetForm = () => {
    setCurrentQuestion({
      libelle: '',
      temps: 30,
      limite_response: true,
      typeQuestion: '',
      point: '',
      jeu: gameId,
      type_fichier: ''
    });
    setSelectedFile(null);
    setAnswers(['', '']);
    setCorrectAnswer(null);
  };

  const handleAddQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form before submission
    if (!validateQuestionForm(currentQuestion, answers, correctAnswer, selectedFile)) {
      return;
    }

    setIsLoading(true);

    try {
      const updatedQuestion = await submitQuestionWithAnswers(
        currentQuestion, 
        answers, 
        correctAnswer!, 
        selectedFile, 
        token
      );
      
      // Notify parent component
      onQuestionAdded(updatedQuestion);
      
      // Reset form
      resetForm();
      
      toast.success("Question et réponses ajoutées avec succès");
    } catch (error) {
      console.error('Erreur:', error);
      toast.error("Erreur lors de l'ajout de la question et des réponses");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    currentQuestion,
    setCurrentQuestion,
    selectedFile,
    handleFileChange,
    answers,
    setAnswers,
    correctAnswer,
    setCorrectAnswer,
    handleAddQuestion
  };
}
