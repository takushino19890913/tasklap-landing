// Can be imported from a shared config
export const locales = [
  "ja",
  "en",
  "fr",
  "ko",
  "zh",
  "es",
  "pt",
  "de",
] as const;
export type Locale = (typeof locales)[number];
