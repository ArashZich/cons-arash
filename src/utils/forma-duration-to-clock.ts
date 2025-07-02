function formatDurationToClock(durationInSeconds: number): string {
  const hours = Math.floor(durationInSeconds / 3600)
    .toString()
    .padStart(2, '0');
  const minutes = Math.floor((durationInSeconds % 3600) / 60)
    .toString()
    .padStart(2, '0');
  const seconds = (durationInSeconds % 60).toString().padStart(2, '0');

  return `${hours}:${minutes}:${seconds}`;
}

export { formatDurationToClock };
