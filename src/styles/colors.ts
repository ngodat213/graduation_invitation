// OKLCH Color Space - More perceptually uniform than RGB/HSL
const colors = {
  black: "oklch(0.23 0.0038 106.69)",
  white: "oklch(1 0 360)",
  paper: "oklch(0.9365 0.0161 67.6)", // #EFEDE3 - Retro paper background
  gray: "oklch(0.5 0.01 200)",
  accent: "oklch(0.65 0.15 30)", // Warm accent color
} as const;

const themes = {
  light: {
    primary: colors.paper,
    secondary: colors.black,
    contrast: colors.gray,
    accent: colors.accent,
  },
  dark: {
    primary: colors.black,
    secondary: colors.white,
    contrast: colors.gray,
    accent: colors.accent,
  },
} as const;

export { colors, themes };
export type Theme = keyof typeof themes;
export type ThemeColors = (typeof themes)[Theme];
