import { SelectItem } from 'primeng/api';

import { isNullOrUndefined, isString } from './utils';

export class SelectItemUtils {

  static createListWithPrimitives<T>(sourceList: T[], labelToNull?: string): SelectItem[] {
    const list: SelectItem[] = [];

    if (!isNullOrUndefined(labelToNull)) {
      list.push({
        label: labelToNull,
        value: null
      });
    }

    return list.concat(sourceList.map(item => ({
      label: String(item),
      value: item
    })));
  }

  static createListWithObjects<T>(
    sourceList: T[],
    propToLabel: string | string[],
    propToValue: string,
    labelToNull?: string
  ): SelectItem[] {
    const list: SelectItem[] = [];

    if (!isNullOrUndefined(labelToNull)) {
      list.push({
        label: labelToNull,
        value: null
      });
    }

    return list.concat(sourceList.map(item => ({
      label: isString(propToLabel) ? item[propToLabel as string] : SelectItemUtils.buildLabel(item, propToLabel as string[]),
      value: item[propToValue]
    })));
  }

  private static buildLabel<T>(item: T, values: string[]): string {
    let label = '';

    for (let i = 0; i < values.length; i++) {
      label += i > 0 ? (' - ' + item[values[i]]) : item[values[i]];
    }

    return label;
  }
}
