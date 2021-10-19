import React, { useEffect, useRef } from 'react';

function example1(ctx: CanvasRenderingContext2D): void {
  ctx.lineWidth = 10;

  ctx.beginPath();
  ctx.moveTo(30, 10);
  ctx.lineTo(30, 60);
  ctx.lineCap = 'butt';
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(60, 10);
  ctx.lineTo(60, 60);
  ctx.lineCap = 'round';
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(90, 10);
  ctx.lineTo(90, 60);
  ctx.lineCap = 'square';
  ctx.stroke();
}

function example2(ctx: CanvasRenderingContext2D): void {
  ctx.lineWidth = 5;
  ctx.lineCap = 'butt';
  ctx.beginPath();
  ctx.moveTo(10, 10);
  ctx.lineTo(30, 100);
  ctx.lineTo(10, 100);
  ctx.lineTo(10, 10);
  ctx.stroke();
}
function example3(ctx: CanvasRenderingContext2D): void {
  ctx.lineWidth = 5;
}

function Line() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) {
      // example1(ctx);
      example2(ctx);
    }
  }, []);

  return <canvas ref={canvasRef} width='600' height='600' />;
}

export default Line;
