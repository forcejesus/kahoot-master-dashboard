
export interface Participant {
  apprenant: string;
  score: number;
}

export interface Planification {
  _id: string;
  pin: string;
  date_fin: string;
  limite_participation: number;
  participants: Participant[];
  total_participants: number;
  participants_actifs: number;
  meilleur_score?: {
    apprenant: string;
    score: number;
  };
}

export interface Question {
  _id?: string;
  libelle: string;
  reponses: string[];
  reponse_correcte: string;
  image?: string;
}

export interface QuestionResponse {
  file?: string;
  etat: 0 | 1; // 0: false, 1: true
  question: string;
  reponse_texte: string;
}

export interface Kahoot {
  _id: string;
  titre: string;
  image?: string;
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
