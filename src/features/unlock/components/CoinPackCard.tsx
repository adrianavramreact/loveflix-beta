import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { CoinPack } from '@/features/unlock/domain/pricing';
import { strings } from '@/shared/constants/strings';
import {
  colors,
  fonts,
  fontSizes,
  gradients,
  iconSize,
  radius,
  spacing,
} from '@/shared/theme/tokens';

const BANNER_HEIGHT = 24;

type Props = {
  pack: CoinPack;
  selected: boolean;
  onSelect: () => void;
};

export function CoinPackCard({ pack, selected, onSelect }: Props) {
  return (
    <Pressable
      style={[styles.card, selected && styles.cardSelected]}
      onPress={onSelect}
      accessibilityRole="radio"
      accessibilityState={{ checked: selected }}
      accessibilityLabel={strings.topup.packLabel(pack.coins, pack.price)}
      accessibilityHint={strings.topup.packHint}
    >
      {pack.badge === 'popular' && (
        <View style={[styles.banner, styles.bannerPopular]}>
          <Text style={styles.bannerText}>{strings.topup.popular}</Text>
        </View>
      )}
      {pack.badge === 'bestValue' && (
        <LinearGradient
          colors={gradients.brand}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 0 }}
          style={styles.banner}
        >
          <Text style={styles.bannerText}>{strings.unlock.bestValue}</Text>
        </LinearGradient>
      )}
      {selected && (
        <Ionicons
          name="checkmark-circle-outline"
          size={iconSize.sm}
          color={colors.primary}
          style={styles.check}
        />
      )}
      <Ionicons name="flash-outline" size={iconSize.lg} color={colors.primary} />
      <Text style={styles.coins}>{pack.coins}</Text>
      {pack.bonus > 0 && <Text style={styles.bonus}>{strings.topup.bonus(pack.bonus)}</Text>}
      <View style={styles.priceArea}>
        <View style={[styles.price, selected && styles.priceSelected]}>
          <Text style={[styles.priceText, selected && styles.priceTextSelected]}>{pack.price}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    alignItems: 'center',
    gap: spacing.xs,
    paddingTop: BANNER_HEIGHT + spacing.md,
    paddingBottom: spacing.lg,
    paddingHorizontal: spacing.xl,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    overflow: 'hidden',
  },
  cardSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primarySoft,
  },
  banner: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: BANNER_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerPopular: {
    backgroundColor: colors.primary,
  },
  bannerText: {
    color: colors.text,
    fontFamily: fonts.bodySemiBold,
    fontSize: fontSizes.caption,
    textTransform: 'uppercase',
  },
  coins: {
    color: colors.text,
    fontFamily: fonts.display,
    fontSize: fontSizes.title,
  },
  bonus: {
    color: colors.accent,
    fontFamily: fonts.bodyMedium,
    fontSize: fontSizes.small,
  },
  check: {
    position: 'absolute',
    top: BANNER_HEIGHT + spacing.xs,
    right: spacing.sm,
  },
  priceArea: {
    alignSelf: 'stretch',
    marginTop: 'auto',
    paddingTop: spacing.md,
  },
  price: {
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderRadius: radius.sm,
    backgroundColor: colors.background,
  },
  priceSelected: {
    backgroundColor: colors.primary,
  },
  priceText: {
    color: colors.text,
    fontFamily: fonts.bodyMedium,
    fontSize: fontSizes.body,
  },
  priceTextSelected: {
    color: colors.onPrimary,
  },
});
