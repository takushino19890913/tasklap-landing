import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { locales } from "../../i18n";
import type { Locale } from "../../i18n";
import SiteHeader from "../../components/v2/SiteHeader";
import HeroV2 from "../../components/v2/HeroV2";
import StatementBand from "../../components/v2/StatementBand";
import FeatureChapters from "../../components/v2/FeatureChapters";
import BentoGrid from "../../components/v2/BentoGrid";
import DownloadV2 from "../../components/v2/DownloadV2";
import FooterV2 from "../../components/v2/FooterV2";

interface PageProps {
  params: { locale: string };
}

export async function generateMetadata({ params: { locale } }: PageProps) {
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  const t = await getTranslations({ locale });

  return {
    title: t("metadata.title"),
    description: t("metadata.description"),
    keywords: t("metadata.keywords"),
    metadataBase: new URL(
      process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "http://localhost:3000"
    ),
    openGraph: {
      title: t("metadata.title"),
      description: t("metadata.description"),
      type: "website",
      locale: locale,
    },
    twitter: {
      card: "summary_large_image",
      title: t("metadata.title"),
      description: t("metadata.description"),
    },
  };
}

export default function HomePage({ params: { locale } }: PageProps) {
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  return (
    <main className="v2-page min-h-screen">
      <SiteHeader /><HeroV2 /><StatementBand /><FeatureChapters /><BentoGrid /><DownloadV2 /><FooterV2 />
    </main>
  );
}
