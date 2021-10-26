import React, { forwardRef } from 'react';

import classnames from 'classnames/bind';
import style from './DatePickerCalendar.module.scss';
import { CustomStyle, InitDatePickerSize } from '../DatePickerTypes';
import DatePickerCalendarContents from './DatePickerCalendarContents';
const cx = classnames.bind(style);

interface Props {
  size?: string;
  isOpen?: boolean;
  DateCell?: JSX.Element;
  customStyle?: CustomStyle;
  readonly calendarClose?: () => void;
  readonly cellRender?: (d: any, propItem: any) => void;
}

const DatePickerCalendar = forwardRef<HTMLDivElement, Props>(
  ({ size, isOpen, DateCell, customStyle, calendarClose, cellRender }, ref) => {
    return (
      <div ref={ref} className={cx('date-picker-calendar', size)}>
        <DatePickerCalendarContents customStyle={customStyle?.firstCalendarStyle} cellRender={cellRender} />
        <DatePickerCalendarContents customStyle={customStyle?.secondCalendarStyle} cellRender={cellRender} />
      </div>
    );
  },
);

DatePickerCalendar.defaultProps = {
  size: InitDatePickerSize.MEDIUM,
  isOpen: false,
  DateCell: undefined,
  customStyle: undefined,
  calendarClose: undefined,
  cellRender: undefined,
};

export default DatePickerCalendar;
