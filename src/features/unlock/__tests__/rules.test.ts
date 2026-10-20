import { COIN_PACKS, EPISODE_PRICE, SEASON_PRICE } from '@/features/unlock/domain/pricing';
import {
  canAfford,
  episodesToUnlock,
  isLocked,
  lockedEpisodes,
  offersSeason,
  packCovers,
  packTotal,
  priceOf,
} from '@/features/unlock/domain/rules';
import { getSeries } from '@/shared/data/catalog';

const series = getSeries('billionaires-secret')!;
const freeEpisode = series.episodes.find((episode) => episode.isFree)!;
const [firstLocked] = series.episodes.filter((episode) => !episode.isFree);

describe('isLocked', () => {
  it('never locks a free episode', () => {
    expect(isLocked(freeEpisode, [])).toBe(false);
  });

  it('locks a paid episode until it is unlocked', () => {
    expect(isLocked(firstLocked, [])).toBe(true);
    expect(isLocked(firstLocked, [firstLocked.id])).toBe(false);
  });
});

describe('episodesToUnlock', () => {
  it('unlocks only the chosen episode', () => {
    expect(episodesToUnlock({ option: 'episode', episode: firstLocked })).toEqual([firstLocked.id]);
  });

  it('unlocks every locked episode of the season', () => {
    expect(episodesToUnlock({ option: 'season', series, unlockedEpisodeIds: [] })).toEqual(
      lockedEpisodes(series, []).map((episode) => episode.id),
    );
  });

  it('skips episodes already unlocked when buying the season', () => {
    expect(
      episodesToUnlock({ option: 'season', series, unlockedEpisodeIds: [firstLocked.id] }),
    ).not.toContain(firstLocked.id);
  });
});

describe('prices', () => {
  it('charges the episode or the season price', () => {
    const lockedCount = lockedEpisodes(series, []).length;
    expect(priceOf('episode', lockedCount)).toBe(EPISODE_PRICE);
    expect(priceOf('season', lockedCount)).toBe(SEASON_PRICE);
  });

  it('offers the season only while more than one episode is locked', () => {
    expect(offersSeason(2)).toBe(true);
    expect(offersSeason(1)).toBe(false);
  });

  it('never charges more for the season than for the episodes left', () => {
    expect(priceOf('season', 1)).toBe(EPISODE_PRICE);
  });

  it('makes the season cheaper than its locked episodes one by one', () => {
    expect(SEASON_PRICE).toBeLessThan(lockedEpisodes(series, []).length * EPISODE_PRICE);
  });

  it('allows an unlock only with enough coins', () => {
    expect(canAfford(EPISODE_PRICE, EPISODE_PRICE)).toBe(true);
    expect(canAfford(EPISODE_PRICE - 1, EPISODE_PRICE)).toBe(false);
  });

  it('offers a pack only when it covers the missing coins', () => {
    const pack = COIN_PACKS[0];
    expect(packCovers(pack, 0, packTotal(pack))).toBe(true);
    expect(packCovers(pack, 0, packTotal(pack) + 1)).toBe(false);
    expect(packCovers(pack, 1, packTotal(pack) + 1)).toBe(true);
  });

  it('adds the bonus to a coin pack', () => {
    const pack = COIN_PACKS.find((candidate) => candidate.bonus > 0)!;
    expect(packTotal(pack)).toBe(pack.coins + pack.bonus);
  });
});
