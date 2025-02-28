
import { Question } from '@/types/game';

export const uploadQuestionImage = async (file: File, token: string): Promise<string> => {
  const formData = new FormData();
  formData.append('fichier', file);

  try {
    const response = await fetch('http://kahoot.nos-apps.com/api/upload', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    });

    if (!response.ok) {
      throw new Error(`Upload failed with status: ${response.status}`);
    }

    const data = await response.json();
    return data.url; // Assuming the API returns the URL of the uploaded image
  } catch (error) {
    console.error('Image upload error:', error);
    throw new Error('Failed to upload image');
  }
};

export const submitQuestionWithAnswers = async (
  question: Question,
  answers: string[],
  correctAnswer: number,
  selectedFile: File | null,
  token: string
) => {
  try {
    // First handle the file upload if there is one
    let imageUrl = '';
    if (selectedFile) {
      imageUrl = await uploadQuestionImage(selectedFile, token);
    }

    // Prepare question data according to the API format
    const questionPayload = {
      ...question,
      fichier: imageUrl ? [imageUrl] : undefined, // Use "fichier" instead of "image" and as array
      reponses: undefined, // Don't send reponses in the question object
      reponse_correcte: undefined // Don't send reponse_correcte in the question object
    };

    // Create the question
    const questionResponse = await fetch('http://kahoot.nos-apps.com/api/questions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(questionPayload)
    });

    if (!questionResponse.ok) {
      throw new Error('Erreur lors de l\'ajout de la question');
    }

    const questionResponseData = await questionResponse.json();
    const questionId = questionResponseData._id || questionResponseData.data?._id;

    if (!questionId) {
      throw new Error('ID de question non trouvé dans la réponse');
    }

    // 2. Send answers using the question ID
    const answersPromises = answers.map(async (answer, index) => {
      const isCorrect = index === correctAnswer;
      
      const responseData = {
        file: imageUrl || null, // Use the uploaded image URL
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
    const resultQuestion = questionResponseData.data || questionResponseData;
    
    return {
      ...resultQuestion,
      reponses: answers,
      reponse_correcte: answers[correctAnswer]
    };
  } catch (error) {
    console.error('Error submitting question with answers:', error);
    throw error;
  }
};
