export interface CanvasEventTypes {
  readonly FIRST: string;
  readonly SECOND: string;
  readonly THIRD: string;
}

export const InitCanvasEventType: CanvasEventTypes = {
  FIRST: 'first',
  SECOND: 'second',
  THIRD: 'third',
};

export interface CanvasEventArgs {
  type: string;
  canvasStyle?: {
    [key: string]: string;
  };
}
