import React, { useEffect, useRef } from 'react';

function drawImage(ctx: CanvasRenderingContext2D, width: number, height: number) {
  const img = document.createElement('img');
  img.src =
    'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2F5FiUm%2FbtqBHxusKau%2FKbP3e71HtX0H5qo5BNxNHk%2Fimg.png';
  img.alt = 'test';
  img.onload = () => {
    let num: number = 1;
    ctx.lineWidth = 5;
    const interval = setInterval(() => {
      ctx.clearRect(0, 0, width, height);
      ctx.lineCap = 'round';
      ctx.strokeStyle = 'red';
      ctx.drawImage(img, 0, 0, width, height);

      ctx.beginPath();
      ctx.moveTo(300 + num, 300);
      ctx.lineTo(90 + num, 100);

      ctx.lineTo(150 + num, 100);
      ctx.moveTo(90 + num, 100);
      ctx.lineTo(90 + num, 160);
      ctx.stroke();
      num++;
      if (num === 500) {
        clearInterval(interval);
      }
    }, 500);
  };
}

function Image() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');
    const width = canvasRef.current?.offsetWidth;
    const height = canvasRef.current?.offsetHeight;
    if (ctx && width && height) {
      drawImage(ctx, width, height);
    }
  }, []);
  return <canvas ref={canvasRef} width='800' height='400' />;
}

export default Image;
