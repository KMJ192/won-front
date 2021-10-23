import React, { useEffect, useRef } from 'react';

interface Position {
  x: number;
  y: number;
}

interface RectParam extends Position {
  width: number;
  height: number;
}

interface Props {
  canvasStyle?: {
    [key: string]: string;
  };
}

Second.defaultProps = {
  canvasStyle: undefined,
};

interface IsRectArea {
  result: boolean;
  index: number;
}

interface Position {
  x: number;
  y: number;
  radius: number;
}

const position: Position[] = [
  {
    x: 50,
    y: 50,
    radius: 20,
  },
  {
    x: 85,
    y: 100,
    radius: 30,
  },
];

function drawCircle(ctx: CanvasRenderingContext2D) {
  position.forEach((pos: Position) => {
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, pos.radius, 0, 2 * Math.PI);
    ctx.fill();
  });
}

function isArc2(x1: number, y1: number, x2: number, y2: number, radius: number) {
  const x = x2 - x1;
  const y = y2 - y1;
  const len = Math.sqrt(Math.abs(x * x) + Math.abs(y * y));
  if (radius >= len) {
    console.log('click');
  }
}

function isArc1(x: number, y: number): IsRectArea {
  for (let i: number = 0; i < position.length; i++) {
    const pos = position[i];
    const cicleLen = pos.radius;
    const cx = pos.x - x;
    const cy = pos.y - y;
    const clickedLen = Math.sqrt(Math.abs(cx * cx) + Math.abs(cy * cy));
    if (cicleLen >= clickedLen) {
      return {
        result: true,
        index: i,
      };
    }
  }
  return {
    result: false,
    index: -1,
  };
}

function Second({ canvasStyle }: Props) {
  const canvasRef: React.RefObject<HTMLCanvasElement> = useRef<HTMLCanvasElement>(null);

  const onClick = (e: MouseEvent) => {
    const canvas = canvasRef.current;
    const ctx = canvasRef.current?.getContext('2d');
    if (canvas && ctx) {
      const x1 = e.clientX - canvas.offsetLeft;
      const y1 = e.clientY - canvas.offsetTop;
      const ini = isArc1(x1, y1);
      if (ini.result) {
        ctx.clearRect(0, 0, 600, 400);
        position.forEach((pos: Position, idx: number) => {
          ctx.save();
          ctx.beginPath();
          if (ini.index === idx) {
            ctx.fillStyle = 'blue';
          }
          ctx.arc(pos.x, pos.y, pos.radius, 0, 2 * Math.PI);
          ctx.fill();
          ctx.restore();
        });
        setTimeout(() => {
          ctx.clearRect(0, 0, 600, 400);
          drawCircle(ctx);
        }, 1000);
      }
    }
  };

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) {
      position.forEach((pos: Position) => {
        drawCircle(ctx);
      });
    }
  }, []);

  useEffect(() => {
    const cur = canvasRef.current;
    if (cur) cur.addEventListener('click', onClick);
    return () => {
      if (cur) cur.removeEventListener('click', onClick);
    };
  }, []);

  return <canvas width='600px' height='400px' ref={canvasRef} style={canvasStyle} />;
}

export default Second;
