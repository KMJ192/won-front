import React from 'react';
import { MAINTITLE, SUBTITLE } from '@src/storybookTitle';
import DonutChart from './DonutChart';
import { Story } from '@storybook/react';
import { DonutChartArgs } from './DonutChartTypes';

export default {
  title: `${MAINTITLE}/${SUBTITLE.MOLECULRES}/DonutChart`,
  componrnt: DonutChart,
  parameter: {
    componentSubtitle: 'DonutChart 컴포넌트',
  },
  argTypes: {},
};

const DonutChartTemplate = (): JSX.Element => {
  return <DonutChart />;
};

export const PrimaryDonutChart: Story<DonutChartArgs> = DonutChartTemplate.bind({});
PrimaryDonutChart.args = {
  size: '',
};
