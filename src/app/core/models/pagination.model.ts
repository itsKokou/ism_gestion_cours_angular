export interface PaginationModel {
  pages: Number[],
  totalPages: number,
  currentPage: number,
  hasPrev: boolean,
  hasNext: boolean
}
