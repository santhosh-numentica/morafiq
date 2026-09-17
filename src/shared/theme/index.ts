import { lightTheme } from './lightTheme';
import { darkTheme } from './darkTheme';

export type Theme = typeof lightTheme | typeof darkTheme;

export const theme = {
  light: lightTheme,
  dark: darkTheme,
};

export default theme;
