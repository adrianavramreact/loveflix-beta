import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';

import { EpisodeFeedScreen, useLikes, useWatchProgress, type FeedItem } from '@/features/feed';
import { isLocked, useWallet } from '@/features/unlock';
import { getSeries } from '@/shared/data/catalog';

function openUnlock(episodeId: string) {
  router.push({ pathname: '/unlock/[episodeId]', params: { episodeId } });
}

export default function EpisodeFeedRoute() {
  const { seriesId } = useLocalSearchParams<{ seriesId: string }>();
  const series = getSeries(seriesId);

  const unlockedEpisodeIds = useWallet((state) => state.unlockedEpisodeIds);
  const likedEpisodeIds = useLikes((state) => state.likedEpisodeIds);
  const toggleLike = useLikes((state) => state.toggleLike);
  const items: FeedItem[] = (series?.episodes ?? []).map((episode) => ({
    episode,
    locked: isLocked(episode, unlockedEpisodeIds),
    liked: likedEpisodeIds.includes(episode.id),
  }));

  const setLastIndex = useWatchProgress((state) => state.setLastIndex);
  const [initialIndex] = useState(
    () => useWatchProgress.getState().lastIndexBySeries[seriesId] ?? 0,
  );

  const rememberEpisode = (index: number) => setLastIndex(seriesId, index);

  return (
    <EpisodeFeedScreen
      seriesTitle={series?.title ?? ''}
      items={items}
      initialIndex={initialIndex}
      onUnlock={openUnlock}
      onToggleLike={toggleLike}
      onBack={() => router.back()}
      onActiveIndexChange={rememberEpisode}
    />
  );
}
