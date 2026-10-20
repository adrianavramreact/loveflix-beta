import { Pressable, StyleSheet, Text, View } from 'react-native';

import { strings } from '@/shared/constants/strings';
import { colors, fonts, fontSizes, minTouchTarget, radius, spacing } from '@/shared/theme/tokens';

type Props = {
  onRetry: () => void;
};

export function ErrorScreen({ onRetry }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title} accessibilityRole="header">
        {strings.error.title}
      </Text>
      <Text style={styles.text}>{strings.error.message}</Text>
      <Pressable
        style={styles.button}
        onPress={onRetry}
        accessibilityRole="button"
        accessibilityLabel={strings.error.retry}
      >
        <Text style={styles.buttonText}>{strings.error.retry}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
    padding: spacing.xl,
    backgroundColor: colors.background,
  },
  title: {
    color: colors.text,
    fontFamily: fonts.display,
    fontSize: fontSizes.subhead,
    textAlign: 'center',
  },
  text: {
    color: colors.textMuted,
    fontFamily: fonts.body,
    fontSize: fontSizes.body,
    textAlign: 'center',
  },
  button: {
    minHeight: minTouchTarget,
    minWidth: minTouchTarget,
    justifyContent: 'center',
    marginTop: spacing.sm,
    paddingHorizontal: spacing.xl,
    borderRadius: radius.pill,
    backgroundColor: colors.primary,
  },
  buttonText: {
    color: colors.onPrimary,
    fontFamily: fonts.bodySemiBold,
    fontSize: fontSizes.body,
  },
});
