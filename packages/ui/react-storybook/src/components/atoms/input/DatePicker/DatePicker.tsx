import React from 'react';
import { DatePickerCustomSize, InitDatePickerSize, InitDatePickerStatus } from './DatePickerTypes';

interface Props {
  status?: string;
  size?: string;
  customSize?: DatePickerCustomSize;
  disabled?: boolean;
  isReadOnly?: boolean;
  placeholder?: string;
}

DatePicker.defaultProps = {
  status: InitDatePickerStatus.DEFAULT,
  size: InitDatePickerSize.MEDIUM,
  customSize: undefined,
  disabled: false,
  isReadOnly: false,
  placeholder: undefined,
};

function DatePicker({ status, size, customSize, disabled, isReadOnly, placeholder }: Props): JSX.Element {
  return <div>달력</div>;
}

export default DatePicker;
