export interface DrawTypes {
  readonly SHAPE: string;
  readonly LINE: string;
}

export const InitDrawType: DrawTypes = {
  SHAPE: 'Shapes',
  LINE: 'Line',
};

export interface DrawArgs {
  type: string;
}
