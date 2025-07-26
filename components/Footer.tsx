"use client";

import { useTranslations } from "next-intl";
import { Heart } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Image from "next/image";

export default function Footer() {
  const t = useTranslations();
  const params = useParams();
  const locale = params.locale;

  return (
    <footer className="bg-neutral-800 dark:bg-neutral-900 text-neutral-100 dark:text-neutral-200 border-t border-neutral-700 dark:border-neutral-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="relative w-10 h-10 rounded-2xl overflow-hidden shadow-navy">
                <Image
                  src="/app_icon_transparent.png"
                  alt="TaskLap Icon"
                  width={40}
                  height={40}
                  className="w-full h-full object-contain rounded-2xl"
                />
              </div>
              <h3 className="text-2xl font-bold gradient-text">TaskLap</h3>
            </div>
            <p className="text-neutral-300 dark:text-neutral-400 text-sm leading-relaxed">
              {t("footer.appDescription")}
              <br />
              {t("footer.supportMessage")}
            </p>
            <div className="flex items-center space-x-2 text-sm text-neutral-400 dark:text-neutral-500">
              <span>{t("footer.madeWith")}</span>
              <Heart className="w-4 h-4 text-red-400" />
              <span>TaskLap Team</span>
            </div>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-primary-400 dark:text-primary-300">
              {t("footer.quickLinks")}
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => {
                    const element = document.getElementById("features");
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className="text-neutral-300 dark:text-neutral-400 hover:text-primary-400 dark:hover:text-primary-300 transition-colors text-sm"
                >
                  {t("navigation.features")}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    const element = document.getElementById("focus-mode");
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className="text-neutral-300 dark:text-neutral-400 hover:text-primary-400 dark:hover:text-primary-300 transition-colors text-sm"
                >
                  {t("navigation.focusMode")}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    const element = document.getElementById("checklist");
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className="text-neutral-300 dark:text-neutral-400 hover:text-primary-400 dark:hover:text-primary-300 transition-colors text-sm"
                >
                  {t("navigation.checklist")}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    const element = document.getElementById("use-cases");
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className="text-neutral-300 dark:text-neutral-400 hover:text-primary-400 dark:hover:text-primary-300 transition-colors text-sm"
                >
                  {t("navigation.useCases")}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    const element = document.getElementById("download");
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className="text-neutral-300 dark:text-neutral-400 hover:text-primary-400 dark:hover:text-primary-300 transition-colors text-sm"
                >
                  {t("navigation.download")}
                </button>
              </li>
            </ul>
          </div>

          {/* Legal & Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-primary-400 dark:text-primary-300">
              {t("footer.legal")}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href={`/${locale}/privacy`}
                  className="text-neutral-300 dark:text-neutral-400 hover:text-primary-400 dark:hover:text-primary-300 transition-colors text-sm"
                >
                  {t("footer.privacy")}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/version-history`}
                  className="text-neutral-300 dark:text-neutral-400 hover:text-primary-400 dark:hover:text-primary-300 transition-colors text-sm"
                >
                  {t("footer.versionHistory")}
                </Link>
              </li>
              <li>
                <span className="text-neutral-400 dark:text-neutral-500 text-sm">
                  {t("footer.multilingualSupport")}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-neutral-700 dark:border-neutral-600 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-neutral-400 dark:text-neutral-500">
              © 2024 TaskLap. All rights reserved.
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-neutral-400 dark:text-neutral-500">
                Made with
              </span>
              <Heart className="w-4 h-4 text-red-400" />
              <span className="text-sm text-neutral-400 dark:text-neutral-500">
                for productivity
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
