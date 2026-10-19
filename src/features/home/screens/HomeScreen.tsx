import type React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  type ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import type { Series } from '../../../shared/data/catalog';
import {
  colors,
  fonts,
  fontSizes,
  minTouchTarget,
  radius,
  spacing,
} from '../../../shared/theme/tokens';
import { PosterCard } from '../components/PosterCard';

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
      <ImageBackground source={featured.poster} style={styles.hero} resizeMode="cover">
        <View style={styles.heroShade} />
        <View style={styles.heroContent}>
          <View style={styles.tagRow}>
            <Text style={styles.spotlight}>Spotlight</Text>
            <Text style={styles.genres}>{featured.genres.join(' • ')}</Text>
          </View>
          <Text style={styles.heroTitle} accessibilityRole="header">
            {featured.title}
          </Text>
          <Text style={styles.tagline}>{featured.tagline}</Text>
          <Text style={styles.stats}>
            ★ {featured.rating} • {featured.episodeCount} Episodes
          </Text>
          <View style={styles.heroActions}>
            <Pressable
              style={styles.playButton}
              onPress={() => onPlay(featured.id)}
              accessibilityRole="button"
              accessibilityLabel={`Watch ${featured.title}`}
            >
              <Ionicons name="play" size={18} color={colors.onPrimary} />
              <Text style={styles.playText}>Watch Now</Text>
            </Pressable>
            <Pressable
              style={styles.roundButton}
              accessibilityRole="button"
              accessibilityLabel="Add to my list"
            >
              <Ionicons name="add" size={22} color={colors.text} />
            </Pressable>
          </View>
        </View>
      </ImageBackground>

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
            accessibilityLabel={`Show ${item}`}
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
          <Ionicons name="heart-outline" size={20} color={colors.onPrimary} />
        </View>
        <View style={styles.topBarActions}>
          <Pressable
            style={styles.iconButton}
            accessibilityRole="button"
            accessibilityLabel="Search"
          >
            <Ionicons name="search" size={22} color={colors.text} />
          </Pressable>
          <Pressable
            style={styles.iconButton}
            accessibilityRole="button"
            accessibilityLabel="Notifications"
          >
            <Ionicons name="notifications-outline" size={22} color={colors.text} />
            <View style={styles.notificationDot} />
          </Pressable>
          <Image source={avatar} style={styles.avatar} accessibilityLabel="Your profile" />
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
                {/* The first section is highlighted with the brand gradient, like in the design. */}
                {index === 0 ? (
                  <View style={[styles.sectionMark, styles.sectionMarkBlue]} />
                ) : (
                  <View style={[styles.sectionMark, styles.sectionMarkPlain]} />
                )}
                {index === 0 ? (
                  <Text style={[styles.sectionTitle, styles.sectionTitleBlue]}>
                    {row.sectionTitle}
                  </Text>
                ) : (
                  <Text style={styles.sectionTitle}>{row.sectionTitle}</Text>
                )}
              </View>
            )}
            <View style={styles.rowHeader}>
              <Text style={styles.rowTitle}>{row.title}</Text>
              <Text style={styles.seeAll}>See all</Text>
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
    width: 32,
    height: 32,
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
    top: 10,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: radius.pill,
    backgroundColor: colors.primary,
  },
  avatar: {
    width: 32,
    height: 32,
    marginLeft: spacing.sm,
    borderRadius: radius.pill,
  },
  hero: {
    height: 460,
    justifyContent: 'flex-end',
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
    paddingVertical: 2,
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
    minHeight: 36,
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
    width: 26,
    height: 26,
  },
  sectionTitleBlue: {
    color: colors.primary,
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
