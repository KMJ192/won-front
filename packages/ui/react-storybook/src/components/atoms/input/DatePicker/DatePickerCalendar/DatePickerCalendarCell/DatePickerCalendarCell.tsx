import React from 'react';

import classNames from 'classnames/bind';
import style from './DatePickerCalendarCell.module.scss';
const cx = classNames.bind(style);

interface Props {
  disabled: boolean;
  day: number;
  selectDate: (day: number) => void;
}

function DatePickerCalendarCell({ disabled, day, selectDate }: Props) {
  return (
    <span className={cx('cell')} onClick={() => selectDate(day)}>
      <span className={cx(disabled)}>{day}</span>
    </span>
  );
}

export default DatePickerCalendarCell;
