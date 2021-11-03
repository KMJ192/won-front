import { PieChartData, PieChartDefaultType } from '../PieChartTypes';

export interface PrimaryPieChartData extends PieChartData {}
export interface PrimaryPieChartTypes extends PieChartDefaultType {
  data?: PrimaryPieChartData[][];
}
