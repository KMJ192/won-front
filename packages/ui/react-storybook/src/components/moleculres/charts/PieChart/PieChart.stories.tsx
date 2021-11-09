import React from 'react';
import { Story } from '@storybook/react';

import PieChart from './PieChart';
import { PieChartArgs } from './PieChartTypes';

import { MAINTITLE, SUBTITLE } from '@src/storybookTitle';

export default {
  title: `${MAINTITLE}/${SUBTITLE.MOLECULRES}/PieChart`,
  component: PieChart,
  parameter: {
    componentSubtitle: 'PieChart 컴포넌트',
  },
  argTypes: {
    size: { control: { type: 'disable' } },
  },
};

const PieChartTemplate = (args: PieChartArgs): JSX.Element => {
  return <PieChart {...args} />;
};

export const PrimaryPieChart: Story<PieChartArgs> = PieChartTemplate.bind({});
PrimaryPieChart.args = {
  data: [
    {
      value: 70,
      text: 'data1',
    },
    {
      value: 150,
      text: 'data2',
    },
    {
      value: 100,
      text: 'data3',
    },
  ],
  size: '500',
};
