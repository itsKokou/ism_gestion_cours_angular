import { Filiere } from "./filiere";
import { Niveau } from "./niveau";

export interface ClasseList {
  id: number,
  libelle: string,
  effectif: number,
  niveau: Niveau,
  filiere: Filiere
}

export interface ClasseCreate {
  id?: any,
  libelle?: string | null,
  effectif?: number| null,
  niveau?: number| null,
  filiere?: number| null
  isPlanned?: Boolean | null,
  isArchived?: Boolean | null,
}
