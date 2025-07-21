/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // TaskLapアプリのオレンジ色をメインカラーに
        primary: {
          50: "#fff7ed",
          100: "#ffedd5",
          200: "#fed7aa",
          300: "#fdba74",
          400: "#fb923c",
          500: "#FF6B35", // アプリのメインオレンジ色
          600: "#ea580c",
          700: "#c2410c",
          800: "#9a3412",
          900: "#7c2d12",
        },
        // フォーカスモード用の暖かいオレンジ
        focus: {
          50: "#fef3e2",
          100: "#fde4b8",
          200: "#fbd18a",
          300: "#f9bc5c",
          400: "#f7a73a",
          500: "#FF6B35",
          600: "#e8820e",
          700: "#d96f04",
          800: "#ca5d00",
          900: "#b14100",
        },
        // アプリの暖かいベージュ背景色（ライトモード用）
        warm: {
          50: "#fefdfb",
          100: "#fef7ed",
          200: "#fef2e0",
          300: "#fde8c8",
          400: "#fbd9a5",
          500: "#f7c574",
          600: "#f0a835",
          700: "#e88c20",
          800: "#d97517",
          900: "#b85c14",
        },
        // ネイビー基調のダークモード用グレートーン
        neutral: {
          0: "#ffffff",
          50: "#f8fafc", // ライトグレー
          100: "#f1f5f9", //
          200: "#e2e8f0", //
          300: "#cbd5e1", //
          400: "#94a3b8", //
          500: "#64748b", //
          600: "#475569", // ミッドネイビー
          700: "#334155", //
          800: "#1e293b", // ダークネイビー
          900: "#0f172a", // ベースネイビー
          950: "#020617", // 最も濃いネイビー
        },
        // ダークモード専用のネイビー系背景色
        navy: {
          50: "#f0f4ff",
          100: "#e0e7ff",
          200: "#c7d2fe",
          300: "#a5b4fc",
          400: "#818cf8",
          500: "#6366f1",
          600: "#4f46e5",
          700: "#4338ca",
          800: "#3730a3",
          900: "#312e81",
        },
        // アクセントカラー（ダークモード用）
        accent: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa", // ライトブルー（ダークモード用アクセント）
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
        },
      },
      backgroundImage: {
        // ライトモード用グラデーション
        "gradient-hero-light":
          "linear-gradient(135deg, #FF6B35 0%, #fb923c 50%, #fed7aa 100%)",
        "gradient-focus-light":
          "linear-gradient(135deg, #FF6B35 0%, #f7a73a 50%, #fbd18a 100%)",
        "gradient-warm":
          "linear-gradient(135deg, #fef7ed 0%, #fef2e0 50%, #fde8c8 100%)",

        // ダークモード用ネイビーグラデーション
        "gradient-hero-dark":
          "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)",
        "gradient-focus-dark":
          "linear-gradient(135deg, #1e293b 0%, #334155 50%, #475569 100%)",
        "gradient-navy":
          "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)",
        "gradient-navy-subtle":
          "linear-gradient(135deg, #1e293b 0%, #334155 30%, #475569 100%)",
      },
      fontFamily: {
        sans: ["Inter", "Noto Sans JP", "system-ui", "sans-serif"],
        display: ["Inter", "Noto Sans JP", "system-ui", "sans-serif"],
      },
      screens: {
        xs: "475px",
      },
      animation: {
        "fade-in-up": "fadeInUp 0.6s ease-out",
        "fade-in": "fadeIn 0.6s ease-out",
        "slide-in-right": "slideInRight 0.6s ease-out",
        float: "float 3s ease-in-out infinite",
        "pulse-warm": "pulseWarm 2s ease-in-out infinite",
      },
      keyframes: {
        fadeInUp: {
          "0%": {
            opacity: "0",
            transform: "translateY(30px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        fadeIn: {
          "0%": {
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          },
        },
        slideInRight: {
          "0%": {
            opacity: "0",
            transform: "translateX(30px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0)",
          },
        },
        float: {
          "0%, 100%": {
            transform: "translateY(0px)",
          },
          "50%": {
            transform: "translateY(-10px)",
          },
        },
        pulseWarm: {
          "0%, 100%": {
            boxShadow: "0 0 0 0 rgba(255, 107, 53, 0.4)",
          },
          "50%": {
            boxShadow: "0 0 0 10px rgba(255, 107, 53, 0)",
          },
        },
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
      },
      boxShadow: {
        warm: "0 4px 6px -1px rgba(255, 107, 53, 0.1), 0 2px 4px -1px rgba(255, 107, 53, 0.06)",
        "warm-lg":
          "0 10px 15px -3px rgba(255, 107, 53, 0.1), 0 4px 6px -2px rgba(255, 107, 53, 0.05)",
        "warm-xl":
          "0 20px 25px -5px rgba(255, 107, 53, 0.1), 0 10px 10px -5px rgba(255, 107, 53, 0.04)",
        // ダークモード用シャドウ
        navy: "0 4px 6px -1px rgba(15, 23, 42, 0.3), 0 2px 4px -1px rgba(15, 23, 42, 0.2)",
        "navy-lg":
          "0 10px 15px -3px rgba(15, 23, 42, 0.3), 0 4px 6px -2px rgba(15, 23, 42, 0.2)",
        "navy-xl":
          "0 20px 25px -5px rgba(15, 23, 42, 0.4), 0 10px 10px -5px rgba(15, 23, 42, 0.3)",
      },
    },
  },
  plugins: [],
};
