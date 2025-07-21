"use client";

import { useTranslations } from "next-intl";
import { Mail, MessageCircle } from "lucide-react";

export default function ContactSection() {
  const t = useTranslations();

  return (
    <section
      id="contact"
      className="py-8 sm:py-12 md:py-20 bg-white dark:bg-neutral-900"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-800 dark:text-white mb-2 sm:mb-3 md:mb-4">
            {t("contact.title")}
          </h2>
          <p className="text-sm sm:text-base md:text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto hidden sm:block">
            {t("contact.subtitle")}
          </p>
        </div>

        {/* Contact Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 text-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <Mail className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-neutral-800 dark:text-white mb-2 sm:mb-3 md:mb-4">
              {t("contact.email.title")}
            </h3>
            <p className="text-xs sm:text-sm md:text-base text-neutral-600 dark:text-neutral-400 mb-3 sm:mb-4 md:mb-6 hidden sm:block">
              {t("contact.email.description")}
            </p>
            <a
              href="mailto:support@tasklap.app"
              className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl font-medium text-sm sm:text-base transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span>{t("contact.email.button")}</span>
            </a>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 text-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <MessageCircle className="w-6 h-6 sm:w-8 sm:h-8 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-neutral-800 dark:text-white mb-2 sm:mb-3 md:mb-4">
              {t("contact.feedback.title")}
            </h3>
            <p className="text-xs sm:text-sm md:text-base text-neutral-600 dark:text-neutral-400 mb-3 sm:mb-4 md:mb-6 hidden sm:block">
              {t("contact.feedback.description")}
            </p>
            <a
              href="mailto:feedback@tasklap.app"
              className="inline-flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl font-medium text-sm sm:text-base transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{t("contact.feedback.button")}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
