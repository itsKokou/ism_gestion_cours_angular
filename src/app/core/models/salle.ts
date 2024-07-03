export interface SalleList { 
    id: number;
    libelle: string;
    nbrePlace: number
}

export interface SalleCreate {
  id?: any,
  libelle?: string | null,
  nbrePlace?: number|null,
  isPlanned?: Boolean | null,
  isArchived?: Boolean | null,
}
