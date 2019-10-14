export interface Pageable<T> {
  /** @todo alterar para tipo T[] */
  content: T;
  totalPages: number;
  totalElements: number;
  last: boolean;
  numberOfElements: number;
  first: boolean;
  size: number;
  number: number;
  sort?: string;
}
