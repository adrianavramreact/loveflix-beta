import { StyleSheet, Text, View } from 'react-native';

import { colors, fonts, fontSizes, spacing } from '@/shared/theme/tokens';
import { strings } from '@/shared/constants/strings';

type Props = {
  title: string;
};

export function ComingSoon({ title }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.text}>{strings.common.notInPrototype}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    backgroundColor: colors.background,
  },
  title: {
    color: colors.text,
    fontFamily: fonts.display,
    fontSize: fontSizes.headline,
  },
  text: {
    color: colors.textMuted,
    fontFamily: fonts.body,
    fontSize: fontSizes.body,
  },
});
