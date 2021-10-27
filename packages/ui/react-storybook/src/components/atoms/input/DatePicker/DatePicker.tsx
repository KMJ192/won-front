import React, { useEffect, useCallback, useRef, useState } from 'react';
import moment from 'moment';

import DatePickerCalendar from './DatePickerCalendar';
import DatePickerInput from './DatePickerInput';

import { CustomStyle, DatePickerCustomSize, InitDatePickerSize, InitDatePickerStatus } from './DatePickerTypes';

import classnmaes from 'classnames/bind';
import style from './DatePicker.module.scss';
const cx = classnmaes.bind(style);

interface Props {
  status?: string;
  size?: string;
  customSize?: DatePickerCustomSize;
  disabled?: boolean;
  isReadOnly?: boolean;
  placeholder?: string;
  startDate?: moment.Moment;
  endDate?: moment.Moment;
  today?: string;
  customStyle?: CustomStyle;
  DateCell?: JSX.Element;
  readonly cellRender?: (d: any, propItem: any) => void;
  readonly onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

DatePicker.defaultProps = {
  status: InitDatePickerStatus.DEFAULT,
  size: InitDatePickerSize.MEDIUM,
  customSize: undefined,
  disabled: false,
  isReadOnly: false,
  placeholder: undefined,
  startDate: undefined,
  endDate: undefined,
  today: undefined,
  customStyle: undefined,
  DateCell: undefined,
  cellRender: undefined,
  onChange: undefined,
};

function DatePicker({
  status,
  size,
  customSize,
  disabled,
  isReadOnly,
  placeholder,
  startDate,
  endDate,
  today,
  customStyle,
  DateCell,
  cellRender,
  onChange,
}: Props): JSX.Element {
  const firstInputRef = useRef<HTMLInputElement>(null);
  const secondInputRef = useRef<HTMLInputElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const calendarOpen = () => {
    setIsOpen(true);
  };

  const calendarClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const diffAreaClick = useCallback(
    (e: MouseEvent) => {
      if (
        !calendarRef.current?.contains(e.target as Node) &&
        !firstInputRef.current?.contains(e.target as Node) &&
        !secondInputRef.current?.contains(e.target as Node)
      ) {
        calendarClose();
      }
    },
    [calendarClose],
  );

  useEffect(() => {
    document.addEventListener('click', diffAreaClick);
    return () => {
      document.removeEventListener('click', diffAreaClick);
    };
  }, [diffAreaClick]);

  return (
    <div className={cx('primary-date-picker', 'date-picker', size)}>
      <div className={cx('input-container')}>
        <DatePickerInput
          status={status}
          size={size}
          placeholder={placeholder}
          isReadOnly={isReadOnly}
          disabled={disabled}
          calendarOpen={calendarOpen}
          onChange={onChange}
          name='from'
          ref={firstInputRef}
          customStyle={customStyle?.firstInputStyle}
        />
        <DatePickerInput
          status={status}
          size={size}
          placeholder={placeholder}
          isReadOnly={isReadOnly}
          disabled={disabled}
          calendarOpen={calendarOpen}
          onChange={onChange}
          name='to'
          ref={secondInputRef}
          customStyle={customStyle?.secondInputStyle}
        />
      </div>
      {isOpen && (
        <DatePickerCalendar
          ref={calendarRef}
          isOpen={isOpen}
          calendarClose={calendarClose}
          cellRender={cellRender}
          size={size}
          startDate={startDate}
          endDate={endDate}
          customStyle={customStyle}
        />
      )}
    </div>
  );
}

export default DatePicker;
