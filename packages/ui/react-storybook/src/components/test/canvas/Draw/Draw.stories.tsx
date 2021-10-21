import React from 'react';
import { Story } from '@storybook/react';
import Draw from './Draw';

import { MAINTITLE, SUBTITLE } from '@src/storybookTitle';
import { DrawArgs, InitDrawType } from './DrawTypes';

export default {
  title: `${MAINTITLE}/${SUBTITLE.TEST}/Canvas/Draw`,
  component: Draw,
  parameter: {
    componentSubtitle: 'Canvas Test 컴포넌트',
  },
  argTypes: {
    type: {
      options: Object.values(InitDrawType).map((value) => value),
      control: { type: 'select' },
    },
  },
};

const DrawTemplate = (args: DrawArgs): JSX.Element => {
  return <Draw {...args} />;
};

export const ShapesDraw: Story<DrawArgs> = DrawTemplate.bind({});
ShapesDraw.args = {
  type: InitDrawType.SHAPE,
};

export const LineDraw: Story<DrawArgs> = DrawTemplate.bind({});
LineDraw.args = {
  type: InitDrawType.LINE,
};

export const PositionDraw: Story<DrawArgs> = DrawTemplate.bind({});
PositionDraw.args = {
  type: InitDrawType.POSITION,
};

export const ImageDraw: Story<DrawArgs> = DrawTemplate.bind({});
ImageDraw.args = {
  type: InitDrawType.IMAGE,
};

export const ScaleDraw: Story<DrawArgs> = DrawTemplate.bind({});
ScaleDraw.args = {
  type: InitDrawType.SCALE,
};

export const CircleDraw: Story<DrawArgs> = DrawTemplate.bind({});
CircleDraw.args = {
  type: InitDrawType.CIRCLE,
};
