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

function Second({ canvasStyle }: Props) {
  const canvasRef: React.RefObject<HTMLCanvasElement> = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');
  }, []);

  return <canvas width='600px' height='400px' ref={canvasRef} style={canvasStyle} />;
}

export default Second;
