import React from 'react';
import { Story } from '@storybook/react';

import DonutChart from './DonutChart';
import { DonutChartArgs, initDonutChartSize, initDonutChartStyle } from './DonutChartTypes';

import { MAINTITLE, SUBTITLE } from '@src/storybookTitle';

export default {
  title: `${MAINTITLE}/${SUBTITLE.MOLECULRES}/DonutChart`,
  componrnt: DonutChart,
  parameter: {
    componentSubtitle: 'DonutChart 컴포넌트',
  },
  argTypes: {
    size: {
      options: Object.values(initDonutChartSize).map((value: string) => value),
      control: { type: 'select' },
    },
  },
};

const DonutChartTemplate = (args: DonutChartArgs): JSX.Element => {
  return <DonutChart {...args} />;
};

export const PrimaryDonutChart: Story<DonutChartArgs> = DonutChartTemplate.bind({});
PrimaryDonutChart.args = {
  data: [
    {
      value: 100,
      text: 'data1',
    },
    {
      value: 200,
      text: 'data2',
    },
    {
      value: 70,
      text: 'data3',
    },
    {
      value: 120,
      text: 'data4',
    },
  ],
  size: '',
  colorArray: ['#f5444e', '#4bbfbc', '#fcb362', '#949fb0', '#c4c24a', '#6faab0'],
  customStyle: initDonutChartStyle,
  customSize: '300px',
};
