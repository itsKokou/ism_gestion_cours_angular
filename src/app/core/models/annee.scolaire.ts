export interface AnneeScolaireList {
    id: number,
    libelle: string,
    isActive: boolean
}

export interface AnneeScolaireCreate {
  id?: any,
  libelle?: string | null | undefined,
  isActive?: Boolean | null | undefined,
  isArchived?: Boolean| null | undefined
}
