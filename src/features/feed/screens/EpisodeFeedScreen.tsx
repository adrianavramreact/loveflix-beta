import { useRef, useState } from 'react';
import { FlatList, StyleSheet, Text, useWindowDimensions, View } from 'react-native';

import { EpisodeCard } from '@/features/feed/components/EpisodeCard';
import { strings } from '@/shared/constants/strings';
import type { Episode } from '@/shared/data/catalog';
import { colors, fonts, fontSizes } from '@/shared/theme/tokens';

export type FeedItem = {
  episode: Episode;
  locked: boolean;
};

type Props = {
  seriesTitle: string;
  items: FeedItem[];
  initialIndex: number;
  onUnlock: (episodeId: string) => void;
  onBack: () => void;
  onActiveIndexChange: (index: number) => void;
};

const viewabilityConfig = { itemVisiblePercentThreshold: 80 };

// Render up to 10 cards first (a whole season here), then keep one screen above and below while scrolling.
const INITIAL_CARDS_TO_RENDER = 10;
const WINDOW_SIZE = 3;

export function EpisodeFeedScreen({
  seriesTitle,
  items,
  initialIndex,
  onUnlock,
  onBack,
  onActiveIndexChange,
}: Props) {
  // Each card is exactly as tall as the list, so paging snaps card by card.
  // It starts at the window height and onLayout corrects it, because on Android the list gets less space.
  const { height: windowHeight } = useWindowDimensions();
  const [height, setHeight] = useState(windowHeight);
  const listRef = useRef<FlatList<FeedItem>>(null);
  const [activeIndex, setActiveIndex] = useState(initialIndex);

  // FlatList needs this callback to stay the same between renders; React Compiler keeps it stable.
  const onViewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: { index?: number | null }[];
  }) => {
    const first = viewableItems[0];
    if (first?.index != null) {
      setActiveIndex(first.index);
      onActiveIndexChange(first.index);
    }
  };

  // When an episode ends, move on to the next card (the lock, after the last free one).
  const goToNext = (index: number) => {
    if (index + 1 < items.length) {
      listRef.current?.scrollToIndex({ index: index + 1, animated: true });
    }
  };

  if (items.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>{strings.feed.noEpisodes}</Text>
      </View>
    );
  }

  return (
    <View style={styles.screen} onLayout={(e) => setHeight(e.nativeEvent.layout.height)}>
      <FlatList
        ref={listRef}
        data={items}
        keyExtractor={(item) => item.episode.id}
        pagingEnabled
        initialNumToRender={INITIAL_CARDS_TO_RENDER}
        windowSize={WINDOW_SIZE}
        showsVerticalScrollIndicator={false}
        initialScrollIndex={initialIndex}
        getItemLayout={(_, index) => ({ length: height, offset: height * index, index })}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        renderItem={({ item, index }) => (
          <EpisodeCard
            index={index}
            episode={item.episode}
            seriesTitle={seriesTitle}
            locked={item.locked}
            active={index === activeIndex}
            nearActive={Math.abs(index - activeIndex) <= 1}
            height={height}
            onUnlock={onUnlock}
            onEnded={goToNext}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.feedBackground,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.feedBackground,
  },
  emptyText: {
    color: colors.textMuted,
    fontFamily: fonts.body,
    fontSize: fontSizes.body,
  },
});
