import React from 'react';
import DatePickerCalendar from './DatePickerCalendar';
import DatePickerInput from './DatePickerInput';
import { DatePickerCustomSize, InitDatePickerSize, InitDatePickerStatus } from './DatePickerTypes';

interface Props {
  status?: string;
  size?: string;
  customSize?: DatePickerCustomSize;
  disabled?: boolean;
  isReadOnly?: boolean;
  placeholder?: string;
  startDate?: string;
  endDate?: string;
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
}: Props): JSX.Element {
  import('@wasm').then((wasmModule: any) => wasmModule.console_test('test'));
  return (
    <>
      <DatePickerInput />
      <DatePickerCalendar />
    </>
  );
}

export default DatePicker;
