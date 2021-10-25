import moment from 'moment';

export interface DateList {
  prev: moment.Moment;
  now: moment.Moment;
  next: moment.Moment;
}

export interface CellValue {
  date: number;
  disable: boolean;
  value: string[];
}

export interface CalendarDateList {
  first: CellValue[];
  second: CellValue[];
}

export interface CalendarChangeEventType {
  moveNext: () => void;
  movePrev: () => void;
}

export const DayOfWeek: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
