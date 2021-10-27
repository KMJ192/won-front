import React, { Fragment } from 'react';
import moment from 'moment';

import { CalendarChangeEventType, CellValue, dayOfWeek } from '../DatePickerCalenderTypes';

import classnames from 'classnames/bind';
import style from './DatePickerCalendarContents.module.scss';
const cx = classnames.bind(style);

import left from '@src/static/images/icons/icon-datepicker-left-arrow.svg';
import right from '@src/static/images/icons/icon-datepicker-right-arrow.svg';

interface Props {
  date: moment.Moment;
  today?: string;
  changeMonth: CalendarChangeEventType;
  dateList: CellValue[][];
  customStyle?: { [key: string]: string };
  readonly cellRender?: (d: any, propItem: any) => void;
}

DatePickerCalendarContetents.defaultProps = {
  today: undefined,
  customStyle: undefined,
  cellRender: undefined,
};

function DatePickerCalendarContetents({ date, today, changeMonth, dateList, customStyle, cellRender }: Props) {
  return (
    <div className={cx('calendar-unit', 'calendar-gap')} style={customStyle}>
      <div className={cx('calendar-controller')}>
        <button className={cx('move-btn')} onClick={changeMonth.movePrev}>
          <img src={left} alt='<' />
        </button>
        <span className={cx('current-date')}>
          {date.year()}.{date.month() + 1}
        </span>
        <button className={cx('move-btn')} onClick={changeMonth.moveNext}>
          <img src={right} alt='>' />
        </button>
      </div>
      <div className={cx('body')}>
        <div className={cx('grid', 'head')}>
          {dayOfWeek.map((name: string) => (
            <Fragment key={name}>
              <span>{name}</span>
            </Fragment>
          ))}
        </div>
        <div className={cx('grid', 'body')}>
          {dateList.map((week: CellValue[], weekIdx: number) => (
            <Fragment key={weekIdx}>
              {week.map((day: CellValue, dayIdx: number) => {
                return (
                  <Fragment key={dayIdx}>
                    <span className={cx('custom-cell')}></span>
                  </Fragment>
                );
              })}
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DatePickerCalendarContetents;
