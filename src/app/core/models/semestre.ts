import { Niveau } from "./niveau";

export interface SemestreList {
  id: number;
  libelle: string;
  isActive: boolean;
  niveau: Niveau
}

export interface SemestreCreate {
  id?: any,
  libelle?: string | null,
  isActive?: Boolean | null,
  isArchived?: Boolean | null,
  niveau?: number | null
}
