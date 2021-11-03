import { PrimaryPieChartTypes, PrimaryPieChartData } from './PrimaryPieChartTypes';

class PrimaryPieChartObject {
  private canvas: HTMLCanvasElement;

  private ctx: CanvasRenderingContext2D;

  private defaultColor: string;

  constructor(params: PrimaryPieChartTypes) {
    const { canvas, ctx, defaultColor, dataLabel, totalValue } = params;
    this.canvas = canvas;
    this.ctx = ctx;
    this.defaultColor = defaultColor || 'white';
  }
}
export default PrimaryPieChartObject;
