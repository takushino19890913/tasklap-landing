import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { locales } from "../../../i18n";
import type { Locale } from "../../../i18n";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import PrivacyContent from "../../../components/PrivacyContent";

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
    title: `${t("privacy.title")} | TaskLap`,
    description: t("metadata.description"),
    metadataBase: new URL(
      process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "http://localhost:3000"
    ),
  };
}

export default function PrivacyPage({ params: { locale } }: PageProps) {
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  return (
    <main className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      <Header />
      <PrivacyContent />
      <Footer />
    </main>
  );
}
