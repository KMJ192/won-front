import React, { useCallback, useEffect, useRef, useState } from 'react';

interface Props {
  canvasStyle?: {
    [key: string]: string;
  };
}

interface Position {
  x: number;
  y: number;
}

Third.defaultProps = {
  canvasStyle: undefined,
};

// 다각형 접점
const drawPoint: Position[] = [
  { x: 50, y: 50 },
  { x: 85, y: 100 },
  { x: 100, y: 150 },
  { x: 70, y: 150 },
  { x: 30, y: 70 },
  { x: 20, y: 30 },
  { x: 50, y: 50 },
];

function isInside(e: Position): boolean {
  // 다각형 클릭 이벤트
  // 다각형 외부에서 클릭하면 접점은 짝수 또는 0
  // 다각형 내부에서 클릭하면 접점은 홀수
  let cross = 0;
  for (let i = 0; i < drawPoint.length; i++) {
    const pos: Position = drawPoint[i];

    // 교점을 구할 j값 (인덱스 1, 2, 3, ..., 0 순서로 나옴), moduler연산을 통하여 배열의 길이보다 작을때는 비교 대상(i + 1)이 나오며 i + 1이 배열의 길이와 같을 때 0이 나온다. (7 mod 7 = 0)
    const j = (i + 1) % drawPoint.length;
    const otherPos: Position = drawPoint[j];

    // 클릭 좌표가 선분에 있는지 여부
    if (pos.y > e.y !== otherPos.y > e.y) {
      // click event를 지나는 수평선과 선분(pos, otherPos)의 교점
      const visit = ((otherPos.x - pos.x) * (e.y - pos.y)) / (otherPos.y - pos.y) + pos.x;

      // x가 오른쪽 반직선과의 교점이 맞으면 교점의 개수를 증가시킨다
      if (e.x < visit) {
        cross++;
      }
    }
  }
  // cross가 홀수일 경우 true, 짝수일 경우 false
  return cross % 2 > 0;
}

function drawArea(ctx: CanvasRenderingContext2D) {
  ctx.beginPath();
  drawPoint.forEach((element, idx) => {
    if (idx === 0) ctx.moveTo(element.x, element.y);
    else ctx.lineTo(element.x, element.y);
  });
  ctx.stroke();
}

function Third({ canvasStyle }: Props) {
  const [canvas, setCanavas] = useState<HTMLCanvasElement | null>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) setCanavas(canvasRef.current);
    if (canvas) {
      const c = canvas.getContext('2d');
      if (c) {
        drawArea(c);
        setCtx(c);
      }
    }
  }, [canvas]);

  const clickEvent = useCallback(
    (e: MouseEvent) => {
      if (canvas && ctx) {
        const x = e.clientX - canvas.offsetLeft;
        const y = e.clientY - canvas.offsetTop;
        const result: boolean = isInside({
          x,
          y,
        });
        if (result) {
          ctx.save();
          ctx.clearRect(0, 0, 600, 400);
          drawArea(ctx);
          ctx.fillStyle = 'blue';
          ctx.fill();
          ctx.restore();
        } else {
          ctx.clearRect(0, 0, 600, 400);
          drawArea(ctx);
        }
      }
    },
    [canvas, ctx],
  );

  useEffect(() => {
    document.addEventListener('click', clickEvent);
    return () => {
      document.removeEventListener('click', clickEvent);
    };
  }, [clickEvent]);

  return <canvas width='600px' height='400px' ref={canvasRef} style={canvasStyle} />;
}

export default Third;
