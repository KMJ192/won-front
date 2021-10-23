import React from 'react';
import { Story } from '@storybook/react';
import Event from './Event';

import { CanvasEventArgs, InitCanvasEventType } from './EventType';
import { MAINTITLE, SUBTITLE } from '@src/storybookTitle';

export default {
  title: `${MAINTITLE}/${SUBTITLE.TEST}/Canvas/Event`,
  component: Event,
  parameter: {
    componentSubtitle: 'Canvas Test 컴포넌트',
  },
  argTypes: {
    type: {
      options: Object.values(InitCanvasEventType).map((value) => value),
      control: { type: 'select' },
    },
  },
};

const EventTemplate = (args: CanvasEventArgs): JSX.Element => {
  return <Event {...args} />;
};

export const CanvasEventFirst: Story<CanvasEventArgs> = EventTemplate.bind({});
CanvasEventFirst.args = {
  type: InitCanvasEventType.FIRST,
  canvasStyle: {
    border: 'solid 1px black',
  },
};
