import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useVideoPlayer, VideoView } from 'expo-video';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, Pressable, Share, StyleSheet, Text, View } from 'react-native';

import { strings } from '@/shared/constants/strings';
import type { Episode } from '@/shared/data/catalog';
import {
  colors,
  disabledOpacity,
  fonts,
  fontSizes,
  iconSize,
  minTouchTarget,
  radius,
  spacing,
} from '@/shared/theme/tokens';

const BOTTOM_SHADE_HEIGHT = '45%';
const LOADER_TOP = '45%';
const LOCK_BOX_TOP = '38%';
const ACTIONS_BOTTOM = 140;
const INFO_RIGHT_INSET = 80;

type Props = {
  index: number;
  episode: Episode;
  seriesTitle: string;
  locked: boolean;
  liked: boolean;
  active: boolean;
  nearActive: boolean;
  height: number;
  onUnlock: (episodeId: string) => void;
  onToggleLike: (episodeId: string) => void;
  onEnded: (index: number) => void;
};

type VideoStatus = 'loading' | 'readyToPlay' | 'error' | 'idle';

function formatDuration(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const rest = String(seconds % 60).padStart(2, '0');
  return `${minutes}:${rest}`;
}

function formatCount(count: number) {
  return count >= 1000 ? `${Math.round(count / 1000)}K` : String(count);
}

export function EpisodeCard({
  index,
  episode,
  seriesTitle,
  locked,
  liked,
  active,
  nearActive,
  height,
  onUnlock,
  onToggleLike,
  onEnded,
}: Props) {
  const player = useVideoPlayer(locked || !nearActive ? null : episode.video);
  const [status, setStatus] = useState<VideoStatus>('loading');
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const statusSub = player.addListener('statusChange', (event) => setStatus(event.status));
    const playingSub = player.addListener('playingChange', (event) => setPlaying(event.isPlaying));
    // Only the card on screen may move the feed on. On Android, players of hidden or
    // locked cards can report an end too, which would scroll the feed to the last card.
    const endSub = player.addListener('playToEnd', () => {
      player.pause();
      player.currentTime = 0;
      if (active && !locked) onEnded(index);
    });
    return () => {
      statusSub.remove();
      playingSub.remove();
      endSub.remove();
    };
  }, [player, onEnded, index, active, locked]);

  // Only the card on screen plays; the others stay paused.
  useEffect(() => {
    if (active && !locked) player.play();
    else player.pause();
  }, [active, locked, player]);

  const togglePlay = () => {
    if (playing) player.pause();
    else player.play();
  };

  const share = () => {
    Share.share({ message: strings.feed.shareMessage(seriesTitle, episode.index) }).catch(
      () => undefined,
    );
  };

  return (
    <View style={[styles.card, { height }]}>
      <Image source={episode.thumbnail} style={styles.fill} resizeMode="cover" />
      {!locked && (
        <VideoView player={player} style={styles.fill} contentFit="cover" nativeControls={false} />
      )}

      <LinearGradient
        colors={['transparent', colors.background]}
        style={styles.bottomShade}
        pointerEvents="none"
      />

      {locked && <View style={styles.lockedShade} />}

      {!locked && active && status === 'loading' && (
        <ActivityIndicator style={styles.center} color={colors.text} size="large" />
      )}
      {!locked && status === 'error' && (
        <Text style={[styles.center, styles.errorText]}>{strings.feed.videoUnavailable}</Text>
      )}

      {locked && (
        <Pressable
          style={styles.lockBox}
          onPress={() => onUnlock(episode.id)}
          accessibilityRole="button"
          accessibilityLabel={strings.feed.unlockEpisode(episode.index)}
        >
          <View style={styles.lockIcon}>
            <View style={[styles.coin, styles.coinBack]}>
              <Text style={styles.coinMark}>{strings.feed.coinMark}</Text>
            </View>
            <View style={[styles.coin, styles.coinFront]}>
              <Text style={styles.coinMark}>{strings.feed.coinMark}</Text>
            </View>
            <Ionicons name="lock-closed-outline" size={iconSize.xl} color={colors.text} />
          </View>
          <Text style={styles.lockText}>{strings.feed.unlockEpisode(episode.index)}</Text>
        </Pressable>
      )}

      <View style={styles.actions}>
        <Pressable
          style={styles.action}
          onPress={() => onToggleLike(episode.id)}
          accessibilityRole="button"
          accessibilityLabel={liked ? strings.feed.unlike : strings.feed.like}
        >
          <View style={styles.actionIcon}>
            <Ionicons
              name={liked ? 'heart' : 'heart-outline'}
              size={iconSize.md}
              color={liked ? colors.accent : colors.text}
            />
          </View>
          <Text style={styles.actionLabel}>{formatCount(episode.likeCount)}</Text>
        </Pressable>
        <View style={styles.action}>
          <View style={styles.actionIcon}>
            <Ionicons name="chatbubble-outline" size={iconSize.md} color={colors.text} />
          </View>
          <Text style={styles.actionLabel}>{formatCount(episode.commentCount)}</Text>
        </View>
        <Pressable
          style={styles.action}
          onPress={share}
          accessibilityRole="button"
          accessibilityLabel={strings.feed.shareEpisode}
        >
          <View style={styles.actionIcon}>
            <Ionicons name="share-social-outline" size={iconSize.md} color={colors.text} />
          </View>
          <Text style={styles.actionLabel}>{strings.feed.share}</Text>
        </Pressable>
      </View>

      <View style={styles.info}>
        <Text style={styles.title} accessibilityRole="header">
          {seriesTitle}
        </Text>
        <View style={styles.metaRow}>
          <Text style={styles.episodeTag}>{strings.feed.episodeTag(episode.index)}</Text>
          <Text style={styles.meta}>
            {strings.feed.duration(formatDuration(episode.durationSec))}
          </Text>
        </View>
        <Pressable
          style={[styles.watchButton, locked && styles.watchButtonLocked]}
          onPress={locked ? () => onUnlock(episode.id) : togglePlay}
          accessibilityRole="button"
          accessibilityLabel={
            locked
              ? strings.feed.unlockEpisode(episode.index)
              : playing
                ? strings.feed.pause
                : strings.feed.watch
          }
        >
          <Ionicons
            name={playing ? 'pause' : 'play-outline'}
            size={iconSize.sm}
            color={colors.background}
          />
          <Text style={styles.watchText}>{playing ? strings.feed.pause : strings.feed.watch}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    overflow: 'hidden',
    backgroundColor: colors.feedBackground,
  },
  fill: {
    ...StyleSheet.absoluteFill,
    width: '100%',
    height: '100%',
  },
  bottomShade: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: BOTTOM_SHADE_HEIGHT,
  },
  lockedShade: {
    ...StyleSheet.absoluteFill,
    backgroundColor: colors.overlay,
  },
  center: {
    position: 'absolute',
    top: LOADER_TOP,
    alignSelf: 'center',
  },
  errorText: {
    color: colors.textMuted,
    fontFamily: fonts.bodyMedium,
    fontSize: fontSizes.body,
  },
  lockBox: {
    position: 'absolute',
    top: LOCK_BOX_TOP,
    alignSelf: 'center',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.xxl,
    borderRadius: radius.xl,
    backgroundColor: colors.lockPanel,
  },
  lockIcon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  coin: {
    position: 'absolute',
    width: spacing.lg,
    height: spacing.lg,
    borderRadius: radius.pill,
    borderWidth: spacing.xxs,
    borderColor: colors.coin,
    backgroundColor: colors.lockPanel,
    alignItems: 'center',
    justifyContent: 'center',
  },
  coinBack: {
    right: 0,
    bottom: spacing.xxs,
  },
  coinFront: {
    right: -spacing.sm,
    bottom: -spacing.xs,
  },
  coinMark: {
    color: colors.coin,
    fontFamily: fonts.bodySemiBold,
    fontSize: fontSizes.tiny,
  },
  lockText: {
    color: colors.text,
    fontFamily: fonts.bodySemiBold,
    fontSize: fontSizes.body,
  },
  actions: {
    position: 'absolute',
    right: spacing.md,
    bottom: ACTIONS_BOTTOM,
    gap: spacing.lg,
    alignItems: 'center',
  },
  action: {
    alignItems: 'center',
    gap: spacing.xs,
  },
  actionIcon: {
    width: minTouchTarget,
    height: minTouchTarget,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.overlay,
  },
  actionLabel: {
    color: colors.text,
    fontFamily: fonts.bodyMedium,
    fontSize: fontSizes.caption,
  },
  info: {
    position: 'absolute',
    left: spacing.lg,
    right: INFO_RIGHT_INSET,
    bottom: ACTIONS_BOTTOM,
    gap: spacing.sm,
  },
  title: {
    color: colors.text,
    fontFamily: fonts.display,
    fontSize: fontSizes.title,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  episodeTag: {
    color: colors.textMuted,
    fontFamily: fonts.bodyMedium,
    fontSize: fontSizes.small,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xxs,
    borderRadius: radius.sm,
    backgroundColor: colors.surface,
  },
  meta: {
    color: colors.textMuted,
    fontFamily: fonts.body,
    fontSize: fontSizes.small,
  },
  watchButton: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    height: minTouchTarget,
    paddingHorizontal: spacing.xl,
    borderRadius: radius.pill,
    backgroundColor: colors.text,
  },
  watchButtonLocked: {
    opacity: disabledOpacity,
  },
  watchText: {
    color: colors.background,
    fontFamily: fonts.bodySemiBold,
    fontSize: fontSizes.body,
  },
});
