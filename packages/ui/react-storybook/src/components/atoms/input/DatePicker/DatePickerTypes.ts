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
  customSize?: DatePickerCustomSize;
  disabled?: boolean;
  isReadOnly?: boolean;
  placeholder?: string;
}
