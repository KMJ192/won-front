import React, { useEffect, useCallback, useRef, useState } from 'react';
import DatePickerCalendar from './DatePickerCalendar';
import DatePickerInput from './DatePickerInput';
import { DatePickerCustomSize, InitDatePickerSize, InitDatePickerStatus } from './DatePickerTypes';

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
  startDate?: string;
  endDate?: string;
  today?: string;
  DateCell?: JSX.Element;
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
  DateCell: undefined,
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
  DateCell,
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
          startDate={startDate}
          endDate={endDate}
          isReadOnly={isReadOnly}
          disabled={disabled}
          calendarOpen={calendarOpen}
          calendarClose={calendarClose}
          onChange={onChange}
          name='from'
          ref={firstInputRef}
        />
        <DatePickerInput
          status={status}
          size={size}
          placeholder={placeholder}
          startDate={startDate}
          endDate={endDate}
          isReadOnly={isReadOnly}
          disabled={disabled}
          calendarOpen={calendarOpen}
          calendarClose={calendarClose}
          onChange={onChange}
          name='to'
          ref={secondInputRef}
        />
      </div>
      {isOpen && <DatePickerCalendar isOpen={isOpen} calendarClose={calendarClose} ref={calendarRef} />}
    </div>
  );
}

export default DatePicker;
