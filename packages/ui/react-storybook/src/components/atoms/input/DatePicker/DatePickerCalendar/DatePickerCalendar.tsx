import React, { forwardRef } from 'react';

import classnames from 'classnames/bind';
import style from './DatePickerCalendar.module.scss';
const cx = classnames.bind(style);

interface Props {
  size?: string;
  isOpen?: boolean;
  DateCell?: JSX.Element;
  readonly calendarClose?: () => void;
}

const DatePickerCalendar = forwardRef<HTMLDivElement, Props>(({ size, isOpen, DateCell, calendarClose }, ref) => {
  return (
    <div ref={ref} className={cx('date-picker-calendar')}>
      calendar
    </div>
  );
});

DatePickerCalendar.defaultProps = {
  size: undefined,
  isOpen: false,
  DateCell: undefined,
  calendarClose: undefined,
};

export default DatePickerCalendar;
