import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import type { Series } from '@/shared/data/catalog';
import {
  colors,
  fonts,
  fontSizes,
  gradients,
  iconSize,
  radius,
  spacing,
} from '@/shared/theme/tokens';
import { strings } from '@/shared/constants/strings';

const POSTER_WIDTH = 130;
const POSTER_HEIGHT = 185;

type Props = {
  series: Series;
  onPress: () => void;
};

export function PosterCard({ series, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={strings.home.openSeries(series.title)}
      style={styles.card}
    >
      <View>
        <Image source={series.poster} style={styles.poster} />
        {series.isPro && (
          <LinearGradient
            colors={gradients.brand}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.proBadge}
          >
            <MaterialCommunityIcons
              name="crown-outline"
              size={iconSize.xs}
              color={colors.onPrimary}
            />
            <Text style={styles.proText}>{strings.home.pro}</Text>
          </LinearGradient>
        )}
        <View style={styles.meta}>
          <Text style={styles.metaText}>{strings.home.episodeCount(series.episodeCount)}</Text>
          <Text style={styles.metaText}>
            {strings.home.minutesPerEpisode(series.minutesPerEpisode)}
          </Text>
        </View>
      </View>
      <Text style={styles.title} numberOfLines={2}>
        {series.title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: POSTER_WIDTH,
  },
  poster: {
    width: POSTER_WIDTH,
    height: POSTER_HEIGHT,
    borderRadius: radius.sm,
  },
  proBadge: {
    position: 'absolute',
    top: spacing.sm,
    left: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xxs,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xxs,
    borderRadius: radius.pill,
  },
  proText: {
    color: colors.onPrimary,
    fontFamily: fonts.bodySemiBold,
    fontSize: fontSizes.caption,
  },
  meta: {
    position: 'absolute',
    left: spacing.sm,
    right: spacing.sm,
    bottom: spacing.sm,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metaText: {
    color: colors.text,
    fontFamily: fonts.bodyMedium,
    fontSize: fontSizes.caption,
  },
  title: {
    marginTop: spacing.sm,
    color: colors.text,
    fontFamily: fonts.display,
    fontSize: fontSizes.small,
  },
});
