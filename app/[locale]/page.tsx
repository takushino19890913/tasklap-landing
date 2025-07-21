import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { locales } from "../../i18n";
import type { Locale } from "../../i18n";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import HeroSection from "../../components/HeroSection";
import FocusModeSection from "../../components/FocusModeSection";
import ChecklistSection from "../../components/ChecklistSection";
import FeaturesSection from "../../components/FeaturesSection";
import UseCasesSection from "../../components/UseCasesSection";
import DownloadSection from "../../components/DownloadSection";
import ContactSection from "../../components/ContactSection";

interface PageProps {
  params: { locale: string };
}

export async function generateMetadata({ params: { locale } }: PageProps) {
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const t = await getTranslations({ locale });

  return {
    title: t("meta.title"),
    description: t("meta.description"),
    keywords: t("meta.keywords"),
    openGraph: {
      title: t("meta.title"),
      description: t("meta.description"),
      type: "website",
      locale: locale,
    },
    twitter: {
      card: "summary_large_image",
      title: t("meta.title"),
      description: t("meta.description"),
    },
  };
}

export default function HomePage({ params: { locale } }: PageProps) {
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <FocusModeSection />
      <ChecklistSection />
      <FeaturesSection />
      <UseCasesSection />
      <DownloadSection />
      <ContactSection />

      <Footer />
    </main>
  );
}
