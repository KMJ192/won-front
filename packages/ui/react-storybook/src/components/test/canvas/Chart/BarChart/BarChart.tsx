import React, { useRef } from 'react';

interface Props {
  canvasStyle?: {
    [key: string]: string;
  };
}

BarChart.defaultProps = {
  canvasStyle: undefined,
};

function BarChart({ canvasStyle }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  return <canvas width='600px' height='400px' ref={canvasRef} style={canvasStyle} />;
}

export default BarChart;
