import { ListFilter, ListSortFilter } from './list-filter.model';

describe('Shared: Model: ListFilter', () => {
  it('deve criar uma instância do model', () => {
    const filter = new ListFilter(1, 20, [new ListSortFilter('field1', 'desc')]);

    expect(filter instanceof ListFilter).toBeTruthy();
    expect(filter.page).toBe(1);
    expect(filter.size).toBe(20);
    expect(filter.sort[0] instanceof ListSortFilter).toBeTruthy();
    expect(filter.sort[0].field).toBe('field1');
    expect(filter.sort[0].order).toBe('desc');
  });
});
