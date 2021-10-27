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
  first: CellValue[][];
  second: CellValue[][];
}

export interface CalendarChangeEventType {
  moveNext: () => void;
  movePrev: () => void;
}

export const dayOfWeek: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export function calDateList(calendarDate: DateList): CellValue[][] {
  const prevMonthLastDate = calendarDate.prev.date();
  const prevMonthLastDay = calendarDate.prev.day();
  const nowMonthLastDate = calendarDate.now.date();
  const nowMonthLastDay = calendarDate.now.day();

  const prevDateList: CellValue[] = [];
  const nowDateList: CellValue[] = [];
  const nextDateList: CellValue[] = [];

  for (let i = 0; i < nowMonthLastDate + 1; i++) {
    nowDateList.push({
      date: i + 1,
      disable: false,
      value: [],
    });
  }

  if (prevMonthLastDay !== 6) {
    for (let i = 0; i < prevMonthLastDay + 1; i++) {
      prevDateList.push({
        date: prevMonthLastDate - i,
        disable: true,
        value: [],
      });
    }
  }

  for (let i = 1; i < 7 - nowMonthLastDay; i++) {
    nextDateList.push({
      date: i,
      disable: true,
      value: [],
    });
  }

  const list: CellValue[] = prevDateList.concat(nowDateList, nextDateList);

  const calendarList: CellValue[][] = [];
  for (let i = 0; i < list.length / 7; i++) {
    calendarList.push(list.slice(i * 7, i * 7 + 7));
  }

  return calendarList;
}
