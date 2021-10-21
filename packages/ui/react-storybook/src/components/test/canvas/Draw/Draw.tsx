import React from 'react';
import Image from './Image';
import Line from './Line';
import Position from './Position';
import Shape from './Shape';
import Scale from './Scale';

import { InitDrawType } from './DrawTypes';
import Circle from './Circle';

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

  if (type === InitDrawType.SCALE) {
    return <Scale />;
  }

  if (type === InitDrawType.CIRCLE) {
    return <Circle />;
  }

  return <div>Canvas Draw Component</div>;
}

export default Draw;
