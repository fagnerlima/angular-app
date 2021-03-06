import { ListFilter, ListSortFilter } from '@app/shared/model/list-filter.model';

export class GrupoListFilter extends ListFilter {

  constructor(
    public nome = '',
    public ativo = true,
    public page = 0,
    public size = 10,
    public sort: ListSortFilter[] = [
      new ListSortFilter('nome', 'asc')
    ]
  ) {
    super(page, size, sort);
  }
}
