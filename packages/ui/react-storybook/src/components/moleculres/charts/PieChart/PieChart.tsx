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

  // Pie Chart를 그릴 각도 계산
  const calcData = useCallback(
    (canvas: HTMLCanvasElement, data: PieChartData[]): [number[], Position] => {
      const chartSize: Position = {
        width: canvas.clientWidth,
        height: canvas.clientHeight,
      };
      const sum: PieChartData = data.reduce((a, b) => {
        return { value: a.value + b.value };
      });
      const convArray = data.map((val: PieChartData) => {
        const rate = val.value / sum.value;
        return degree * rate;
      });
      setConvArr(convArray);
      return [convArray, chartSize];
    },
    [degree],
  );

  // Pie Chart 그리기
  const drawArc = useCallback(
    (convArray: number[], chartSize: Position) => {
      if (ctx && chartSize.width && chartSize.height) {
        let curDegree: number = 0;

        const eventArray: PieChartData[][] = data.slice().map(() => []);
        for (let i = 0; i < convArray.length; i++) {
          const item = convArray[i];

          ctx.save();
          ctx.beginPath();
          ctx.moveTo(chartSize.width / 2, chartSize.height / 2);

          if (i === 0) {
            ctx.arc(chartSize.width / 2, chartSize.height / 2, radius, 0, angle * item, false);
            curDegree = item;
            eventArray[i] = [
              {
                value: 0,
                text: data[i].text,
              },
              {
                value: curDegree,
              },
            ];
          } else {
            ctx.arc(
              chartSize.width / 2,
              chartSize.height / 2,
              radius,
              angle * curDegree,
              angle * (curDegree + item),
              false,
            );
            eventArray[i] = [
              {
                value: curDegree,
                text: data[i].text,
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

  function degreeToRadians(degree: number) {
    return degree * (Math.PI / 180);
  }

  const textDraw = useCallback(
    (index: number) => {
      if (canvas && ctx) {
        eArr.forEach((item: PieChartData[], idx: number) => {
          const { text } = data[idx];
          if (text) {
            const half = (item[1].value - item[0].value) / 2;
            const deg = item[0].value + half;
            const xx = Math.cos(degreeToRadians(deg)) * (radius * 0.7) + canvas.clientWidth / 2;
            const yy = Math.sin(degreeToRadians(deg)) * (radius * 0.7) + canvas.clientHeight / 2;

            const minus = ctx.measureText(text).width / 2;
            ctx.save();
            if (index === idx) {
              ctx.font = 'normal bold 20px serif';
              ctx.fillStyle = 'blue';
            } else {
              ctx.font = 'normal 14px serif';
            }
            ctx.fillText(text, xx - minus, yy);
            ctx.restore();
          }
        });
      }
    },
    [canvas, ctx, eArr, radius, data],
  );

  const drawChart = useCallback(
    (canvas: HTMLCanvasElement, data: PieChartData[]): void => {
      const calcatedData = calcData(canvas, data);
      drawArc(calcatedData[0], calcatedData[1]);
    },
    [calcData, drawArc],
  );

  const canvasMouseEvent = useCallback(
    (e: MouseEvent) => {
      if (canvas && data) {
        const mouseX: number = e.clientX - canvas.offsetLeft;
        const mouseY: number = e.clientY - canvas.offsetTop;
        const inn: PieChartEvent = isInsideArc(mouseX, mouseY);

        if (inn.index > -1) {
          setDrawed(true);
          hoverChart(inn.index);
          textDraw(inn.index);
        } else {
          if (drawed) {
            hoverChart(-1);
            textDraw(-1);
          }
          setDrawed(true);
        }
      }
    },
    [data, canvas, drawed, hoverChart, isInsideArc, textDraw],
  );

  // draw chart
  useEffect(() => {
    if (canvasRef.current && data) {
      setRadius(Math.floor(canvasRef.current.clientWidth / 2) * 0.7);
      setCanvas(canvasRef.current);
      setCtx(canvasRef.current.getContext('2d'));
      drawChart(canvasRef.current, data);
    }
  }, [data, drawChart]);

  useEffect(() => {
    if (data) {
      textDraw(-1);
    }
  }, [data, textDraw]);

  // mouse 이벤트 등록
  useEffect(() => {
    canvas?.addEventListener('mousemove', canvasMouseEvent);
    return () => {
      canvas?.removeEventListener('mousemove', canvasMouseEvent);
    };
  }, [canvas, canvasMouseEvent, data]);

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
