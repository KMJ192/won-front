import React, { useEffect, useState, useRef, useCallback } from 'react';

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

interface IsRectArea {
  result: boolean;
  index: number;
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
    {
      x: 150,
      y: 50,
      width: 50,
      height: 50,
    },
    {
      x: 50,
      y: 150,
      width: 50,
      height: 50,
    },
    {
      x: 150,
      y: 150,
      width: 50,
      height: 50,
    },
  ]);

  const isArea = useCallback(
    (x: number, y: number): IsRectArea => {
      for (let index = 0; index < position.length; index++) {
        const pos = position[index];
        const rectPos = {
          x_start: pos.x,
          y_start: pos.y,
          x_end: pos.x + pos.width,
          y_end: pos.y + pos.height,
        };

        if (x >= rectPos.x_start && x <= rectPos.x_end) {
          if (y >= rectPos.y_start && y <= rectPos.y_end) {
            return {
              result: true,
              index,
            };
          }
        }
      }
      return {
        result: false,
        index: -1,
      };
    },
    [position],
  );

  const rectArea = useCallback(
    (e: MouseEvent) => {
      const ctx = canvasRef.current?.getContext('2d');
      if (canvasRef.current && ctx) {
        import('@wasm').then((module: any) => {
          module.first_evnet(e, canvasRef.current, ctx, position);
        });
        // canvas의 mouse클릭 위치 - canvas의 가장 왼쪽(x값)
        // canvas의 mouse클릭 위치 - cavnas의 가장 위쪽(y값)
        // const x = e.clientX - canvasRef.current.offsetLeft;
        // const y = e.clientY - canvasRef.current.offsetTop;
        // const ini: IsRectArea = isArea(x, y);
        // if (ini.result) {
        //   ctx.clearRect(0, 0, 600, 400);
        //   position.forEach((element: Position, idx: number) => {
        //     ctx.save();
        //     if (ini.index === idx) {
        //       ctx.fillStyle = 'blue';
        //     }
        //     ctx.fillRect(element.x, element.y, element.width, element.height);
        //     ctx.restore();
        //   });
        // }
        setTimeout(() => {
          ctx.clearRect(0, 0, 600, 600);
          areaSample(ctx, position);
        }, 1000);
      }
    },
    [position],
  );

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) {
      areaSample(ctx, position);
    }
  }, [position]);

  useEffect(() => {
    const cur = canvasRef.current;
    if (cur) cur.addEventListener('click', rectArea);
    return () => {
      if (cur) cur.removeEventListener('click', rectArea);
    };
  }, [rectArea]);

  return <canvas ref={canvasRef} width='600' height='400' style={canvasStyle} />;
}

export default First;
