"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import Image from "next/image";
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
} from "lucide-react";

export default function DownloadSection() {
  const t = useTranslations();
  const [showQR, setShowQR] = useState("ios"); // 'ios' or 'android'

  const features = [
    {
      icon: Zap,
      title: t("download.features.instant.title"),
      description: t("download.features.instant.description"),
      color:
        "text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20 dark:text-yellow-400",
    },
    {
      icon: Shield,
      title: t("download.features.free.title"),
      description: t("download.features.free.description"),
      color:
        "text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400",
    },
    {
      icon: Globe,
      title: t("download.features.multilingual.title"),
      description: t("download.features.multilingual.description"),
      color: "text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400",
    },
  ];

  const stats = [
    {
      icon: Users,
      value: t("common.comingSoon"),
      label: t("download.stats.downloads"),
    },
    {
      icon: Star,
      value: t("common.comingSoon"),
      label: t("download.stats.rating"),
    },
    { icon: Clock, value: "50MB", label: t("download.stats.size") },
    { icon: Award, value: "1.0.0", label: t("download.stats.version") },
  ];

  return (
    <section
      id="download"
      className="py-24 section-warm relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-6 py-3 bg-primary-500 text-white rounded-full text-sm font-medium mb-6 shadow-warm dark:shadow-navy animate-pulse-warm">
            <div className="relative w-5 h-5 mr-2 rounded-md overflow-hidden bg-white/20">
              <Image
                src="/app_icon_transparent.png"
                alt="TaskLap Icon"
                width={20}
                height={20}
                className="w-full h-full object-contain rounded-md"
              />
            </div>
            <span>{t("common.downloadNow")}</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-primary-contrast mb-6">
            {t("download.title")}
          </h2>
          <p className="text-xl text-secondary-contrast max-w-3xl mx-auto">
            {t("download.subtitle")}
          </p>
        </div>

        {/* Main Download Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left: App Preview */}
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start mb-8">
              <div className="relative w-24 h-24 rounded-3xl overflow-hidden shadow-warm dark:shadow-navy">
                <Image
                  src="/app_icon_transparent.png"
                  alt="TaskLap App Icon"
                  width={96}
                  height={96}
                  className="w-full h-full object-contain rounded-3xl"
                />
              </div>
            </div>

            <h3 className="text-3xl font-bold text-primary-contrast mb-4">
              {t("download.title")}
            </h3>
            <p className="text-lg text-secondary-contrast mb-8 max-w-2xl lg:mx-0 mx-auto">
              {t("download.subtitle")}
              {t("download.description")}
            </p>

            {/* Download Badges - 公式ストアバッジ */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6 items-center lg:items-start lg:justify-start justify-center">
              {/* App Store Badge */}
              <a
                href="#"
                className="block transition-transform hover:scale-105"
                aria-label={t("download.appStore")}
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
                  alt={t("download.appStore")}
                  className="h-[48px] w-auto"
                />
              </a>

              {/* Google Play Badge */}
              <a
                href="#"
                className="block transition-transform hover:scale-105"
                aria-label={t("download.googlePlay")}
              >
                <img
                  src="https://raw.githubusercontent.com/pioug/google-play-badges/main/svg/English.svg"
                  alt={t("download.googlePlay")}
                  className="h-[48px] w-auto"
                />
              </a>
            </div>

            {/* 申請中メッセージ */}
            <div className="mb-8 p-4 bg-primary-50 dark:bg-primary-900/20 rounded-xl border border-primary-200 dark:border-primary-700">
              <p className="text-sm text-primary-700 dark:text-primary-300 text-center">
                {t("common.applicationInProgress")}
              </p>
            </div>

            {/* QR Code Toggle */}
            <div className="card p-4">
              <div className="flex items-center justify-center space-x-4 mb-4">
                <button
                  onClick={() => setShowQR("ios")}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                    showQR === "ios"
                      ? "bg-primary-500 text-white"
                      : "text-muted-contrast hover:text-primary-500"
                  }`}
                >
                  iOS QR
                </button>
                <button
                  onClick={() => setShowQR("android")}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                    showQR === "android"
                      ? "bg-primary-500 text-white"
                      : "text-muted-contrast hover:text-primary-500"
                  }`}
                >
                  Android QR
                </button>
              </div>
              <div className="flex justify-center">
                <div className="w-32 h-32 bg-elevated-alt rounded-2xl flex items-center justify-center">
                  <QrCode className="w-16 h-16 text-muted-contrast" />
                </div>
              </div>
              <p className="text-center text-xs text-muted-contrast mt-2">
                {t("common.qrCodeInProgress")}
              </p>
            </div>
          </div>

          {/* Right: Features List */}
          <div className="space-y-6">
            <h4 className="text-2xl font-bold text-primary-contrast mb-6">
              {t("download.whyChoose")}
            </h4>

            <div className="grid grid-cols-1 gap-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 p-4 rounded-xl bg-elevated border border-elevated"
                >
                  <div
                    className={`w-10 h-10 ${feature.color} rounded-xl flex items-center justify-center`}
                  >
                    <feature.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary-contrast">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-muted-contrast">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="card p-8">
          <h3 className="text-2xl font-bold text-primary-contrast text-center mb-8">
            {t("download.appStats")}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="icon-container-large mx-auto mb-3">
                  <stat.icon className="w-8 h-8" />
                </div>
                <div className="text-2xl font-bold text-primary-contrast mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-contrast">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center mt-20">
          <div className="card p-8 md:p-12">
            <div className="flex items-center justify-center mb-6">
              <div className="relative w-16 h-16 rounded-3xl overflow-hidden shadow-warm dark:shadow-navy">
                <Image
                  src="/app_icon_transparent.png"
                  alt="TaskLap App Icon"
                  width={64}
                  height={64}
                  className="w-full h-full object-contain rounded-3xl"
                />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-primary-contrast mb-4">
              {t("download.title")}
            </h3>
            <p className="text-lg text-secondary-contrast mb-8 max-w-2xl mx-auto">
              {t("download.subtitle")} {t("download.description")}
            </p>
            {/* 公式ストアバッジ（小サイズ） */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-4">
              <a
                href="#"
                className="block transition-transform hover:scale-105"
                aria-label={t("download.appStore")}
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
                  alt={t("download.appStore")}
                  className="h-[48px] w-auto"
                />
              </a>
              <a
                href="#"
                className="block transition-transform hover:scale-105"
                aria-label={t("download.googlePlay")}
              >
                <img
                  src="https://raw.githubusercontent.com/pioug/google-play-badges/main/svg/English.svg"
                  alt={t("download.googlePlay")}
                  className="h-[48px] w-auto"
                />
              </a>
            </div>

            {/* 申請中メッセージ */}
            <div className="mb-6 flex justify-center">
              <div className="inline-flex items-center px-3 py-1.5 bg-primary-50 dark:bg-primary-900/20 rounded-lg border border-primary-200 dark:border-primary-700">
                <span className="text-xs text-primary-700 dark:text-primary-300">
                  {t("download.storeSubmission")}
                </span>
              </div>
            </div>
            <div className="flex justify-center">
              <button
                onClick={() => {
                  const element = document.getElementById("features");
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="btn-secondary px-8 py-4 rounded-2xl font-semibold text-lg"
              >
                {t("hero.viewFeatures")}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Background decorations */}
      <div className="absolute top-20 right-10 w-32 h-32 bg-primary-200/20 dark:bg-primary-800/10 rounded-full opacity-60 animate-float"></div>
      <div
        className="absolute bottom-40 left-10 w-24 h-24 bg-accent-200/20 dark:bg-accent-800/10 rounded-full opacity-60 animate-float"
        style={{ animationDelay: "2s" }}
      ></div>
    </section>
  );
}
