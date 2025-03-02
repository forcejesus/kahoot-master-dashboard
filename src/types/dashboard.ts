
export interface Kahoot {
  _id: string;
  titre: string;
  questions?: {
    libelle: string;
    reponses: string[];
    reponse_correcte: string;
  }[];
  planifications?: {
    _id: string;
    pin: string;
    participants: {
      apprenant: string;
      score: number;
    }[];
  }[];
}
