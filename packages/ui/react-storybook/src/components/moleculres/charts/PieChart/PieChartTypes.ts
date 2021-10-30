export interface PieChartData {
  value: number;
  text?: string;
}

export interface Position {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
}

export interface PieChartEvent {
  result1: boolean;
  result2: boolean;
  index: number;
  degree: number;
}

export interface PieChartArgs {
  data: PieChartData[];
  size?: string;
  customStyle?: {
    [key: string]: string;
  };
}
