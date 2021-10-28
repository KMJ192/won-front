export interface ChartTypes {
  readonly BAR_CAHRT: string;
}

export const InitChartType: ChartTypes = {
  BAR_CAHRT: 'bar-chart',
};

export interface ChartArgs {
  type?: string;
  canvasStyle?: {
    [key: string]: string;
  };
}
