export interface ProfesseurList {
    id:number,
    nomComplet: string,
    email: string,
    portable: string,
    grade: string,
}

export interface ProfesseurCreate {
    id?: any,
    email?: string | null,
    password?: string | null ,
    nomComplet?: string | null ,
    portable?: string | null ,
    grade?: string | null ,
    isPlanned?: boolean | null,
    isArchived?: boolean | null,
}