import { notFound } from "next/navigation";
import { getRequestConfig, getLocale } from "next-intl/server";

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

export default getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale;

  // Ensure that a valid locale is used
  if (!locale || !locales.includes(locale as any)) {
    locale = "ja"; // fallback to Japanese
  }

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
