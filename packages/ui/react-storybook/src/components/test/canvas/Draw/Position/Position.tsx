import React, { useEffect, useRef } from 'react';

function canvasText1(txt: string, ctx: CanvasRenderingContext2D) {
  ctx.font = '22px serif';
  ctx.fillStyle = 'rgba(130, 130, 10, 0.5)';
  ctx.strokeStyle = 'rgba(56, 77, 120, 0.5)';
  ctx.fillText(txt, 150, 200);
  ctx.strokeText(txt, 150, 258);
}

function canvasText2(txt: string, ctx: CanvasRenderingContext2D) {
  ctx.font = '22px serif';
  ctx.fillStyle = 'rgba(130, 130, 10, 1)';
  ctx.fillText(txt, 150, 100);

  ctx.fillStyle = 'rgba(97, 226, 110, 1)';
  ctx.fillText(txt, 150, 200);
}

function canvasTextSortCenter(txt: string, ctx: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number) {
  ctx.font = '33px serif';
  const len: TextMetrics = ctx.measureText(txt);
  const { width } = len;
  ctx.fillText(txt, canvasWidth / 2 - width / 2, canvasHeight / 2);
}

function Position(): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');
    const canvasWidth = canvasRef.current?.offsetWidth;
    const canvasHeight = canvasRef.current?.offsetHeight;
    if (ctx) {
      // canvasText1('canvas', ctx);
      // canvasText2('canvas', ctx);
      if (canvasWidth && canvasHeight) {
        canvasTextSortCenter('중앙정렬', ctx, canvasWidth, canvasHeight);
      }
    }
  }, []);
  return <canvas ref={canvasRef} width='600px' height='600px' />;
}

export default Position;
