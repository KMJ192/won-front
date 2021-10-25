import React, { forwardRef } from 'react';
import { InitDatePickerSize, InitDatePickerStatus } from '../DatePickerTypes';

import classnames from 'classnames/bind';
import style from './DatePickerInput.module.scss';
const cx = classnames.bind(style);

interface Props {
  status?: string;
  size?: string;
  placeholder?: string;
  name?: string;
  startDate?: string;
  endDate?: string;
  disabled?: boolean;
  isReadOnly?: boolean;
  readonly calendarClose?: () => void;
  readonly calendarOpen?: () => void;
  readonly onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const DatePickerInput = forwardRef<HTMLInputElement, Props>(
  (
    {
      status,
      size,
      placeholder,
      name,
      startDate,
      endDate,
      disabled,
      isReadOnly,
      calendarClose,
      calendarOpen,
      onChange,
    },
    ref,
  ): JSX.Element => {
    return (
      <input
        className={cx(status)}
        type='text'
        placeholder={placeholder}
        disabled={disabled}
        readOnly={isReadOnly}
        onChange={onChange}
        onClick={calendarOpen}
        autoComplete='off'
        name={name}
        ref={ref}
        value={startDate || endDate}
      />
    );
  },
);

DatePickerInput.defaultProps = {
  status: InitDatePickerStatus.DEFAULT,
  size: InitDatePickerSize.MEDIUM,
  placeholder: undefined,
  name: undefined,
  startDate: undefined,
  endDate: undefined,
  disabled: false,
  isReadOnly: false,
  calendarClose: undefined,
  calendarOpen: undefined,
  onChange: undefined,
};

export default DatePickerInput;
