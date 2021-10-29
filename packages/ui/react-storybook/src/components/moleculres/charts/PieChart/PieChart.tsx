import React, { useEffect, useRef, useState, useCallback } from 'react';
import { PieChartData, PieChartEvent, Position } from './PieChartTypes';

import classNames from 'classnames/bind';
import style from './PieChart.module.scss';
const cx = classNames.bind(style);

interface Props {
  data: PieChartData[];
  size?: string;
  customStyle?: {
    [key: string]: string;
  };
}

PieChart.defaultProps = {
  size: undefined,
  customStyle: undefined,
};

function PieChart({ data, size, customStyle }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);

  // pie chart draw
  const drawArc = useCallback(
    (convArray: number[], circleSize: Position) => {
      if (ctx && circleSize.width && circleSize.height) {
        const radius = Math.floor(circleSize.width / 2) - 5;
        const angle = Math.PI / 180;
        let degree = 0;

        const eventArray: PieChartData[][] = data.map(() => []);
        for (let i = 0; i < convArray.length; i++) {
          const item = convArray[i];

          ctx.save();
          ctx.beginPath();
          ctx.moveTo(circleSize.width / 2, circleSize.height / 2);

          if (i === 0) {
            ctx.arc(circleSize.width / 2, circleSize.height / 2, radius, 0, angle * item, false);
            degree = item;
            eventArray[i] = [
              {
                value: 0,
              },
              {
                value: degree,
              },
            ];
          } else {
            ctx.arc(
              circleSize.width / 2,
              circleSize.height / 2,
              radius,
              angle * degree,
              angle * (degree + item),
              false,
            );
            eventArray[i] = [
              {
                value: degree,
              },
              {
                value: degree + item,
              },
            ];
            degree = eventArray[i][1].value;
          }

          ctx.closePath();
          ctx.stroke();
          ctx.restore();
        }
      }
    },
    [ctx, data],
  );

  // Pie Chart를 그릴 각도 계산 및 Chart 그리는 함수 실행
  const calcData = useCallback(
    (canvas: HTMLCanvasElement, data: PieChartData[]): void => {
      const circleSize: Position = {
        width: canvas.clientWidth,
        height: canvas.clientHeight,
      };
      const degree = 360;
      const sum: PieChartData = data.reduce((a, b) => {
        return { value: a.value + b.value };
      });
      const convArray = data.map((val: PieChartData) => {
        const rate = val.value / sum.value;
        const myDegree = degree * rate;
        return myDegree;
      });
      drawArc(convArray, circleSize);
    },
    [drawArc],
  );

  const isInsideArc = (x: number, y: number, canvas: HTMLCanvasElement): PieChartEvent => {
    const circleSize = {
      width: canvas.clientWidth,
      height: canvas.clientHeight,
    };

    const circleLen = Math.floor(circleSize.width / 2) - 5;

    const posX = circleSize.width / 2 - x;
    const posY = circleSize.height / 2 - y;
    const len = Math.sqrt(Math.abs(posX * posX) + Math.abs(posY * posY));

    let rad = Math.atan2(posY, posX);
    rad = (rad * 180) / Math.PI;

    let retVal: PieChartEvent = {
      result1: false,
      result2: false,
      index: -1,
      degree: rad,
    };

    if (len <= circleLen) {
      retVal = {
        ...retVal,
        result1: true,
      };
    }

    return retVal;
  };

  const canvasClickEvent = useCallback((e: MouseEvent) => {
    const canvas: HTMLCanvasElement | null = canvasRef.current;
    if (canvas) {
      const x: number = e.clientX - canvas.offsetLeft;
      const y: number = e.clientY - canvas.offsetTop;

      const inn: PieChartEvent = isInsideArc(x, y, canvas);
      console.log(inn);
    }
  }, []);

  useEffect(() => {
    if (canvasRef.current) {
      setCtx(canvasRef.current.getContext('2d'));
    }
  }, []);

  useEffect(() => {
    const canvas: HTMLCanvasElement | null = canvasRef.current;
    canvas?.addEventListener('click', canvasClickEvent);
    if (canvas && data) {
      calcData(canvas, data);
    }
    return () => {
      canvas?.removeEventListener('click', canvasClickEvent);
    };
  }, [drawArc, data, calcData, canvasClickEvent]);

  return (
    <canvas
      ref={canvasRef}
      width={size || '300px'}
      height={size || '300px'}
      style={customStyle}
      className={cx('pie-chart')}
    />
  );
}

export default PieChart;
