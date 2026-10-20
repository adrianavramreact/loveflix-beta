import { router, useLocalSearchParams } from 'expo-router';
import { useRef, useState } from 'react';

import {
  ContinueTheRomanceScreen,
  episodesToUnlock,
  lockedEpisodes,
  offersSeason,
  priceOf,
  useWallet,
  type UnlockOption,
} from '@/features/unlock';
import { getEpisode, getSeries } from '@/shared/data/catalog';

export default function UnlockRoute() {
  const { episodeId } = useLocalSearchParams<{ episodeId: string }>();
  const episode = getEpisode(episodeId);
  const series = episode && getSeries(episode.seriesId);

  const unlockedEpisodeIds = useWallet((state) => state.unlockedEpisodeIds);
  const unlock = useWallet((state) => state.unlock);
  const [selected, setSelected] = useState<UnlockOption>('season');
  const unlocking = useRef(false);

  if (!episode || !series) return null;

  const locked = lockedEpisodes(series, unlockedEpisodeIds);
  const showSeason = offersSeason(locked.length);
  const option: UnlockOption = showSeason ? selected : 'episode';

  const unlockSelected = () => {
    if (unlocking.current) return;
    unlocking.current = true;
    const episodeIds = episodesToUnlock(
      option === 'episode' ? { option, episode } : { option, series, unlockedEpisodeIds },
    );
    if (unlock(episodeIds, priceOf(option, locked.length))) {
      router.back();
      return;
    }
    router.replace({ pathname: '/topup', params: { episodeId, option } });
  };

  return (
    <ContinueTheRomanceScreen
      episodeIndex={episode.index}
      thumbnail={episode.thumbnail}
      showSeason={showSeason}
      seasonFrom={locked[0]?.index ?? episode.index}
      seasonTo={locked[locked.length - 1]?.index ?? episode.index}
      episodePrice={priceOf('episode', locked.length)}
      seasonPrice={priceOf('season', locked.length)}
      selected={option}
      onSelect={setSelected}
      onUnlock={unlockSelected}
      onMaybeLater={() => router.back()}
    />
  );
}
