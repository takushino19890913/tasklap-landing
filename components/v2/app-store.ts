import type {Locale} from "../../i18n";

export const appStoreCountries: Record<Locale, string> = {ja:"jp", en:"us", fr:"fr", ko:"kr", zh:"cn", es:"es", pt:"br", de:"de"};
export const appStoreUrl = (locale: Locale) => `https://apps.apple.com/${appStoreCountries[locale]}/app/tasklap/id6748891669`;

