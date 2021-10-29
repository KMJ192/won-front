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
  size: '',
  customStyle: initDonutChartStyle,
  customSize: {
    width: '100%',
    height: '100%',
  },
};
