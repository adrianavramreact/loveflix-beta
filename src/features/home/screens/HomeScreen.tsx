import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
  FlatList,
  Image,
  type ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import type { Series } from '@/shared/data/catalog';
import {
  colors,
  fonts,
  fontSizes,
  iconSize,
  minTouchTarget,
  radius,
  spacing,
} from '@/shared/theme/tokens';
import { PosterCard } from '@/features/home/components/PosterCard';
import { GradientText } from '@/shared/components/GradientText';
import { strings } from '@/shared/constants/strings';

const HERO_HEIGHT = 460;
const HEADER_ITEM_SIZE = 32;
const NOTIFICATION_DOT_SIZE = 8;
const NOTIFICATION_DOT_OFFSET = 10;
const CHIP_HEIGHT = 36;
const SECTION_MARK_SIZE = 26;

export type HomeRow = {
  title: string;
  sectionTitle?: string; // set on the first row of a section
  series: Series[];
};

type Props = {
  featured: Series;
  rows: HomeRow[];
  genres: string[];
  avatar: ImageSourcePropType;
  onPlay: (seriesId: string) => void;
  onOpenSeries: (seriesId: string) => void;
};

export function HomeScreen({ featured, rows, genres, avatar, onPlay, onOpenSeries }: Props) {
  const [genre, setGenre] = useState(genres[0]);

  const header = (
    <View>
      <View style={styles.hero}>
        <Image source={featured.poster} style={styles.heroImage} resizeMode="cover" />
        <View style={styles.heroShade} />
        <View style={styles.heroContent}>
          <View style={styles.tagRow}>
            <Text style={styles.spotlight}>{strings.home.spotlight}</Text>
            <Text style={styles.genres}>{featured.genres.join(strings.common.separator)}</Text>
          </View>
          <Text style={styles.heroTitle} accessibilityRole="header">
            {featured.title}
          </Text>
          <Text style={styles.tagline}>{featured.tagline}</Text>
          <Text style={styles.stats}>
            {strings.home.stats(featured.rating, featured.episodeCount)}
          </Text>
          <View style={styles.heroActions}>
            <Pressable
              style={styles.playButton}
              onPress={() => onPlay(featured.id)}
              accessibilityRole="button"
              accessibilityLabel={strings.home.watchSeries(featured.title)}
            >
              <Ionicons name="play" size={iconSize.sm} color={colors.onPrimary} />
              <Text style={styles.playText}>{strings.home.watchNow}</Text>
            </Pressable>
            <Pressable
              style={styles.roundButton}
              accessibilityRole="button"
              accessibilityLabel={strings.home.addToList}
            >
              <Ionicons name="add" size={iconSize.md} color={colors.text} />
            </Pressable>
          </View>
        </View>
      </View>

      <FlatList
        horizontal
        data={genres}
        keyExtractor={(g) => g}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chips}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => setGenre(item)}
            hitSlop={spacing.xs}
            style={[styles.chip, item === genre && styles.chipActive]}
            accessibilityRole="button"
            accessibilityLabel={strings.home.showGenre(item)}
          >
            <Text style={[styles.chipText, item === genre && styles.chipTextActive]}>{item}</Text>
          </Pressable>
        )}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <View style={styles.topBar}>
        <View style={styles.logo}>
          <Ionicons name="heart-outline" size={iconSize.md} color={colors.onPrimary} />
        </View>
        <View style={styles.topBarActions}>
          <Pressable
            style={styles.iconButton}
            accessibilityRole="button"
            accessibilityLabel={strings.home.search}
          >
            <Ionicons name="search" size={iconSize.md} color={colors.text} />
          </Pressable>
          <Pressable
            style={styles.iconButton}
            accessibilityRole="button"
            accessibilityLabel={strings.home.notifications}
          >
            <Ionicons name="notifications-outline" size={iconSize.md} color={colors.text} />
            <View style={styles.notificationDot} />
          </Pressable>
          <Image
            source={avatar}
            style={styles.avatar}
            accessibilityLabel={strings.home.yourProfile}
          />
        </View>
      </View>

      <FlatList
        data={rows}
        keyExtractor={(row) => row.title}
        ListHeaderComponent={header}
        showsVerticalScrollIndicator={false}
        renderItem={({ item: row, index }) => (
          <View style={styles.row}>
            {row.sectionTitle && (
              <View style={[styles.sectionHeader, index > 0 && styles.sectionSpacing]}>
                {index === 0 ? (
                  <View style={[styles.sectionMark, styles.sectionMarkBlue]} />
                ) : (
                  <View style={[styles.sectionMark, styles.sectionMarkPlain]} />
                )}
                {index === 0 ? (
                  <GradientText style={styles.sectionTitle}>{row.sectionTitle}</GradientText>
                ) : (
                  <Text style={styles.sectionTitle}>{row.sectionTitle}</Text>
                )}
              </View>
            )}
            <View style={styles.rowHeader}>
              <Text style={styles.rowTitle}>{row.title}</Text>
              <Text style={styles.seeAll}>{strings.home.seeAll}</Text>
            </View>
            <FlatList
              horizontal
              data={row.series}
              keyExtractor={(s) => s.id}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.rowList}
              renderItem={({ item }) => (
                <PosterCard series={item} onPress={() => onOpenSeries(item.id)} />
              )}
            />
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
  },
  logo: {
    width: HEADER_ITEM_SIZE,
    height: HEADER_ITEM_SIZE,
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
  },
  topBarActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    width: minTouchTarget,
    height: minTouchTarget,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationDot: {
    position: 'absolute',
    top: NOTIFICATION_DOT_OFFSET,
    right: NOTIFICATION_DOT_OFFSET,
    width: NOTIFICATION_DOT_SIZE,
    height: NOTIFICATION_DOT_SIZE,
    borderRadius: radius.pill,
    backgroundColor: colors.primary,
  },
  avatar: {
    width: HEADER_ITEM_SIZE,
    height: HEADER_ITEM_SIZE,
    marginLeft: spacing.sm,
    borderRadius: radius.pill,
  },
  hero: {
    height: HERO_HEIGHT,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  heroImage: {
    ...StyleSheet.absoluteFill,
    width: '100%',
    height: '100%',
  },
  heroShade: {
    ...StyleSheet.absoluteFill,
    backgroundColor: colors.overlay,
  },
  heroContent: {
    padding: spacing.lg,
    gap: spacing.sm,
  },
  tagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  spotlight: {
    color: colors.accent,
    fontFamily: fonts.bodySemiBold,
    fontSize: fontSizes.caption,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xxs,
    borderRadius: radius.pill,
    backgroundColor: colors.accentSoft,
  },
  genres: {
    color: colors.textMuted,
    fontFamily: fonts.body,
    fontSize: fontSizes.caption,
  },
  heroTitle: {
    color: colors.text,
    fontFamily: fonts.display,
    fontSize: fontSizes.hero,
  },
  tagline: {
    color: colors.textMuted,
    fontFamily: fonts.body,
    fontSize: fontSizes.small,
  },
  stats: {
    color: colors.text,
    fontFamily: fonts.bodyMedium,
    fontSize: fontSizes.small,
  },
  heroActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginTop: spacing.sm,
  },
  playButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    height: minTouchTarget,
    borderRadius: radius.pill,
    backgroundColor: colors.primary,
  },
  playText: {
    color: colors.onPrimary,
    fontFamily: fonts.bodySemiBold,
    fontSize: fontSizes.body,
  },
  roundButton: {
    width: minTouchTarget,
    height: minTouchTarget,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.textMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chips: {
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  chip: {
    justifyContent: 'center',
    minHeight: CHIP_HEIGHT,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  chipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipText: {
    color: colors.textMuted,
    fontFamily: fonts.body,
    fontSize: fontSizes.small,
  },
  chipTextActive: {
    color: colors.onPrimary,
  },
  row: {
    marginBottom: spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.xl,
  },
  sectionSpacing: {
    marginTop: spacing.xl,
  },
  sectionMark: {
    width: SECTION_MARK_SIZE,
    height: SECTION_MARK_SIZE,
  },
  sectionMarkBlue: {
    backgroundColor: colors.primary,
  },
  sectionMarkPlain: {
    backgroundColor: colors.text,
  },
  sectionTitle: {
    color: colors.text,
    fontFamily: fonts.display,
    fontSize: fontSizes.subhead,
  },
  rowHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  rowTitle: {
    color: colors.text,
    fontFamily: fonts.display,
    fontSize: fontSizes.title,
  },
  seeAll: {
    color: colors.primary,
    fontFamily: fonts.bodyMedium,
    fontSize: fontSizes.small,
  },
  rowList: {
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
  },
});
