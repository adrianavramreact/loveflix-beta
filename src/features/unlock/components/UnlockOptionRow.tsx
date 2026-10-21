import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { strings } from '@/shared/constants/strings';
import { colors, fonts, fontSizes, iconSize, radius, spacing } from '@/shared/theme/tokens';

type Props = {
  title: string;
  detail: string;
  price: number;
  selected: boolean;
  bestValue?: boolean;
  onSelect: () => void;
};

export function UnlockOptionRow({ title, detail, price, selected, bestValue, onSelect }: Props) {
  return (
    <Pressable
      style={[styles.row, selected && styles.rowSelected]}
      onPress={onSelect}
      accessibilityRole="radio"
      accessibilityState={{ checked: selected }}
      accessibilityLabel={`${title}, ${strings.unlock.coins(price)}`}
      accessibilityHint={strings.unlock.optionHint}
    >
      {bestValue && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{strings.unlock.bestValue}</Text>
        </View>
      )}
      <Ionicons
        name={selected ? 'checkmark-circle-outline' : 'ellipse-outline'}
        size={iconSize.md}
        color={selected ? colors.primary : colors.textMuted}
      />
      <View style={styles.texts}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.detail}>{detail}</Text>
      </View>
      <Text style={[styles.price, selected && styles.priceSelected]}>
        {strings.unlock.coins(price)}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.lg,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  rowSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.optionSelected,
  },
  badge: {
    position: 'absolute',
    top: -spacing.md,
    right: spacing.lg,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radius.pill,
    backgroundColor: colors.primary,
  },
  badgeText: {
    color: colors.onPrimary,
    fontFamily: fonts.bodySemiBold,
    fontSize: fontSizes.caption,
    textTransform: 'uppercase',
  },
  texts: {
    flex: 1,
    gap: spacing.xxs,
  },
  title: {
    color: colors.text,
    fontFamily: fonts.bodySemiBold,
    fontSize: fontSizes.body,
  },
  detail: {
    color: colors.textMuted,
    fontFamily: fonts.body,
    fontSize: fontSizes.small,
  },
  price: {
    color: colors.text,
    fontFamily: fonts.bodySemiBold,
    fontSize: fontSizes.body,
  },
  priceSelected: {
    color: colors.primary,
  },
});
