export interface Candidat {
    id: number;
    nom: string;
    prenom: string;
    email: string;
    
  }
  
  export enum Role {
    MANAGER = 'MANAGER',
    EVALUATEUR = 'EVALUATEUR'
  }
  
  
  export interface Schedule {
    id?: number;
    candidat: Candidat;
    evaluateur: Role;
    date: string; 
    meetinglink: string;
    evaluated: boolean; 
  }
  