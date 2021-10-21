import React, { useEffect, useRef } from 'react';

function drawCircle(ctx: CanvasRenderingContext2D, posX: number, posY: number) {
  ctx.save();
  ctx.beginPath();
  ctx.strokeStyle = 'green';
  ctx.moveTo(posX, posY);

  // radian을 °로 변환 => (180 / pi) * 각도
  const startAngle = (Math.PI / 180) * 45; // 0도 에서 45도 이동한 지점부터 시작
  const endAngle = (Math.PI / 180) * 360; // 0도 에서 360도 이동한 지점에서 종료

  // x, y, 반지름, 시작각, 종료각, 반전여부
  ctx.arc(posX, posY, 50, startAngle, endAngle, false);
  // ctx.arc(posX, posY, 50, 0, Math.PI * 2, false);
  ctx.closePath();
  ctx.stroke();
}

function example(ctx: CanvasRenderingContext2D, posX: number, posY: number) {
  ctx.save();

  ctx.strokeStyle = 'green';
  const endAngle = (Math.PI / 180) * 360;
  ctx.beginPath();
  ctx.fillStyle = 'green';
  ctx.arc(posX, posY, 25, 0, endAngle, false);
  ctx.fill();
  ctx.closePath();

  ctx.restore();
  ctx.beginPath();
  ctx.arc(posX + 100, posY, 25, 0, endAngle, false);
  ctx.stroke();
  ctx.closePath();
}

function Circle() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');
    // const canvasWidth = canvasRef.current?.offsetWidth;
    // const canvasHeight = canvasRef.current?.offsetHeight;
    if (ctx) {
      // drawCircle(ctx, 100, 100);
      example(ctx, 100, 100);
    }
  }, []);

  return <canvas ref={canvasRef} width='600px' height='400px' style={{ border: 'solid 1px black' }} />;
}

export default Circle;
