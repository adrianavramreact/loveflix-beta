// Design tokens taken from the TargetVideo design file.
// Colors and radii are the values used in the SVG; fonts were matched visually,
// because the export has its text converted to outlines.

export const colors = {
  background: '#000000',
  feedBackground: '#061532',
  surface: '#18172B',
  border: '#322F56',

  primary: '#64EDF7',
  onPrimary: '#04252A',
  accent: '#CB64F7',
  accentSoft: 'rgba(203, 100, 247, 0.2)',
  coin: '#FACC15',

  text: '#FFFFFF',
  textMuted: '#C0BEDA',

  overlay: 'rgba(0, 0, 0, 0.55)',
} as const;

export const gradients = {
  brand: ['#64EDF7', '#CB64F7'],
} as const;

export const spacing = {
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
} as const;

export const radius = {
  sm: 10,
  xl: 24,
  pill: 999,
} as const;

export const fonts = {
  display: 'PlayfairDisplay_700Bold',
  body: 'Inter_400Regular',
  bodyMedium: 'Inter_500Medium',
  bodySemiBold: 'Inter_600SemiBold',
} as const;

export const fontSizes = {
  caption: 12,
  small: 14,
  body: 16,
  title: 20,
  subhead: 24,
  headline: 28,
  hero: 34,
} as const;

export const iconSize = {
  xs: 12,
  sm: 18,
  md: 22,
} as const;

// Smallest touch target for anything pressable (Apple HIG: 44×44 pt).
export const minTouchTarget = 44;
