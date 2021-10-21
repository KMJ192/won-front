import React from 'react';
import { InitDatePickerSize, InitDatePickerStatus } from '../DatePickerTypes';

import classnames from 'classnames/bind';
import style from './DatePickerInput.module.scss';
const cx = classnames.bind(style);

interface Props {
  status?: string;
  size?: string;
  placeholder?: string;
  startDate?: string;
  endDate?: string;
  disabled?: boolean;
  isReadOnly?: boolean;
}

DatePickerInput.defaultProps = {
  status: InitDatePickerStatus.DEFAULT,
  size: InitDatePickerSize.MEDIUM,
  placeholder: undefined,
  startDate: undefined,
  endDate: undefined,
  disabled: false,
  isReadOnly: false,
};

function DatePickerInput({ status, size, placeholder, startDate, endDate, disabled, isReadOnly }: Props): JSX.Element {
  return (
    <>
      <input
        className={cx('date-picker-input-first', status)}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={isReadOnly}
      />
      <input
        className={cx('date-picker-input-second', status)}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={isReadOnly}
      />
    </>
  );
}

export default DatePickerInput;
