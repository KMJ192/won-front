import React, { forwardRef, useEffect, useState } from 'react';
import moment from 'moment';
import DatePickerCalendarContents from './DatePickerCalendarContents';

import { CustomStyle, InitDatePickerSize } from '../DatePickerTypes';

import classnames from 'classnames/bind';
import style from './DatePickerCalendar.module.scss';
import { calDateList, CalendarChangeEventType, CalendarDateList, DateList } from './DatePickerCalenderTypes';
const cx = classnames.bind(style);

interface Props {
  size?: string;
  isOpen?: boolean;
  DateCell?: JSX.Element;
  startDate?: moment.Moment;
  endDate?: moment.Moment;
  customStyle?: CustomStyle;
  readonly calendarClose?: () => void;
  readonly cellRender?: (d: any, propItem: any) => void;
}

const DatePickerCalendar = forwardRef<HTMLDivElement, Props>(
  ({ size, isOpen, DateCell, startDate, endDate, customStyle, calendarClose, cellRender }, ref) => {
    const today = moment();
    const [calendarDate, setCalendarDate] = useState<DateList>({
      prev: today.clone().subtract(0, 'month').endOf('month'),
      now: today.clone().add(0, 'month').endOf('month'),
      next: today.clone().add(1, 'month').endOf('month'),
    });
    const [dateList, setDateList] = useState<CalendarDateList>({
      first: [],
      second: [],
    });

    // 첫번째 달력 변경
    const firstCalendarChange: CalendarChangeEventType = {
      moveNext: () => {
        setCalendarDate({
          ...calendarDate,
          now: calendarDate.now.add(1, 'month').endOf('month'),
        });
        setDateList({
          ...dateList,
          first: calDateList({
            prev: calendarDate.now.clone().subtract(1, 'month').endOf('month'),
            now: calendarDate.now,
            next: calendarDate.now.clone().add(1, 'month').endOf('month'),
          }),
        });
      },
      movePrev: () => {
        setCalendarDate({
          ...calendarDate,
          now: calendarDate.now.subtract(1, 'month').endOf('month'),
        });
        setDateList({
          ...dateList,
          first: calDateList({
            prev: calendarDate.now.clone().subtract(1, 'month').endOf('month'),
            now: calendarDate.now,
            next: calendarDate.now.clone().add(1, 'month').endOf('month'),
          }),
        });
      },
    };

    const secondCalendarChange: CalendarChangeEventType = {
      moveNext: () => {
        setCalendarDate({
          ...calendarDate,
          next: calendarDate.next.add(1, 'month').endOf('month'),
        });
        setDateList({
          ...dateList,
          second: calDateList({
            prev: calendarDate.next.clone().subtract(1, 'month').endOf('month'),
            now: calendarDate.next,
            next: calendarDate.next.clone().add(1, 'month').endOf('month'),
          }),
        });
      },
      movePrev: () => {
        setCalendarDate({
          ...calendarDate,
          next: calendarDate.next.subtract(1, 'month').endOf('month'),
        });

        setDateList({
          ...dateList,
          second: calDateList({
            prev: calendarDate.next.clone().subtract(1, 'month').endOf('month'),
            now: calendarDate.next,
            next: calendarDate.next.clone().add(1, 'month').endOf('month'),
          }),
        });
      },
    };

    useEffect(() => {
      const firstCalDates: DateList = {
        prev: calendarDate.now.clone().subtract(1, 'month').endOf('month'),
        now: calendarDate.now,
        next: calendarDate.now.clone().add(1, 'month').endOf('month'),
      };

      const secondCalDates: DateList = {
        prev: calendarDate.next.clone().subtract(1, 'month').endOf('month'),
        now: calendarDate.now,
        next: calendarDate.next.clone().add(1, 'month').endOf('month'),
      };

      setDateList({
        first: calDateList(firstCalDates),
        second: calDateList(secondCalDates),
      });
    }, [calendarDate.next, calendarDate.now]);

    return (
      <div ref={ref} className={cx('date-picker-calendar', size)}>
        <DatePickerCalendarContents
          date={calendarDate.now}
          changeMonth={firstCalendarChange}
          dateList={dateList.first}
          customStyle={customStyle?.firstCalendarStyle}
          cellRender={cellRender}
        />
        <DatePickerCalendarContents
          date={calendarDate.next}
          changeMonth={secondCalendarChange}
          dateList={dateList.second}
          customStyle={customStyle?.secondCalendarStyle}
          cellRender={cellRender}
        />
      </div>
    );
  },
);

DatePickerCalendar.defaultProps = {
  size: InitDatePickerSize.MEDIUM,
  isOpen: false,
  DateCell: undefined,
  startDate: undefined,
  endDate: undefined,
  customStyle: undefined,
  calendarClose: undefined,
  cellRender: undefined,
};

export default DatePickerCalendar;
