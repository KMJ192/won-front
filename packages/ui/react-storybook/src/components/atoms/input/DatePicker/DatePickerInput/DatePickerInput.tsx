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
  disabled?: boolean;
  isReadOnly?: boolean;
  customStyle?: { [key: string]: string };
  readonly calendarOpen?: () => void;
  readonly onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const DatePickerInput = forwardRef<HTMLInputElement, Props>(
  (
    { status, size, placeholder, name, disabled, isReadOnly, customStyle, calendarOpen, onChange },
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
  disabled: false,
  isReadOnly: false,
  customStyle: undefined,
  calendarOpen: undefined,
  onChange: undefined,
};

export default DatePickerInput;
