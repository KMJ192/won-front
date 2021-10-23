import React from 'react';
import { InitCanvasEventType } from './EventType';
import First from './First';

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

  return <div>event story</div>;
}

export default Event;
