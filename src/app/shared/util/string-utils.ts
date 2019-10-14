export class StringUtils {

  static toSpinalCase(value: string): string {
    return value.replace(/\s/g, '').split(/(?=[A-Z])/).join('-').toLowerCase();
  }
}
