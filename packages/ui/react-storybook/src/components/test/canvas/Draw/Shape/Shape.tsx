import React, { useEffect, useRef } from 'react';

function Shape(): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) {
      ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
      ctx.fillRect(10, 10, 200, 50);

      ctx.fillStyle = 'rgba(130, 130, 10, 0.5)';
      ctx.fillRect(30, 30, 100, 100);
    }
  }, []);

  return <canvas id='canvas' ref={canvasRef} width='600px' height='600px' />;
}

export default Shape;
