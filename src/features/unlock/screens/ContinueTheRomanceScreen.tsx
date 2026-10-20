import { Ionicons } from '@expo/vector-icons';
import {
  Image,
  type ImageSourcePropType,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { UnlockOptionRow } from '@/features/unlock/components/UnlockOptionRow';
import type { UnlockOption } from '@/features/unlock/domain/rules';
import { strings } from '@/shared/constants/strings';
import {
  colors,
  fonts,
  fontSizes,
  iconSize,
  minTouchTarget,
  radius,
  spacing,
} from '@/shared/theme/tokens';

const THUMBNAIL_WIDTH = 112;
const THUMBNAIL_HEIGHT = 144;
const LOCK_CIRCLE_SIZE = 40;
const BUTTON_HEIGHT = 52;

type Props = {
  episodeIndex: number;
  thumbnail: ImageSourcePropType;
  showSeason: boolean;
  seasonFrom: number;
  seasonTo: number;
  episodePrice: number;
  seasonPrice: number;
  selected: UnlockOption;
  onSelect: (option: UnlockOption) => void;
  onUnlock: () => void;
  onMaybeLater: () => void;
};

export function ContinueTheRomanceScreen({
  episodeIndex,
  thumbnail,
  showSeason,
  seasonFrom,
  seasonTo,
  episodePrice,
  seasonPrice,
  selected,
  onSelect,
  onUnlock,
  onMaybeLater,
}: Props) {
  return (
    <View style={styles.screen}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          <View style={styles.card}>
            <View style={styles.thumbnail}>
              <Image source={thumbnail} style={styles.thumbnailImage} resizeMode="cover" />
              <View style={styles.thumbnailShade}>
                <View style={styles.lockCircle}>
                  <Ionicons name="lock-closed-outline" size={iconSize.sm} color={colors.text} />
                </View>
                <Text style={styles.lockedText}>{strings.unlock.locked}</Text>
              </View>
            </View>

            <Text style={styles.episodeLabel}>{strings.unlock.episodeLabel(episodeIndex)}</Text>
            <Text style={styles.title} accessibilityRole="header">
              {strings.unlock.title}
            </Text>
            <Text style={styles.subtitle}>{strings.unlock.subtitle}</Text>

            <View style={styles.options}>
              <UnlockOptionRow
                title={strings.unlock.episodeOption}
                detail={strings.unlock.episodeOptionDetail}
                price={episodePrice}
                selected={selected === 'episode'}
                onSelect={() => onSelect('episode')}
              />
              {showSeason && (
                <UnlockOptionRow
                  title={strings.unlock.seasonOption}
                  detail={strings.unlock.seasonOptionDetail(seasonFrom, seasonTo)}
                  price={seasonPrice}
                  selected={selected === 'season'}
                  bestValue
                  onSelect={() => onSelect('season')}
                />
              )}
            </View>

            <Pressable
              style={styles.unlockButton}
              onPress={onUnlock}
              accessibilityRole="button"
              accessibilityLabel={strings.unlock.unlockNow}
            >
              <Ionicons name="lock-closed-outline" size={iconSize.sm} color={colors.onPrimary} />
              <Text style={styles.unlockText}>{strings.unlock.unlockNow}</Text>
            </Pressable>

            <Pressable
              style={styles.laterButton}
              onPress={onMaybeLater}
              accessibilityRole="button"
              accessibilityLabel={strings.unlock.maybeLater}
            >
              <Text style={styles.laterText}>{strings.unlock.maybeLater}</Text>
            </Pressable>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.backdrop,
  },
  safeArea: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: spacing.lg,
  },
  card: {
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.xl,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceRaised,
  },
  thumbnail: {
    width: THUMBNAIL_WIDTH,
    height: THUMBNAIL_HEIGHT,
    borderRadius: radius.sm,
    overflow: 'hidden',
    marginBottom: spacing.sm,
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
  },
  thumbnailShade: {
    ...StyleSheet.absoluteFill,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    backgroundColor: colors.overlay,
  },
  lockCircle: {
    width: LOCK_CIRCLE_SIZE,
    height: LOCK_CIRCLE_SIZE,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  lockedText: {
    color: colors.text,
    fontFamily: fonts.bodySemiBold,
    fontSize: fontSizes.caption,
    textTransform: 'uppercase',
  },
  episodeLabel: {
    color: colors.primary,
    fontFamily: fonts.display,
    fontSize: fontSizes.small,
    textTransform: 'uppercase',
  },
  title: {
    color: colors.text,
    fontFamily: fonts.display,
    fontSize: fontSizes.headline,
    textAlign: 'center',
  },
  subtitle: {
    color: colors.textMuted,
    fontFamily: fonts.body,
    fontSize: fontSizes.body,
    textAlign: 'center',
  },
  options: {
    alignSelf: 'stretch',
    gap: spacing.lg,
    marginVertical: spacing.lg,
  },
  unlockButton: {
    alignSelf: 'stretch',
    height: BUTTON_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    borderRadius: radius.sm,
    backgroundColor: colors.primary,
  },
  unlockText: {
    color: colors.onPrimary,
    fontFamily: fonts.bodySemiBold,
    fontSize: fontSizes.body,
  },
  laterButton: {
    minHeight: minTouchTarget,
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  laterText: {
    color: colors.textMuted,
    fontFamily: fonts.body,
    fontSize: fontSizes.body,
  },
});
