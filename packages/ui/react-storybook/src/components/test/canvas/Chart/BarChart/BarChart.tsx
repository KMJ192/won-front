import { useState } from '@storybook/addons';
import React, { useEffect, useRef } from 'react';

interface Props {
  canvasStyle?: {
    [key: string]: string;
  };
}

BarChart.defaultProps = {
  canvasStyle: undefined,
};

interface Position {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
}

function position(width: number, height: number): Position {
  return {
    minX: width * 0.1,
    maxX: width * 0.9,
    minY: height * 0.1,
    maxY: height * 0.9,
  };
}

function BarChart({ canvasStyle }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    if (canvasRef.current) setCtx(canvasRef.current.getContext('2d'));
  }, []);

  return <canvas width='600px' height='400px' ref={canvasRef} style={canvasStyle} />;
}

export default BarChart;
