export const sizes = {
  icon: {
    xs: 16,
    sm: 20,
    md: 24,
    lg: 32,
    xl: 40,
    '2xl': 48,
  },
  button: {
    height: {
      sm: 36,
      md: 44,
      lg: 52,
    },
  },
  input: {
    height: {
      sm: 40,
      md: 48,
      lg: 56,
    },
  },
  avatar: {
    xs: 24,
    sm: 32,
    md: 40,
    lg: 48,
    xl: 64,
    '2xl': 96,
  },
} as const;

export type Sizes = typeof sizes;
