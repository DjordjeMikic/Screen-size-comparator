import type { Ratios, Side } from "./types";

export const calculateSideOfScreen = (ratios: Ratios, screenSize: number) => {  
  const sqrtSum = ratios.height * ratios.height + ratios.width * ratios.width;
  const slashLine = screenSize * screenSize / sqrtSum;

  return (side: Side) => {
    const squareOfWidth = slashLine * ratios[side] * ratios[side];
    return Math.sqrt(squareOfWidth);
  }
}