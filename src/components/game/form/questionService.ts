
import { Question } from '@/types/game';

export const submitQuestionWithAnswers = async (
  question: Question,
  answers: string[],
  correctAnswer: number,
  selectedFile: File | null,
  token: string
) => {
  // Create FormData for the question
  const formData = new FormData();
  Object.entries(question).forEach(([key, value]) => {
    formData.append(key, value.toString());
  });

  // Add file if present
  if (selectedFile) {
    formData.append('fichier', selectedFile);
  }

  // 1. Send question first to get its ID
  const questionResponse = await fetch('http://kahoot.nos-apps.com/api/questions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: formData
  });

  if (!questionResponse.ok) {
    throw new Error('Erreur lors de l\'ajout de la question');
  }

  const questionData = await questionResponse.json();
  const questionId = questionData._id || questionData.data?._id;

  if (!questionId) {
    throw new Error('ID de question non trouvé dans la réponse');
  }

  // 2. Send answers using the question ID
  const answersPromises = answers.map(async (answer, index) => {
    const isCorrect = index === correctAnswer;
    
    const responseData = {
      file: "Image vers le fichier image", // Format demandé
      etat: isCorrect ? 1 : 0,
      question: questionId,
      reponse_texte: answer
    };

    return fetch('http://kahoot.nos-apps.com/api/reponse', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(responseData)
    });
  });

  await Promise.all(answersPromises);
  
  // Return the complete data
  return {
    ...questionData,
    reponses: answers,
    reponse_correcte: answers[correctAnswer]
  };
};
