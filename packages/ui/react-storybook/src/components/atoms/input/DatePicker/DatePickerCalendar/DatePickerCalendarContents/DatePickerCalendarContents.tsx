import React from 'react';

interface Props {
  customStyle?: { [key: string]: string };
  readonly cellRender?: (d: any, propItem: any) => void;
}

DatePickerCalendarContetents.defaultProps = {
  customStyle: undefined,
  cellRender: undefined,
};

function DatePickerCalendarContetents({ customStyle, cellRender }: Props) {
  return <div style={customStyle}>cal</div>;
}

export default DatePickerCalendarContetents;
