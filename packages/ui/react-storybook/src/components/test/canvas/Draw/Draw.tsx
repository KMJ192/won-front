import React from 'react';
import { InitDrawType } from './DrawTypes';
import Line from './Line';
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
  if (type === InitDrawType.LINE) {
    return <Line />;
  }
  return <div>test</div>;
}

export default Draw;
