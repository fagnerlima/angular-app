import * as moment from 'moment';

export class DateUtils {
  static serializeDate(date: Date): string {
    if (!date) {
      return null;
    }

    return date.toJSON().substring(0, 10);
  }

  static deserializeDate(date: string): Date {
    if (!date) {
      return null;
    }

    return DateUtils.toUTCDate(new Date(date.substring(0, 10)));
  }

  static serializeDateTime(date: Date): string {
    if (!date) {
      return null;
    }

    const jsonDate = date.toJSON();

    return jsonDate.substring(0, jsonDate.length - 1);
  }

  static deserializeDateTime(date: string): Date {
    if (!date) {
      return null;
    }

    if (date.endsWith('Z')) {
      return DateUtils.toUTCDateTime(new Date(date));
    }

    return DateUtils.toUTCDateTime(new Date(`${date}Z`));
  }

  static toDate(date: Date): string {
    return moment(date).format('YYYY-MM-DD');
  }

  static toTime(date: Date): string {
    return moment(date).format('HH:mm:ss');
  }

  static isSameDay(date1: Date, date2: Date): boolean {
    return DateUtils.toDate(date1) === DateUtils.toDate(date2);
  }

  static isToday(date: Date): boolean {
    return DateUtils.isSameDay(date, new Date());
  }

  static toUTCDate(date: Date) {
    return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
  }

  static toUTCDateTime(date: Date) {
    return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(),
  date.getUTCSeconds(), date.getUTCMilliseconds());

  }

  static timeDifference(end: Date | string, start: Date | string): string {
    const endTime = moment.utc(end);
    const startTime = moment.utc(start);
    const durationTime = moment.duration(endTime.diff(startTime));

    const hours = DateUtils.padStartWithZero(durationTime.hours(), 2);
    const minutes = DateUtils.padStartWithZero(durationTime.minutes(), 2);
    const seconds = DateUtils.padStartWithZero(durationTime.seconds(), 2);
    const milliseconds = DateUtils.padStartWithZero(durationTime.milliseconds(), 3);

    return `${hours}:${minutes}:${seconds}.${milliseconds}`;
  }

  private static padStartWithZero(value: number, maxLength: number): string {
    return String(value).padStart(maxLength, '0');
  }
}
