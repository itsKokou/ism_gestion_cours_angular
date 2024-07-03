import { ClasseList } from "./classe";
import { ModuleList } from "./module";
import { ProfesseurList } from "./professeur";

export interface Enseignement { 
    professeur?: ProfesseurList,
    classe?: ClasseList,
    modules?: ModuleList[]
}

export interface EnseignementToString{
    classe: string,
    modules: string
}