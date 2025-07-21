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
  List,
  Smartphone,
  Zap,
} from "lucide-react";

export default function FeaturesSection() {
  const t = useTranslations();

  const features = [
    {
      icon: Target,
      title: t("features.focusMode.title"),
      description: t("features.focusMode.description"),
      color: "from-orange-400 to-red-500",
      bgColor: "bg-orange-50 dark:bg-orange-900/20",
    },
    {
      icon: ListChecks,
      title: t("features.checklist.title"),
      description: t("features.checklist.description"),
      color: "from-blue-500 to-indigo-600",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
    },
    {
      icon: Smartphone,
      title: t("features.simple.title"),
      description: t("features.simple.description"),
      color: "from-green-500 to-emerald-600",
      bgColor: "bg-green-50 dark:bg-green-900/20",
    },
    {
      icon: Zap,
      title: t("features.efficient.title"),
      description: t("features.efficient.description"),
      color: "from-purple-500 to-pink-600",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
    },
  ];

  return (
    <section
      id="features"
      className="py-8 sm:py-12 md:py-20 bg-gradient-to-b from-warm-50 to-white dark:from-neutral-800 dark:to-neutral-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-800 dark:text-white mb-2 sm:mb-3 md:mb-4">
            {t("features.title")}
          </h2>
          <p className="text-sm sm:text-base md:text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto hidden sm:block">
            {t("features.subtitle")}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className={`rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 transition-transform hover:scale-105 ${feature.bgColor} border border-neutral-200 dark:border-neutral-700`}
              >
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div
                    className={`flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center`}
                  >
                    <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base sm:text-lg md:text-xl font-bold text-neutral-800 dark:text-white mb-1 sm:mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-xs sm:text-sm md:text-base text-neutral-600 dark:text-neutral-400 hidden sm:block">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
