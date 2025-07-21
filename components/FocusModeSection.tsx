"use client";

import { useTranslations, useLocale } from "next-intl";
import { useState } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";
import {
  Target,
  CheckCircle,
  SkipForward,
  TrendingUp,
  Brain,
  Clock,
  Zap,
  ArrowRight,
  ArrowLeft,
  Info,
  CheckSquare,
  List,
  Settings,
} from "lucide-react";

type SupportedLocale = "ja" | "en" | "fr" | "ko" | "zh" | "es" | "pt" | "de";

export default function FocusModeSection() {
  const t = useTranslations();
  const locale = useLocale() as SupportedLocale;
  const { theme } = useTheme();

  const focusFeatures = [
    {
      icon: Target,
      title: t("focusMode.features.oneTask.title"),
      description: t("focusMode.features.oneTask.description"),
      color: "from-primary-400 to-primary-600",
    },
    {
      icon: CheckCircle,
      title: t("focusMode.features.simpleChoice.title"),
      description: t("focusMode.features.simpleChoice.description"),
      color: "from-green-400 to-green-600",
    },
    {
      icon: TrendingUp,
      title: t("focusMode.features.beautifulProgress.title"),
      description: t("focusMode.features.beautifulProgress.description"),
      color: "from-warm-400 to-warm-600",
    },
    {
      icon: ArrowRight,
      title: t("focusMode.features.smartContinue.title"),
      description: t("focusMode.features.smartContinue.description"),
      color: "from-primary-500 to-primary-700",
    },
  ];

  const benefits = [
    {
      icon: Brain,
      title: t("focusMode.benefits.items.decisionFatigue"),
      color:
        "bg-primary-100 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400",
    },
    {
      icon: Clock,
      title: t("focusMode.benefits.items.focusDuration"),
      color:
        "bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400",
    },
    {
      icon: TrendingUp,
      title: t("focusMode.benefits.items.completionRate"),
      color: "bg-warm-100 dark:bg-warm-900/20 text-warm-600 dark:text-warm-400",
    },
    {
      icon: Zap,
      title: t("focusMode.benefits.items.stressReduction"),
      color:
        "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400",
    },
  ];

  // 実際のタスクサンプル（各言語対応）
  const getLocalizedTasks = () => {
    const tasksByLocale: { [key in SupportedLocale]: string[] } = {
      ja: [
        "四半期プレゼンテーションの準備",
        "チームの成果レビュー",
        "来週のミーティング資料作成",
        "プロジェクト進捗報告書",
        "クライアント提案書の最終確認",
      ],
      en: [
        "Quarterly presentation preparation",
        "Team performance review",
        "Next week's meeting materials",
        "Project progress report",
        "Final client proposal review",
      ],
      fr: [
        "Préparation présentation trimestrielle",
        "Révision performance équipe",
        "Matériaux réunion semaine prochaine",
        "Rapport progression projet",
        "Révision finale proposition client",
      ],
      ko: [
        "분기별 프레젠테이션 준비",
        "팀 성과 검토",
        "다음 주 회의 자료 작성",
        "프로젝트 진행 보고서",
        "클라이언트 제안서 최종 검토",
      ],
      zh: [
        "季度报告准备",
        "团队绩效评估",
        "下周会议资料",
        "项目进度报告",
        "客户提案最终确认",
      ],
      es: [
        "Preparación presentación trimestral",
        "Revisión rendimiento equipo",
        "Materiales reunión próxima semana",
        "Informe progreso proyecto",
        "Revisión final propuesta cliente",
      ],
      pt: [
        "Preparação apresentação trimestral",
        "Revisão desempenho equipe",
        "Materiais reunião próxima semana",
        "Relatório progresso projeto",
        "Revisão final proposta cliente",
      ],
      de: [
        "Quartalspräsentation Vorbereitung",
        "Team Leistungsüberprüfung",
        "Nächste Woche Meeting Materialien",
        "Projekt Fortschrittsbericht",
        "Finale Kundenvorschlag Überprüfung",
      ],
    };
    return tasksByLocale[locale] || tasksByLocale.ja;
  };

  const tasks = getLocalizedTasks();
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [completedTasks, setCompletedTasks] = useState<number[]>([]);

  const currentMode = theme === "light" ? "light" : "dark";
  const progress = Math.round((completedTasks.length / tasks.length) * 100);
  const isAllCompleted = completedTasks.length === tasks.length;

  const handleComplete = () => {
    const newCompletedTasks = [...completedTasks, currentTaskIndex];
    setCompletedTasks(newCompletedTasks);

    // 次の未完了タスクを探す
    findNextIncompleteTask(newCompletedTasks);
  };

  const handleSkip = () => {
    // スキップの場合はcompletedTasksに追加しない
    findNextIncompleteTask(completedTasks);
  };

  const findNextIncompleteTask = (completed: number[]) => {
    // 現在のタスクの次から検索
    let nextIndex = (currentTaskIndex + 1) % tasks.length;
    let searchCount = 0;

    // 一周するまで未完了タスクを探す
    while (searchCount < tasks.length) {
      if (!completed.includes(nextIndex)) {
        setCurrentTaskIndex(nextIndex);
        return;
      }
      nextIndex = (nextIndex + 1) % tasks.length;
      searchCount++;
    }

    // 全タスク完了の場合は完了画面に遷移（currentTaskIndexはそのまま）
  };

  const reset = () => {
    setCurrentTaskIndex(0);
    setCompletedTasks([]);
  };

  return (
    <section
      id="focus-mode"
      className="py-8 sm:py-12 md:py-20 bg-white dark:bg-neutral-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-800 dark:text-white mb-2 sm:mb-3 md:mb-4">
            {t("focusMode.title")}
          </h2>
          <p className="text-sm sm:text-base md:text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto hidden sm:block">
            {t("focusMode.subtitle")}
          </p>
        </div>

        {/* Experience Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center">
          {/* Interactive Experience */}
          <div className="lg:order-2">
            <div className="relative max-w-[280px] sm:max-w-xs md:max-w-sm mx-auto">
              {/* iPhone Mockup - Unified with Hero Section */}
              <div className="relative w-full bg-black rounded-[2rem] sm:rounded-[2.5rem] md:rounded-[3rem] p-2.5 sm:p-3 md:p-4 shadow-warm-xl">
                <div className="w-full h-full bg-neutral-900 dark:bg-neutral-800 rounded-[1.5rem] sm:rounded-[2rem] md:rounded-[2.5rem] overflow-hidden aspect-[9/19.5] relative flex flex-col">
                  {/* Status Bar */}
                  <div
                    className={`h-10 sm:h-12 md:h-14 flex items-center justify-center ${
                      currentMode === "dark" ? "bg-black" : "bg-neutral-900"
                    }`}
                  >
                    <div className="text-white text-sm sm:text-base md:text-lg font-semibold">
                      Todo
                    </div>
                    <div className="absolute right-3 sm:right-4 md:right-5">
                      <Info className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white" />
                    </div>
                  </div>

                  {/* Navigation Header */}
                  <div className="px-3 sm:px-4 md:px-5 py-2.5 sm:py-3 md:py-3.5 flex items-center">
                    <ArrowLeft
                      className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 ${
                        currentMode === "dark"
                          ? "text-white"
                          : "text-neutral-800"
                      } mr-2.5 sm:mr-3 md:mr-3.5`}
                    />
                    <div className="flex items-center">
                      <div className="w-2 h-3 sm:w-2.5 sm:h-4 md:w-3 md:h-4.5 bg-orange-500 rounded-sm mr-2 sm:mr-2.5 md:mr-3"></div>
                      <span
                        className={`text-sm sm:text-base md:text-lg font-medium ${
                          currentMode === "dark"
                            ? "text-orange-400"
                            : "text-orange-600"
                        }`}
                      >
                        {t("focusMode.workCategory")}
                      </span>
                    </div>
                  </div>

                  {/* Progress Display */}
                  <div className="text-center px-3 sm:px-4 md:px-5 py-3 sm:py-4 md:py-5">
                    <div className="text-4xl sm:text-5xl md:text-6xl font-bold mb-1.5 sm:mb-2 md:mb-2.5 leading-none">
                      <span className="text-orange-500">
                        {completedTasks.length}
                      </span>
                      <span
                        className={`${
                          currentMode === "dark"
                            ? "text-neutral-400"
                            : "text-neutral-600"
                        }`}
                      >
                        {" "}
                        / {tasks.length}
                      </span>
                    </div>
                    <div
                      className={`text-xs sm:text-sm md:text-base ${
                        currentMode === "dark"
                          ? "text-neutral-400"
                          : "text-neutral-600"
                      }`}
                    >
                      {progress}% {t("focusMode.completed")}
                    </div>
                  </div>

                  {/* Current Task Card */}
                  <div className="px-3 sm:px-4 md:px-5 flex-1 flex items-center justify-center py-3 sm:py-4 md:py-5">
                    {!isAllCompleted ? (
                      <div
                        className={`w-full max-w-sm p-3 sm:p-4 md:p-5 rounded-xl sm:rounded-2xl md:rounded-3xl shadow-lg ${
                          currentMode === "dark"
                            ? "bg-slate-700/50 border border-slate-600"
                            : "bg-white border border-orange-100"
                        }`}
                      >
                        <div className="text-center">
                          <div
                            className={`w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-xl sm:rounded-2xl md:rounded-3xl flex items-center justify-center mx-auto mb-3 sm:mb-4 md:mb-5 ${
                              currentMode === "dark"
                                ? "bg-orange-500/20"
                                : "bg-orange-100"
                            }`}
                          >
                            <CheckSquare
                              className={`w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 ${
                                currentMode === "dark"
                                  ? "text-orange-400"
                                  : "text-orange-600"
                              }`}
                            />
                          </div>
                          <h3
                            className={`text-sm sm:text-base md:text-lg font-medium leading-relaxed ${
                              currentMode === "dark"
                                ? "text-white"
                                : "text-neutral-800"
                            }`}
                          >
                            {tasks[currentTaskIndex]}
                          </h3>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center p-3 sm:p-4 md:p-5">
                        <div
                          className={`w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 md:mb-5 ${
                            currentMode === "dark"
                              ? "bg-green-500/20"
                              : "bg-green-100"
                          }`}
                        >
                          <CheckCircle
                            className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 ${
                              currentMode === "dark"
                                ? "text-green-400"
                                : "text-green-600"
                            }`}
                          />
                        </div>
                        <h3
                          className={`text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 md:mb-4 ${
                            currentMode === "dark"
                              ? "text-green-400"
                              : "text-green-600"
                          }`}
                        >
                          {t("focusMode.congratulations")}
                        </h3>
                        <p
                          className={`text-sm sm:text-base md:text-lg ${
                            currentMode === "dark"
                              ? "text-neutral-400"
                              : "text-neutral-600"
                          }`}
                        >
                          {completedTasks.length}{" "}
                          {t("focusMode.tasksCompleted")}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="px-2.5 sm:px-3 md:px-4 pb-2.5 sm:pb-3 md:pb-4 pt-2 sm:pt-2.5 md:pt-3 flex space-x-2 sm:space-x-3">
                    {!isAllCompleted ? (
                      <>
                        {/* Skip Button */}
                        <button
                          onClick={handleSkip}
                          className={`flex-1 py-2.5 sm:py-3 md:py-3.5 rounded-lg sm:rounded-xl md:rounded-2xl border-2 font-semibold text-xs sm:text-sm md:text-base flex items-center justify-center space-x-1.5 sm:space-x-2 transition-all ${
                            currentMode === "dark"
                              ? "bg-transparent border-orange-500 text-orange-400 hover:bg-orange-500/10"
                              : "bg-white border-orange-500 text-orange-600 hover:bg-orange-50"
                          }`}
                        >
                          <SkipForward className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                          <span>{t("focusMode.skip")}</span>
                        </button>

                        {/* Complete Button */}
                        <button
                          onClick={handleComplete}
                          className="flex-1 py-2.5 sm:py-3 md:py-3.5 rounded-lg sm:rounded-xl md:rounded-2xl bg-green-500 hover:bg-green-600 text-white font-semibold text-xs sm:text-sm md:text-base flex items-center justify-center space-x-1.5 sm:space-x-2 transition-all"
                        >
                          <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                          <span>{t("focusMode.complete")}</span>
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={reset}
                        className="w-full py-2.5 sm:py-3 md:py-3.5 rounded-lg sm:rounded-xl md:rounded-2xl bg-primary-500 hover:bg-primary-600 text-white font-semibold text-xs sm:text-sm md:text-base transition-all"
                      >
                        もう一度体験する
                      </button>
                    )}
                  </div>

                  {/* Spacer to push tab navigation to bottom */}
                  <div className="flex-1 min-h-[20px] sm:min-h-[30px] md:min-h-[35px]"></div>

                  {/* Bottom Navigation */}
                  <div
                    className={`h-14 sm:h-16 md:h-18 ${
                      currentMode === "dark" ? "bg-black" : "bg-neutral-900"
                    } flex items-center justify-around px-2 py-1.5`}
                  >
                    <div className="flex flex-col items-center">
                      <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white mb-0.5 sm:mb-1" />
                      <span className="text-white text-xs sm:text-sm">
                        Todo
                      </span>
                    </div>
                    <div className="flex flex-col items-center">
                      <List className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-neutral-500 mb-0.5 sm:mb-1" />
                      <span className="text-neutral-500 text-xs sm:text-sm">
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
                  {t("focusMode.actualScreenCaption")}
                </p>
                <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-500">
                  {t("focusMode.tryTapping")}
                </p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="lg:order-1">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-neutral-800 dark:text-white mb-3 sm:mb-4 md:mb-6">
              {t("focusMode.experienceTitle")}
            </h3>
            <p className="text-sm sm:text-base md:text-lg text-neutral-600 dark:text-neutral-400 mb-4 sm:mb-6 md:mb-8 leading-relaxed hidden sm:block">
              {t("focusMode.experienceDescription")}
            </p>

            {/* Benefits - Simplified on mobile */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
              <div className="flex items-start space-x-2 sm:space-x-3">
                <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center mt-0.5">
                  <Target className="w-3 h-3 sm:w-4 sm:h-4 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-neutral-800 dark:text-white text-sm sm:text-base">
                    {t("focusMode.benefits.singleTask.title")}
                  </h4>
                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 hidden sm:block">
                    {t("focusMode.benefits.singleTask.description")}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-2 sm:space-x-3">
                <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mt-0.5">
                  <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-neutral-800 dark:text-white text-sm sm:text-base">
                    {t("focusMode.benefits.simpleChoice.title")}
                  </h4>
                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 hidden sm:block">
                    {t("focusMode.benefits.simpleChoice.description")}
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
