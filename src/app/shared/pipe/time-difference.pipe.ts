import { Pipe, PipeTransform } from '@angular/core';

import * as moment from 'moment';

import { DateUtils } from '../util/date-utils';

@Pipe({
  name: 'timeDifference'
})
export class TimeDifferencePipe implements PipeTransform {

  /**
   * @see DateUtils.timeDifference()
   */
  transform(end: Date | string, start: Date | string, format?: string, unit?: moment.unitOfTime.DurationConstructor): string {
    return DateUtils.timeDifference(end, start, format, unit);
  }
}
