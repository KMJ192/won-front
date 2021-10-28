import React from 'react';
import BarChart from './BarChart';
import { InitChartType } from './ChartTypes';

interface Props {
  type?: string;
  canvasStyle?: {
    [key: string]: string;
  };
}

Chart.defaultProps = {
  type: InitChartType.BAR_CAHRT,
  canvasStyle: undefined,
};

function Chart({ type, canvasStyle }: Props) {
  if (type === InitChartType.BAR_CAHRT) {
    return <BarChart canvasStyle={canvasStyle} />;
  }

  return <div>Chart</div>;
}

export default Chart;
