import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
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

import { CoinPackCard } from '@/features/unlock/components/CoinPackCard';
import type { CoinPack } from '@/features/unlock/domain/pricing';
import type { UnlockOption } from '@/features/unlock/domain/rules';
import { GradientText } from '@/shared/components/GradientText';
import { strings } from '@/shared/constants/strings';
import {
  colors,
  fonts,
  fontSizes,
  glows,
  gradients,
  iconSize,
  minTouchTarget,
  radius,
  spacing,
} from '@/shared/theme/tokens';

const THUMBNAIL_WIDTH = 72;
const THUMBNAIL_HEIGHT = 96;
const PACK_COLUMNS = 2;
const BUY_BORDER_WIDTH = 1;

type Props = {
  seriesTitle: string;
  option: UnlockOption;
  episodeFrom: number;
  episodeTo: number;
  thumbnail: ImageSourcePropType;
  unlockPrice: number;
  balance: number;
  packs: CoinPack[];
  selectedPack: CoinPack;
  onSelectPack: (packId: string) => void;
  onBuy: () => void;
  onBack: () => void;
};

export function TopupScreen({
  seriesTitle,
  option,
  episodeFrom,
  episodeTo,
  thumbnail,
  unlockPrice,
  balance,
  packs,
  selectedPack,
  onSelectPack,
  onBuy,
  onBack,
}: Props) {
  const header = (
    <View style={styles.header}>
      <View style={styles.titleRow}>
        <Pressable
          style={styles.backButton}
          onPress={onBack}
          accessibilityRole="button"
          accessibilityLabel={strings.topup.back}
        >
          <Ionicons name="chevron-back" size={iconSize.md} color={colors.text} />
        </Pressable>
        <Text style={styles.title} accessibilityRole="header">
          {option === 'season' ? strings.topup.seasonTitle : strings.topup.title}
        </Text>
      </View>

      <View style={styles.episodeCard}>
        <Image source={thumbnail} style={styles.thumbnail} resizeMode="cover" />
        <View style={styles.episodeInfo}>
          <Text style={styles.seriesTitle}>{seriesTitle}</Text>
          <Text style={styles.muted}>{strings.topup.episodeStatus(episodeFrom, episodeTo)}</Text>
          <View style={styles.unlockPill}>
            <Ionicons name="lock-closed-outline" size={iconSize.xs} color={colors.primary} />
            <Text style={styles.unlockPillText}>{strings.topup.unlockFor(unlockPrice)}</Text>
          </View>
        </View>
      </View>

      <View style={styles.balanceCard}>
        <Text style={styles.muted}>{strings.topup.yourBalance}</Text>
        <View style={styles.balanceValue}>
          <Ionicons name="flash-outline" size={iconSize.sm} color={colors.primary} />
          <Text style={styles.balanceText}>{strings.unlock.coins(balance)}</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>{strings.topup.rechargeCoins}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.screen}>
      <FlatList
        data={packs}
        keyExtractor={(pack) => pack.id}
        numColumns={PACK_COLUMNS}
        ListHeaderComponent={header}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.packCell}>
            <CoinPackCard
              pack={item}
              selected={item.id === selectedPack.id}
              onSelect={() => onSelectPack(item.id)}
            />
          </View>
        )}
      />

      <View style={styles.footer}>
        <View style={styles.secureRow}>
          <Ionicons name="shield-checkmark-outline" size={iconSize.xs} color={colors.textMuted} />
          <Text style={styles.footnote}>{strings.topup.secure}</Text>
        </View>
        <Pressable
          style={styles.buyPressable}
          onPress={onBuy}
          accessibilityRole="button"
          accessibilityLabel={strings.topup.buyCoins(selectedPack.coins)}
        >
          <LinearGradient
            colors={gradients.brand}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.buyBorder}
          >
            <View style={styles.buyButton}>
              <GradientText style={styles.buyText}>
                {strings.topup.buyCoins(selectedPack.coins)}
              </GradientText>
              <Text style={styles.buyPrice}>{strings.topup.forPrice(selectedPack.price)}</Text>
            </View>
          </LinearGradient>
        </Pressable>
        <Text style={styles.disclaimer}>{strings.topup.simulated}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  list: {
    paddingHorizontal: spacing.sm,
    paddingBottom: spacing.lg,
  },
  header: {
    gap: spacing.lg,
    paddingHorizontal: spacing.sm,
    paddingBottom: spacing.sm,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  backButton: {
    width: minTouchTarget,
    height: minTouchTarget,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: colors.text,
    fontFamily: fonts.display,
    fontSize: fontSizes.subhead,
  },
  episodeCard: {
    flexDirection: 'row',
    gap: spacing.lg,
    padding: spacing.lg,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  thumbnail: {
    width: THUMBNAIL_WIDTH,
    height: THUMBNAIL_HEIGHT,
    borderRadius: radius.sm,
  },
  episodeInfo: {
    flex: 1,
    justifyContent: 'center',
    gap: spacing.xs,
  },
  seriesTitle: {
    color: colors.text,
    fontFamily: fonts.display,
    fontSize: fontSizes.title,
  },
  muted: {
    color: colors.textMuted,
    fontFamily: fonts.body,
    fontSize: fontSizes.body,
  },
  unlockPill: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginTop: spacing.xs,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.sm,
    backgroundColor: colors.primarySoft,
  },
  unlockPillText: {
    color: colors.primary,
    fontFamily: fonts.bodyMedium,
    fontSize: fontSizes.small,
  },
  balanceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.lg,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  balanceValue: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  balanceText: {
    color: colors.text,
    fontFamily: fonts.bodySemiBold,
    fontSize: fontSizes.title,
  },
  sectionTitle: {
    color: colors.text,
    fontFamily: fonts.display,
    fontSize: fontSizes.title,
    marginTop: spacing.sm,
  },
  packCell: {
    width: '50%',
    padding: spacing.sm,
  },
  footer: {
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.surface,
  },
  secureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  buyPressable: {
    alignSelf: 'stretch',
    borderRadius: radius.lg,
    boxShadow: glows.brand,
  },
  buyBorder: {
    padding: BUY_BORDER_WIDTH,
    borderRadius: radius.lg,
    overflow: 'hidden',
  },
  buyButton: {
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderRadius: radius.lg - BUY_BORDER_WIDTH,
    backgroundColor: colors.surface,
  },
  buyText: {
    color: colors.primary,
    fontFamily: fonts.bodySemiBold,
    fontSize: fontSizes.title,
  },
  buyPrice: {
    color: colors.textMuted,
    fontFamily: fonts.body,
    fontSize: fontSizes.small,
  },
  footnote: {
    color: colors.textMuted,
    fontFamily: fonts.body,
    fontSize: fontSizes.caption,
    textAlign: 'center',
  },
  disclaimer: {
    color: colors.textSubtle,
    fontFamily: fonts.body,
    fontSize: fontSizes.caption,
    textAlign: 'center',
  },
});
