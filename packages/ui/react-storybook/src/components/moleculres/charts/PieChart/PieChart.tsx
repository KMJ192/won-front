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
  const [degree, setDegree] = useState<number>(360);
  const [convArr, setConvArr] = useState<number[]>([]);
  const [drawed, setDrawed] = useState<boolean>(false);

  // pie chart draw
  const drawArc = useCallback(
    (convArray: number[], circleSize: Position) => {
      if (ctx && circleSize.width && circleSize.height) {
        let curDegree: number = 0;

        const eventArray: PieChartData[][] = data.slice().map(() => []);
        for (let i = 0; i < convArray.length; i++) {
          const item = convArray[i];

          ctx.save();
          ctx.beginPath();
          ctx.moveTo(circleSize.width / 2, circleSize.height / 2);

          if (i === 0) {
            ctx.arc(circleSize.width / 2, circleSize.height / 2, radius, 0, angle * item, false);
            curDegree = item;
            eventArray[i] = [
              {
                value: 0,
              },
              {
                value: curDegree,
              },
            ];
          } else {
            ctx.arc(
              circleSize.width / 2,
              circleSize.height / 2,
              radius,
              angle * curDegree,
              angle * (curDegree + item),
              false,
            );
            eventArray[i] = [
              {
                value: curDegree,
              },
              {
                value: curDegree + item,
              },
            ];
            curDegree += item;
            if (i === convArray.length - 1) {
              setDegree(curDegree);
            }
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
      const sum: PieChartData = data.reduce((a, b) => {
        return { value: a.value + b.value };
      });
      const convArray = data.map((val: PieChartData) => {
        const rate = val.value / sum.value;
        const myDegree = degree * rate;
        return myDegree;
      });
      setConvArr(convArray);
      drawArc(convArray, circleSize);
    },
    [degree, drawArc],
  );

  // mouse 차트 범위 내 이동 감지
  const isInsideArc = useCallback(
    (mouseX: number, mouseY: number): PieChartEvent => {
      let retVal: PieChartEvent = {
        result1: false,
        result2: false,
        index: -1,
        degree: 0,
      };
      if (canvas) {
        const posX = canvas.clientWidth / 2 - mouseX;
        const posY = canvas.clientHeight / 2 - mouseY;

        let rad = Math.atan2(posY, posX);
        rad = (rad * 180) / Math.PI;
        rad += 180;

        const circleLen = radius;
        const len = Math.sqrt(Math.abs(posX * posX) + Math.abs(posY * posY));

        if (len <= circleLen) {
          retVal = {
            ...retVal,
            result1: true,
          };
        }

        if (retVal.result1) {
          eArr.forEach((arr: PieChartData[], idx: number) => {
            if (rad >= arr[0].value && rad <= arr[1].value) {
              retVal = {
                ...retVal,
                result2: true,
                index: idx,
              };
            }
          });
        }

        retVal = {
          ...retVal,
          degree: rad,
        };
      }

      return retVal;
    },
    [canvas, eArr, radius],
  );

  // chart hover
  const hoverChart = useCallback(
    (idx: number) => {
      if (ctx && canvas) {
        let curDegree: number = degree;

        ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

        curDegree = 0;
        for (let i: number = 0; i < convArr.length; i++) {
          const item: number = convArr[i];

          ctx.save();
          ctx.beginPath();
          ctx.moveTo(canvas.clientWidth / 2, canvas.clientHeight / 2);

          let innRadius = radius;
          if (idx === i) {
            ctx.lineWidth = 2;
            ctx.strokeStyle = 'blue';
            innRadius = radius * 1.15;
          }
          if (i === 0) {
            ctx.arc(canvas.clientWidth / 2, canvas.clientHeight / 2, innRadius, 0, angle * item, false);
            curDegree = item;
          } else {
            ctx.arc(
              canvas.clientWidth / 2,
              canvas.clientHeight / 2,
              innRadius,
              angle * curDegree,
              angle * (curDegree + item),
              false,
            );
            curDegree += item;
          }
          ctx.closePath();
          ctx.stroke();
          ctx.restore();
        }
        setDegree(curDegree);
      }
    },
    [ctx, canvas, degree, convArr, radius],
  );

  const canvasMouseEvent = useCallback(
    (e: MouseEvent) => {
      if (canvas) {
        const mouseX: number = e.clientX - canvas.offsetLeft;
        const mouseY: number = e.clientY - canvas.offsetTop;
        const inn: PieChartEvent = isInsideArc(mouseX, mouseY);

        if (inn.index > -1) {
          setDrawed(true);
          hoverChart(inn.index);
        } else {
          if (drawed) hoverChart(-1);
          setDrawed(true);
        }
      }
    },
    [canvas, drawed, hoverChart, isInsideArc],
  );

  // draw chart
  useEffect(() => {
    if (canvasRef.current && data) {
      const rad = Math.floor(canvasRef.current.clientWidth / 2) - 50;
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
