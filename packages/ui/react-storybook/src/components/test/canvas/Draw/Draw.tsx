import React from 'react';
import { InitDrawType } from './DrawTypes';
import Shape from './Shape/Shape';

interface Props {
  type?: string;
}

Draw.defaultProps = {
  type: InitDrawType.SHAPE,
};

function Draw({ type }: Props) {
  if (type === InitDrawType.SHAPE) {
    return <Shape />;
  }
  return <div>test</div>;
}

export default Draw;
