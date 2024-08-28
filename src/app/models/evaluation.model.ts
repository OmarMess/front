export interface CompetenceTechnique {
    technologie: string;
    niveau: string;
  }
  
  export interface Evaluation {
    id?: number;
    candidateNom: string;
    candidatePrenom: string;
    candidateEmail: string;
    evaluatorNom: string;
    evaluatorPrenom: string;
    evaluatorEmail: string;
    niveauEtudes: string;
    annee: string;
    intitule: string;
    specialite: string;
    experience: string;
    competences: CompetenceTechnique[];
    profil: string;
    avis: string;
    notes: string;
    state: string;
  }
  