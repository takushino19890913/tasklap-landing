import type {Locale} from "../../i18n";

// 各ファイルは視覚確認で分類済み（撮影順が locale ごとに異なるため、ファイル名昇順からの推測は不可）。
// de_dark は checklistDetail の素材が存在しない（3875/3876 が todoList の完全重複）ため checklistTab で代替中。
type ScreenSet = {todoList: string; checklistTab: string; focusMode: string; checklistDetail: string};
type ThemeScreens = {light: ScreenSet; dark: ScreenSet};

export const screens: Record<Locale, ThemeScreens> = {
  ja: {
    light: {todoList: "ja_light_3814.PNG", checklistTab: "ja_light_3815.PNG", focusMode: "ja_light_3816.PNG", checklistDetail: "ja_light_3817.PNG"},
    dark: {todoList: "ja_dark_3810.PNG", checklistTab: "ja_dark_3811.PNG", focusMode: "ja_dark_3813.PNG", checklistDetail: "ja_dark_3812.PNG"},
  },
  en: {
    light: {todoList: "en_light_3823.PNG", checklistTab: "en_light_3824.PNG", focusMode: "en_light_3826.PNG", checklistDetail: "en_light_3825.PNG"},
    dark: {todoList: "en_dark_3818.PNG", checklistTab: "en_dark_3819.PNG", focusMode: "en_dark_3821.PNG", checklistDetail: "en_dark_3822.PNG"},
  },
  fr: {
    light: {todoList: "fr_light_3833.PNG", checklistTab: "fr_light_3835.PNG", focusMode: "fr_light_3836.PNG", checklistDetail: "fr_light_3837.PNG"},
    dark: {todoList: "fr_dark_3831.PNG", checklistTab: "fr_dark_3829.PNG", focusMode: "fr_dark_3832.PNG", checklistDetail: "fr_dark_3830.PNG"},
  },
  ko: {
    light: {todoList: "ko_light_3838.PNG", checklistTab: "ko_light_3839.PNG", focusMode: "ko_light_3847.PNG", checklistDetail: "ko_light_3841.PNG"},
    dark: {todoList: "ko_dark_3842.PNG", checklistTab: "ko_dark_3843.PNG", focusMode: "ko_dark_3846.PNG", checklistDetail: "ko_dark_3844.PNG"},
  },
  zh: {
    light: {todoList: "zh_light_3848.PNG", checklistTab: "zh_light_3849.PNG", focusMode: "zh_light_3851.PNG", checklistDetail: "zh_light_3850.PNG"},
    dark: {todoList: "zh_dark_3852.PNG", checklistTab: "zh_dark_3853.PNG", focusMode: "zh_dark_3855.PNG", checklistDetail: "zh_dark_3854.PNG"},
  },
  es: {
    light: {todoList: "es_light_3863.PNG", checklistTab: "es_light_3860.PNG", focusMode: "es_light_3862.PNG", checklistDetail: "es_light_3861.PNG"},
    dark: {todoList: "es_dark_3856.PNG", checklistTab: "es_dark_3857.PNG", focusMode: "es_dark_3859.PNG", checklistDetail: "es_dark_3858.PNG"},
  },
  pt: {
    light: {todoList: "pt_light_3872.PNG", checklistTab: "pt_light_3869.PNG", focusMode: "pt_light_3871.PNG", checklistDetail: "pt_light_3870.PNG"},
    dark: {todoList: "pt_dark_3864.PNG", checklistTab: "pt_dark_3865.PNG", focusMode: "pt_dark_3868.PNG", checklistDetail: "pt_dark_3866.PNG"},
  },
  de: {
    light: {todoList: "de_light_3883.PNG", checklistTab: "de_light_3880.PNG", focusMode: "de_light_3882.PNG", checklistDetail: "de_light_3881.PNG"},
    dark: {todoList: "de_dark_3875.PNG", checklistTab: "de_dark_3877.PNG", focusMode: "de_dark_3879.PNG", checklistDetail: "de_dark_3877.PNG"},
  },
};

// チャプター順（課題ベース版）: 01 決断疲れ→フォーカス / 02 罪悪感→持ち越し(Todoリスト) / 03 繰り返し→チェックリスト詳細 / 04 管理コスト→チェックリスト一覧
export const chapterScreenKeys = ["focusMode", "todoList", "checklistDetail", "checklistTab"] as const;
