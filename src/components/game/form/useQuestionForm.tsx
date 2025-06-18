
import { useState } from 'react';
import { Question } from '@/types/game';

interface FormQuestion {
  libelle: string;
  type_fichier: string;
  temps: number;
  limite_response: boolean;
  typeQuestion: string;
  point: string;
  jeu: string;
  reponses: string[];
  reponse_correcte: string;
}

export const useQuestionForm = (gameId: string, token: string) => {
  const [formQuestion, setFormQuestion] = useState<FormQuestion>({
    libelle: '',
    type_fichier: 'image',
    temps: 30,
    limite_response: true,
    typeQuestion: '',
    point: '',
    jeu: gameId,
    reponses: [],
    reponse_correcte: ''
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateFormQuestion = (updates: Partial<FormQuestion>) => {
    setFormQuestion(prev => ({ ...prev, ...updates }));
  };

  const handleFileChange = (file: File | null) => {
    setSelectedFile(file);
    
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      
      // Déterminer le type de fichier
      const fileType = file.type.startsWith('image/') ? 'image' : 'video';
      updateFormQuestion({ type_fichier: fileType });
    } else {
      setPreviewUrl('');
      updateFormQuestion({ type_fichier: 'image' });
    }
  };

  const resetForm = () => {
    setFormQuestion({
      libelle: '',
      type_fichier: 'image',
      temps: 30,
      limite_response: true,
      typeQuestion: '',
      point: '',
      jeu: gameId,
      reponses: [],
      reponse_correcte: ''
    });
    setSelectedFile(null);
    setPreviewUrl('');
  };

  return {
    formQuestion,
    updateFormQuestion,
    selectedFile,
    previewUrl,
    handleFileChange,
    isSubmitting,
    setIsSubmitting,
    resetForm
  };
};
