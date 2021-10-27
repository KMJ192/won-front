import React from 'react';
import moment from 'moment';

import classNames from 'classnames/bind';
import style from './DatePickerCalendarCell.module.scss';
import { DatePickerCalendarCellPropItem } from '../../DatePickerTypes';
const cx = classNames.bind(style);

interface Props {
  day: moment.Moment;
  propItem: DatePickerCalendarCellPropItem;
}

function DatePickerCalendarCell({ day, propItem }: Props) {
  const { selected, from, to, disabled, thisMonth, onClick } = propItem;
  return (
    <span className={cx('cell')} onClick={onClick}>
      <span className={cx(disabled)}>{day}</span>
    </span>
  );
}

export default DatePickerCalendarCell;
