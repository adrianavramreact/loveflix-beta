import MaskedViewBase from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import type { ComponentType, ReactElement } from 'react';
import { type StyleProp, StyleSheet, Text, type TextStyle, type ViewProps } from 'react-native';

import { gradients } from '@/shared/theme/tokens';

const MaskedView = MaskedViewBase as unknown as ComponentType<
  ViewProps & { maskElement: ReactElement }
>;

type Props = {
  children: string;
  style: StyleProp<TextStyle>;
};

export function GradientText({ children, style }: Props) {
  return (
    <MaskedView maskElement={<Text style={style}>{children}</Text>}>
      <LinearGradient colors={gradients.brand} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
        <Text style={[style, styles.hidden]}>{children}</Text>
      </LinearGradient>
    </MaskedView>
  );
}

const styles = StyleSheet.create({
  hidden: {
    opacity: 0,
  },
});
