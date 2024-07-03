import { AbsenceList } from "./absence";
import { ClasseList } from "./classe";
import { EtudiantList } from "./etudiant";
import { InscriptionList } from "./inscription";
import { ModuleList } from "./module";

export interface DetailDossier { 
    inscriptions: InscriptionList[],
    etudiant: EtudiantList,
    classeActuelle: string
}

export interface DetailAbsence { 
    absences: AbsenceList[],
    etudiant: string,
}

export interface DetailClasse { 
    classes: ClasseList[],
    professeur: String
}

export interface DetailModule {
    modules: ModuleList[],
    professeur: String
}