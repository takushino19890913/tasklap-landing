"use client";

import { useTranslations } from "next-intl";
import { CalendarDays, Sparkles, Wrench } from "lucide-react";

export default function VersionHistoryContent() {
  const t = useTranslations("versionHistory");

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-neutral-800 dark:text-neutral-100 mb-4">
          {t("title")}
        </h1>
        <div className="flex items-center justify-center space-x-2 text-neutral-600 dark:text-neutral-400">
          <Sparkles className="w-5 h-5" />
          <span className="text-lg">{t("updateContent")}</span>
        </div>
      </div>

      {/* Development Section */}
      <div className="mb-12 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
              <Wrench className="w-5 h-5 text-white" />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-2">
              {t("developmentTitle")}
            </h3>
            <p className="text-blue-700 dark:text-blue-300 whitespace-pre-line">
              {t("developmentText")}
            </p>
          </div>
        </div>
      </div>

      {/* Version History */}
      <div className="space-y-8">
        {/* Version 1.0.1 */}
        <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700 p-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">1.0.1</span>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-neutral-800 dark:text-neutral-100">
                Version 1.0.1
              </h3>
              <div className="flex items-center space-x-2 text-neutral-600 dark:text-neutral-400">
                <CalendarDays className="w-4 h-4" />
                <span>{t("v1_0_1.date")}</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-neutral-700 dark:text-neutral-300">
                {t("v1_0_1.changes.trashDarkMode")}
              </span>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-neutral-700 dark:text-neutral-300">
                {t("v1_0_1.changes.uiImprovements")}
              </span>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-neutral-700 dark:text-neutral-300">
                {t("v1_0_1.changes.bugFixes")}
              </span>
            </div>
          </div>
        </div>

        {/* Version 1.0.0 */}
        <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700 p-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">1.0.0</span>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-neutral-800 dark:text-neutral-100">
                Version 1.0.0
              </h3>
              <div className="flex items-center space-x-2 text-neutral-600 dark:text-neutral-400">
                <CalendarDays className="w-4 h-4" />
                <span>{t("v1_0_0.date")}</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-neutral-700 dark:text-neutral-300">
                {t("v1_0_0.changes.initialRelease")}
              </span>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-neutral-700 dark:text-neutral-300">
                {t("v1_0_0.changes.basicTaskManagement")}
              </span>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-neutral-700 dark:text-neutral-300">
                {t("v1_0_0.changes.checklistFeature")}
              </span>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-neutral-700 dark:text-neutral-300">
                {t("v1_0_0.changes.focusMode")}
              </span>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-neutral-700 dark:text-neutral-300">
                {t("v1_0_0.changes.darkMode")}
              </span>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-neutral-700 dark:text-neutral-300">
                {t("v1_0_0.changes.multiLanguage")}
              </span>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-neutral-700 dark:text-neutral-300">
                {t("v1_0_0.changes.taskReordering")}
              </span>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-neutral-700 dark:text-neutral-300">
                {t("v1_0_0.changes.groupManagement")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
