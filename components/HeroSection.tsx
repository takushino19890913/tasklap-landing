"use client";

import { useTranslations, useLocale } from "next-intl";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Play,
  Star,
  Users,
  Zap,
  CheckCircle,
  Target,
  Calendar,
  List,
  Sun,
  Moon,
} from "lucide-react";

type SupportedLocale = "ja" | "en" | "fr" | "ko" | "zh" | "es" | "pt" | "de";

export default function HeroSection() {
  const t = useTranslations();
  const locale = useLocale() as SupportedLocale;
  const { theme } = useTheme();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState<Set<string>>(new Set());
  const [abortController, setAbortController] =
    useState<AbortController | null>(null);
  const [isLanguageSwitching, setIsLanguageSwitching] = useState(false);

  // スクリーンショットファイル名のマッピング
  const getScreenshotFiles = (
    language: SupportedLocale,
    mode: "dark" | "light"
  ): string[] => {
    const basePath = "/screenshots/Iphone/";
    const fileNumbers: {
      [key in SupportedLocale]: { dark: string[]; light: string[] };
    } = {
      ja: {
        dark: ["3810", "3811", "3812", "3813"],
        light: ["3814", "3815", "3816", "3817"],
      },
      en: {
        dark: ["3818", "3819", "3821", "3822"],
        light: ["3823", "3824", "3825", "3826"],
      },
      fr: {
        dark: ["3829", "3830", "3831", "3832"],
        light: ["3833", "3835", "3836", "3837"],
      },
      es: {
        dark: ["3856", "3857", "3858", "3859"],
        light: ["3860", "3861", "3862", "3863"],
      },
      de: {
        dark: ["3875", "3876", "3877", "3879"],
        light: ["3880", "3881", "3882", "3883"],
      },
      ko: {
        dark: ["3842", "3843", "3844", "3846"],
        light: ["3838", "3839", "3841", "3847"],
      },
      zh: {
        dark: ["3852", "3853", "3854", "3855"],
        light: ["3848", "3849", "3850", "3851"],
      },
      pt: {
        dark: ["3864", "3865", "3866", "3868"],
        light: ["3869", "3870", "3871", "3872"],
      },
    };

    return fileNumbers[language][mode].map(
      (num) => `${basePath}${language}_${mode}_${num}.PNG`
    );
  };

  // 現在のテーマに基づいてスクリーンショットを動的に生成
  const getCurrentScreenshots = () => {
    // テーマがsystemの場合はdarkをデフォルトにする
    const currentMode = theme === "light" ? "light" : "dark";
    const oppositeMode = currentMode === "dark" ? "light" : "dark";

    const currentModeImages = getScreenshotFiles(locale, currentMode);
    const oppositeModeImages = getScreenshotFiles(locale, oppositeMode);

    // 4枚は現在のモード、5枚目は反対のモード（モード切り替えを示すため）
    const screenshotPaths = [
      ...currentModeImages,
      oppositeModeImages[0], // 反対モードの1枚目を5枚目として使用
    ];

    // スクリーンショットオブジェクトを生成
    return screenshotPaths.map((src, index) => ({
      id: index + 1,
      src,
      title:
        index < 4
          ? `${t("common.screenshot")} ${index + 1}`
          : `${
              oppositeMode === "dark" ? t("common.dark") : t("common.light")
            }${t("common.modeSwitch")}`,
      alt: `TaskLap ${locale} ${
        index < 4 ? currentMode : oppositeMode
      } screenshot ${index + 1}`,
    }));
  };

  const screenshots = getCurrentScreenshots();
  const isLastSlide = currentSlide === screenshots.length - 1;
  const currentMode = theme === "light" ? "light" : "dark";
  const oppositeMode = currentMode === "dark" ? "light" : "dark";

  // 画像読み込み完了チェック
  const isCurrentImageLoaded = screenshots[currentSlide]
    ? imagesLoaded.has(screenshots[currentSlide].src)
    : false;

  // 次のスライドが読み込み完了しているかチェック
  const nextSlideIndex = (currentSlide + 1) % screenshots.length;
  const isNextImageLoaded = screenshots[nextSlideIndex]
    ? imagesLoaded.has(screenshots[nextSlideIndex].src)
    : false;

  // バックグラウンド一括プリロード（起動時 & 優先ダウンロード完了後）
  useEffect(() => {
    const backgroundPreload = () => {
      // 言語切り替え中は一括プリロードを実行しない
      if (isLanguageSwitching) return;

      const allLanguages: SupportedLocale[] = [
        "ja",
        "en",
        "fr",
        "ko",
        "zh",
        "es",
        "pt",
        "de",
      ];
      const allModes: ("dark" | "light")[] = ["dark", "light"];

      // 優先ダウンロード用のリンクは保持し、それ以外をクリア
      const existingLinks = document.querySelectorAll(
        'link[rel="preload"][data-screenshot-preload="true"]:not([data-priority-switch="true"])'
      );
      existingLinks.forEach((link) => link.remove());

      // すべての組み合わせの画像URLを生成
      const allImageUrls: string[] = [];
      allLanguages.forEach((lang) => {
        allModes.forEach((mode) => {
          const images = getScreenshotFiles(lang, mode);
          allImageUrls.push(...images);
        });
      });

      // 重複を除去
      const uniqueImageUrls = Array.from(new Set(allImageUrls));

      // 現在の言語・モードの画像を除外（既に優先ダウンロード済み）
      const currentImages = screenshots.map((s) => s.src);
      const currentImageSet = new Set(currentImages);
      const backgroundImages = uniqueImageUrls.filter(
        (src) => !currentImageSet.has(src)
      );

      // 低優先度でバックグラウンドプリロード
      backgroundImages.forEach((src) => {
        const link = document.createElement("link");
        link.rel = "preload";
        link.as = "image";
        link.href = src;
        link.setAttribute("data-screenshot-preload", "true");
        link.setAttribute("fetchpriority", "low");
        link.setAttribute("data-background-preload", "true");
        document.head.appendChild(link);
      });

      console.log(
        `🔄 バックグラウンドプリロード: ${backgroundImages.length} 枚の画像 (他言語・モード)`
      );
    };

    // 言語切り替えが完了してから2秒後にバックグラウンドプリロード開始
    const timer = setTimeout(
      backgroundPreload,
      isLanguageSwitching ? 2000 : 1000
    );

    return () => {
      clearTimeout(timer);
    };
  }, [isLanguageSwitching, locale, theme]); // eslint-disable-line react-hooks/exhaustive-deps

  // 現在の言語・モード用の追加最適化
  useEffect(() => {
    const optimizeCurrentImages = () => {
      const currentImages = screenshots.map((screenshot) => screenshot.src);

      // 現在の画像セットを最優先で確実にキャッシュ
      currentImages.forEach((src, index) => {
        const img = new window.Image();
        img.fetchPriority = "high";
        img.loading = "eager";
        img.src = src;

        img.onload = () => {
          setImagesLoaded((prev) => new Set(prev).add(src));
        };
      });
    };

    optimizeCurrentImages();
  }, [locale, theme]); // eslint-disable-line react-hooks/exhaustive-deps

  // 隣接スライドの積極的プリロード
  useEffect(() => {
    const preloadAdjacentSlides = async () => {
      const allImages = screenshots.map((screenshot) => screenshot.src);

      // 隣接する画像を即座にロード
      const nextIndex = (currentSlide + 1) % allImages.length;
      const prevIndex =
        (currentSlide - 1 + allImages.length) % allImages.length;

      // 隣接画像を高優先度で即座にプリロード
      [allImages[nextIndex], allImages[prevIndex]].forEach((src) => {
        if (src && !imagesLoaded.has(src)) {
          const img = new window.Image();
          img.fetchPriority = "high";
          img.loading = "eager";
          img.onload = () => setImagesLoaded((prev) => new Set(prev).add(src));
          img.src = src;
        }
      });
    };

    preloadAdjacentSlides();
  }, [currentSlide, screenshots, imagesLoaded]);

  // Service Worker風のキャッシング戦略
  useEffect(() => {
    const setupAdvancedCaching = () => {
      // より積極的なキャッシング
      const allLanguages: SupportedLocale[] = [
        "ja",
        "en",
        "fr",
        "ko",
        "zh",
        "es",
        "pt",
        "de",
      ];
      const currentLangImages = new Set<string>();

      // 現在の言語の全モード画像を最優先でキャッシュ
      ["dark", "light"].forEach((mode) => {
        const images = getScreenshotFiles(locale, mode as "dark" | "light");
        images.forEach((src) => {
          currentLangImages.add(src);
          if (!imagesLoaded.has(src)) {
            const img = new window.Image();
            img.fetchPriority = "high";
            img.src = src;
            img.onload = () =>
              setImagesLoaded((prev) => new Set(prev).add(src));
          }
        });
      });

      // 使用頻度の高い言語を次に優先（日本語、英語を優先）
      const priorityLanguages: SupportedLocale[] = ["ja", "en"];
      priorityLanguages.forEach((lang) => {
        if (lang !== locale) {
          ["dark", "light"].forEach((mode) => {
            const images = getScreenshotFiles(lang, mode as "dark" | "light");
            images.forEach((src) => {
              if (!currentLangImages.has(src) && !imagesLoaded.has(src)) {
                // 低優先度でバックグラウンドロード
                setTimeout(() => {
                  const img = new window.Image();
                  img.fetchPriority = "low";
                  img.src = src;
                  img.onload = () =>
                    setImagesLoaded((prev) => new Set(prev).add(src));
                }, Math.random() * 2000); // ランダム遅延でサーバー負荷分散
              }
            });
          });
        }
      });
    };

    setupAdvancedCaching();
  }, [locale]); // eslint-disable-line react-hooks/exhaustive-deps

  // コンポーネントアンマウント時のクリーンアップ
  useEffect(() => {
    return () => {
      // 進行中のダウンロードをキャンセル
      if (abortController) {
        abortController.abort();
      }

      // プリロードリンクをクリーンアップ
      const allPreloadLinks = document.querySelectorAll(
        'link[rel="preload"][data-screenshot-preload="true"]'
      );
      allPreloadLinks.forEach((link) => link.remove());

      console.log("🧹 HeroSection: リソースクリーンアップ完了");
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // 緊急優先ダウンロード機能（言語・モード切り替え時）
  useEffect(() => {
    const priorityDownloadOnSwitch = async () => {
      setIsLanguageSwitching(true);

      // 既存のダウンロードをキャンセル
      if (abortController) {
        abortController.abort();
      }

      // 新しいAbortControllerを作成
      const newAbortController = new AbortController();
      setAbortController(newAbortController);

      try {
        console.log(
          `🚀 言語・モード切り替え検知: ${locale} ${currentMode}モード - 優先ダウンロード開始`
        );

        // 現在の言語・モードの画像を最優先で即座にダウンロード
        const currentImages = getScreenshotFiles(locale, currentMode);
        const oppositeImages = getScreenshotFiles(locale, oppositeMode);
        const priorityImages = [...currentImages, ...oppositeImages];

        // 既存のプリロードリンクを全削除
        const existingLinks = document.querySelectorAll(
          'link[rel="preload"][data-screenshot-preload="true"]'
        );
        existingLinks.forEach((link) => link.remove());

        // 新しい言語・モードを超高優先度でプリロード
        priorityImages.forEach((src, index) => {
          const link = document.createElement("link");
          link.rel = "preload";
          link.as = "image";
          link.href = src;
          link.setAttribute("data-screenshot-preload", "true");
          link.setAttribute("fetchpriority", "high");
          link.setAttribute("data-priority-switch", "true");
          // 最優先でDOM先頭に挿入
          document.head.insertBefore(link, document.head.firstChild);
        });

        // JavaScript レベルでも並行して最優先ダウンロード
        const downloadPromises = priorityImages.map((src, index) => {
          return new Promise<void>((resolve) => {
            const img = new window.Image();
            img.fetchPriority = "high";
            img.loading = "eager";

            img.onload = () => {
              setImagesLoaded((prev) => new Set(prev).add(src));
              console.log(`✅ 優先ダウンロード完了: ${src.split("/").pop()}`);
              resolve();
            };

            img.onerror = () => {
              console.warn(`❌ 優先ダウンロード失敗: ${src}`);
              resolve();
            };

            // AbortControllerでキャンセル可能に
            newAbortController.signal.addEventListener("abort", () => {
              img.src = ""; // ダウンロードを停止
              resolve();
            });

            img.src = src;
          });
        });

        // 現在のモードの画像を最優先で待機
        await Promise.all(downloadPromises.slice(0, 4)); // 最初の4枚（現在モード）
        console.log(
          `🎯 ${locale} ${currentMode}モード - メイン画像ダウンロード完了`
        );

        // 反対モードの画像もバックグラウンドで完了
        await Promise.all(downloadPromises.slice(4)); // 残りの画像
        console.log(`🌟 ${locale} 全モード画像ダウンロード完了`);
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          console.log(
            "📋 優先ダウンロードがキャンセルされました（新しい切り替えのため）"
          );
        } else {
          console.error("優先ダウンロードエラー:", error);
        }
      } finally {
        setIsLanguageSwitching(false);
      }
    };

    priorityDownloadOnSwitch();
  }, [theme, locale]); // eslint-disable-line react-hooks/exhaustive-deps

  // スライドをリセット（テーマまたは言語変更時）
  useEffect(() => {
    setCurrentSlide(0);
    setImagesLoaded(new Set()); // 画像読み込み状態もリセット
  }, [theme, locale]);

  // 画像読み込み状態に基づいた自動スライド機能
  useEffect(() => {
    const timer = setInterval(
      () => {
        // 次の画像が読み込み完了している場合のみスライド
        if (isNextImageLoaded) {
          setCurrentSlide((prev) => (prev + 1) % screenshots.length);
        }
        // 読み込み未完了の場合は500ms後に再チェック
      },
      isNextImageLoaded ? 4000 : 500
    );

    return () => clearInterval(timer);
  }, [screenshots.length, isNextImageLoaded]);

  const nextSlide = () => {
    const nextIndex = (currentSlide + 1) % screenshots.length;
    const nextImage = screenshots[nextIndex];

    // 次の画像が読み込み済みの場合は即座に切り替え
    if (nextImage && imagesLoaded.has(nextImage.src)) {
      setCurrentSlide(nextIndex);
    } else {
      // 未読み込みの場合は読み込みを促進してから切り替え
      if (nextImage) {
        const img = new window.Image();
        img.fetchPriority = "high";
        img.onload = () => {
          setImagesLoaded((prev) => new Set(prev).add(nextImage.src));
          setCurrentSlide(nextIndex);
        };
        img.src = nextImage.src;
      }
    }
  };

  const prevSlide = () => {
    const prevIndex =
      (currentSlide - 1 + screenshots.length) % screenshots.length;
    const prevImage = screenshots[prevIndex];

    // 前の画像が読み込み済みの場合は即座に切り替え
    if (prevImage && imagesLoaded.has(prevImage.src)) {
      setCurrentSlide(prevIndex);
    } else {
      // 未読み込みの場合は読み込みを促進してから切り替え
      if (prevImage) {
        const img = new window.Image();
        img.fetchPriority = "high";
        img.onload = () => {
          setImagesLoaded((prev) => new Set(prev).add(prevImage.src));
          setCurrentSlide(prevIndex);
        };
        img.src = prevImage.src;
      }
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center section-warm overflow-hidden pt-14 sm:pt-16">
      {/* TaskLapアプリ風の背景装飾 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200/30 dark:bg-primary-900/20 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-warm-200/40 dark:bg-primary-800/20 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-100/20 dark:bg-primary-900/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          {/* Left Content - TaskLapアプリ風デザイン */}
          <div className="text-center lg:text-left space-y-8">
            {/* Badge - 実際のTaskLapアイコンを使用 */}
            <div className="inline-flex items-center px-6 py-3 bg-primary-500/90 backdrop-blur-sm rounded-full text-white text-sm font-medium shadow-warm">
              <div className="relative w-5 h-5 mr-2 rounded-md overflow-hidden bg-white/20">
                <Image
                  src="/app_icon_transparent.png"
                  alt="TaskLap Icon"
                  width={20}
                  height={20}
                  className="w-full h-full object-contain rounded-md "
                />
              </div>
              <span>{t("hero.simpleTaskManagement")}</span>
            </div>

            {/* Main Title - 暖かいグラデーション */}
            <div className="space-y-3 sm:space-y-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-800 dark:text-neutral-100 leading-tight">
                {t("hero.title")}
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-primary-600 dark:text-primary-400 font-medium">
                {t("hero.subtitle")}
              </p>
            </div>

            {/* Description */}
            <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-2xl">
              {t("hero.description")}
            </p>

            {/* Stats - TaskLapアプリ風アイコン */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 sm:gap-6 py-3 sm:py-4">
              <div className="flex items-center space-x-1.5 sm:space-x-2 text-neutral-700 dark:text-neutral-300">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-yellow-400 rounded-lg flex items-center justify-center">
                  <Star className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                </div>
                <span className="text-xs sm:text-sm font-medium">
                  {t("hero.badges.ratingPreparation")}
                </span>
              </div>
              <div className="flex items-center space-x-1.5 sm:space-x-2 text-neutral-700 dark:text-neutral-300">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                  <Users className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                </div>
                <span className="text-xs sm:text-sm font-medium">
                  {t("hero.badges.multilingualSupport")}
                </span>
              </div>
              <div className="flex items-center space-x-1.5 sm:space-x-2 text-neutral-700 dark:text-neutral-300">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                  <div className="flex items-center justify-center w-full h-full">
                    {theme === "dark" ? (
                      <svg
                        className="w-3 h-3 sm:w-4 sm:h-4 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                      </svg>
                    ) : (
                      <svg
                        className="w-3 h-3 sm:w-4 sm:h-4 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
                      </svg>
                    )}
                  </div>
                </div>
                <span className="text-xs sm:text-sm font-medium">
                  {t("common.darkLightMode")}
                </span>
              </div>
              <div className="flex items-center space-x-1.5 sm:space-x-2 text-neutral-700 dark:text-neutral-300">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-500 rounded-lg flex items-center justify-center">
                  <Download className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                </div>
                <span className="text-xs sm:text-sm font-medium">
                  {t("hero.badges.freeDownload")}
                </span>
              </div>
            </div>

            {/* CTA Buttons - TaskLapアプリ風 */}
            {/* 公式ストアバッジ */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-3 sm:pt-4 items-center lg:items-start lg:justify-start justify-center">
              <a
                href="#"
                className="block transition-transform hover:scale-105"
                aria-label="App Store からダウンロード（申請中）"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
                  alt="App Store からダウンロード"
                  className="h-[36px] sm:h-[48px] w-auto"
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
                  className="h-[36px] sm:h-[48px] w-auto"
                />
              </a>
            </div>

            {/* 申請中メッセージ */}
            <div className="pt-3 sm:pt-4">
              <div className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 bg-primary-50 dark:bg-primary-900/20 rounded-lg border border-primary-200 dark:border-primary-700">
                <span className="text-xs sm:text-sm text-primary-700 dark:text-primary-300">
                  {t("common.applicationInProgress")}
                </span>
              </div>
            </div>

            {/* 機能確認ボタン */}
            <div className="pt-3 sm:pt-4">
              <button
                onClick={() => scrollToSection("focus-mode")}
                className="group btn-secondary px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 rounded-xl sm:rounded-xl md:rounded-2xl font-semibold text-sm sm:text-base md:text-lg flex items-center justify-center space-x-1.5 sm:space-x-2 md:space-x-3"
              >
                <Play className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                <span>{t("hero.viewFeatures")}</span>
              </button>
            </div>

            {/* Platform badges - TaskLapアプリ風 */}
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 pt-6 sm:pt-8">
              <span className="text-neutral-500 dark:text-neutral-400 text-xs sm:text-sm font-medium">
                {t("hero.availableOn")}
              </span>
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="bg-warm-200 dark:bg-neutral-700 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl flex items-center space-x-1.5 sm:space-x-2 shadow-warm">
                  <span className="text-neutral-700 dark:text-neutral-300 text-xs sm:text-sm font-medium">
                    🍎 iOS 16.0+
                  </span>
                </div>
                <div className="bg-warm-200 dark:bg-neutral-700 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl flex items-center space-x-1.5 sm:space-x-2 shadow-warm">
                  <span className="text-neutral-700 dark:text-neutral-300 text-xs sm:text-sm font-medium">
                    🤖 Android 8.0+
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - TaskLapアプリの実際のスクリーンショット */}
          <div className="relative">
            <div className="relative max-w-[280px] sm:max-w-xs md:max-w-sm mx-auto">
              {/* Phone Frame - TaskLapアプリ風 */}
              <div className="relative bg-black rounded-[2rem] sm:rounded-[2.5rem] md:rounded-[3rem] p-2.5 sm:p-3 md:p-4 shadow-warm-xl">
                <div className="bg-black rounded-[1.5rem] sm:rounded-[2rem] md:rounded-[2.5rem] overflow-hidden aspect-[9/19.5] relative">
                  {/* Screenshot Carousel - TaskLapアプリの実際のスクリーンショット */}
                  <div className="relative h-full">
                    {screenshots.map((screenshot, index) => {
                      const isLoaded = imagesLoaded.has(screenshot.src);
                      return (
                        <div
                          key={`${locale}-${currentMode}-${screenshot.id}`}
                          className={`absolute inset-0 transition-all duration-500 ${
                            index === currentSlide ? "opacity-100" : "opacity-0"
                          }`}
                        >
                          <Image
                            src={screenshot.src}
                            alt={screenshot.alt}
                            fill
                            className={`object-contain object-center transition-opacity duration-300 ${
                              isLoaded ? "opacity-100" : "opacity-50"
                            }`}
                            priority={true} // すべての画像を優先読み込み
                            loading="eager" // 即座に読み込み
                            sizes="(max-width: 640px) 220px, (max-width: 768px) 280px, 400px"
                            quality={85} // 品質と速度のバランス
                          />
                          {/* ローディング状態表示 */}
                          {(!isLoaded || isLanguageSwitching) && (
                            <div className="absolute inset-0 flex items-center justify-center bg-neutral-900/30 backdrop-blur-sm">
                              <div className="text-center">
                                <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-2"></div>
                                {isLanguageSwitching && (
                                  <div className="text-white text-xs px-2 py-1 bg-black/50 rounded">
                                    🚀 最適化中...
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Navigation arrows */}
                  <button
                    onClick={prevSlide}
                    className="absolute left-1 sm:left-2 top-1/2 transform -translate-y-1/2 bg-black/40 backdrop-blur-sm text-white p-1.5 sm:p-2 rounded-full hover:bg-black/60 transition-colors z-10"
                    aria-label="前のスクリーンショット"
                  >
                    <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="absolute right-1 sm:right-2 top-1/2 transform -translate-y-1/2 bg-black/40 backdrop-blur-sm text-white p-1.5 sm:p-2 rounded-full hover:bg-black/60 transition-colors z-10"
                    aria-label="次のスクリーンショット"
                  >
                    <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                  </button>

                  {/* モード切り替え説明（5枚目の時のみ表示） */}
                  {isLastSlide && (
                    <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 backdrop-blur-sm text-white px-2 sm:px-3 py-1 sm:py-2 rounded-lg text-xs text-center z-20">
                      <div className="flex items-center space-x-1">
                        {currentMode === "dark" ? (
                          <>
                            <Sun className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                            <span className="text-xs sm:text-sm">
                              {t("common.lightMode")}
                            </span>
                          </>
                        ) : (
                          <>
                            <Moon className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                            <span className="text-xs sm:text-sm">
                              {t("common.darkMode")}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Screen reflection effect */}
                <div className="absolute inset-3 sm:inset-4 bg-gradient-to-t from-white/10 to-transparent rounded-[2rem] sm:rounded-[2.5rem] pointer-events-none"></div>
              </div>

              {/* TaskLapアプリ風のフローティング要素 */}
              <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 w-6 h-6 sm:w-8 sm:h-8 bg-primary-400 rounded-full opacity-80 animate-float shadow-warm"></div>
              <div
                className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 w-5 h-5 sm:w-6 sm:h-6 bg-warm-400 rounded-full opacity-80 animate-float shadow-warm"
                style={{ animationDelay: "1s" }}
              ></div>
              <div
                className="absolute top-1/2 -right-6 sm:-right-8 w-3 h-3 sm:w-4 sm:h-4 bg-primary-300 rounded-full opacity-80 animate-float shadow-warm"
                style={{ animationDelay: "3s" }}
              ></div>
            </div>

            {/* Screenshot indicators - TaskLapアプリ風 */}
            <div className="flex justify-center space-x-1.5 sm:space-x-2 mt-6 sm:mt-8">
              {screenshots.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? "bg-primary-500 shadow-warm w-4 sm:w-6"
                      : "bg-warm-300 dark:bg-neutral-600"
                  }`}
                  aria-label={`スクリーンショット ${index + 1} を表示`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator - TaskLapアプリ風 */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary-400/60 dark:border-primary-500/60 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary-500/80 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}
