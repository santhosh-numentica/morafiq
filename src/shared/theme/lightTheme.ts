import { colors } from './colors';
import { typography } from './typography';
import { spacing } from './spacing';
import { radius } from './radius';
import { shadows } from './shadows';
import { sizes } from './sizes';

export const lightTheme = {
  mode: 'light' as const,
  colors: {
    ...colors,
    background: colors.white,
    surface: colors.neutral[50],
    text: {
      primary: colors.neutral[900],
      secondary: colors.neutral[600],
      disabled: colors.neutral[400],
      inverse: colors.white,
    },
    border: colors.neutral[200],
    divider: colors.neutral[100],
  },
  typography,
  spacing,
  radius,
  shadows,
  sizes,
} as const;

export type LightTheme = typeof lightTheme;
