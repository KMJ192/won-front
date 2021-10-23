export interface CanvasEventTypes {
  readonly FIRST: string;
  readonly SECOND: string;
}

export const InitCanvasEventType: CanvasEventTypes = {
  FIRST: 'first',
  SECOND: 'second',
};

export interface CanvasEventArgs {
  type: string;
  canvasStyle?: {
    [key: string]: string;
  };
}
