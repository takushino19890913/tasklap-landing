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
      className="py-8 sm:py-12 md:py-20 bg-gradient-to-b from-blue-50 to-white dark:from-neutral-800 dark:to-neutral-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-800 dark:text-white mb-2 sm:mb-3 md:mb-4">
            {t("checklist.title")}
          </h2>
          <p className="text-sm sm:text-base md:text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto hidden sm:block">
            {t("checklist.subtitle")}
          </p>
        </div>

        {/* Experience Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center">
          {/* Interactive Experience */}
          <div>
            <div className="relative max-w-[280px] sm:max-w-xs md:max-w-sm mx-auto">
              {/* iPhone Mockup - Unified with Hero Section */}
              <div className="relative w-full bg-black rounded-[2rem] sm:rounded-[2.5rem] md:rounded-[3rem] p-2.5 sm:p-3 md:p-4 shadow-warm-xl">
                <div className="w-full h-full bg-white dark:bg-neutral-800 rounded-[1.5rem] sm:rounded-[2rem] md:rounded-[2.5rem] overflow-hidden aspect-[9/19.5] relative flex flex-col">
                  {/* Status Bar */}
                  <div
                    className={`h-10 sm:h-12 md:h-14 flex items-center justify-center ${
                      currentMode === "dark" ? "bg-black" : "bg-neutral-900"
                    }`}
                  >
                    <div className="text-white text-sm sm:text-base md:text-lg font-semibold">
                      {t("checklist.checklistTitle")}
                    </div>
                    <div className="absolute right-3 sm:right-4 md:right-5">
                      <Info className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white" />
                    </div>
                  </div>

                  {/* Navigation Header */}
                  <div
                    className={`px-3 sm:px-4 md:px-5 py-2.5 sm:py-3 md:py-3.5 ${
                      currentMode === "dark" ? "bg-slate-800" : "bg-blue-50"
                    } border-b ${
                      currentMode === "dark"
                        ? "border-slate-700"
                        : "border-blue-200"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <h3
                        className={`text-sm sm:text-base md:text-lg font-bold ${
                          currentMode === "dark"
                            ? "text-white"
                            : "text-slate-800"
                        }`}
                      >
                        {t("checklist.travelListTitle")}
                      </h3>
                      <div className="flex items-center space-x-1.5 sm:space-x-2 md:space-x-2.5">
                        <div className="flex items-center space-x-1 sm:space-x-1.5">
                          <span
                            className={`text-xs sm:text-sm md:text-base font-medium ${
                              currentMode === "dark"
                                ? "text-slate-300"
                                : "text-slate-600"
                            }`}
                          >
                            {completedCount}/{items.length}
                          </span>
                          <div
                            className={`w-12 sm:w-14 md:w-16 h-1.5 sm:h-2 md:h-2.5 ${
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
                          className={`p-1 sm:p-1.5 md:p-2 rounded-lg transition-colors ${
                            currentMode === "dark"
                              ? "bg-slate-700 hover:bg-slate-600 text-slate-300"
                              : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                          }`}
                          title={t("checklist.resetTitle")}
                        >
                          <RotateCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Content Area */}
                  <div className="px-3 sm:px-4 md:px-5 flex-1 flex flex-col py-2.5 sm:py-3 md:py-3.5 min-h-64 sm:min-h-80 md:min-h-96">
                    {showResetAnimation ? (
                      <div className="flex-1 flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                            <RefreshCw className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-blue-500 animate-spin" />
                          </div>
                          <h3
                            className={`text-sm sm:text-base md:text-lg font-medium mb-2 sm:mb-3 ${
                              currentMode === "dark"
                                ? "text-white"
                                : "text-slate-800"
                            }`}
                          >
                            {t("checklist.resetting")}
                          </h3>
                          <p
                            className={`text-xs sm:text-sm md:text-base ${
                              currentMode === "dark"
                                ? "text-slate-400"
                                : "text-slate-600"
                            }`}
                          >
                            {t("checklist.resettingDescription")}
                          </p>
                        </div>
                      </div>
                    ) : isAllCompleted ? (
                      <div className="flex-1 flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-primary-500/20 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                            <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-primary-500" />
                          </div>
                          <h3
                            className={`text-sm sm:text-base md:text-lg font-medium mb-3 sm:mb-4 ${
                              currentMode === "dark"
                                ? "text-white"
                                : "text-slate-800"
                            }`}
                          >
                            {t("checklist.completedTitle")}
                          </h3>
                          <p
                            className={`text-xs sm:text-sm md:text-base mb-4 sm:mb-5 ${
                              currentMode === "dark"
                                ? "text-slate-400"
                                : "text-slate-600"
                            }`}
                          >
                            {t("checklist.resetQuestion")}
                          </p>
                          <button
                            onClick={resetChecklist}
                            className="px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg sm:rounded-xl font-medium text-xs sm:text-sm md:text-base transition-colors flex items-center space-x-1.5 sm:space-x-2 mx-auto"
                          >
                            <RotateCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                            <span>{t("checklist.resetAndReuse")}</span>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        {/* Checklist Items */}
                        <div className="space-y-2.5 sm:space-y-3 md:space-y-3.5 flex-1">
                          {items.map((item) => (
                            <div
                              key={item.id}
                              onClick={() => toggleItem(item.id)}
                              className={`flex items-center space-x-2.5 sm:space-x-3 md:space-x-3.5 p-2.5 sm:p-3 md:p-3.5 rounded-lg sm:rounded-xl cursor-pointer transition-all duration-300 ${
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
                                className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 rounded-md sm:rounded-lg flex items-center justify-center transition-all duration-300 ${
                                  item.completed
                                    ? "bg-primary-500"
                                    : currentMode === "dark"
                                    ? "bg-slate-600 border border-slate-500"
                                    : "bg-white border-2 border-blue-300"
                                }`}
                              >
                                {item.completed && (
                                  <CheckCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-white" />
                                )}
                              </div>
                              <span
                                className={`text-xs sm:text-sm md:text-base font-medium transition-all duration-300 ${
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
                        <div className="mt-3 sm:mt-4 md:mt-4.5">
                          <div className="flex space-x-1.5 sm:space-x-2 md:space-x-2.5">
                            <input
                              type="text"
                              value={newItemText}
                              onChange={(e) => setNewItemText(e.target.value)}
                              onKeyPress={(e) =>
                                e.key === "Enter" && addNewItem()
                              }
                              placeholder={t("checklist.newItemPlaceholder")}
                              className={`flex-1 px-2.5 sm:px-3 md:px-3.5 py-2 sm:py-2.5 md:py-3 rounded-md sm:rounded-lg text-xs sm:text-sm md:text-base ${
                                currentMode === "dark"
                                  ? "bg-slate-700 text-white border border-slate-600 placeholder:text-slate-400"
                                  : "bg-white text-slate-800 border border-blue-200 placeholder:text-slate-500"
                              }`}
                            />
                            <button
                              onClick={addNewItem}
                              disabled={!newItemText.trim()}
                              className={`px-2.5 sm:px-3 md:px-3.5 py-2 sm:py-2.5 md:py-3 rounded-md sm:rounded-lg transition-colors ${
                                newItemText.trim()
                                  ? "bg-primary-500 hover:bg-primary-600 text-white"
                                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
                              }`}
                            >
                              <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Tab Bar */}
                  <div
                    className={`h-14 sm:h-16 md:h-18 ${
                      currentMode === "dark" ? "bg-black" : "bg-neutral-900"
                    } flex items-center justify-around px-2 py-1.5`}
                  >
                    <div className="flex flex-col items-center">
                      <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-neutral-500 mb-0.5 sm:mb-1" />
                      <span className="text-neutral-500 text-xs sm:text-sm">
                        Todo
                      </span>
                    </div>
                    <div className="flex flex-col items-center">
                      <List className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white mb-0.5 sm:mb-1" />
                      <span className="text-white text-xs sm:text-sm">
                        {t("common.checklist")}
                      </span>
                    </div>
                    <div className="flex flex-col items-center">
                      <Settings className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-neutral-500 mb-0.5 sm:mb-1" />
                      <span className="text-neutral-500 text-xs sm:text-sm">
                        {t("common.settings")}
                      </span>
                    </div>
                  </div>

                  {/* Home indicator */}
                  <div className="absolute bottom-1.5 sm:bottom-2 md:bottom-2.5 left-1/2 transform -translate-x-1/2 w-24 sm:w-28 md:w-32 h-1 bg-white rounded-full"></div>
                </div>
              </div>

              {/* Instructions */}
              <div className="text-center mt-3 sm:mt-4 md:mt-6 space-y-1.5 sm:space-y-2">
                <p className="text-neutral-600 dark:text-neutral-400 text-xs sm:text-sm md:text-base">
                  {t("checklist.actualScreenCaption")}
                </p>
                <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-500">
                  {t("checklist.tryInteracting")}
                </p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-neutral-800 dark:text-white mb-3 sm:mb-4 md:mb-6">
              {t("checklist.experienceTitle")}
            </h3>
            <p className="text-sm sm:text-base md:text-lg text-neutral-600 dark:text-neutral-400 mb-4 sm:mb-6 md:mb-8 leading-relaxed hidden sm:block">
              {t("checklist.experienceDescription")}
            </p>

            {/* Benefits - Simplified on mobile */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
              <div className="flex items-start space-x-2 sm:space-x-3">
                <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mt-0.5">
                  <List className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-neutral-800 dark:text-white text-sm sm:text-base">
                    {t("checklist.benefits.reusable.title")}
                  </h4>
                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 hidden sm:block">
                    {t("checklist.benefits.reusable.description")}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-2 sm:space-x-3">
                <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mt-0.5">
                  <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-neutral-800 dark:text-white text-sm sm:text-base">
                    {t("checklist.benefits.flexible.title")}
                  </h4>
                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 hidden sm:block">
                    {t("checklist.benefits.flexible.description")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
