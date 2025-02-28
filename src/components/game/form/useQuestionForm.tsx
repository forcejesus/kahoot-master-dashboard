
import { useState, useCallback } from 'react';
import { Question } from '@/types/game';
import { uploadQuestionImage } from './questionService';
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
    onSuccess: (question: Question) => void
  ) => {
    try {
      setIsSubmitting(true);
      let imageUrl = '';

      if (selectedFile) {
        imageUrl = await uploadQuestionImage(selectedFile, token);
      }

      const questionData = {
        ...formQuestion,
        ...(imageUrl ? { image: imageUrl } : {})
      };

      const response = await fetch('http://kahoot.nos-apps.com/api/question', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(questionData)
      });

      if (!response.ok) {
        throw new Error('Failed to create question');
      }

      const data = await response.json();
      toast.success('Question créée avec succès');
      
      onSuccess(data);
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
