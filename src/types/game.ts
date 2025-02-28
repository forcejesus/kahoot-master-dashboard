
export interface Question {
  _id?: string;
  libelle: string;
  type_fichier?: string;
  temps: number;
  limite_response: boolean;
  typeQuestion: string;
  point: string;
  jeu: string;
  reponses: string[];
  reponse_correcte: string;
  image?: string;
}

export interface QuestionType {
  _id: string;
  libelle: string;
}

export interface Point {
  _id: string;
  valeur: number;
}
