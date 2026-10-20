import { EPISODE_PRICE, SEASON_PRICE, type CoinPack } from '@/features/unlock/domain/pricing';
import type { Episode, Series } from '@/shared/data/catalog';

export type UnlockOption = 'episode' | 'season';

export function isLocked(episode: Episode, unlockedEpisodeIds: string[]): boolean {
  return !episode.isFree && !unlockedEpisodeIds.includes(episode.id);
}

export function lockedEpisodes(series: Series, unlockedEpisodeIds: string[]): Episode[] {
  return series.episodes.filter((episode) => isLocked(episode, unlockedEpisodeIds));
}

export function offersSeason(lockedCount: number): boolean {
  return lockedCount > 1;
}

export function priceOf(option: UnlockOption, lockedCount: number): number {
  if (option === 'episode') return EPISODE_PRICE;
  return Math.min(SEASON_PRICE, lockedCount * EPISODE_PRICE);
}

export function episodesToUnlock(
  option: UnlockOption,
  episode: Episode,
  series: Series,
  unlockedEpisodeIds: string[],
): string[] {
  if (option === 'episode') return [episode.id];
  return lockedEpisodes(series, unlockedEpisodeIds).map((locked) => locked.id);
}

export function canAfford(balance: number, price: number): boolean {
  return balance >= price;
}

export function packTotal(pack: CoinPack): number {
  return pack.coins + pack.bonus;
}

export function packCovers(pack: CoinPack, balance: number, price: number): boolean {
  return canAfford(balance + packTotal(pack), price);
}
