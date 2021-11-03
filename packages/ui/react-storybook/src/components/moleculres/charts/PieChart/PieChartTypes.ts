export interface PieChartDefaultType {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  defaultColor?: string;
  dataLabel?: {
    style?: string;
    color?: string;
  };
  totalValue?: number;
}

export interface PieChartData {
  value: number;
  text?: string;
  color?: string;
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

export interface PieChartArgs extends PieChartDefaultType {
  chartType?: 'primary' | 'donut';
  canvasStyle?: {
    [key: string]: string;
  };
  size?: string;
}
