// Last episode the user reached in each series, kept while the app is open.
// It moves to persistent storage together with the coins.
const lastEpisodeBySeries = new Map<string, number>();

export function getLastEpisode(seriesId: string): number {
  return lastEpisodeBySeries.get(seriesId) ?? 1;
}

export function setLastEpisode(seriesId: string, episodeNumber: number) {
  lastEpisodeBySeries.set(seriesId, episodeNumber);
}
