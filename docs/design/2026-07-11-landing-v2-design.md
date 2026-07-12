# TaskLap ランディングページ全面リデザイン — 実装指示書

## Goal
/Users/Shared/workspace/taskLap_workspace/taskLap_landing の LP を、以下の凍結済みデザイン仕様どおりに全面リビルドする。
コンセプト: **「温かいプレミアム」**。アプリ本体（クリーム×オレンジのライト / ネイビー×オレンジのダーク）と地続きの世界観で、
ブランド体験 → App Store ダウンロードへ落とすチャプター型 LP。

## 対象 repo / branch
- repo: /Users/Shared/workspace/taskLap_workspace/taskLap_landing
- branch: `redesign/landing-v2`（作成済み・checkout 済み）。base = 477c832。working tree clean。
- **git 操作（commit/push/branch/stash）は一切禁止**。ファイル編集のみ。
- この repo の外を変更しない。

## Stack（維持）
Next.js 14 App Router / Tailwind / next-intl / next-themes / framer-motion / lucide-react。
**新規依存の追加禁止**（GSAP・three.js 等不可）。フォントは next/font/google のみ。

## Constraints（触るな系）
- `components/PrivacyContent.tsx` と `components/VersionHistoryContent.tsx` の本文ロジック・文言は変更しない（ページの外枠＝新ヘッダー/フッターへの差し替えは可）。
- 既存 messages/*.json の `privacy` / `versionHistory` / `metadata` / `contact` 名前空間のキーは削除しない（新セクション用の名前空間を追加でマージする）。
- 旧コンポーネント（HeroSection.tsx など）は削除せずそのまま残す。新実装は `components/v2/` 配下に作り、`app/[locale]/page.tsx` を v2 に差し替える。
- EmailJS のフォームは v2 では使わない。フッターに「お問い合わせ」リンクとして、既存 ContactSection.tsx 内で使われている連絡先（メールアドレス等）を流用した mailto リンクを置く。

## i18n（8言語）
- locales: ja, en, ko, de, es, fr, pt, zh。`i18n.ts` / `middleware.ts` / `i18n/request.ts` が 6言語のままなら 8言語に拡張する。
- 新コピーは本書の **ja / en を一字一句そのまま** 使う。ko/de/es/fr/pt/zh は既存翻訳のトーンに合わせて自然に翻訳する。
- App Store URL は locale 別: ja→jp, en→us, fr→fr, ko→kr, zh→cn, es→es, pt→br, de→de。
  形式: `https://apps.apple.com/{country}/app/tasklap/id6748891669`
- QR コード: `/qr-codes/app-store-{locale}.png`（zh→app-store-zh.png 等、既存ファイル名に合わせる）。
- Google Play は未リリース。「近日公開 / Coming soon」の無効ピルとして表示（リンクなし）。

## デザイントークン（styles は Tailwind config 拡張 + CSS variables で実装）
Light:
- --bg: #FBF4E9（ページ地。ヒーローは radial のオレンジ微光を重ねる: rgba(240,112,58,.10) を 20%/25% 位置に2つ）
- --surface: #FFFFFF / --surface-2: #FFF9F0
- --ink: #241D15 / --muted: #8A7E6F
- --accent: #F0703A（hover #E05F28）/ --accent-soft: #FDE8D8
- --line: rgba(36,29,21,.08)
- カード影: 0 8px 30px rgba(190,120,60,.12)
Dark:
- --bg: #14162B / --surface: #1E2138 / --surface-2: #262A45
- --ink: #F3EFE7 / --muted: #9BA0B8
- --accent: #F0703A / --accent-soft: rgba(240,112,58,.16)
- --line: rgba(255,255,255,.10)
- カード影: 0 8px 30px rgba(0,0,0,.35)
共通: カード radius 24px、ボタンは pill。success green #4CAF50。
テーマは next-themes（class 戦略）。ライト/ダーク完全対応。

## タイポグラフィ
- Latin/数字: **Manrope**（next/font/google, weights 500/700/800）
- 日本語: **Zen Kaku Gothic New**（weights 500/700）。ko/zh はシステムフォントスタック fallback（Apple SD Gothic Neo / PingFang 等）。
- Hero H1: clamp(2.4rem, 6vw, 4.2rem) / line-height 1.15 / font-weight 800（JP は 700）
- チャプター番号: Manrope 800、大きく（clamp(3rem,8vw,6rem)）、color: transparent + -webkit-text-stroke 1.5px var(--accent) のアウトライン表現
- body: 1rem–1.125rem, line-height 1.9（JP）

## ページ構成（app/[locale]/page.tsx を以下の v2 構成に）

### 0. Header（components/v2/SiteHeader.tsx）
固定ヘッダー。初期は透明、24px スクロールで glass 化（backdrop-blur + 半透明 bg + 下線 --line）。
内容: 左＝アプリアイコン(/app_icon_transparent_128x128.png) + 「TaskLap」ワードマーク（Manrope 800）。
右＝nav リンク（機能 #features / ダウンロード #download）、言語スイッチャー（コンパクトなドロップダウン、現行 Header.tsx のロジック流用可）、テーマトグル、App Store への CTA ピル（accent 塗り）。
モバイル: nav リンクは省略し、言語・テーマ・CTA のみ。

### 1. Hero（components/v2/HeroV2.tsx）— min-height 92svh
2カラム（モバイルは縦積み）。背景はトークン通りの微光 + ごく薄い noise（CSS で可・なければ省略可）。
左:
- kicker ピル: 「シンプルなTodo＆チェックリスト」
- H1: 「今日やることを、ひとつずつ。」
- sub: 「TaskLapは、迷わないほどシンプルなタスク管理アプリ。グループで整理して、フォーカスモードで目の前のひとつに集中できます。」
- CTA行: App Store 公式バッジ画像相当のボタン（黒/白の Apple バッジスタイル。locale 別リンク）+ 「Google Play 近日公開」の muted ピル
- trust行（小さく）: 「無料 ・ アカウント不要 ・ 8言語対応」
右: **インタラクティブデモカード**（set piece その1・軽量）:
- アプリの Todo 行 UI を忠実に再現したカード（--surface、radius 24、行ごとに丸チェックボックス＝orange リング）。
- タスク3件（ja: 「水を一杯飲む」「メールを1通返す」「机の上を片づける」）。
- クリック/タップでチェック: framer-motion の spring で scale 反応、チェックは orange 塗り + 白チェック、テキストに strikethrough + muted 化。
- 3件完了で カード内に 「お疲れさま！🎉 今日の1歩が踏み出せました」 + 「もう一度」リセットボタンを表示（カード全体は入れ替えでなくオーバーレイ的に下部へ出す程度で簡潔に）。
- カードの上に小さなラベル「さわって試せます」。
- カード背景に薄い accent-soft の glow。
下部中央: スクロールキュー（小さな下矢印 + 「スクロール」、ゆっくり上下 8px アニメ）。

### 2. ステートメント帯（components/v2/StatementBand.tsx）
1文だけの大タイポセクション（py 大きめ）:
- ja: 「やることリストは、シンプルでいい。」
- 下に小さく: 「機能を増やすほど、タスクは進まなくなる。TaskLapは“今日のひとつ”に集中するための道具です。」
scroll-reveal（下記モーション仕様）で 2行が順に出る。装飾はライン1本（--accent の短いルール線）。

### 3. 機能チャプター（components/v2/FeatureChapters.tsx）— set piece その2（メイン）
`#features`。デスクトップ: 2カラム。左＝sticky の iPhone フレーム（CSS 製: 幅 ~300px、radius 48px、ベゼル暗色、上部ノッチ表現。中に next/image でスクショ）。右＝チャプター4つ、各 ~75svh。
- アクティブチャプターは IntersectionObserver（rootMargin で画面中央帯）で判定し、左のスクショを crossfade（opacity 350ms + scale .98→1）で切替。
- スクショは **locale とテーマに追従**: `/screenshots/Iphone/{lang}_{theme}_{n}.PNG`。`components/v2/screens.ts`（または data/）に localeごとの明示マッピングを書く。ファイル一覧は `public/screenshots/Iphone/` を ls して、各 locale × light/dark の 4枚を**ファイル名昇順**で [todoList, checklistTab, focusMode, checklistDetail] に割り当てる。
- チャプター構成（番号 01–04 をアウトライン大タイポで表示 + kicker + H2 + body）:
  1. kicker「GROUP」 H2「仕事も、暮らしも、それぞれの場所へ。」 body「Todoはグループごとに整理。件数がひと目でわかり、折りたたみもドラッグ並び替えも自由自在。グループから直接タスクを追加できます。」 → 画像: todoList
  2. kicker「FOCUS MODE」 H2「一画面、一タスク。」 body「フォーカスモードは、目の前のタスクだけを表示します。選べるのは「完了」か「スキップ」の2つだけ。決断疲れを減らして、次の一歩を軽くします。」 → 画像: focusMode
  3. kicker「CHECKLIST」 H2「くり返す段取りは、テンプレートに。」 body「旅行の持ち物、週間計画、買い出しリスト。一度つくったチェックリストは何度でも使い回せます。」 → 画像: checklistTab
  4. kicker「ROUTINE」 H2「朝のルーティンを、ワンタップでリセット。」 body「使い終わったリストはリセットしてまた明日へ。進捗はパーセントでひと目に。毎日のくり返しが、少し楽しくなります。」 → 画像: checklistDetail
- モバイル: sticky をやめ、各チャプターの下にそのチャプターのスクショをインライン表示（幅 70% 程度、中央）。

### 4. Bento グリッド（components/v2/BentoGrid.tsx）
静かな 6セル（デスクトップ 3×2、モバイル 1列）。各セル: lucide アイコン + 見出し + 1行説明。hover でわずかに lift（translateY(-2px) + 影強め）。
1. 持ち越しレビュー — 「昨日の残りは、朝にまとめて仕分け。未完了タスクも迷子になりません。」
2. ライト＆ダークテーマ — 「時間帯や気分に合わせて。目にやさしい2つの表情。」（セル内に light/dark の小さなカラースウォッチ対比を表示）
3. 8言語対応 — 「日本語・英語・韓国語・ドイツ語・スペイン語・フランス語・ポルトガル語・中国語。」（言語チップを並べる）
4. すべて無料 — 「隠れた課金はありません。全機能をそのまま使えます。」
5. アカウント不要 — 「ダウンロードしたら、その場で開始。登録は要りません。」
6. 軽快な動作 — 「さっと開いて、さっと書ける。道具は速さも大事です。」

### 5. ダウンロード（components/v2/DownloadV2.tsx）
`#download`。温かいグラデーションパネル（accent の glow を強めに、角丸 32px、内側に余白たっぷり）。
- H2: 「さあ、今日のひとつを片づけよう。」
- sub: 「TaskLapは無料です。ダウンロードして、そのまま使いはじめられます。」
- App Store バッジ（大・locale 別リンク）+ デスクトップのみ locale 別 QR コード（白カードに載せ「QRコードでダウンロード」ラベル）
- Google Play: 「近日公開」小さめ表示。

### 6. Footer（components/v2/FooterV2.tsx）
最小構成: 左＝アイコン + TaskLap + コピーライト。右＝リンク（プライバシーポリシー /{locale}/privacy、バージョン履歴 /{locale}/version-history、お問い合わせ mailto）。上に --line の hairline。

### privacy / version-history ページ
既存本文コンポーネントを新ヘッダー・フッター（v2）で包み直すだけ。本文はそのまま。

## 英語コピー（en、一字一句このまま）
- hero.kicker: "Simple to-dos & checklists"
- hero.h1: "One thing at a time, today."
- hero.sub: "TaskLap is a task manager so simple you never get lost. Organize with groups, then use Focus Mode to concentrate on the one thing in front of you."
- hero.trust: "Free · No account needed · 8 languages"
- hero.demoLabel: "Try tapping"
- hero.demoTasks: ["Drink a glass of water", "Reply to one email", "Clear your desk"]
- hero.demoDone: "Nice work! 🎉 That's your first step today." / reset: "Once more"
- statement.h2: "A to-do list should be simple."
- statement.sub: "The more features you add, the less gets done. TaskLap is a tool for focusing on today's one thing."
- chapters: 1) "A place for work, and a place for life." — "Organize to-dos into groups. See counts at a glance, collapse, and reorder by drag. Add tasks straight from a group." 2) "One screen, one task." — "Focus Mode shows only the task in front of you. Complete or skip — just two choices. Less decision fatigue, lighter next steps." 3) "Turn repeat routines into templates." — "Packing lists, weekly plans, groceries. Build a checklist once, reuse it forever." 4) "Reset your morning routine in one tap." — "When a list is done, reset it for tomorrow. Progress shows as a percentage. Daily repetition gets a little more fun."
- bento: Carry-over review — "Sort yesterday's leftovers in the morning. Unfinished tasks never get lost." / Light & dark themes — "Two gentle looks for any time of day." / 8 languages — "Japanese, English, Korean, German, Spanish, French, Portuguese, Chinese." / Completely free — "No hidden fees. Every feature included." / No account — "Download and start right away. No sign-up." / Fast & light — "Open quickly, write quickly. Speed matters in a tool."
- download.h2: "Now, go finish one thing today." / download.sub: "TaskLap is free. Download it and start right away." / download.qr: "Scan to download" / playSoon: "Google Play — coming soon"
- footer: privacy "Privacy Policy" / history "Version History" / contact "Contact"
- scroll cue: "Scroll"

## モーション仕様（すべて prefers-reduced-motion: reduce で無効化し、コンテンツは常に可視）
- scroll-reveal: IntersectionObserver、opacity 0→1 + translateY(16px)→0、500ms cubic-bezier(.22,.61,.36,1)、兄弟 stagger 60ms、一度きり。
- sticky スクショ crossfade: 350ms。
- Hero glow: CSS keyframes で 20s alternate のゆっくりした drift（transform のみ）。
- チェックボックス: framer-motion spring（stiffness 500, damping 30 目安）。
- Header glass 化: scroll 24px 閾値。
- アニメーションは transform / opacity のみ。scroll ハンドラは rAF バッチ。

## パフォーマンス / a11y
- 画像は next/image。sticky スクショは最初の1枚のみ priority、他は lazy。sizes 指定。
- モバイル 375px で横スクロールが出ないこと（document.scrollWidth チェック）。
- focus-visible リング（accent）、テーマ/言語トグルに aria-label、スクショに locale 済み alt。
- 本文コントラスト 4.5:1 以上（--muted の使用は小さめテキストの補助情報のみ）。

## Non-goals
- CMS 化、アナリティクス追加、フォーム実装、旧コンポーネント削除、README 整備。

## Proof expected（必ず実行して結果を報告）
```
cd /Users/Shared/workspace/taskLap_workspace/taskLap_landing
npm run build
npm run lint
```
両方成功すること。失敗したら直してから報告。

## Output shape（最終メッセージに含めること）
1. 実装サマリ（セクションごとに何を作ったか、仕様からの逸脱があれば明記）
2. 変更/新規ファイル一覧
3. build / lint の結果（末尾出力）
4. スクショマッピング（locale×theme→ファイル名）をどう決めたか
