"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useTheme } from "next-themes";
import Image from "next/image";
import {
  CheckSquare,
  Plus,
  RotateCcw,
  Info,
  List,
  CheckCircle,
  Settings,
  ArrowRight,
  Sparkles,
  RefreshCw,
} from "lucide-react";

interface ChecklistItem {
  id: number;
  text: string;
  completed: boolean;
}

export default function ChecklistSection() {
  const t = useTranslations();
  const locale = useLocale();
  const { theme } = useTheme();
  const [currentMode, setCurrentMode] = useState<"light" | "dark">("dark");
  const [items, setItems] = useState<ChecklistItem[]>([
    { id: 1, text: t("checklist.sampleItems.passport"), completed: true },
    { id: 2, text: t("checklist.sampleItems.ticket"), completed: true },
    {
      id: 3,
      text: t("checklist.sampleItems.hotelConfirmation"),
      completed: true,
    },
    {
      id: 4,
      text: t("checklist.sampleItems.travelInsurance"),
      completed: false,
    },
    { id: 5, text: t("checklist.sampleItems.currency"), completed: false },
  ]);
  const [newItemText, setNewItemText] = useState("");
  const [showResetAnimation, setShowResetAnimation] = useState(false);
  const [isAllCompleted, setIsAllCompleted] = useState(false);

  // テーマの変更を監視
  useEffect(() => {
    if (theme === "light") {
      setCurrentMode("light");
    } else {
      setCurrentMode("dark");
    }
  }, [theme]);

  // 全完了チェック
  useEffect(() => {
    const allCompleted =
      items.length > 0 && items.every((item) => item.completed);
    setIsAllCompleted(allCompleted);
  }, [items]);

  // チェック状態を切り替え
  const toggleItem = (id: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  // 新しい項目を追加
  const addNewItem = () => {
    if (newItemText.trim()) {
      const newItem: ChecklistItem = {
        id: Date.now(),
        text: newItemText.trim(),
        completed: false,
      };
      setItems((prev) => [...prev, newItem]);
      setNewItemText("");
    }
  };

  // リセット機能
  const resetChecklist = () => {
    setShowResetAnimation(true);
    setTimeout(() => {
      setItems((prev) => prev.map((item) => ({ ...item, completed: false })));
      setShowResetAnimation(false);
    }, 1000);
  };

  const completedCount = items.filter((item) => item.completed).length;
  const progressPercentage =
    items.length > 0 ? (completedCount / items.length) * 100 : 0;

  return (
    <section
      id="checklist"
      className="py-24 section-light-alt overflow-hidden relative"
    >
      {/* 背景装飾 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-10 w-20 h-20 bg-blue-200/30 dark:bg-blue-800/20 rounded-full opacity-60 animate-float"></div>
        <div
          className="absolute bottom-20 left-10 w-16 h-16 bg-green-200/40 dark:bg-green-800/20 rounded-full opacity-60 animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/2 left-20 w-12 h-12 bg-blue-300/30 dark:bg-blue-700/20 rounded-full opacity-60 animate-float"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-6 py-3 bg-blue-500 text-white rounded-full text-sm font-medium mb-6 shadow-warm">
            <div className="relative w-5 h-5 mr-2 rounded-md overflow-hidden bg-white/20">
              <Image
                src="/app_icon_transparent.png"
                alt="TaskLap Icon"
                width={20}
                height={20}
                className="w-full h-full object-contain rounded-md "
              />
            </div>
            <span>{t("checklist.featureIntro")}</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-100 mb-6">
            {t("checklist.title") || "再利用できるチェックリスト"}
          </h2>
          <p className="text-xl text-blue-600 dark:text-blue-400 max-w-3xl mx-auto mb-8 font-medium">
            {t("checklist.subtitle") || "一度作ったリストを何度でも使える"}
          </p>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-4xl mx-auto leading-relaxed">
            {t("checklist.description") || t("checklist.description")}
          </p>
        </div>

        {/* メインデモセクション */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          {/* インタラクティブデモ */}
          <div className="order-1 lg:order-2">
            <div className="max-w-sm mx-auto">
              {/* App Frame */}
              <div className="relative rounded-[3rem] p-4 shadow-2xl bg-black">
                {/* Phone Screen */}
                <div
                  className={`rounded-[2.5rem] overflow-hidden aspect-[9/19.5] relative flex flex-col ${
                    currentMode === "dark"
                      ? "bg-gradient-to-br from-slate-800 to-slate-900"
                      : "bg-gradient-to-br from-blue-50 to-blue-100"
                  }`}
                >
                  {/* Status Bar */}
                  <div
                    className={`h-16 flex items-center justify-center ${
                      currentMode === "dark" ? "bg-black" : "bg-neutral-900"
                    }`}
                  >
                    <div className="text-white text-xl font-semibold">
                      {t("checklist.checklistTitle")}
                    </div>
                    <div className="absolute right-6">
                      <Info className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  {/* Navigation Header */}
                  <div
                    className={`px-6 py-4 ${
                      currentMode === "dark" ? "bg-slate-800" : "bg-blue-50"
                    } border-b ${
                      currentMode === "dark"
                        ? "border-slate-700"
                        : "border-blue-200"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <h3
                        className={`text-xl font-bold ${
                          currentMode === "dark"
                            ? "text-white"
                            : "text-slate-800"
                        }`}
                      >
                        {t("checklist.travelListTitle")}
                      </h3>
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-2">
                          <span
                            className={`text-sm font-medium ${
                              currentMode === "dark"
                                ? "text-slate-300"
                                : "text-slate-600"
                            }`}
                          >
                            {completedCount}/{items.length}
                          </span>
                          <div
                            className={`w-16 h-2 ${
                              currentMode === "dark"
                                ? "bg-slate-700"
                                : "bg-blue-200"
                            } rounded-full overflow-hidden`}
                          >
                            <div
                              className="h-full bg-primary-500 transition-all duration-500"
                              style={{ width: `${progressPercentage}%` }}
                            ></div>
                          </div>
                        </div>
                        {/* Reset Button in Nav */}
                        <button
                          onClick={resetChecklist}
                          className={`p-2 rounded-lg transition-colors ${
                            currentMode === "dark"
                              ? "bg-slate-700 hover:bg-slate-600 text-slate-300"
                              : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                          }`}
                          title={t("checklist.resetTitle")}
                        >
                          <RotateCcw className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Content Area */}
                  <div className="px-6 flex-1 flex flex-col py-4 min-h-96">
                    {showResetAnimation ? (
                      <div className="flex-1 flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-20 h-20 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-4">
                            <RefreshCw className="w-10 h-10 text-blue-500 animate-spin" />
                          </div>
                          <h3
                            className={`text-xl font-medium mb-2 ${
                              currentMode === "dark"
                                ? "text-white"
                                : "text-slate-800"
                            }`}
                          >
                            {t("checklist.resetting")}
                          </h3>
                          <p
                            className={`text-sm ${
                              currentMode === "dark"
                                ? "text-slate-400"
                                : "text-slate-600"
                            }`}
                          >
                            {t("checklist.resetDescription")}
                          </p>
                        </div>
                      </div>
                    ) : isAllCompleted ? (
                      <div className="flex-1 flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-20 h-20 rounded-full bg-primary-500/20 flex items-center justify-center mx-auto mb-4">
                            <Sparkles className="w-10 h-10 text-primary-500" />
                          </div>
                          <h3
                            className={`text-xl font-medium mb-2 ${
                              currentMode === "dark"
                                ? "text-white"
                                : "text-slate-800"
                            }`}
                          >
                            {t("checklist.completedTitle")}
                          </h3>
                          <p
                            className={`text-sm mb-6 ${
                              currentMode === "dark"
                                ? "text-slate-400"
                                : "text-slate-600"
                            }`}
                          >
                            {t("checklist.resetQuestion")}
                          </p>
                          <button
                            onClick={resetChecklist}
                            className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-xl font-medium transition-colors flex items-center space-x-2 mx-auto"
                          >
                            <RotateCcw className="w-5 h-5" />
                            <span>{t("checklist.resetAndReuse")}</span>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        {/* Checklist Items */}
                        <div className="space-y-3 flex-1 overflow-y-auto">
                          {items.map((item) => (
                            <div
                              key={item.id}
                              onClick={() => toggleItem(item.id)}
                              className={`flex items-center space-x-3 p-3 rounded-xl cursor-pointer transition-all duration-300 ${
                                item.completed
                                  ? currentMode === "dark"
                                    ? "bg-primary-900/30 border border-primary-700"
                                    : "bg-primary-50 border border-primary-200"
                                  : currentMode === "dark"
                                  ? "bg-slate-700/50 border border-slate-600"
                                  : "bg-white border border-blue-200"
                              }`}
                            >
                              <div
                                className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all duration-300 ${
                                  item.completed
                                    ? "bg-primary-500"
                                    : currentMode === "dark"
                                    ? "bg-slate-600 border border-slate-500"
                                    : "bg-white border-2 border-blue-300"
                                }`}
                              >
                                {item.completed && (
                                  <CheckCircle className="w-4 h-4 text-white" />
                                )}
                              </div>
                              <span
                                className={`text-sm font-medium transition-all duration-300 ${
                                  item.completed
                                    ? currentMode === "dark"
                                      ? "text-primary-300 line-through"
                                      : "text-primary-700 line-through"
                                    : currentMode === "dark"
                                    ? "text-white"
                                    : "text-slate-800"
                                }`}
                              >
                                {item.text}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Add New Item - 常時表示 */}
                        <div className="mt-4">
                          <div className="flex space-x-2">
                            <input
                              type="text"
                              value={newItemText}
                              onChange={(e) => setNewItemText(e.target.value)}
                              onKeyPress={(e) =>
                                e.key === "Enter" && addNewItem()
                              }
                              placeholder={t("checklist.newItemPlaceholder")}
                              className={`flex-1 px-3 py-2 rounded-lg text-sm ${
                                currentMode === "dark"
                                  ? "bg-slate-700 text-white border border-slate-600 placeholder:text-slate-400"
                                  : "bg-white text-slate-800 border border-blue-200 placeholder:text-slate-500"
                              }`}
                            />
                            <button
                              onClick={addNewItem}
                              disabled={!newItemText.trim()}
                              className={`px-3 py-2 rounded-lg transition-colors ${
                                newItemText.trim()
                                  ? "bg-primary-500 hover:bg-primary-600 text-white"
                                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
                              }`}
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Tab Bar */}
                  <div
                    className={`h-20 ${
                      currentMode === "dark" ? "bg-black" : "bg-neutral-900"
                    } flex items-center justify-around px-2 py-2`}
                  >
                    <div className="flex flex-col items-center">
                      <CheckCircle className="w-7 h-7 text-neutral-500 mb-1" />
                      <span className="text-neutral-500 text-xs">Todo</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <List className="w-7 h-7 text-white mb-1" />
                      <span className="text-white text-xs">
                        {t("common.checklist")}
                      </span>
                    </div>
                    <div className="flex flex-col items-center">
                      <Settings className="w-7 h-7 text-neutral-500 mb-1" />
                      <span className="text-neutral-500 text-xs">
                        {t("common.settings")}
                      </span>
                    </div>
                  </div>

                  {/* Home indicator */}
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-white rounded-full"></div>
                </div>

                {/* Screen reflection effect */}
                <div className="absolute inset-4 bg-gradient-to-t from-white/10 to-transparent rounded-[2.5rem] pointer-events-none"></div>
              </div>

              {/* Instructions */}
              <div className="text-center mt-6 space-y-2">
                <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                  {t("checklist.experienceTitle")}
                </p>
                <p className="text-xs text-neutral-500 dark:text-neutral-500">
                  {t("checklist.instructions")}
                </p>
              </div>
            </div>
          </div>

          {/* 左側：説明 */}
          <div className="order-2 lg:order-1 space-y-8">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                  <CheckSquare className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-100 mb-2">
                    {t("checklist.simpleCheckFeature")}
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {t("checklist.simpleCheckDescription")}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Plus className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-100 mb-2">
                    {t("checklist.addItemsAnytime")}
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {t("checklist.addItemsDescription")}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                  <RotateCcw className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-100 mb-2">
                    {t("checklist.oneClickReset")}
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {t("checklist.resetInstructions")}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Sparkles className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                <h4 className="text-lg font-bold text-blue-800 dark:text-blue-300">
                  {t("checklist.convenientFor")}
                </h4>
              </div>
              <ul className="space-y-2 text-blue-700 dark:text-blue-300">
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                  <span>{t("checklist.useCases.travelPrep")}</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                  <span>{t("checklist.useCases.shoppingList")}</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                  <span>{t("checklist.useCases.regularTasks")}</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                  <span>{t("checklist.useCases.eventPrep")}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* 公式ストアバッジ */}
        <div className="text-center mt-16">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="#"
              className="block transition-transform hover:scale-105"
              aria-label="App Store からダウンロード（申請中）"
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
              aria-label="Get it on Google Play（申請中）"
            >
              <img
                src="https://raw.githubusercontent.com/pioug/google-play-badges/main/svg/English.svg"
                alt="Get it on Google Play"
                className="h-[48px] w-auto"
              />
            </a>
          </div>

          {/* 申請中メッセージ */}
          <div className="mt-6">
            <div className="inline-flex items-center px-4 py-2 bg-primary-50 dark:bg-primary-900/20 rounded-lg border border-primary-200 dark:border-primary-700">
              <span className="text-sm text-primary-700 dark:text-primary-300">
                {t("common.applicationInProgress")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
