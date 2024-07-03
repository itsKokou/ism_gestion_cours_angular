import { ClasseList } from "./classe";
import { Filiere } from "./filiere";
import { ModuleList } from "./module";
import { Niveau } from "./niveau";
import { ProfesseurList } from "./professeur";
import { SemestreList } from "./semestre";

export interface CoursList {
  id: number,
  date: string,
  etat: string,
  semestre: SemestreList,
  module: ModuleList,
  professeur: ProfesseurList,
  classes: ClasseList[],
  nbreHeureTotal: number,
  nbreHeurePlanifie: number,
  nbreHeureRealise: number,
}

export interface CoursCreate {
  id?: any,
  semestre?: number| null,
  module?: number| null,
  professeur?: number| null,
  nbreHeureTotal?: number| null,
  classes?: number[] | null,
  isArchived?: Boolean | null,
}
