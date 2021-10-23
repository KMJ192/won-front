export interface CanvasEventTypes {
  readonly FIRST: string;
}

export const InitCanvasEventType: CanvasEventTypes = {
  FIRST: 'first',
};

export interface CanvasEventArgs {
  type: string;
  canvasStyle?: {
    [key: string]: string;
  };
}
