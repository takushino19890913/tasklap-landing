"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { Globe, Menu, X, Download } from "lucide-react";
import { locales } from "../i18n";
import ThemeToggle from "./ThemeToggle";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);

  const languages = [
    { code: "ja", name: t("languages.ja"), flag: "🇯🇵" },
    { code: "en", name: t("languages.en"), flag: "🇺🇸" },
    { code: "fr", name: t("languages.fr"), flag: "🇫🇷" },
    { code: "ko", name: t("languages.ko"), flag: "🇰🇷" },
    { code: "zh", name: t("languages.zh"), flag: "🇨🇳" },
    { code: "es", name: t("languages.es"), flag: "🇪🇸" },
    { code: "pt", name: t("languages.pt"), flag: "🇧🇷" },
    { code: "de", name: t("languages.de"), flag: "🇩🇪" },
  ];

  const handleLanguageChange = (newLocale: string) => {
    // Remove current locale from pathname and add new one
    const segments = pathname.split("/").filter(Boolean);
    if (locales.includes(segments[0] as any)) {
      segments[0] = newLocale;
    } else {
      segments.unshift(newLocale);
    }

    router.push("/" + segments.join("/"));
    setIsLanguageOpen(false);
    setIsMenuOpen(false);
  };

  const handleNavigation = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  const currentLanguage =
    languages.find((lang) => lang.code === locale) || languages[0];

  return (
    <header className="fixed top-0 w-full header-glass z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Logo - TaskLapアプリの実際のアイコンを使用 */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link
                href={`/${locale}`}
                className="flex items-center space-x-2 sm:space-x-3 hover:opacity-80 transition-opacity"
              >
                {/* TaskLapの透過アイコン */}
                <div className="relative w-8 h-8 sm:w-10 sm:h-10">
                  <Image
                    src="/app_icon_transparent.png"
                    alt="TaskLap App Icon"
                    width={40}
                    height={40}
                    className="w-full h-full object-contain drop-shadow-sm"
                    priority
                  />
                </div>
                <h1 className="text-xl sm:text-2xl font-bold text-neutral-800 dark:text-neutral-100">
                  Task<span className="text-primary-500">Lap</span>
                </h1>
              </Link>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => handleNavigation("features")}
              className="text-neutral-700 dark:text-neutral-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-200 font-medium"
            >
              {t("navigation.features")}
            </button>
            <button
              onClick={() => handleNavigation("focus-mode")}
              className="text-neutral-700 dark:text-neutral-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-200 font-medium"
            >
              {t("navigation.focusMode")}
            </button>
            <button
              onClick={() => handleNavigation("checklist")}
              className="text-neutral-700 dark:text-neutral-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-200 font-medium"
            >
              {t("navigation.checklist")}
            </button>
            <button
              onClick={() => handleNavigation("download")}
              className="text-neutral-700 dark:text-neutral-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-200 font-medium"
            >
              {t("navigation.download")}
            </button>
            <button
              onClick={() => handleNavigation("contact")}
              className="text-neutral-700 dark:text-neutral-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-200 font-medium"
            >
              {t("navigation.contact")}
            </button>
          </nav>

          {/* Desktop Controls - Theme Toggle, Language & Download */}
          <div className="hidden md:flex items-center space-x-4">
            {/* テーマ切り替えボタン */}
            <ThemeToggle />

            {/* 言語切り替え */}
            <div className="relative">
              <button
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                className="flex items-center space-x-2 px-3 py-2 rounded-xl bg-warm-200 dark:bg-neutral-700 hover:bg-warm-300 dark:hover:bg-neutral-600 border border-neutral-200 dark:border-neutral-600 transition-all duration-200"
              >
                <Globe className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
                <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  {currentLanguage.flag} {currentLanguage.name}
                </span>
              </button>

              {isLanguageOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-neutral-800 rounded-xl shadow-warm-lg border border-neutral-200 dark:border-neutral-700 py-2 z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code)}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-warm-50 dark:hover:bg-neutral-700 flex items-center space-x-2 transition-colors duration-200 ${
                        locale === lang.code
                          ? "bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400"
                          : "text-neutral-700 dark:text-neutral-300"
                      }`}
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* ダウンロードボタン */}
            <button
              onClick={() => handleNavigation("download")}
              className="btn-primary px-6 py-2 rounded-xl font-medium flex items-center space-x-2 animate-pulse-warm"
            >
              <Download className="w-4 h-4" />
              <span>{t("navigation.download")}</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-neutral-700 dark:text-neutral-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-200"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden relative z-50">
            <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3 bg-white dark:bg-neutral-800 border-t border-neutral-200 dark:border-neutral-700 rounded-b-2xl shadow-warm-lg">
              <button
                onClick={() => handleNavigation("features")}
                className="block w-full text-left px-4 py-3 text-neutral-700 dark:text-neutral-300 hover:bg-warm-50 dark:hover:bg-neutral-700 rounded-xl transition-colors duration-200"
              >
                {t("navigation.features")}
              </button>
              <button
                onClick={() => handleNavigation("focus-mode")}
                className="block w-full text-left px-4 py-3 text-neutral-700 dark:text-neutral-300 hover:bg-warm-50 dark:hover:bg-neutral-700 rounded-xl font-medium transition-colors duration-200"
              >
                {t("navigation.focusMode")}
              </button>
              <button
                onClick={() => handleNavigation("checklist")}
                className="block w-full text-left px-4 py-3 text-neutral-700 dark:text-neutral-300 hover:bg-warm-50 dark:hover:bg-neutral-700 rounded-xl transition-colors duration-200"
              >
                {t("navigation.checklist")}
              </button>
              <button
                onClick={() => handleNavigation("download")}
                className="block w-full text-left px-4 py-3 text-neutral-700 dark:text-neutral-300 hover:bg-warm-50 dark:hover:bg-neutral-700 rounded-xl transition-colors duration-200"
              >
                {t("navigation.download")}
              </button>
              <button
                onClick={() => handleNavigation("contact")}
                className="block w-full text-left px-4 py-3 text-neutral-700 dark:text-neutral-300 hover:bg-warm-50 dark:hover:bg-neutral-700 rounded-xl transition-colors duration-200"
              >
                {t("navigation.contact")}
              </button>

              {/* Mobile Language Switcher */}
              <div className="border-t border-neutral-200 dark:border-neutral-700 pt-4 mt-4">
                <div className="px-4 py-2 text-sm font-medium text-neutral-500 dark:text-neutral-400">
                  {t("navigation.language")}
                </div>
                <div className="grid grid-cols-2 gap-2 px-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code)}
                      className={`text-left px-3 py-2 text-sm rounded-xl flex items-center space-x-2 transition-colors duration-200 ${
                        locale === lang.code
                          ? "bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400"
                          : "text-neutral-700 dark:text-neutral-300 hover:bg-warm-50 dark:hover:bg-neutral-700"
                      }`}
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile Download Button */}
              <div className="border-t border-neutral-200 dark:border-neutral-700 pt-4 mt-4">
                <button
                  onClick={() => handleNavigation("download")}
                  className="w-full btn-primary px-4 py-3 rounded-xl font-medium flex items-center justify-center space-x-2"
                >
                  <Download className="w-4 h-4" />
                  <span>{t("navigation.download")}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Overlay for mobile menus */}
      {(isMenuOpen || isLanguageOpen) && (
        <div
          className="fixed inset-0 bg-black bg-opacity-25 z-40"
          onClick={() => {
            setIsMenuOpen(false);
            setIsLanguageOpen(false);
          }}
        />
      )}
    </header>
  );
}
