import { router, useLocalSearchParams } from 'expo-router';

import { EpisodeFeedScreen, setLastEpisode, type FeedItem } from '@/features/feed';
import { getSeries } from '@/shared/data/catalog';

function openUnlock(_episodeId: string) {}

export default function EpisodeFeedRoute() {
  const { seriesId, ep } = useLocalSearchParams<{ seriesId: string; ep?: string }>();
  const series = getSeries(seriesId);

  const items: FeedItem[] = (series?.episodes ?? []).map((episode) => ({
    episode,
    locked: !episode.isFree,
  }));

  const rememberEpisode = (index: number) => setLastEpisode(seriesId, index + 1);

  const requested = Number(ep ?? 1) - 1;
  const initialIndex = Math.min(Math.max(requested, 0), Math.max(items.length - 1, 0));

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
