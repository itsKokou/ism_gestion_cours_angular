import { ClasseList } from "./classe";

export interface ProfHome{
    nbreCours: number;
    nbreClasse: number;
    nbreModule: number;
    nbreDeclaration: number;
    classes:ClasseList[];
}

export interface RPHome{
    nbreInscription: number;
    nbreClasse: number;
    nbreModule: number;
    nbreProfesseur: number;
    absenteistes:Absenteiste[];
}

export interface Absenteiste{
    id:number;
    matricule:string;
    nomComplet:string;
    email:string;
    classe:string;
    nbreHeure:number;
}