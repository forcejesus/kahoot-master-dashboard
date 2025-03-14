
export interface Participant {
  apprenant: string;
  score: number;
}

export interface Planification {
  _id: string;
  pin: string;
  date_fin: string;
  date_debut?: string;
  heure_debut?: string;
  heure_fin?: string;
  statut?: string;
  type?: string;
  limite_participation: number;
  participants: Participant[];
  total_participants: number;
  participants_actifs: number;
  meilleur_score?: {
    apprenant: string;
    score: number;
  };
}

export interface PlanificationFormData {
  statut: string;
  date_debut: string;
  date_fin: string;
  heure_debut: string;
  heure_fin: string;
  limite_participant: number;
  type: string;
  jeu: string;
}

export interface PlanificationResponse {
  success: boolean;
  message: string;
  data: Planification;
}

export interface QuestionReponse {
  _id: string;
  etat: boolean;
  reponse_texte: string;
  question: string;
  date: string;
  __v: number;
}

export interface QuestionType {
  _id: string;
  libelle: string;
  description: string;
  reference: string;
  date: string;
  __v: number;
}

export interface QuestionPoint {
  _id: string;
  nature: string;
  valeur: number;
  description: string;
  date: string;
  __v: number;
}

export interface Question {
  _id?: string;
  libelle: string;
  fichier?: string;
  type_fichier?: string;
  temps?: number;
  limite_response?: boolean;
  reponses?: QuestionReponse[] | string[];
  typeQuestion?: QuestionType;
  point?: QuestionPoint;
  jeu?: string;
  date?: string;
  __v?: number;
  
  // For backward compatibility with older code
  image?: string;
  reponse_correcte?: string;
}

export interface QuestionResponse {
  file?: string;
  etat: 0 | 1; // 0: false, 1: true
  question: string;
  reponse_texte: string;
}

export interface UserResponse {
  _id: string;
  etat: 0 | 1;
  reponse_texte: string;
  apprenant: {
    _id: string;
    name: string;
  };
  created_at: string;
}

export interface Kahoot {
  _id: string;
  titre: string;
  image?: string;
  fichier?: string;
  planifications?: Planification[];
  questions?: Question[];
  stats?: {
    total_planifications: number;
    planifications_en_cours: number;
    total_apprenants: number;
    apprenants_actifs: number;
    sessions_completees?: number;
    meilleur_score?: {
      apprenant: string;
      score: number;
    };
  };
}
