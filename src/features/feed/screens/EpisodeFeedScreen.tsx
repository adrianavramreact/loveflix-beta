import { Ionicons } from '@expo/vector-icons';
import { useRef, useState } from 'react';
import { Dimensions, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { EpisodeCard } from '@/features/feed/components/EpisodeCard';
import { strings } from '@/shared/constants/strings';
import type { Episode } from '@/shared/data/catalog';
import {
  colors,
  fonts,
  fontSizes,
  iconSize,
  minTouchTarget,
  radius,
  spacing,
} from '@/shared/theme/tokens';

export type FeedItem = {
  episode: Episode;
  locked: boolean;
  liked: boolean;
};

type Props = {
  seriesTitle: string;
  items: FeedItem[];
  initialIndex: number;
  onUnlock: (episodeId: string) => void;
  onToggleLike: (episodeId: string) => void;
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
  onToggleLike,
  onBack,
  onActiveIndexChange,
}: Props) {
  const { height } = Dimensions.get('screen');
  const insets = useSafeAreaInsets();
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

  const backButton = (
    <Pressable
      style={[styles.backButton, { top: insets.top + spacing.sm }]}
      onPress={onBack}
      accessibilityRole="button"
      accessibilityLabel={strings.feed.back}
    >
      <Ionicons name="chevron-back" size={iconSize.md} color={colors.text} />
    </Pressable>
  );

  if (items.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>{strings.feed.noEpisodes}</Text>
        {backButton}
      </View>
    );
  }

  return (
    <View style={styles.screen}>
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
            liked={item.liked}
            active={index === activeIndex}
            nearActive={Math.abs(index - activeIndex) <= 1}
            height={height}
            onUnlock={onUnlock}
            onToggleLike={onToggleLike}
            onEnded={goToNext}
          />
        )}
      />
      {backButton}
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
  backButton: {
    position: 'absolute',
    left: spacing.sm,
    width: minTouchTarget,
    height: minTouchTarget,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.pill,
    backgroundColor: colors.overlay,
  },
  emptyText: {
    color: colors.textMuted,
    fontFamily: fonts.body,
    fontSize: fontSizes.body,
  },
});
