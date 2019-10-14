import { SelectItemUtils } from './select-item-utils';

class Person {
  constructor(
    public id: number,
    public name: string,
    public code: string
  ) { }
}

function getList(): Person[] {
  return [
    new Person(1, 'Item 1', 'I1'),
    new Person(2, 'Item 2', 'I2'),
    new Person(3, 'Item 3', 'I3')
  ];
}

describe('Shared: Util: SelectItemUtils', () => {
  it('deve criar uma lista de SelectItem com valores primitivos', () => {
    const list = SelectItemUtils.createListWithPrimitives([1, 2, 3]);

    expect(list.length).toBe(3);
    expect(list[0].label).toBe('1');
    expect(list[0].value).toBe(1);
  });

  it('deve criar uma lista de SelectItem com valores primitivos, sendo o 1º item nulo', () => {
    const list = SelectItemUtils.createListWithPrimitives([1, 2, 3], '--');

    expect(list.length).toBe(4);
    expect(list[0].label).toBe('--');
    expect(list[0].value).toBe(null);
    expect(list[1].label).toBe('1');
    expect(list[1].value).toBe(1);
  });

  it('deve criar uma lista de SelectItem com objetos', () => {
    const list = SelectItemUtils.createListWithObjects(getList(), 'name', 'id');

    expect(list.length).toBe(3);
    expect(list[0].label).toBe('Item 1');
    expect(list[0].value).toBe(1);
  });

  it('deve criar uma lista de SelectItem com objetos, sendo o 1º item nulo', () => {
    const list = SelectItemUtils.createListWithObjects(getList(), 'name', 'id', '--');

    expect(list.length).toBe(4);
    expect(list[0].label).toBe('--');
    expect(list[0].value).toBe(null);
    expect(list[1].label).toBe('Item 1');
    expect(list[1].value).toBe(1);
  });

  it('deve criar uma lista de SelectItem com objetos e label combinado', () => {
    const list = SelectItemUtils.createListWithObjects(getList(), ['code', 'name'], 'id');

    expect(list.length).toBe(3);
    expect(list[0].label).toBe('I1 - Item 1');
    expect(list[0].value).toBe(1);
  });
});
