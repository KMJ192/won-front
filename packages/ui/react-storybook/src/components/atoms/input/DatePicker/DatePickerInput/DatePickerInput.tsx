import React, { forwardRef } from 'react';
import { InitDatePickerSize, InitDatePickerStatus, CustomStyle } from '../DatePickerTypes';

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
  customStyle?: { [key: string]: string };
  readonly calendarOpen?: () => void;
  readonly onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const DatePickerInput = forwardRef<HTMLInputElement, Props>(
  (
    { status, size, placeholder, name, startDate, endDate, disabled, isReadOnly, customStyle, calendarOpen, onChange },
    ref,
  ): JSX.Element => {
    return (
      <input
        className={cx(status, size)}
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
        style={customStyle}
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
  customStyle: undefined,
  calendarOpen: undefined,
  onChange: undefined,
};

export default DatePickerInput;
