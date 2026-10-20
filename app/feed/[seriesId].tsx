import { router, useLocalSearchParams } from 'expo-router';

import { EpisodeFeedScreen, getLastEpisode, setLastEpisode, type FeedItem } from '@/features/feed';
import { getSeries } from '@/shared/data/catalog';

function openUnlock(_episodeId: string) {}

export default function EpisodeFeedRoute() {
  const { seriesId } = useLocalSearchParams<{ seriesId: string }>();
  const series = getSeries(seriesId);

  const items: FeedItem[] = (series?.episodes ?? []).map((episode) => ({
    episode,
    locked: !episode.isFree,
  }));

  const rememberEpisode = (index: number) => setLastEpisode(seriesId, index + 1);

  const initialIndex = getLastEpisode(seriesId) - 1;

  return (
    <EpisodeFeedScreen
      seriesTitle={series?.title ?? ''}
      items={items}
      initialIndex={initialIndex}
      onUnlock={openUnlock}
      onBack={() => router.back()}
      onActiveIndexChange={rememberEpisode}
    />
  );
}
