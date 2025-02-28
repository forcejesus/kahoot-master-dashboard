
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
    correctAnswer: number = 0
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
      
      // Use the submitQuestionWithAnswers function from questionService
      const resultQuestion = await submitQuestionWithAnswers(
        formQuestion,
        answers,
        correctAnswer,
        selectedFile,
        token
      );

      toast.success('Question créée avec succès');
      onSuccess(resultQuestion);
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
