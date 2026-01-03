// Typography System with Responsive Sizing
type TypographySize = {
  mobile: number;
  desktop: number;
};

type TypographyConfig = {
  "font-family": string;
  "font-size": TypographySize;
  "font-weight"?: number;
  "line-height"?: number;
  "letter-spacing"?: string;
  "text-transform"?: string;
};

const typography: Record<string, TypographyConfig> = {
  "home-title": {
    "font-family": "var(--font-serif)",
    "font-size": { mobile: 42, desktop: 173 },
    "font-weight": 400,
    "line-height": 0.9,
    "letter-spacing": "-0.02em",
  },
  h1: {
    "font-family": "var(--font-sans)",
    "font-size": { mobile: 36, desktop: 80 },
    "font-weight": 700,
    "line-height": 1.1,
    "letter-spacing": "-0.02em",
  },
  h2: {
    "font-family": "var(--font-sans)",
    "font-size": { mobile: 28, desktop: 60 },
    "font-weight": 600,
    "line-height": 1.2,
    "letter-spacing": "-0.01em",
  },
  h3: {
    "font-family": "var(--font-sans)",
    "font-size": { mobile: 24, desktop: 48 },
    "font-weight": 600,
    "line-height": 1.3,
  },
  body: {
    "font-family": "var(--font-sans)",
    "font-size": { mobile: 16, desktop: 18 },
    "font-weight": 400,
    "line-height": 1.6,
  },
  "body-large": {
    "font-family": "var(--font-sans)",
    "font-size": { mobile: 18, desktop: 24 },
    "font-weight": 400,
    "line-height": 1.5,
  },
  caption: {
    "font-family": "var(--font-sans)",
    "font-size": { mobile: 14, desktop: 16 },
    "font-weight": 400,
    "line-height": 1.4,
  },
};

export { typography };
export type TypographyVariant = keyof typeof typography;
