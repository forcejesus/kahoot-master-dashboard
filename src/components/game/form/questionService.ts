
import { Question } from '@/types/game';

export const submitQuestionWithAnswers = async (
  question: Question,
  answers: string[],
  correctAnswer: number,
  selectedFile: File | null,
  token: string
) => {
  try {
    // Créer un FormData pour envoyer à la fois les données et l'image
    const formData = new FormData();
    
    // Ajouter les champs de la question
    formData.append('libelle', question.libelle);
    formData.append('temps', question.temps.toString());
    formData.append('limite_response', question.limite_response.toString());
    formData.append('typeQuestion', question.typeQuestion);
    formData.append('point', question.point);
    formData.append('jeu', question.jeu);
    formData.append('type_fichier', question.type_fichier || 'image');
    
    // Ajouter le fichier s'il existe
    if (selectedFile) {
      formData.append('fichier', selectedFile);
    }

    // 1. Envoyer la question avec l'image
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

    const questionResponseData = await questionResponse.json();
    const questionData = questionResponseData.data || questionResponseData;
    const questionId = questionData._id;

    if (!questionId) {
      throw new Error('ID de question non trouvé dans la réponse');
    }

    // 2. Envoyer les réponses en utilisant l'ID de la question
    const answersPromises = answers.map(async (answer, index) => {
      const isCorrect = index === correctAnswer;
      
      const responseData = {
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
    
    // Retourner les données complètes
    return {
      ...questionData,
      reponses: answers,
      reponse_correcte: answers[correctAnswer]
    };
  } catch (error) {
    console.error('Error submitting question with answers:', error);
    throw error;
  }
};
