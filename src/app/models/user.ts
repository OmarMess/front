export interface User {
    id: number;
    mail: string;
    password: string;
    role: Role; 
    nom: string;
    prenom: string;
  }
  
  export enum Role {
    Manager = 'Manager',
    Evaluateur = 'Evaluateur'
  }
  


  