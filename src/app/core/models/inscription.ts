export interface InscriptionList {
    id: number,
    date: String,
    etudiant: String,
    matricule: String,
    email: String,
    classe: String,
    anneeScolaire: String
}

export interface InscriptionCreate {
  id?: any,
  email?: string | null,
  password?: string|null,
  nomComplet?: string | null,
  tuteur?: string | null,
  photo?: string | null,
  classe?: number | null,
}

export interface Reinscription {
  id?: number | null,
  matricule?: string | null,
  email?: string | null,
  password?: string|null,
  nomComplet?: string | null,
  tuteur?: string | null,
  classe?: number |null
}