export interface InscritList { 
  id: number;
  matricule: string;
  email: string;
  nomComplet: string;
  tuteur: string;
  classe: string;
}

export interface EtudiantList { 
  id: number;
  matricule: string;
  email: string;
  nomComplet: string,
  tuteur: string,
  photo: string,
}

export interface EtudiantCreate {
  id?: any,
  matricule?: string | null,
  email?: string | null,
  password?: string|null,
  nomComplet?: string | null,
  tuteur?: string | null,
  isArchived?: Boolean | null,
}
