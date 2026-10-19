import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import type { Series } from '../../../shared/data/catalog';
import { colors, fonts, fontSizes, gradients, radius, spacing } from '../../../shared/theme/tokens';

type Props = {
  series: Series;
  onPress: () => void;
};

export function PosterCard({ series, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Open ${series.title}`}
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
            <MaterialCommunityIcons name="crown-outline" size={12} color={colors.onPrimary} />
            <Text style={styles.proText}>PRO</Text>
          </LinearGradient>
        )}
        <View style={styles.meta}>
          <Text style={styles.metaText}>{series.episodeCount} Eps</Text>
          <Text style={styles.metaText}>{series.minutesPerEpisode}m/ep</Text>
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
    width: 130,
  },
  poster: {
    width: 130,
    height: 185,
    borderRadius: radius.sm,
  },
  proBadge: {
    position: 'absolute',
    top: spacing.sm,
    left: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
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
