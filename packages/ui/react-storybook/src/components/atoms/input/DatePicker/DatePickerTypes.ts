import moment from 'moment';
import React from 'react';

export interface DatePickerStatus {
  readonly DEFAULT: string;
  readonly ERROR: string;
}

export interface DatePickerCustomSize {
  inputWidth?: string;
  inputHeigth?: string;
  calendarWidth?: string;
  calendarHeight?: string;
}

export interface DatePickerSizeType {
  readonly LARGE: string;
  readonly MEDIUM: string;
  readonly SMALL: string;
}

export interface DatePickerCalendarCellPropItem {
  selected: boolean;
  from: boolean;
  to: boolean;
  disabled: boolean;
  thisMonth: boolean;
  readonly onClick: () => void;
}

export interface CustomStyle {
  firstInputStyle?: {
    [key: string]: string;
  };
  secondInputStyle?: {
    [key: string]: string;
  };
  firstCalendarStyle?: {
    [key: string]: string;
  };
  secondCalendarStyle?: {
    [key: string]: string;
  };
}

export const InitDatePickerStatus = {
  DEFAULT: 'default',
  ERROR: 'error',
};

export const InitDatePickerSize: DatePickerSizeType = {
  LARGE: 'large',
  MEDIUM: 'medium',
  SMALL: 'small',
};

export interface DatePickerArgs {
  status?: string;
  size?: string;
  minDate?: moment.Moment;
  startDate?: moment.Moment;
  endDate?: moment.Moment;
  today?: string;
  customSize?: DatePickerCustomSize;
  disabled?: boolean;
  isReadOnly?: boolean;
  placeholder?: string;
  customStyle?: CustomStyle;
  readonly cellRender?: (d: any, propItem: any) => void;
  readonly onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  readonly submit?: (from: any, to: any) => void;
}
