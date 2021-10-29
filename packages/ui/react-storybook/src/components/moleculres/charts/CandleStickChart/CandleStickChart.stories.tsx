import React from 'react';
import { Story } from '@storybook/react';
import { MAINTITLE, SUBTITLE } from '@src/storybookTitle';
import CandleStickChart from '.';

export default {
  title: `${MAINTITLE}/${SUBTITLE.MOLECULRES}/CandleStickChart`,
  component: CandleStickChart,
  parameter: {
    componentSubtitle: 'CandleStickChart 컴포넌트',
  },
};

const CandleStickChartTemplate = (): JSX.Element => {
  return <CandleStickChart />;
};

export const PrimaryCandleStickChart: Story = CandleStickChartTemplate.bind({});
