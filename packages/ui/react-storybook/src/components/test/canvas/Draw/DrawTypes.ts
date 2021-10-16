export interface DrawTypes {
  readonly SHAPE: string;
}

export const InitDrawType: DrawTypes = {
  SHAPE: 'Shapes',
};

export interface DrawArgs {
  type: string;
}
