"use client";

import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Shield,
  Lock,
  Database,
  Eye,
  Globe,
  Cloud,
  Smartphone,
  UserX,
  RefreshCw,
  FileText,
} from "lucide-react";

export default function PrivacyContent() {
  const t = useTranslations("privacy");
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-neutral-900 dark:via-neutral-800 dark:to-slate-900">
      {/* Header */}
      <div className="bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border-b border-gray-200 dark:border-neutral-700 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => router.back()}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-700 transition-colors duration-200"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-neutral-300" />
            </button>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-neutral-100">
                  {t("title")}
                </h1>
                <p className="text-sm text-gray-600 dark:text-neutral-400">
                  {t("lastUpdated")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Changes Summary */}
        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-6 mb-8">
          <div className="flex items-start space-x-4">
            <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
              <FileText className="w-6 h-6 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-neutral-100 mb-2">
                {t("changesSummary.title")}
              </h2>
              <p className="text-gray-700 dark:text-neutral-300 mb-3">
                {t("changesSummary.description")}
              </p>
              <ul className="space-y-2">
                {t
                  .raw("changesSummary.items")
                  .map((item: string, index: number) => (
                    <li key={index} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-amber-500 dark:bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700 dark:text-neutral-300">
                        {item}
                      </span>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Key Points */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6 mb-8">
          <div className="flex items-start space-x-4">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <Lock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-neutral-100 mb-2">
                {t("keyPoint.title")}
              </h2>
              <p className="text-gray-700 dark:text-neutral-300">
                {t("keyPoint.description")}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {/* Section 1: Information We Collect */}
          <section className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm border border-gray-100 dark:border-neutral-700 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Database className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-neutral-100">
                {t("dataCollection.title")}
              </h2>
            </div>
            <p className="text-gray-700 dark:text-neutral-300 mb-4">
              {t("dataCollection.description")}
            </p>
            <p className="text-gray-900 dark:text-neutral-100 font-medium mb-2">
              {t("dataCollection.localSubtitle")}
            </p>
            <ul className="space-y-2 mb-4">
              {t
                .raw("dataCollection.localItems")
                .map((item: string, index: number) => (
                  <li key={index} className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-blue-500 dark:bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700 dark:text-neutral-300">
                      {item}
                    </span>
                  </li>
                ))}
            </ul>
            <p className="text-gray-900 dark:text-neutral-100 font-medium mb-2">
              {t("dataCollection.syncSubtitle")}
            </p>
            <ul className="space-y-2">
              {t
                .raw("dataCollection.syncItems")
                .map((item: string, index: number) => (
                  <li key={index} className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-purple-500 dark:bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700 dark:text-neutral-300">
                      {item}
                    </span>
                  </li>
                ))}
            </ul>
          </section>

          {/* Section 2: Information We Do Not Collect */}
          <section className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm border border-gray-100 dark:border-neutral-700 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Eye className="w-6 h-6 text-green-600 dark:text-green-400" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-neutral-100">
                {t("noDataCollection.title")}
              </h2>
            </div>
            <p className="text-gray-700 dark:text-neutral-300 mb-4">
              {t("noDataCollection.description")}
            </p>
            <ul className="space-y-2">
              {t
                .raw("noDataCollection.items")
                .map((item: string, index: number) => (
                  <li key={index} className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-green-500 dark:bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700 dark:text-neutral-300">
                      {item}
                    </span>
                  </li>
                ))}
            </ul>
          </section>

          {/* Section 3: Where Your Data Is Stored */}
          <section className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border border-purple-200 dark:border-purple-800 rounded-xl p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Lock className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-neutral-100">
                {t("dataStorage.title")}
              </h2>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Smartphone className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  <p className="text-gray-900 dark:text-neutral-100 font-medium">
                    {t("dataStorage.localSubtitle")}
                  </p>
                </div>
                <ul className="space-y-3">
                  {t
                    .raw("dataStorage.localItems")
                    .map((item: string, index: number) => (
                      <li key={index} className="flex items-start space-x-3">
                        <div className="p-1 bg-purple-100 dark:bg-purple-900/30 rounded-full mt-1">
                          <div className="w-2 h-2 bg-purple-600 dark:bg-purple-400 rounded-full"></div>
                        </div>
                        <span className="text-gray-700 dark:text-neutral-300">
                          {item}
                        </span>
                      </li>
                    ))}
                </ul>
              </div>
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Cloud className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <p className="text-gray-900 dark:text-neutral-100 font-medium">
                    {t("dataStorage.cloudSubtitle")}
                  </p>
                </div>
                <ul className="space-y-3">
                  {t
                    .raw("dataStorage.cloudItems")
                    .map((item: string, index: number) => (
                      <li key={index} className="flex items-start space-x-3">
                        <div className="p-1 bg-blue-100 dark:bg-blue-900/30 rounded-full mt-1">
                          <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full"></div>
                        </div>
                        <span className="text-gray-700 dark:text-neutral-300">
                          {item}
                        </span>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Section 4: How We Use Your Data */}
          <section className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm border border-gray-100 dark:border-neutral-700 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <RefreshCw className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-neutral-100">
                {t("dataUse.title")}
              </h2>
            </div>
            <p className="text-gray-700 dark:text-neutral-300 mb-4">
              {t("dataUse.description")}
            </p>
            <ul className="space-y-2">
              {t.raw("dataUse.items").map((item: string, index: number) => (
                <li key={index} className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-500 dark:bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700 dark:text-neutral-300">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* Section 5: If You Do Not Sign In */}
          <section className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm border border-gray-100 dark:border-neutral-700 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Smartphone className="w-6 h-6 text-green-600 dark:text-green-400" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-neutral-100">
                {t("withoutSignIn.title")}
              </h2>
            </div>
            <p className="text-gray-700 dark:text-neutral-300">
              {t("withoutSignIn.description")}
            </p>
          </section>

          {/* Section 6: Deleting Your Account and Data */}
          <section className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm border border-gray-100 dark:border-neutral-700 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <UserX className="w-6 h-6 text-red-600 dark:text-red-400" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-neutral-100">
                {t("accountDeletion.title")}
              </h2>
            </div>
            <p className="text-gray-700 dark:text-neutral-300 mb-4">
              {t("accountDeletion.description")}
            </p>
            <ul className="space-y-2">
              {t
                .raw("accountDeletion.items")
                .map((item: string, index: number) => (
                  <li key={index} className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-red-500 dark:bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700 dark:text-neutral-300">
                      {item}
                    </span>
                  </li>
                ))}
            </ul>
          </section>

          {/* Section 7: Data Sharing */}
          <section className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm border border-gray-100 dark:border-neutral-700 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Globe className="w-6 h-6 text-red-600 dark:text-red-400" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-neutral-100">
                {t("dataSharing.title")}
              </h2>
            </div>
            <p className="text-gray-700 dark:text-neutral-300 mb-4">
              {t("dataSharing.description")}
            </p>
            <ul className="space-y-2 mb-4">
              {t.raw("dataSharing.items").map((item: string, index: number) => (
                <li key={index} className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-red-500 dark:bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700 dark:text-neutral-300">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
            <p className="text-sm text-gray-600 dark:text-neutral-400 bg-gray-50 dark:bg-neutral-700/50 rounded-lg p-3">
              {t("dataSharing.note")}
            </p>
          </section>

          {/* Section 8: Security */}
          <section className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm border border-gray-100 dark:border-neutral-700 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-neutral-100">
                {t("security.title")}
              </h2>
            </div>
            <p className="text-gray-700 dark:text-neutral-300 mb-4">
              {t("security.description")}
            </p>
            <ul className="space-y-2">
              {t.raw("security.items").map((item: string, index: number) => (
                <li key={index} className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-500 dark:bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700 dark:text-neutral-300">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* Section 9: Advertising */}
          <section className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm border border-gray-100 dark:border-neutral-700 p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-neutral-100 mb-4">
              {t("ads.title")}
            </h2>
            <p className="text-gray-700 dark:text-neutral-300">
              {t("ads.description")}
            </p>
          </section>

          {/* Section 10: Age Requirement */}
          <section className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm border border-gray-100 dark:border-neutral-700 p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-neutral-100 mb-4">
              {t("ageRestriction.title")}
            </h2>
            <p className="text-gray-700 dark:text-neutral-300">
              {t("ageRestriction.description")}
            </p>
          </section>

          {/* Section 11: Contact */}
          <section className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-neutral-100 mb-4">
              {t("contact.title")}
            </h2>
            <p className="text-gray-700 dark:text-neutral-300 mb-3">
              {t("contact.description")}
            </p>
            <div className="bg-white dark:bg-neutral-800 rounded-lg p-4 border border-blue-200 dark:border-blue-700">
              <p className="text-gray-900 dark:text-neutral-100 font-medium">
                {t("contact.email")}: takyun.dev@gmail.com
              </p>
            </div>
          </section>

          {/* Section 12: Policy Changes */}
          <section className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm border border-gray-100 dark:border-neutral-700 p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-neutral-100 mb-4">
              {t("policyChanges.title")}
            </h2>
            <p className="text-gray-700 dark:text-neutral-300">
              {t("policyChanges.description")}
            </p>
          </section>

          {/* Final note */}
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 dark:from-neutral-800 dark:to-blue-900/20 border border-gray-200 dark:border-neutral-700 rounded-xl p-6 text-center">
            <p className="text-gray-700 dark:text-neutral-300 italic">
              {t("finalNote")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
