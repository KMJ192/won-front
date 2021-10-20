export interface DrawTypes {
  readonly SHAPE: string;
  readonly LINE: string;
  readonly POSITION: string;
  readonly IMAGE: string;
}

export const InitDrawType: DrawTypes = {
  SHAPE: 'Shapes',
  LINE: 'Line',
  POSITION: 'Position',
  IMAGE: 'Image',
};

export interface DrawArgs {
  type: string;
}
