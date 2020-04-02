import * as moment from 'moment';

interface Duration {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
}

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
    return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),
      date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds(), date.getUTCMilliseconds());
  }

  /**
   * Calcula a diferença de tempo entre dois Dates.
   *
   * @param end Date final
   * @param start Date inicial
   * @param format Formato do resultado.
   * * y: years
   * * M: months
   * * d: days
   * * H: hours (0)
   * * HH: hours (00)
   * * m: minutes (0)
   * * mm: minutes (00)
   * * s: seconds (0)
   * * ss: seconds (00)
   * * SSS: milliseconds
   * @param unit Unidade base para o cálculo. Por exemplo, se for usada a unidade 'm' num intervalo de 2 horas,
   * o cálculo retornará o valor '120:00' para o formato 'mm:ss'.
   * * y: years
   * * M: months
   * * d: days
   * * h: hours
   * * m: minutes
   * * s: seconds
   * * ms: milliseconds
   *
   * @returns a diferença de tempo
   */
  static timeDifference(
    end: Date | string,
    start: Date | string,
    format: string = 'HH:mm:ss',
    unit: moment.unitOfTime.DurationConstructor = 'y'): string {

    const endTime = moment.utc(end);
    const startTime = moment.utc(start);
    const momentDuration = moment.duration(endTime.diff(startTime));
    const duration = DateUtils.mountDuration(momentDuration, unit);

    return format
      .replace('y', duration.years.toString())
      .replace('M', duration.months.toString())
      .replace('d', duration.days.toString())
      .replace('HH', DateUtils.padStartWithZero(duration.hours, 2))
      .replace('H', duration.hours.toString())
      .replace('mm', DateUtils.padStartWithZero(duration.minutes, 2))
      .replace('m', duration.minutes.toString())
      .replace('ss', DateUtils.padStartWithZero(duration.seconds, 2))
      .replace('s', duration.seconds.toString())
      .replace('SSS', duration.milliseconds.toString());
  }

  private static mountDuration(momentDuration: moment.Duration, unit: moment.unitOfTime.DurationConstructor): Duration {
    return {
      years: momentDuration.years(),
      months: 'M' !== unit ? momentDuration.months() : Number(momentDuration.asMonths().toFixed()),
      days: 'd' !== unit ? momentDuration.days() : Number(momentDuration.asDays().toFixed()),
      hours: 'h' !== unit ? momentDuration.hours() : Number(momentDuration.asHours().toFixed()),
      minutes: 'm' !== unit ? momentDuration.minutes() : Number(momentDuration.asMinutes().toFixed()),
      seconds: 's' !== unit ? momentDuration.seconds() : Number(momentDuration.asSeconds().toFixed()),
      milliseconds: 'ms' !== unit ? momentDuration.milliseconds() : Number(momentDuration.asMilliseconds()),
    };
  }

  private static padStartWithZero(value: number, maxLength: number): string {
    return String(value).padStart(maxLength, '0');
  }
}
