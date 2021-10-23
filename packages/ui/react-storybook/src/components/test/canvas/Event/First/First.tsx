import React, { useEffect, useState, useRef } from 'react';

interface Props {
  canvasStyle?: {
    [key: string]: string;
  };
}

First.defaultProps = {
  canvasStyle: undefined,
};

interface Position {
  x: number;
  y: number;
  width: number;
  height: number;
}

function areaSample(ctx: CanvasRenderingContext2D, position: Position[]) {
  ctx.beginPath();
  position.forEach((element: Position) => {
    ctx.fillRect(element.x, element.y, element.width, element.height);
  });
}

function First({ canvasStyle }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [position, setPosition] = useState<Position[]>([
    {
      x: 50,
      y: 50,
      width: 50,
      height: 50,
    },
  ]);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) {
      areaSample(ctx, position);
    }
  }, [position]);

  const rectArea = (e: MouseEvent) => {
    if (canvasRef.current) {
      // canvas의 mouse클릭 위치 - canvas의 가장 왼쪽(x값)
      const x = e.clientX - canvasRef.current.offsetLeft;
      // canvas의 mouse클릭 위치 - cavnas의 가장 위쪽(y값)
      const y = e.clientY - canvasRef.current.offsetTop;
      position.forEach((pos: Position) => {
        const rectPos = {
          x_start: pos.x,
          y_start: pos.y,
          x_end: pos.x + pos.width,
          y_end: pos.y + pos.height,
        };
        if (x >= rectPos.x_start && x <= rectPos.x_end) {
          if (y >= rectPos.y_start && y <= rectPos.y_end) {
            console.log(x, y);
          }
        }
      });
    }
  };

  useEffect(() => {
    const cur = canvasRef.current;
    if (cur) cur.addEventListener('click', rectArea);
    return () => {
      if (cur) cur.removeEventListener('click', rectArea);
    };
  }, []);

  return <canvas ref={canvasRef} width='600px' height='400px' style={canvasStyle} />;
}

export default First;
