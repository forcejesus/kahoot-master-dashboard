
import { Question, QuestionPoint, QuestionReponse, QuestionType } from "./game-details";

export interface ApprenantDetail {
  _id: string;
  nom: string;
  prenom: string;
  avatar: string;
  matricule: string;
  phone: string;
  email: string;
  ecole: string;
  date: string;
  __v: number;
}

export interface ReponseDetail {
  _id: string;
  temps_reponse: number;
  reponse_apprenant: string;
  etat: boolean;
  question: {
    _id: string;
    libelle: string;
    fichier?: string;
    type_fichier?: string;
    temps?: number;
    limite_response?: boolean;
    reponses?: QuestionReponse[];
    typeQuestion?: QuestionType;
    point?: QuestionPoint;
    jeu?: string;
    date?: string;
    __v?: number;
  };
  participant: string;
  date: string;
  __v: number;
}

export interface ParticipantDetail {
  _id: string;
  score: number;
  reponses: ReponseDetail[];
  apprenant: ApprenantDetail;
  planification: string;
  date: string;
  __v: number;
}

export interface JeuDetail {
  _id: string;
  titre: string;
  image: string;
  createdBy: string;
  planification: string[];
  questions: Question[];
  date: string;
  __v: number;
}

export interface PlanificationDetail {
  _id: string;
  pin: string;
  statut: string;
  date_debut: string;
  date_fin: string;
  heure_debut: string;
  heure_fin: string;
  type: string;
  limite_participant: number;
  participants: ParticipantDetail[];
  jeu: JeuDetail;
  date: string;
  __v: number;
}

export interface PlanificationDetailResponse {
  success: boolean;
  message: string;
  data: PlanificationDetail;
}

export interface StatisticsData {
  bestScore: {
    participant: ParticipantDetail;
  } | null;
  worstScore: {
    participant: ParticipantDetail;
  } | null;
  totalParticipants: number;
}
