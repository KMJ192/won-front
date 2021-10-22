import React from 'react';
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
  onChange,
}: Props): JSX.Element {
  return (
    <div className={cx('primary-date-picker', 'date-picker', size)}>
      <DatePickerInput
        status={status}
        size={size}
        placeholder={placeholder}
        startDate={startDate}
        endDate={endDate}
        isReadOnly={isReadOnly}
        disabled={disabled}
        onChange={onChange}
      />
      <DatePickerCalendar />
    </div>
  );
}

export default DatePicker;
