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
  readonly onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

DatePickerInput.defaultProps = {
  status: InitDatePickerStatus.DEFAULT,
  size: InitDatePickerSize.MEDIUM,
  placeholder: undefined,
  startDate: undefined,
  endDate: undefined,
  disabled: false,
  isReadOnly: false,
  onChange: undefined,
};

function DatePickerInput({
  status,
  size,
  placeholder,
  startDate,
  endDate,
  disabled,
  isReadOnly,
  onChange,
}: Props): JSX.Element {
  return (
    <>
      <input
        className={cx(status)}
        type='text'
        placeholder={placeholder}
        disabled={disabled}
        readOnly={isReadOnly}
        onChange={onChange}
        autoComplete='off'
        name='from'
        value={startDate}
      />
      <input
        className={cx(status)}
        type='text'
        placeholder={placeholder}
        disabled={disabled}
        readOnly={isReadOnly}
        onChange={onChange}
        autoComplete='off'
        name='to'
        value={endDate}
      />
    </>
  );
}

export default DatePickerInput;
