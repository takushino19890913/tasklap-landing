import type { Metadata } from "next";
import { Inter, Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-noto-sans-jp",
  display: "swap",
});

export const metadata: Metadata = {
  title: "TaskLap - シンプルなTodo、チェックリストアプリ。",
  description:
    "シンプルで使いやすいタスク管理アプリ。フォーカスモード、チェックリスト機能搭載。",
  keywords: "タスク管理,Todo,チェックリスト,フォーカス,集中,アプリ",
  authors: [{ name: "TaskLap Team" }],
  creator: "TaskLap",
  publisher: "TaskLap",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/favicons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicons/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicons/favicon-64x64.png", sizes: "64x64", type: "image/png" },
      {
        url: "/favicons/favicon-128x128.png",
        sizes: "128x128",
        type: "image/png",
      },
      {
        url: "/favicons/favicon-256x256.png",
        sizes: "256x256",
        type: "image/png",
      },
      {
        url: "/favicons/favicon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    shortcut: "/favicons/favicon-32x32.png",
    apple: [
      {
        url: "/favicons/favicon-128x128.png",
        sizes: "128x128",
        type: "image/png",
      },
      {
        url: "/favicons/favicon-256x256.png",
        sizes: "256x256",
        type: "image/png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ja"
      className={`${inter.variable} ${notoSansJP.variable}`}
      suppressHydrationWarning
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
