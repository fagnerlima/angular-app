import { ArrayUtils } from './array-utils';

class Person {
  constructor(
    public id: number,
    public name: string
  ) { }
}

function getList(): Person[] {
  return [
    new Person(1, 'Item 1'),
    new Person(2, 'Item 2'),
    new Person(3, 'Item 3')
  ];
}

describe('Shared: Util: ArrayUtils', () => {
  it('deve retornar um objeto que contenha o valor 2 no atributo ID', () => {
    const item = ArrayUtils.getItem(getList(), 'id', 2);

    expect(item instanceof Person).toBeTruthy();
    expect(item.name).toBe('Item 2');
  });

  it('deve retornar null ao tentar obter um item com ID inexistente', () => {
    const item = ArrayUtils.getItem(getList(), 'id', 5);

    expect(item).toBeNull();
  });
});
