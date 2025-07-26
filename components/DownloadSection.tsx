"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import {
  Smartphone,
  Star,
  Shield,
  Zap,
  Globe,
  QrCode,
  CheckCircle,
  Clock,
  Users,
  Award,
  Target,
  List,
  ExternalLink,
} from "lucide-react";

export default function DownloadSection() {
  const t = useTranslations();
  const params = useParams();
  const locale = params.locale as string;

  // App Store URL with locale support
  const getAppStoreUrl = () => {
    const localeMap: { [key: string]: string } = {
      ja: "jp",
      en: "us",
      zh: "cn",
      ko: "kr",
      de: "de",
      fr: "fr",
      es: "es",
      pt: "br",
    };
    const country = localeMap[locale] || "us";
    return `https://apps.apple.com/${country}/app/tasklap/id6748891669`;
  };

  // QR Code image path based on locale
  const getQrCodePath = () => {
    const localeMap: { [key: string]: string } = {
      ja: "ja",
      en: "en",
      zh: "zh",
      ko: "ko",
      de: "de",
      fr: "fr",
      es: "es",
      pt: "pt",
    };
    const qrLocale = localeMap[locale] || "en";
    return `/qr-codes/app-store-${qrLocale}.png`;
  };

  return (
    <section
      id="download"
      className="py-8 sm:py-12 md:py-20 bg-gradient-to-b from-primary-50 to-white dark:from-neutral-800 dark:to-neutral-900"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Header */}
        <div className="mb-6 sm:mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-800 dark:text-white mb-2 sm:mb-3 md:mb-4">
            {t("download.title")}
          </h2>
          <p className="text-sm sm:text-base md:text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto hidden sm:block">
            {t("download.subtitle")}
          </p>
        </div>

        {/* Store Badges */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 justify-center items-center mb-6 sm:mb-8 md:mb-12">
          <a
            href={getAppStoreUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="block transition-transform hover:scale-105"
            aria-label="App Store からダウンロード"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
              alt="App Store からダウンロード"
              className="h-10 sm:h-12 md:h-14 w-auto"
            />
          </a>
          <a
            href="#"
            className="block transition-transform hover:scale-105 opacity-50 cursor-not-allowed"
            aria-label="Google Play（準備中）"
          >
            <img
              src="https://raw.githubusercontent.com/pioug/google-play-badges/main/svg/English.svg"
              alt="Get it on Google Play"
              className="h-10 sm:h-12 md:h-14 w-auto"
            />
          </a>
        </div>

        {/* QR Code Section */}
        <div className="mb-6 sm:mb-8 md:mb-12">
          <div className="inline-flex flex-col items-center space-y-4 p-6 bg-white dark:bg-neutral-800 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700">
            <div className="flex items-center space-x-2 text-neutral-600 dark:text-neutral-400">
              <QrCode className="w-5 h-5" />
              <span className="text-sm font-medium">
                {t("download.qrCode")}
              </span>
            </div>
            <div className="w-32 h-32 bg-white p-2 rounded-lg border border-neutral-300 dark:border-neutral-600 flex items-center justify-center">
              <Image
                src={getQrCodePath()}
                alt="App Store QR Code"
                width={128}
                height={128}
                className="w-full h-full object-contain"
                priority
                onError={(e) => {
                  console.error(
                    "QR code image failed to load:",
                    getQrCodePath()
                  );
                  // フォールバックとしてテキストを表示
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                  const parent = target.parentElement;
                  if (parent) {
                    parent.innerHTML =
                      '<span class="text-xs text-neutral-500 dark:text-neutral-400 text-center">QR Code<br />Loading...</span>';
                  }
                }}
              />
            </div>
            <a
              href={getAppStoreUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors text-sm"
            >
              <span>App Store で開く</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* App Info */}
        <div className="mb-6 sm:mb-8 md:mb-12">
          <div className="inline-flex items-center space-x-4 text-sm text-neutral-600 dark:text-neutral-400">
            <span>{t("download.version")}: 1.0.1</span>
            <span>•</span>
            <span>{t("download.lastUpdate")}: 2025年7月</span>
            <span>•</span>
            <span>サイズ: 31.7 MB</span>
          </div>
        </div>

        {/* Why Choose TaskLap - Simplified on mobile */}
        <div className="hidden sm:block">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-neutral-800 dark:text-white mb-4 sm:mb-6 md:mb-8">
            {t("download.whyChoose")}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            <div className="text-center p-3 sm:p-4 md:p-6">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Target className="w-6 h-6 sm:w-8 sm:h-8 text-orange-600 dark:text-orange-400" />
              </div>
              <h4 className="font-semibold text-neutral-800 dark:text-white text-sm sm:text-base mb-1 sm:mb-2">
                {t("features.focusMode.title")}
              </h4>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
                {t("features.focusMode.shortDescription")}
              </p>
            </div>

            <div className="text-center p-3 sm:p-4 md:p-6">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <List className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h4 className="font-semibold text-neutral-800 dark:text-white text-sm sm:text-base mb-1 sm:mb-2">
                {t("features.checklist.title")}
              </h4>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
                {t("features.checklist.shortDescription")}
              </p>
            </div>

            <div className="text-center p-3 sm:p-4 md:p-6">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Smartphone className="w-6 h-6 sm:w-8 sm:h-8 text-green-600 dark:text-green-400" />
              </div>
              <h4 className="font-semibold text-neutral-800 dark:text-white text-sm sm:text-base mb-1 sm:mb-2">
                {t("features.simple.title")}
              </h4>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
                {t("features.simple.shortDescription")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
