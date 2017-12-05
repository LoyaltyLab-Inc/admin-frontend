import {NativeDateAdapter} from '@angular/material';

export class ExtendedDatepicker extends NativeDateAdapter {

  format(date: Date, displayFormat: Object): string {
    if (displayFormat === 'input') {
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      return `${day}.${month}.${year}`;
    } else {
      return date.toDateString();
    }
  }
  getDayOfWeekNames(style): string[] {

    const SHORT_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return SHORT_NAMES;
  }
  getFirstDayOfWeek(): number {
    return 1;
  }
}

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: {day: 'numeric', month: 'short', year: 'numeric'},
  },
  display: {
    dateInput: 'input',
    monthYearLabel: {year: 'numeric', month: 'numeric'},
    dateA11yLabel: {year: 'numeric', month: 'long', day: 'numeric'},
    monthYearA11yLabel: {year: 'numeric', month: 'long'},
  },
};
