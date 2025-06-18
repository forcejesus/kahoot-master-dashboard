
import { useState, useCallback } from 'react';
import { Question } from '@/types/game';
import { submitQuestionWithAnswers } from './questionService';
import { toast } from 'sonner';

export const useQuestionForm = (gameId: string, token: string) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formQuestion, setFormQuestion] = useState<Question>({
    libelle: '',
    temps: 20,
    limite_response: true,
    typeQuestion: '',
    point: '',
    jeu: gameId,
    type_fichier: 'image',
    reponses: [],
    reponse_correcte: ''
  });

  const handleFileChange = useCallback((file: File | null) => {
    setSelectedFile(file);
    
    if (file) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPreviewUrl(fileReader.result as string);
      };
      fileReader.readAsDataURL(file);
      
      // Set the file type based on the file extension
      const fileType = file.name.split('.').pop()?.toLowerCase() || 'image';
      updateFormQuestion({ type_fichier: fileType });
    } else {
      setPreviewUrl(null);
      updateFormQuestion({ type_fichier: 'image' });
    }
  }, []);

  const updateFormQuestion = useCallback((updates: Partial<Question>) => {
    setFormQuestion(prev => ({ ...prev, ...updates }));
  }, []);

  const resetForm = useCallback(() => {
    setFormQuestion({
      libelle: '',
      temps: 20,
      limite_response: true,
      typeQuestion: '',
      point: '',
      jeu: gameId,
      type_fichier: 'image',
      reponses: [],
      reponse_correcte: ''
    });
    setSelectedFile(null);
    setPreviewUrl(null);
  }, [gameId]);

  const handleFormSubmit = useCallback(async (
    onSuccess: (question: Question) => void,
    answers: string[] = [],
    correctAnswers: number[] = [], // Changed to support multiple correct answers
    shortAnswer: string = ''
  ) => {
    try {
      setIsSubmitting(true);
      
      // Validate form
      if (!formQuestion.libelle) {
        toast.error('Veuillez entrer une question');
        setIsSubmitting(false);
        return;
      }
      
      if (!formQuestion.typeQuestion) {
        toast.error('Veuillez sélectionner un type de question');
        setIsSubmitting(false);
        return;
      }
      
      if (!formQuestion.point) {
        toast.error('Veuillez sélectionner les points');
        setIsSubmitting(false);
        return;
      }

      // Handle different question types for correct answers
      let finalCorrectAnswer: string = '';
      
      if (formQuestion.typeQuestion) {
        // Find question type to determine how to handle correct answers
        const questionType = formQuestion.typeQuestion;
        
        if (shortAnswer) {
          // For short answer questions
          finalCorrectAnswer = shortAnswer;
        } else if (correctAnswers.length > 0) {
          // For multiple choice questions - store all correct answer indices
          finalCorrectAnswer = correctAnswers.join(',');
        } else if (typeof correctAnswers[0] === 'number') {
          // For single choice questions - store single index
          finalCorrectAnswer = correctAnswers[0]?.toString() || '0';
        }
      }
      
      console.log("Soumission du formulaire avec les données:", {
        question: formQuestion,
        answers,
        correctAnswers,
        shortAnswer,
        finalCorrectAnswer,
        file: selectedFile ? {
          name: selectedFile.name,
          type: selectedFile.type,
          size: selectedFile.size
        } : null
      });
      
      // Use the submitQuestionWithAnswers function from questionService
      const resultQuestion = await submitQuestionWithAnswers(
        { ...formQuestion, reponse_correcte: finalCorrectAnswer },
        answers.length > 0 ? answers : (shortAnswer ? [shortAnswer] : []),
        correctAnswers[0] || 0,
        selectedFile,
        token
      );

      console.log("Question créée avec succès:", resultQuestion);
      toast.success('Question créée avec succès');
      onSuccess(resultQuestion);
      
      // Important: Reset form after successful submission
      resetForm();
    } catch (error) {
      console.error('Error creating question:', error);
      toast.error('Erreur lors de la création de la question');
    } finally {
      setIsSubmitting(false);
    }
  }, [formQuestion, resetForm, selectedFile, token]);

  return {
    formQuestion,
    updateFormQuestion,
    selectedFile,
    previewUrl,
    handleFileChange,
    handleFormSubmit,
    isSubmitting,
    resetForm
  };
};
