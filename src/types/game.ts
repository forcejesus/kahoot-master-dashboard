
export interface Question {
  libelle: string;
  type_fichier?: string;
  temps: number;
  limite_response: boolean;
  typeQuestion: string;
  point: string;
  jeu: string;
}

export interface QuestionType {
  _id: string;
  libelle: string;
}

export interface Point {
  _id: string;
  valeur: number;
}
