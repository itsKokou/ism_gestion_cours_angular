
export interface ModuleList {
  id: number;
  libelle: string;
}

export interface ModuleCreate {
  id?: any,
  libelle?: string | null,
  isArchived?: Boolean | null,
}
