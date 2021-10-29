import React, { useRef } from 'react';
import { initDonutChartSize } from './DonutChartTypes';

interface Props {
  size?: string;
  customStyle?: {
    [key: string]: string;
  };
  customSize?: {
    width: string;
    height: string;
  };
}

DonutChart.defaultProps = {
  size: initDonutChartSize.MEDIUM,
  customStyle: undefined,
  customSize: {
    width: '100%',
    height: '100%',
  },
};

function DonutChart({ size, customStyle, customSize }: Props): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  return (
    <canvas
      ref={canvasRef}
      width={customSize?.width || '100%'}
      height={customSize?.height || '100%'}
      style={customStyle}
    />
  );
}

export default DonutChart;
