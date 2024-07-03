
export interface RestResponse<T>{
    totalItems?: number,
    pages?: Number[],
    totalPages?: number,
    currentPage?: number,
    hasPrev?: boolean,
    hasNext?: boolean,
    results:T
    statuts:number
}




