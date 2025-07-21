"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import Image from "next/image";
import {
  Sunrise,
  Briefcase,
  Plane,
  Target,
  CheckCircle,
  Clock,
  Coffee,
  Laptop,
  Luggage,
  Calendar,
  Repeat,
  Zap,
} from "lucide-react";

export default function UseCasesSection() {
  const t = useTranslations();
  const [activeCase, setActiveCase] = useState(0);

  const useCases = [
    {
      id: "morning",
      icon: Sunrise,
      title: t("useCases.morning.title"),
      description: t("useCases.morning.description"),
      color: "from-orange-400 to-red-500",
      bgColor: "bg-orange-50 dark:bg-orange-900/20",
      scenario: t("useCases.morning.scenario"),
      tasks: [
        { text: t("useCases.morning.tasks.presentation"), completed: true },
        { text: t("useCases.morning.tasks.emails"), completed: true },
        { text: t("useCases.morning.tasks.priorities"), completed: false },
      ],
      features: [
        t("useCases.morning.features.focusMode"),
        t("useCases.morning.features.singleTask"),
        t("useCases.morning.features.progressVisualization"),
      ],
      mockupBg:
        "bg-gradient-to-br from-orange-100 to-red-100 dark:bg-gradient-to-br dark:from-orange-900/30 dark:to-red-900/30",
    },
    {
      id: "project",
      icon: Briefcase,
      title: t("useCases.project.title"),
      description: t("useCases.project.description"),
      color: "from-blue-500 to-indigo-600",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      scenario: t("useCases.project.scenario"),
      tasks: [
        { text: t("useCases.project.tasks.requirements"), completed: true },
        { text: t("useCases.project.tasks.uiReview"), completed: true },
        { text: t("useCases.project.tasks.devSetup"), completed: false },
      ],
      features: [
        t("useCases.project.features.checklist"),
        t("useCases.project.features.projectManagement"),
        t("useCases.project.features.progressTracking"),
      ],
      mockupBg:
        "bg-gradient-to-br from-blue-100 to-indigo-100 dark:bg-gradient-to-br dark:from-blue-900/30 dark:to-indigo-900/30",
    },
    {
      id: "travel",
      icon: Plane,
      title: t("useCases.travel.title"),
      description: t("useCases.travel.description"),
      color: "from-green-500 to-emerald-600",
      bgColor: "bg-green-50 dark:bg-green-900/20",
      scenario: t("useCases.travel.scenario"),
      tasks: [
        { text: t("useCases.travel.tasks.passportCheck"), completed: true },
        { text: t("useCases.travel.tasks.medicine"), completed: true },
        { text: t("useCases.travel.tasks.souvenirList"), completed: false },
      ],
      features: [
        t("useCases.travel.features.reusableTemplate"),
        t("useCases.travel.features.groupManagement"),
        t("useCases.travel.features.resetFunction"),
      ],
      mockupBg:
        "bg-gradient-to-br from-green-100 to-emerald-100 dark:bg-gradient-to-br dark:from-green-900/30 dark:to-emerald-900/30",
    },
    {
      id: "habit",
      icon: Target,
      title: t("useCases.habit.title"),
      description: t("useCases.habit.description"),
      color: "from-purple-500 to-pink-600",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
      scenario: t("useCases.habit.scenario"),
      tasks: [
        { text: t("useCases.habit.tasks.meditation"), completed: true },
        { text: t("useCases.habit.tasks.reading"), completed: true },
        { text: t("useCases.habit.tasks.workout"), completed: false },
      ],
      features: [
        t("useCases.habit.features.routineManagement"),
        t("useCases.habit.features.continuityTracking"),
        t("useCases.habit.features.motivationBoost"),
      ],
      mockupBg:
        "bg-gradient-to-br from-purple-100 to-pink-100 dark:bg-gradient-to-br dark:from-purple-900/30 dark:to-pink-900/30",
    },
  ];

  const additionalIcons = {
    coffee: Coffee,
    laptop: Laptop,
    luggage: Luggage,
    calendar: Calendar,
    repeat: Repeat,
    clock: Clock,
  };

  const currentCase = useCases[activeCase];

  return (
    <section id="use-cases" className="py-24 section-light-alt">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-6 py-3 bg-primary-500 text-white rounded-full text-sm font-medium mb-6 shadow-warm dark:shadow-navy animate-pulse-warm">
            <div className="relative w-5 h-5 mr-2 rounded-md overflow-hidden bg-white/20">
              <Image
                src="/app_icon_transparent.png"
                alt="TaskLap Icon"
                width={20}
                height={20}
                className="w-full h-full object-contain rounded-md"
              />
            </div>
            <span>{t("useCases.featureIntro")}</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-primary-contrast mb-6">
            {t("useCases.title")}
          </h2>
          <p className="text-xl text-secondary-contrast max-w-3xl mx-auto">
            {t("useCases.subtitle")}
          </p>
        </div>

        {/* Main Content - Interactive Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
          {/* Left: Use Case Selector */}
          <div className="space-y-6">
            {useCases.map((useCase, index) => (
              <div
                key={useCase.id}
                onClick={() => setActiveCase(index)}
                className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 transform hover:scale-102 ${
                  index === activeCase
                    ? `${useCase.bgColor} shadow-warm-lg dark:shadow-navy-lg border-2 border-primary-300 dark:border-primary-700`
                    : "bg-elevated hover:bg-elevated-alt border-2 border-transparent hover:border-primary-200 dark:hover:border-primary-700 shadow-warm dark:shadow-navy"
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div
                    className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${useCase.color} flex items-center justify-center shadow-warm dark:shadow-navy`}
                  >
                    <useCase.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3
                      className={`text-lg font-bold mb-2 ${
                        index === activeCase
                          ? "text-primary-contrast"
                          : "text-secondary-contrast"
                      }`}
                    >
                      {useCase.title}
                    </h3>
                    <p
                      className={`text-sm leading-relaxed ${
                        index === activeCase
                          ? "text-secondary-contrast"
                          : "text-muted-contrast"
                      }`}
                    >
                      {useCase.description}
                    </p>
                    {index === activeCase && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {useCase.features.map((feature, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-white/80 dark:bg-neutral-700/60 text-primary-contrast rounded-full text-xs font-medium"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Task List Display */}
          <div className="relative">
            {/* Task List Card */}
            <div
              className={`card p-8 ${currentCase.bgColor} border-2 border-primary-200 dark:border-primary-700`}
            >
              {/* Scenario Header */}
              <div className="mb-8">
                <div className="flex items-center space-x-4 mb-4">
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${currentCase.color} flex items-center justify-center shadow-warm dark:shadow-navy`}
                  >
                    <currentCase.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-primary-contrast mb-2">
                      {currentCase.title}
                    </h3>
                    <p className="text-secondary-contrast">
                      {currentCase.scenario}
                    </p>
                  </div>
                </div>

                {/* Progress Summary */}
                <div className="flex items-center justify-between bg-white/50 dark:bg-neutral-700/30 rounded-xl p-4">
                  <div className="flex items-center space-x-3 text-muted-contrast">
                    <Clock className="w-5 h-5" />
                    <span className="font-medium">
                      {t("useCases.inProgress")}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                    <span className="font-bold text-primary-contrast">
                      {currentCase.tasks.filter((t) => t.completed).length}/
                      {currentCase.tasks.length} {t("useCases.completed")}
                    </span>
                  </div>
                </div>
              </div>

              {/* Task List */}
              <div className="space-y-4 mb-8">
                {currentCase.tasks.map((task, index) => (
                  <div
                    key={index}
                    className={`flex items-center space-x-4 p-4 rounded-xl transition-all duration-300 ${
                      task.completed
                        ? "bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-700"
                        : "bg-white dark:bg-neutral-800 border-2 border-neutral-200 dark:border-neutral-600"
                    } shadow-warm dark:shadow-navy hover:shadow-warm-lg dark:hover:shadow-navy-lg`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                        task.completed
                          ? "bg-green-500 shadow-warm"
                          : "bg-neutral-300 dark:bg-neutral-600"
                      }`}
                    >
                      {task.completed && (
                        <CheckCircle className="w-5 h-5 text-white" />
                      )}
                    </div>
                    <span
                      className={`text-lg font-medium flex-1 ${
                        task.completed
                          ? "text-green-700 dark:text-green-300 line-through"
                          : "text-primary-contrast"
                      }`}
                    >
                      {task.text}
                    </span>
                  </div>
                ))}
              </div>

              {/* Features Tags */}
              <div className="flex flex-wrap gap-3 mb-6">
                {currentCase.features.map((feature, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium"
                  >
                    {feature}
                  </span>
                ))}
              </div>

              {/* Action Button */}
              <button className="w-full btn-primary py-4 rounded-xl font-semibold text-lg">
                {currentCase.id === "morning"
                  ? t("useCases.morning.cta")
                  : currentCase.id === "project"
                  ? t("useCases.project.cta")
                  : currentCase.id === "travel"
                  ? t("useCases.travel.cta")
                  : t("useCases.habit.cta")}
              </button>
            </div>

            {/* Use case indicators */}
            <div className="flex justify-center space-x-3 mt-8">
              {useCases.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveCase(index)}
                  className={`w-4 h-4 rounded-full transition-all duration-300 ${
                    index === activeCase
                      ? "bg-primary-500 dark:bg-primary-400 scale-125"
                      : "bg-neutral-300 dark:bg-neutral-600 hover:bg-primary-300 dark:hover:bg-primary-600"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {useCases.map((useCase, index) => (
            <div key={useCase.id} className="use-case-item card-hover">
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${useCase.color} flex items-center justify-center mb-4 shadow-warm dark:shadow-navy`}
              >
                <useCase.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-primary-contrast mb-2">
                {useCase.title}
              </h3>
              <p className="text-sm text-muted-contrast leading-relaxed">
                {useCase.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20">
          <div className="card p-8 md:p-12">
            <div className="flex items-center justify-center mb-6">
              <div className="relative w-16 h-16 rounded-3xl overflow-hidden shadow-warm dark:shadow-navy">
                <Image
                  src="/app_icon_transparent.png"
                  alt="TaskLap App Icon"
                  width={64}
                  height={64}
                  className="w-full h-full object-contain rounded-3xl"
                />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-primary-contrast mb-4">
              {t("useCases.findYourWay")}
            </h3>
            <p className="text-lg text-secondary-contrast mb-8 max-w-2xl mx-auto">
              {t("useCases.supportProductivity")}
            </p>
            <button
              onClick={() => {
                const element = document.getElementById("download");
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="btn-primary px-8 py-4 rounded-2xl font-semibold text-lg flex items-center space-x-3 mx-auto"
            >
              <Zap className="w-6 h-6" />
              <span>{t("useCases.cta")}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Background decorations - ネイビーダークモード対応 */}
      <div className="absolute top-40 left-10 w-20 h-20 bg-primary-200/30 dark:bg-primary-800/20 rounded-full opacity-60 animate-float"></div>
      <div
        className="absolute bottom-60 right-10 w-16 h-16 bg-accent-200/30 dark:bg-accent-800/20 rounded-full opacity-60 animate-float"
        style={{ animationDelay: "4s" }}
      ></div>
    </section>
  );
}
