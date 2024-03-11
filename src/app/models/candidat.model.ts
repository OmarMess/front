import { NiveauLangue } from "app/enums/niveau-langue";
import { Profil } from "app/enums/profil";
import { SituationFam } from "app/enums/situation-fam";

export class Candidat {
    id: number;
    nom: string;
    prenom: string;
    situationFam:SituationFam ; 
    nationalite: string;
    cin: string;
    numTel: string;
    adresse: string;
    email: string;
    experience: string;
    nbrAnneeExp: number;
    compManag: string;
    nivFranc: NiveauLangue;
    nivAng: NiveauLangue;
    profil: Profil;
    
}
