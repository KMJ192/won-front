export interface DonutChartSize {
  readonly LARGE: string;
  readonly MEDIUM: string;
  readonly SMALL: string;
}

export interface DonutChartData {
  value: number;
  text?: string;
}

export interface Position {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
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
  data?: DonutChartData[];
  colorArray?: string[];
  customSize?: string;
  customStyle?: {
    [key: string]: string;
  };
}
