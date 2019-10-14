import { MapUtils } from './map-utils';

describe('Shared: Util: MapUtils', () => {
  it('deve ordenar um map', async () => {
    const map = new Map<string, number>([
      ['Item 2', 2],
      ['Item 3', 3],
      ['Item 1', 1]
    ]);
    const expectedMap = new Map<string, number>([
      ['Item 1', 1],
      ['Item 2', 2],
      ['Item 3', 3]
    ]);
    const sortedMap = await MapUtils.sort(map);

    const expectedMapEntries = expectedMap.entries();
    const sortedMapEntries = sortedMap.entries();

    expect(sortedMap.size).toEqual(expectedMap.size);
    sortedMap.forEach(() => expect(sortedMapEntries.next().value).toEqual(expectedMapEntries.next().value));
  });
});
