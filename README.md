# VOCALOID CLUB COLLECTION

VOCALOID CLUB COLLECTION (Vコレ) の特設サイトです。

## リンク

https://v-collection.vocakentdu.com/

## 技術スタック

- **パッケージ管理システム**: npm
- **フロントエンド**
  - JSライブラリ: React
  - 型チェック: TypeScript
  - Webフレームワーク: Next.js 14 (App Router)
  - UIライブラリ: Mantine
  - アニメーション: CSS / GSAP
- **ツール**
  - 日付処理: date-fns
- **アイコン**
  - Tabler Icons
- **開発ツール**
  - パッケージ管理: npm
  - コード品質: ESLint / Prettier / Stylelint

## セットアップ

- `npm install` - パッケージのインストール
- `npm run dev` – 開発用にサーバーを起動

### ローカルでビルドしたい場合

- `npm run build` – 本番用ビルド (バンドル)
- `npm run start` - 本番用ビルドを起動
- `npm run analyze` – バンドルの解析を実行 [@next/bundle-analyzer](https://www.npmjs.com/package/@next/bundle-analyzer)

### 品質管理コマンド

- `npm run typecheck` – TypeScript型チェック
- `npm run lint` – ESLintによるコード検証
- `npm run prettier:check` – Prettierによるコードスタイルチェック
- `npm run prettier:write` – Prettierによる自動フォーマット

## フォルダ構成

```
.
├── app/                # App Router 構成
│   ├── globals.css     # どこでも使える共通 CSS
│   ├── layout.tsx      # ルートレイアウト (サイトのヘッダー情報など)
│   ├── page.tsx        # インデックスページ (ページの中身)
│   └── (...)/          # 各ページ
├── components/         # 共通の使いまわしできるUIコンポーネント
├── data/               # JSONデータファイル
├── public/             # 静的アセット (公開して良いデータ)
├── types/              # TypeScript 型定義
├── utils/              # ユーティリティ関数
├── .env                # 公開環境変数 (APIキーなど機密情報を書き込まないこと)
└── theme.ts            # Mantineのテーマ設定
```

## ページ構成

```
/                    # トップページ・作品一覧
├── /about           # イベント概要
├── /archives        # 前回のイベントのイラスト
├── /credit          # クレジット
├── /howto           # 使い方
└── /works           # 作品詳細
```

App Router の階層構造詳細については[こちら](https://nextjs.org/docs/app/building-your-application/routing)

## よくあるエラーと解決方法

### Mantine コンポーネントのエラー

```
⨯ Internal error: Error: Could not find the module "/home/ps/v-collection-app/node_modules/@mantine/core/esm/components/List/List.mjs#List#Item" in the React
```

コンポーネントの一番最初に「'use client';」を追加すること [詳細](https://ramble.impl.co.jp/4935/)

### CSS モジュールの警告

```
term expectedcss(css-termexpected)
```

～.module.css で Mantine の breakpoint を使ってると出てくるけど正常に動作するので無視して大丈夫
