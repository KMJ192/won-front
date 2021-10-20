import React from 'react';
import { InitDrawType } from './DrawTypes';
import Image from './Image';
import Line from './Line';
import Position from './Position';
import Shape from './Shape';

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
  if (type === InitDrawType.POSITION) {
    return <Position />;
  }

  if (type === InitDrawType.IMAGE) {
    return <Image />;
  }
  return <div>test</div>;
}

export default Draw;
