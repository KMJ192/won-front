export interface DonutChartSize {
  readonly LARGE: string;
  readonly MEDIUM: string;
  readonly SMALL: string;
}

export const initDonutChartSize: DonutChartSize = {
  LARGE: 'large',
  MEDIUM: 'medium',
  SMALL: 'small',
};

export const initDonutChartStyle = {
  border: 'solid 1px black',
};

export interface DonutChartArgs {
  size?: string;
  customSize?: {
    width: string;
    height: string;
  };
  customStyle?: {
    [key: string]: string;
  };
}
