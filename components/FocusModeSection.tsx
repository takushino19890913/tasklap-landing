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
      className="py-24 section-warm-alt overflow-hidden relative"
    >
      {/* TaskLapアプリ風の背景装飾 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary-200/30 dark:bg-primary-800/20 rounded-full opacity-60 animate-float"></div>
        <div
          className="absolute bottom-20 right-10 w-16 h-16 bg-warm-200/40 dark:bg-warm-800/20 rounded-full opacity-60 animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/2 right-20 w-12 h-12 bg-primary-300/30 dark:bg-primary-700/20 rounded-full opacity-60 animate-float"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header - TaskLapアプリ風 */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-6 py-3 bg-primary-500 text-white rounded-full text-sm font-medium mb-6 shadow-warm">
            <div className="relative w-5 h-5 mr-2 rounded-md overflow-hidden bg-white/20">
              <Image
                src="/app_icon_transparent.png"
                alt="TaskLap Icon"
                width={20}
                height={20}
                className="w-full h-full object-contain rounded-md "
              />
            </div>
            <span>{t("focusMode.featureIntro")}</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-100 mb-6">
            {t("focusMode.title")}
          </h2>
          <p className="text-xl text-primary-600 dark:text-primary-400 max-w-3xl mx-auto mb-8 font-medium">
            {t("focusMode.subtitle")}
          </p>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-4xl mx-auto leading-relaxed">
            {t("focusMode.description")}
          </p>
        </div>

        {/* Main Demo Section - TaskLapアプリの実際の画面を模倣 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Interactive Demo - TaskLapアプリのフォーカスモード画面 */}
          <div className="order-2 lg:order-1">
            <div className="max-w-sm mx-auto">
              {/* TaskLap App Frame */}
              <div className="relative rounded-[3rem] p-4 shadow-2xl bg-black">
                {/* Phone Screen */}
                <div
                  className={`rounded-[2.5rem] overflow-hidden aspect-[9/19.5] relative flex flex-col ${
                    currentMode === "dark"
                      ? "bg-gradient-to-br from-slate-800 to-slate-900"
                      : "bg-gradient-to-br from-orange-50 to-orange-100"
                  }`}
                >
                  {/* Status Bar */}
                  <div
                    className={`h-16 flex items-center justify-center ${
                      currentMode === "dark" ? "bg-black" : "bg-neutral-900"
                    }`}
                  >
                    <div className="text-white text-xl font-semibold">Todo</div>
                    <div className="absolute right-6">
                      <Info className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  {/* Navigation Header */}
                  <div className="px-6 py-4 flex items-center">
                    <ArrowLeft
                      className={`w-6 h-6 ${
                        currentMode === "dark"
                          ? "text-white"
                          : "text-neutral-800"
                      } mr-4`}
                    />
                    <div className="flex items-center">
                      <div className="w-3 h-5 bg-orange-500 rounded-sm mr-3"></div>
                      <span
                        className={`text-lg font-medium ${
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
                  <div className="text-center px-6 py-6">
                    <div className="text-7xl font-bold mb-2 leading-none">
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
                      className={`text-lg ${
                        currentMode === "dark"
                          ? "text-neutral-400"
                          : "text-neutral-600"
                      }`}
                    >
                      {progress}% {t("focusMode.completed")}
                    </div>
                  </div>

                  {/* Current Task Card */}
                  <div className="px-6 flex-1 flex items-center justify-center py-6">
                    {!isAllCompleted ? (
                      <div
                        className={`w-full max-w-sm p-6 rounded-3xl shadow-lg ${
                          currentMode === "dark"
                            ? "bg-slate-700/50 border border-slate-600"
                            : "bg-white border border-orange-100"
                        }`}
                      >
                        <div className="text-center">
                          <div
                            className={`w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 ${
                              currentMode === "dark"
                                ? "bg-orange-500/20"
                                : "bg-orange-100"
                            }`}
                          >
                            <CheckSquare
                              className={`w-10 h-10 ${
                                currentMode === "dark"
                                  ? "text-orange-400"
                                  : "text-orange-600"
                              }`}
                            />
                          </div>
                          <h3
                            className={`text-xl font-medium leading-relaxed ${
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
                      <div className="text-center p-6">
                        <div
                          className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 ${
                            currentMode === "dark"
                              ? "bg-green-500/20"
                              : "bg-green-100"
                          }`}
                        >
                          <CheckCircle
                            className={`w-12 h-12 ${
                              currentMode === "dark"
                                ? "text-green-400"
                                : "text-green-600"
                            }`}
                          />
                        </div>
                        <h3
                          className={`text-2xl font-bold mb-4 ${
                            currentMode === "dark"
                              ? "text-green-400"
                              : "text-green-600"
                          }`}
                        >
                          {t("focusMode.congratulations")}
                        </h3>
                        <p
                          className={`text-base ${
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
                  <div className="px-6 pb-6 pt-4 flex space-x-4">
                    {!isAllCompleted ? (
                      <>
                        {/* Skip Button */}
                        <button
                          onClick={handleSkip}
                          className={`flex-1 py-4 rounded-2xl border-2 font-semibold text-lg flex items-center justify-center space-x-2 transition-all ${
                            currentMode === "dark"
                              ? "bg-transparent border-orange-500 text-orange-400 hover:bg-orange-500/10"
                              : "bg-white border-orange-500 text-orange-600 hover:bg-orange-50"
                          }`}
                        >
                          <SkipForward className="w-5 h-5" />
                          <span>{t("focusMode.skip")}</span>
                        </button>

                        {/* Complete Button */}
                        <button
                          onClick={handleComplete}
                          className="flex-1 py-4 rounded-2xl bg-green-500 hover:bg-green-600 text-white font-semibold text-lg flex items-center justify-center space-x-2 transition-all"
                        >
                          <CheckCircle className="w-5 h-5" />
                          <span>{t("focusMode.complete")}</span>
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={reset}
                        className="w-full py-4 rounded-2xl bg-primary-500 hover:bg-primary-600 text-white font-semibold text-lg transition-all"
                      >
                        もう一度体験する
                      </button>
                    )}
                  </div>

                  {/* Spacer to push tab navigation to bottom */}
                  <div className="flex-1 min-h-[40px]"></div>

                  {/* Bottom Navigation */}
                  <div
                    className={`h-20 ${
                      currentMode === "dark" ? "bg-black" : "bg-neutral-900"
                    } flex items-center justify-around px-2 py-2`}
                  >
                    <div className="flex flex-col items-center">
                      <CheckCircle className="w-7 h-7 text-white mb-1" />
                      <span className="text-white text-xs">Todo</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <List className="w-7 h-7 text-neutral-500 mb-1" />
                      <span className="text-neutral-500 text-xs">
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
                  {t("focusMode.actualScreenCaption")}
                </p>
                <p className="text-xs text-neutral-500 dark:text-neutral-500">
                  {t("focusMode.tryTapping")}
                </p>
              </div>
            </div>
          </div>

          {/* Feature Description - TaskLapアプリ風 */}
          <div className="order-1 lg:order-2 space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {focusFeatures.map((feature, index) => (
                <div key={index} className="card p-6 card-hover">
                  <div
                    className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-4`}
                  >
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-neutral-800 dark:text-neutral-200 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Benefits Section - TaskLapアプリ風 */}
        <div className="card p-8 md:p-12">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-neutral-800 dark:text-neutral-200 mb-4">
              {t("focusMode.benefits.title")}
            </h3>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              {t("focusMode.benefitsSubtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center p-6">
                <div
                  className={`w-16 h-16 ${benefit.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}
                >
                  <benefit.icon className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200">
                  {benefit.title}
                </h4>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action - TaskLapアプリ風 */}
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
