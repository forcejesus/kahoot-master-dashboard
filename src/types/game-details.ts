
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
  libelle: string;
  reponses: string[];
  reponse_correcte: string;
  image?: string;
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
  };
}
