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

const angle = Math.PI / 180;

function PieChart({ data, size, customStyle }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [eArr, setEArr] = useState<PieChartData[][]>([]);
  const [radius, setRadius] = useState<number>(0);

  // pie chart draw
  const drawArc = useCallback(
    (convArray: number[], circleSize: Position) => {
      if (ctx && circleSize.width && circleSize.height) {
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
        setEArr(eventArray);
      }
    },
    [ctx, data, radius],
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

  const isInsideArc = useCallback(
    (x: number, y: number, canvas: HTMLCanvasElement): PieChartEvent => {
      const posX = canvas.clientWidth / 2 - x;
      const posY = canvas.clientHeight / 2 - y;
      const circleLen = Math.floor(canvas.clientWidth / 2) - 5;
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

      if (retVal.result1) {
        eArr.forEach((arr: PieChartData[], idx: number) => {
          if (rad >= arr[0].value && rad <= arr[1].value) {
            retVal.result2 = true;
            retVal.index = idx;
          }
        });
      }

      return retVal;
    },
    [eArr],
  );

  const hoverCanvas = useCallback(
    (idx: number) => {
      if (ctx && canvas) {
        let degree: number = 360;

        ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

        const sum: PieChartData = data.reduce((a, b) => {
          return { value: a.value + b.value };
        });
        const convArray = data.map((val: PieChartData) => {
          const rate = val.value / sum.value;
          const myDegree = degree * rate;
          return myDegree;
        });

        for (let i: number = 0; i < convArray.length; i++) {
          const item: number = convArray[i];

          ctx.save();
          ctx.beginPath();

          let innRadius = radius;
          ctx.moveTo(canvas.clientWidth / 2, canvas.clientHeight / 2);
          if (idx === i) {
            ctx.lineWidth = 2;
            ctx.strokeStyle = 'blue';
            innRadius = radius * 1.1;
          }
          if (idx === 0) {
            ctx.arc(canvas.clientWidth / 2, canvas.clientHeight / 2, innRadius, 0, angle * item, false);
            degree = item;
          } else {
            ctx.arc(
              canvas.clientWidth / 2,
              canvas.clientHeight / 2,
              innRadius,
              angle * degree,
              angle * (degree + item),
              false,
            );
            degree += item;
          }
          ctx.closePath();
          ctx.stroke();
          ctx.restore();
        }
      }
    },
    [canvas, ctx, data, radius],
  );

  const canvasMouseEvent = useCallback(
    (e: MouseEvent) => {
      let drawed: boolean = false;
      if (canvas) {
        const x: number = e.clientX - canvas.offsetLeft;
        const y: number = e.clientY - canvas.offsetTop;
        const inn: PieChartEvent = isInsideArc(x, y, canvas);

        if (inn.index > -1) {
          drawed = true;
          hoverCanvas(inn.index);
        } else {
          if (drawed) hoverCanvas(-1);
          drawed = false;
        }
      }
    },
    [canvas, hoverCanvas, isInsideArc],
  );

  // draw chart
  useEffect(() => {
    if (canvasRef.current && data) {
      const rad = Math.floor(canvasRef.current.clientWidth / 2) - 5;
      setCanvas(canvasRef.current);
      setCtx(canvasRef.current.getContext('2d'));
      calcData(canvasRef.current, data);
      setRadius(rad);
    }
  }, [calcData, data]);

  // mouse 이벤트 등록
  useEffect(() => {
    canvas?.addEventListener('mousemove', canvasMouseEvent);
    return () => {
      canvas?.removeEventListener('mousemove', canvasMouseEvent);
    };
  }, [canvas, canvasMouseEvent]);

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
