export interface SeanceList { 
    id: number,
    start: string,
    end: string,
    title: string,
    description: string,
    location: string,
    textColor: string,
    color: string
}

export interface SeanceCreate {
  id?: any,
  idCours?: any,
  date?: string | null,
  heureD?: string|null,
  heureF?: string | null,
  code?: string | null,
  salle?: number | null,
  professeur?: number | null,
}
