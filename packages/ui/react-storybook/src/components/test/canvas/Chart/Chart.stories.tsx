import React from 'react';
import { Story } from '@storybook/react';
import Chart from './Chart';

import { MAINTITLE, SUBTITLE } from '@src/storybookTitle';
import { ChartArgs, InitChartType } from './ChartTypes';

export default {
  title: `${MAINTITLE}/${SUBTITLE.TEST}/Canvas/Chart`,
  component: Chart,
  parameter: {
    componentSubtitle: 'Canvas Test 컴포넌트',
  },
  argTypes: {
    type: {
      options: Object.values(InitChartType).map((value) => value),
      control: { type: 'select' },
    },
  },
};

const ChartTemplate = (args: ChartArgs): JSX.Element => {
  return <Chart {...args} />;
};
export const BarChart: Story<ChartArgs> = ChartTemplate.bind({});
BarChart.args = {
  type: InitChartType.BAR_CAHRT,
  canvasStyle: {
    border: 'solid 1px black',
  },
};
