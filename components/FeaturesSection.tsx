"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import {
  Target,
  Palette,
  ListChecks,
  Globe,
  Settings,
  CheckCircle,
} from "lucide-react";

export default function FeaturesSection() {
  const t = useTranslations();

  const features = [
    {
      icon: Target,
      title: t("features.focusMode.title"),
      description: t("features.focusMode.description"),
      detail: t("features.focusMode.detail"),
      color: "from-primary-400 to-primary-600",
      bgColor: "bg-primary-50 dark:bg-primary-900/20",
      textColor: "text-primary-600 dark:text-primary-400",
      highlight: true, // Main feature pillar
    },
    {
      icon: ListChecks,
      title: t("features.checklist.title"),
      description: t("features.checklist.description"),
      detail: t("features.checklist.detail"),
      color: "from-blue-400 to-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      textColor: "text-blue-600 dark:text-blue-400",
      highlight: true, // Main feature pillar
    },
    {
      icon: Palette,
      title: t("features.design.title"),
      description: t("features.design.description"),
      detail: t("features.design.detail"),
      color: "from-purple-400 to-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
      textColor: "text-purple-600 dark:text-purple-400",
    },
    {
      icon: Globe,
      title: t("features.multilingual.title"),
      description: t("features.multilingual.description"),
      detail: t("features.multilingual.detail"),
      color: "from-accent-400 to-accent-600",
      bgColor: "bg-accent-50 dark:bg-accent-900/20",
      textColor: "text-accent-600 dark:text-accent-400",
    },
    {
      icon: Settings,
      title: t("features.simple.title"),
      description: t("features.simple.description"),
      detail: t("features.simple.detail"),
      color: "from-neutral-400 to-neutral-600",
      bgColor: "bg-neutral-50 dark:bg-neutral-700/50",
      textColor: "text-neutral-600 dark:text-neutral-400",
    },
  ];

  return (
    <section id="features" className="py-24 section-light-alt">
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
            <span>{t("productivity.title")}</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-primary-contrast mb-6">
            {t("features.title")}
          </h2>
          <p className="text-xl text-secondary-contrast max-w-3xl mx-auto">
            {t("features.subtitle")}
          </p>
        </div>

        {/* Features Grid */}
        <div className="space-y-8">
          {/* Top Row - Main Features (Focus Mode & Checklist) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {features.slice(0, 2).map((feature, index) => (
              <div key={index} className="relative group">
                <div
                  className={`h-full feature-grid-item border-primary-200 dark:border-primary-800/50 ${feature.bgColor}`}
                >
                  <div className="p-8">
                    {/* Icon */}
                    <div
                      className={`relative w-16 h-16 mx-auto mb-6 rounded-2xl ${feature.bgColor} p-4 shadow-lg`}
                    >
                      <div
                        className={`w-full h-full rounded-xl bg-gradient-to-br ${feature.color} p-2 shadow-inner`}
                      >
                        <feature.icon className="w-full h-full text-white" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-4 text-center">
                      <h3 className="text-2xl font-bold text-primary-contrast group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-lg text-secondary-contrast leading-relaxed">
                        {feature.description}
                      </p>
                      <p className="text-sm text-muted-contrast leading-relaxed">
                        {feature.detail}
                      </p>
                    </div>

                    {/* Feature-specific visual elements */}
                    {index === 0 && ( // Focus Mode feature
                      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                        <div className="flex items-center space-x-2 px-4 py-2 bg-primary-100 dark:bg-primary-900/30 rounded-full">
                          <Target className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                          <span className="text-sm font-medium text-primary-700 dark:text-primary-300">
                            {t("features.focusMode.oneTaskFocus")}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 rounded-full">
                          <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                          <span className="text-sm font-medium text-green-700 dark:text-green-300">
                            {t("features.focusMode.completeOrSkip")}
                          </span>
                        </div>
                      </div>
                    )}

                    {index === 1 && ( // Checklist feature
                      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                        <div className="flex items-center space-x-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                          <ListChecks className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                          <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                            {t("features.checklist.management")}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 rounded-full">
                          <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                          <span className="text-sm font-medium text-green-700 dark:text-green-300">
                            {t("features.checklist.progressTracking")}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Row - Supporting Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.slice(2).map((feature, index) => (
              <div key={index + 2} className="relative group">
                <div className="h-full feature-grid-item border-elevated hover:border-primary-200 dark:hover:border-primary-700">
                  <div className="p-8">
                    {/* Icon */}
                    <div
                      className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} mb-6 group-hover:scale-110 transition-transform duration-300 shadow-warm dark:shadow-navy`}
                    >
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>

                    {/* Content */}
                    <div className="space-y-4">
                      <h3 className="text-2xl font-bold text-primary-contrast group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-lg text-secondary-contrast leading-relaxed">
                        {feature.description}
                      </p>
                      <p className="text-sm text-muted-contrast leading-relaxed">
                        {feature.detail}
                      </p>
                    </div>

                    {/* Special elements for specific features */}
                    {index + 2 === 3 && ( // Multilingual feature (index 1 in slice(2))
                      <div className="mt-8">
                        <div className="grid grid-cols-4 gap-2">
                          {["🇯🇵", "🇺🇸", "🇫🇷", "🇰🇷", "🇨🇳", "🇪🇸", "🇧🇷", "🇩🇪"].map(
                            (flag, i) => (
                              <div
                                key={i}
                                className="text-center p-2 bg-elevated-alt rounded-lg"
                              >
                                <span className="text-lg">{flag}</span>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-primary-500 to-accent-500 rounded-3xl p-12 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-600/20 to-accent-600/20 backdrop-blur-sm"></div>
            <div className="relative z-10">
              <h3 className="text-3xl font-bold mb-4">
                {t("features.cta.title")}
              </h3>
              <p className="text-xl mb-8 opacity-90">
                {t("features.cta.description")}
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
                    alt="App Store からダウンロード"
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
                    alt="Get it on Google Play"
                    className="h-[48px] w-auto"
                  />
                </a>
              </div>

              {/* 申請中メッセージ */}
              <div className="mt-4 flex justify-center">
                <div className="inline-flex items-center px-3 py-1.5 bg-primary-50 dark:bg-primary-900/20 rounded-lg border border-primary-200 dark:border-primary-700">
                  <span className="text-xs text-primary-700 dark:text-primary-300">
                    {t("common.applicationInProgress")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
