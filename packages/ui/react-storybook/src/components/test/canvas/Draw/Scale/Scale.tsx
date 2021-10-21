import React, { useEffect, useRef } from 'react';

interface Area {
  x: number;
  y: number;
  w: number;
  h: number;
}

function zoomInOut(ctx: CanvasRenderingContext2D): void {
  ctx.save();

  ctx.scale(1.5, 1.5);
  ctx.rect(70, 70, 30, 30);
  ctx.stroke();

  ctx.restore();
  ctx.fillStyle = 'green';
  ctx.fillRect(70, 70, 30, 30);
}

function visibleArea(ctx: CanvasRenderingContext2D, area: Area, canvasWidth: number, canvasHeight: number): void {
  ctx.save();
  ctx.rect(area.x, area.y, area.w, area.h);
  ctx.stroke();

  ctx.clip(); // rect로 설정한 영역한 부분만 보이고 나머지는 가려짐

  ctx.fillStyle = 'green';
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  ctx.restore();
}

function Scale() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');
    const canvasWidth = canvasRef.current?.offsetWidth;
    const canvasHeight = canvasRef.current?.offsetHeight;
    if (ctx) {
      // zoomInOut(ctx);
      const area: Area = {
        x: 50,
        y: 20,
        w: 200,
        h: 120,
      };
      if (canvasWidth && canvasHeight) visibleArea(ctx, area, canvasWidth, canvasHeight);
    }
  }, []);

  return <canvas ref={canvasRef} width='600px' height='400px' style={{ border: 'solid 1px black' }} />;
}

export default Scale;
