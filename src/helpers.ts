import type { Ratios, Side } from "./types";

export const calculateSideOfScreen = (ratios: Ratios, screenSize: number) => {  
  const sqrtSum = ratios.height * ratios.height + ratios.width * ratios.width;
  const hipotenuza = screenSize * screenSize / sqrtSum;

  return (side: Side) => {
    const squareOfWidth = hipotenuza * ratios[side] * ratios[side];
    return Math.sqrt(squareOfWidth);
  }
}