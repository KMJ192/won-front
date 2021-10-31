import React, { useCallback, useEffect, useRef, useState } from 'react';
import { initDonutChartSize, DonutChartData, Position } from './DonutChartTypes';

interface Props {
  size?: string;
  data?: DonutChartData[];
  colorArray?: string[];
  customStyle?: {
    [key: string]: string;
  };
  customSize?: string;
}

DonutChart.defaultProps = {
  size: initDonutChartSize.MEDIUM,
  data: undefined,
  colorArray: ['#f5444e', '#4bbfbc', '#fcb362', '#949fb0', '#c4c24a', '#6faab0'],
  customStyle: undefined,
  customSize: '300px',
};

const angle = Math.PI / 180;

function DonutChart({ size, data, colorArray, customStyle, customSize }: Props): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [eArr, setEArr] = useState<DonutChartData[][]>([]);
  const [convArr, setConvArr] = useState<number[]>([]);
  const [drawed, setDrawed] = useState<boolean>(false);
  const [radius, setRadius] = useState<number>(0);
  const [degree, setDegree] = useState<number>(360);
  const [sum, setSum] = useState<number>(0);

  const calcData = useCallback(
    (canvas: HTMLCanvasElement, data: DonutChartData[]): [number[], Position] => {
      const canvasSize: Position = {
        width: canvas.clientWidth,
        height: canvas.clientHeight,
      };
      const sum = data.reduce((left: DonutChartData, right: DonutChartData) => {
        return {
          value: left.value + right.value,
        };
      });
      const convArray = data.map((val: DonutChartData) => {
        const rate = val.value / sum.value;
        return degree * rate;
      });
      setConvArr(convArray);
      return [convArray, canvasSize];
    },
    [degree],
  );

  const drawChart = useCallback(
    (canvas: HTMLCanvasElement, data: DonutChartData[]) => {
      calcData(canvas, data);
    },
    [calcData],
  );

  const chartEvent = (e: MouseEvent) => {};

  useEffect(() => {
    if (canvasRef.current && data) {
      setCanvas(canvasRef.current);
      setCtx(canvasRef.current.getContext('2d'));
      setRadius(Math.floor(canvasRef.current.clientWidth / 2) * 0.7);
      drawChart(canvasRef.current, data);
    }
  }, [data, drawChart]);

  useEffect(() => {
    canvas?.addEventListener('mousemove', chartEvent);
    return () => {
      canvas?.removeEventListener('mousemove', chartEvent);
    };
  }, [canvas]);

  return <canvas ref={canvasRef} width={customSize || '300px'} height={customSize || '300px'} style={customStyle} />;
}

export default DonutChart;
