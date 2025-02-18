export function proportionalValue(
  value: number,
  min: number,
  max: number,
  minOutput: number,
  maxOutput: number
) {
  if (value < min) return minOutput;
  if (value > max) return maxOutput;
  return ((value - min) / (max - min)) * (maxOutput - minOutput) + minOutput;
}
