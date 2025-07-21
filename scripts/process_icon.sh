#!/bin/bash

# TaskLap App Icon Background Removal and Favicon Generation Script
# アプリアイコンの背景を透過処理し、Favicon用のサイズも生成します

set -e

echo "=== TaskLap アイコン背景透過処理 (ImageMagick版) ==="

# プロジェクトルートの取得
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
PUBLIC_DIR="$PROJECT_ROOT/public"
INPUT_FILE="$PUBLIC_DIR/app_icon.png"
TRANSPARENT_FILE="$PUBLIC_DIR/app_icon_transparent.png"
FAVICON_DIR="$PUBLIC_DIR/favicons"

echo "入力ファイル: $INPUT_FILE"

# ImageMagickの確認
if ! command -v convert &> /dev/null; then
    echo "エラー: ImageMagickがインストールされていません"
    echo "macOSの場合: brew install imagemagick"
    echo "Ubuntuの場合: sudo apt-get install imagemagick"
    exit 1
fi

# 入力ファイルの確認
if [ ! -f "$INPUT_FILE" ]; then
    echo "エラー: $INPUT_FILE が見つかりません"
    exit 1
fi

# Faviconディレクトリの作成
mkdir -p "$FAVICON_DIR"

echo ""
echo "1. 背景透過処理中..."

# 背景透過処理（白い背景を透明にする）
convert "$INPUT_FILE" \
    -fuzz 15% \
    -transparent white \
    -alpha set \
    -background none \
    "$TRANSPARENT_FILE"

echo "透過処理完了: $TRANSPARENT_FILE"

echo ""
echo "2. Favicon生成中..."

# Favicon用サイズ配列
FAVICON_SIZES=(16 32 48 64 128 256 512)

for size in "${FAVICON_SIZES[@]}"; do
    # PNG版
    convert "$TRANSPARENT_FILE" \
        -resize "${size}x${size}" \
        -background none \
        "$FAVICON_DIR/favicon-${size}x${size}.png"
    echo "作成: favicon-${size}x${size}.png"
    
    # ICO版（小さいサイズのみ）
    if [ $size -le 64 ]; then
        convert "$TRANSPARENT_FILE" \
            -resize "${size}x${size}" \
            -background none \
            "$FAVICON_DIR/favicon-${size}x${size}.ico"
        echo "作成: favicon-${size}x${size}.ico"
    fi
done

echo ""
echo "3. Webサイト用アイコン生成中..."

# Web用サイズ
WEB_SIZES=(64 128 256)

for size in "${WEB_SIZES[@]}"; do
    convert "$TRANSPARENT_FILE" \
        -resize "${size}x${size}" \
        -background none \
        "$PUBLIC_DIR/app_icon_transparent_${size}x${size}.png"
    echo "作成: app_icon_transparent_${size}x${size}.png"
done

# デフォルトfavicon.ico作成（32x32）
convert "$TRANSPARENT_FILE" \
    -resize "32x32" \
    -background none \
    "$PUBLIC_DIR/favicon.ico"
echo "作成: favicon.ico"

echo ""
echo "=== 処理完了 ==="
echo "生成されたファイル:"
echo "- 透過アイコン: $TRANSPARENT_FILE"
echo "- Faviconディレクトリ: $FAVICON_DIR"
echo "- デフォルトfavicon.ico: $PUBLIC_DIR/favicon.ico"
echo "- Webサイト用各サイズアイコン"
echo ""
echo "使用方法:"
echo "# Pythonライブラリをインストール"
echo "pip install -r scripts/requirements.txt"
echo ""
echo "# Python版を実行"
echo "python scripts/process_icon.py"
echo ""
echo "# または Bash版を実行（ImageMagick必要）"
echo "bash scripts/process_icon.sh" 