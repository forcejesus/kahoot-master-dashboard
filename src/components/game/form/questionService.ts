
import { Question } from '@/types/game';
import { buildApiUrl, logApiRequest, logApiResponse } from '@/config/api';

export const submitQuestionWithAnswers = async (
  question: Question,
  answers: string[],
  correctAnswers: number[],
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
    
    // Only set type_fichier if a file is actually provided
    if (selectedFile) {
      formData.append('type_fichier', question.type_fichier || 'image');
      formData.append('fichier', selectedFile);
      console.log("Ajout du fichier:", selectedFile.name, selectedFile.type, selectedFile.size);
    } else {
      console.log("Aucun fichier sélectionné pour cette question");
    }

    // Log des données envoyées pour le débogage
    const questionData = {
      libelle: question.libelle,
      temps: question.temps,
      limite_response: question.limite_response,
      typeQuestion: question.typeQuestion,
      point: question.point,
      jeu: question.jeu,
      type_fichier: selectedFile ? (question.type_fichier || 'image') : undefined,
      correctAnswers: correctAnswers
    };

    const questionUrl = buildApiUrl('/questions');
    logApiRequest('POST', questionUrl, questionData);

    // 1. Envoyer la question avec l'image
    const questionResponse = await fetch(questionUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    });

    // Vérifier la réponse du serveur
    const responseText = await questionResponse.text();
    console.log("Réponse brute du serveur:", responseText);
    
    // Essayer de parser la réponse JSON
    let questionResponseData;
    try {
      questionResponseData = JSON.parse(responseText);
    } catch (e) {
      console.error("Erreur de parsing JSON:", e);
      throw new Error(`Réponse invalide du serveur: ${responseText}`);
    }

    logApiResponse('POST', questionUrl, questionResponseData, !questionResponse.ok);

    if (!questionResponse.ok || !questionResponseData.success) {
      console.error("Erreur de l'API:", questionResponseData);
      throw new Error(`Erreur lors de l'ajout de la question: ${questionResponseData.message || responseText}`);
    }

    // Extraire les données de la question
    const questionDataResponse = questionResponseData.data || questionResponseData;
    console.log("Données de question reçues:", questionDataResponse);
    
    const questionId = questionDataResponse._id;
    if (!questionId) {
      throw new Error('ID de question non trouvé dans la réponse');
    }

    // 2. Envoyer les réponses en utilisant l'ID de la question
    console.log("Envoi des réponses pour la question ID:", questionId);
    console.log("Réponses correctes:", correctAnswers);
    
    const answersPromises = answers.map(async (answer, index) => {
      // Pour les choix multiples, vérifier si cet index est dans les réponses correctes
      const isCorrect = correctAnswers.includes(index);
      
      const responseData = {
        etat: isCorrect ? 1 : 0,
        question: questionId,
        reponse_texte: answer
      };

      console.log(`Envoi de la réponse ${index+1}:`, responseData);

      const reponseUrl = buildApiUrl('/reponse');
      logApiRequest('POST', reponseUrl, responseData);

      const reponseResponse = await fetch(reponseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(responseData)
      });
      
      const reponseData = await reponseResponse.json();
      logApiResponse('POST', reponseUrl, reponseData);
      console.log(`Réponse ${index+1} créée:`, reponseData);
      
      return reponseResponse;
    });

    await Promise.all(answersPromises);
    console.log("Toutes les réponses ont été créées avec succès");
    
    // Retourner les données complètes
    return {
      ...questionDataResponse,
      reponses: answers,
      reponse_correcte: answers[correctAnswers[0]] // Première réponse correcte pour compatibilité
    };
  } catch (error) {
    console.error('Error submitting question with answers:', error);
    throw error;
  }
};
