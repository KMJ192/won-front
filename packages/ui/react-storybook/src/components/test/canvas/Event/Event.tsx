import React from 'react';
import { InitCanvasEventType } from './EventType';
import First from './First';
import Second from './Second';
import Third from './Third';

interface Props {
  type: string;
  canvasStyle?: {
    [key: string]: string;
  };
}

Event.defaultProps = {
  canvasStyle: undefined,
};
function Event({ type, canvasStyle }: Props) {
  if (type === InitCanvasEventType.FIRST) {
    return <First canvasStyle={canvasStyle} />;
  }

  if (type === InitCanvasEventType.SECOND) {
    return <Second canvasStyle={canvasStyle} />;
  }

  if (type === InitCanvasEventType.THIRD) {
    return <Third canvasStyle={canvasStyle} />;
  }

  return <div>event story</div>;
}

export default Event;
