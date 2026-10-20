import { router, useLocalSearchParams } from 'expo-router';
import { useRef, useState } from 'react';

import {
  COIN_PACKS,
  DEFAULT_PACK_ID,
  episodesToUnlock,
  lockedEpisodes,
  packCovers,
  packTotal,
  priceOf,
  TopupScreen,
  useWallet,
  type UnlockOption,
} from '@/features/unlock';
import { getEpisode, getSeries } from '@/shared/data/catalog';

export default function TopupRoute() {
  const { episodeId, option } = useLocalSearchParams<{
    episodeId: string;
    option: UnlockOption;
  }>();
  const unlockOption: UnlockOption = option === 'season' ? 'season' : 'episode';
  const episode = getEpisode(episodeId);
  const series = episode && getSeries(episode.seriesId);

  const coins = useWallet((state) => state.coins);
  const unlockedEpisodeIds = useWallet((state) => state.unlockedEpisodeIds);
  const addCoins = useWallet((state) => state.addCoins);
  const unlock = useWallet((state) => state.unlock);
  const lockedCount = series ? lockedEpisodes(series, unlockedEpisodeIds).length : 0;
  const price = priceOf(unlockOption, lockedCount);
  const packs = COIN_PACKS.filter((pack) => packCovers(pack, coins, price));
  const [selectedPackId, setSelectedPackId] = useState(() =>
    packs.some((pack) => pack.id === DEFAULT_PACK_ID) ? DEFAULT_PACK_ID : packs[0]?.id,
  );
  const buying = useRef(false);

  if (!episode || !series) return null;

  const episodesToBuy =
    unlockOption === 'season' ? lockedEpisodes(series, unlockedEpisodeIds) : [episode];

  const selectedPack = packs.find((pack) => pack.id === selectedPackId) ?? packs[0];

  const buy = () => {
    if (buying.current) return;
    buying.current = true;
    addCoins(packTotal(selectedPack));
    const episodeIds = episodesToUnlock(unlockOption, episode, series, unlockedEpisodeIds);
    if (unlock(episodeIds, price)) {
      router.back();
      return;
    }
    buying.current = false;
  };

  return (
    <TopupScreen
      seriesTitle={series.title}
      option={unlockOption}
      episodeFrom={episodesToBuy[0]?.index ?? episode.index}
      episodeTo={episodesToBuy[episodesToBuy.length - 1]?.index ?? episode.index}
      thumbnail={episode.thumbnail}
      unlockPrice={price}
      balance={coins}
      packs={packs}
      selectedPack={selectedPack}
      onSelectPack={setSelectedPackId}
      onBuy={buy}
      onBack={() => router.back()}
    />
  );
}
