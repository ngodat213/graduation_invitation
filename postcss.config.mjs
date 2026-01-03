const config = {
  plugins: {
    "@tailwindcss/postcss": {},
    "postcss-preset-env": {
      stage: 3,
      features: {
        "nesting-rules": true,
        "custom-media-queries": true,
        "custom-properties": true,
      },
    },
  },
};

export default config;
