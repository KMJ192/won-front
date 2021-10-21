export interface DrawTypes {
  readonly SHAPE: string;
  readonly LINE: string;
  readonly POSITION: string;
  readonly IMAGE: string;
  readonly SCALE: string;
  readonly CIRCLE: string;
}

export const InitDrawType: DrawTypes = {
  SHAPE: 'Shapes',
  LINE: 'Line',
  POSITION: 'Position',
  IMAGE: 'Image',
  SCALE: 'Scale',
  CIRCLE: 'Sicle',
};

export interface DrawArgs {
  type: string;
}
