
export interface DeclarationList { 
    id: number,
    userId: number,
    seanceId: number,
    date: string,
    titre: string,
    cours: string,
    email: string,
    user: string,
    motif: string,
    description: string,
    etat: string,
}

export interface DeclarationCreate { 
    userId: number,
    seanceId: number,
    motif: string,
    description: string
}
