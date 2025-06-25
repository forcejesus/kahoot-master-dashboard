
import { Question } from '@/types/game';

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
    console.log("Envoi de la question avec les données:", {
      libelle: question.libelle,
      temps: question.temps,
      limite_response: question.limite_response,
      typeQuestion: question.typeQuestion,
      point: question.point,
      jeu: question.jeu,
      type_fichier: selectedFile ? (question.type_fichier || 'image') : undefined,
      correctAnswers: correctAnswers
    });

    // 1. Envoyer la question avec l'image
    const questionResponse = await fetch('http://kahoot.nos-apps.com/api/questions', {
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

    if (!questionResponse.ok || !questionResponseData.success) {
      console.error("Erreur de l'API:", questionResponseData);
      throw new Error(`Erreur lors de l'ajout de la question: ${questionResponseData.message || responseText}`);
    }

    // Extraire les données de la question
    const questionData = questionResponseData.data || questionResponseData;
    console.log("Données de question reçues:", questionData);
    
    const questionId = questionData._id;
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

      const reponseResponse = await fetch('http://kahoot.nos-apps.com/api/reponse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(responseData)
      });
      
      const reponseData = await reponseResponse.json();
      console.log(`Réponse ${index+1} créée:`, reponseData);
      
      return reponseResponse;
    });

    await Promise.all(answersPromises);
    console.log("Toutes les réponses ont été créées avec succès");
    
    // Retourner les données complètes
    return {
      ...questionData,
      reponses: answers,
      reponse_correcte: answers[correctAnswers[0]] // Première réponse correcte pour compatibilité
    };
  } catch (error) {
    console.error('Error submitting question with answers:', error);
    throw error;
  }
};
