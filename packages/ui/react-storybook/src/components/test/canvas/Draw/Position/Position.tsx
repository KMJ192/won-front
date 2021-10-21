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

function canvasPositionHard(ctx: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number) {
  ctx.fillStyle = 'green';
  ctx.fillRect(0, 0, 30, 30);

  ctx.fillStyle = 'blue';
  ctx.translate(100, 100);
  ctx.fillRect(0, 0, 30, 30);

  ctx.fillStyle = 'yellow';
  ctx.translate(0, -100);
  ctx.fillRect(0, 0, 30, 30);
}

/*
  1. 초기상태 저장
  2. 캔버스 초기화
  3. 중앙점 이동
  4. 회전
  5. fillRect,
  6. 초기상태
*/
function rotateRect(ctx: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number): void {
  let num: number = 1;
  const rectSize = {
    width: 80,
    height: 80,
  };
  setInterval(() => {
    ctx.fillStyle = 'black';
    ctx.save(); // 초기상태 저장
    ctx.clearRect(0, 0, canvasWidth, canvasHeight); // 캔버스 초기화 (캔버스 지우기)
    ctx.translate(canvasWidth / 2, canvasHeight / 2); // 중앙점 이동
    ctx.rotate((Math.PI / 180) * num); // 회전
    ctx.fillRect(
      rectSize.width / 2 - rectSize.width,
      rectSize.height / 2 - rectSize.height,
      rectSize.width,
      rectSize.height,
    );
    ctx.restore(); // 초기상태 불러오기
    num++;
    if (num >= 356) {
      num = 1;
    }
  }, 10);
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
        // canvasTextSortCenter('중앙정렬', ctx, canvasWidth, canvasHeight);
        // canvasPositionHard(ctx, canvasWidth, canvasHeight);
        rotateRect(ctx, canvasWidth, canvasHeight);
      }
    }
  }, []);
  return <canvas ref={canvasRef} width='600px' height='400px' style={{ border: 'solid 1px black' }} />;
}

export default Position;
