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
        t("useCases.habit.features.dailyHabits"),
        t("useCases.habit.features.routineTasks"),
        t("useCases.habit.features.continuousExecution"),
      ],
      mockupBg:
        "bg-gradient-to-br from-purple-100 to-pink-100 dark:bg-gradient-to-br dark:from-purple-900/30 dark:to-pink-900/30",
    },
  ];

  return (
    <section
      id="use-cases"
      className="py-8 sm:py-12 md:py-20 bg-gradient-to-b from-white to-warm-50 dark:from-neutral-900 dark:to-neutral-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-800 dark:text-white mb-2 sm:mb-3 md:mb-4">
            {t("useCases.title")}
          </h2>
          <p className="text-sm sm:text-base md:text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto hidden sm:block">
            {t("useCases.subtitle")}
          </p>
        </div>

        {/* Use Case Cards - Mobile: Stack, Desktop: Grid */}
        <div className="space-y-3 sm:space-y-4 md:space-y-0 md:grid md:grid-cols-2 md:gap-6 lg:gap-8">
          {useCases.map((useCase, index) => {
            const IconComponent = useCase.icon;
            return (
              <div
                key={useCase.id}
                className={`rounded-xl sm:rounded-2xl transition-all duration-300 overflow-hidden hover:shadow-lg border border-neutral-200 dark:border-neutral-700 ${useCase.bgColor}`}
              >
                <div className="p-4 sm:p-6 md:p-8">
                  {/* Header */}
                  <div className="flex items-start space-x-3 sm:space-x-4 mb-3 sm:mb-4 md:mb-6">
                    <div
                      className={`w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-r ${useCase.color} flex items-center justify-center flex-shrink-0`}
                    >
                      <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base sm:text-lg md:text-xl font-bold text-neutral-800 dark:text-white mb-1 sm:mb-2">
                        {useCase.title}
                      </h3>
                      <p className="text-xs sm:text-sm md:text-base text-neutral-600 dark:text-neutral-400 hidden sm:block">
                        {useCase.description}
                      </p>
                    </div>
                  </div>

                  {/* Features - Hidden on mobile to save space */}
                  <div className="hidden md:block mb-6">
                    <div className="grid grid-cols-1 gap-3">
                      {useCase.features.slice(0, 3).map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span className="text-sm text-neutral-600 dark:text-neutral-400">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tags - Mobile simplified */}
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {useCase.features.slice(0, 2).map((feature, idx) => (
                      <span
                        key={idx}
                        className="inline-block px-2 sm:px-3 py-1 bg-white dark:bg-neutral-700 text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 rounded-md sm:rounded-lg border border-neutral-200 dark:border-neutral-600 md:hidden"
                      >
                        {feature.split("・")[0]}{" "}
                        {/* モバイルでは最初の部分のみ */}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Button - Smaller on mobile */}
        <div className="text-center mt-8 sm:mt-12 md:mt-16">
          <button
            onClick={() => {
              const element = document.getElementById("download");
              if (element) {
                element.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="btn-primary px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 rounded-lg sm:rounded-xl font-medium text-sm sm:text-base md:text-lg"
          >
            {t("useCases.cta")}
          </button>
        </div>
      </div>
    </section>
  );
}
