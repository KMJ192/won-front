import React from 'react';
import Position from './Position';
import { Story } from '@storybook/react';

import { MAINTITLE, SUBTITLE } from '@src/storybookTitle';

export default {
  title: `${MAINTITLE}/${SUBTITLE.TEST}/Canvas/Position`,
  component: Position,
  parameter: {
    componentSubtitle: 'Canvas Test 컴포넌트',
  },
};

const PositionTemplate = () => {
  return <Position />;
};
export const CanvasPosition: Story = PositionTemplate.bind({});
