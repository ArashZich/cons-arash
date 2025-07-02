function roundToOneOrHigher(value: number): number {
  // Round the number to the nearest integer
  let roundedValue = Math.round(value);

  // Ensure the rounded value is at least 1
  roundedValue = Math.max(roundedValue, 1);

  return roundedValue;
}

export { roundToOneOrHigher };
