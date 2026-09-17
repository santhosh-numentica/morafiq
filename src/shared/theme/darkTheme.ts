import { colors } from './colors';
import { typography } from './typography';
import { spacing } from './spacing';
import { radius } from './radius';
import { shadows } from './shadows';
import { sizes } from './sizes';

export const darkTheme = {
  mode: 'dark' as const,
  colors: {
    ...colors,
    background: colors.neutral[900],
    surface: colors.neutral[800],
    text: {
      primary: colors.white,
      secondary: colors.neutral[300],
      disabled: colors.neutral[500],
      inverse: colors.neutral[900],
    },
    border: colors.neutral[700],
    divider: colors.neutral[800],
  },
  typography,
  spacing,
  radius,
  shadows,
  sizes,
} as const;

export type DarkTheme = typeof darkTheme;
