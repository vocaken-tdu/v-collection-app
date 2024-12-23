# VOCALOID CLUB COLLECTION

VOCALOID CLUB COLLECTION の専用ページです。

特設サイトページ：https://v-collection.vocakentdu.com/

開発用ページ：https://v-collection-app.vercel.app/

## 仕様

- パッケージ管理システム：npm
- JSフレームワーク：React
- Webフレームワーク：Next.js v14 (App Router)
- CSSフレームワーク：Tailwind
- UIライブラリ：Mantine
- チェックツール：ESLint TypeScript
- その他：Storybook 

## npm

### インストール

- `npm install`

### 開発

- `npm run dev` – 開発用にサーバーを起動
- `npm run build` – 本番用アプリケーションのバンドル
- `npm run analyze` – アプリケーションバンドルの解析 with [@next/bundle-analyzer](https://www.npmjs.com/package/@next/bundle-analyzer)

### そのほか

- `npm run typecheck` – TSの型チェック
- `npm run lint` – ESLintを実行
- `npm run prettier:check` – Prettierでファイル確認
- `npm run jest` – Jestテストを実行
- `npm run jest:watch` – Jestを監視
- `npm run test` – `jest`、`prettier:check`、`lint`、`typecheck` スクリプトを実行
- `npm run prettier:write` – formats all files with Prettier

## フォルダ構成

注：srcを省いた形式。

```
root
├─ app
│  ├─ components   // ここに各コンポーネントをフォルダごとに
│  ├─ globals.css  // ここにグローバルに適用するCSS情報
│  ├─ layout.tsx   // ここにheader情報
│  └─ page.tsx     // ここにindexの内容
│  ︙
├─ public          // ビルド時に一緒にバンドルされる
│
︙

```

Appのルーティングの階層構造詳細については[こちら](https://nextjs.org/docs/app/building-your-application/routing)

## 制作にあたって

- 企画概要
  - https://discord.com/channels/1175752147003002961/1175757055345295360/1175782990861836338
- プロトタイプ
  - https://discord.com/channels/1175752147003002961/1175761916476526593/1176951184922267761
- ロゴ
  - https://discord.com/channels/1175752147003002961/1175761916476526593/1178218118108155976

※DiscordのVCC鯖の閲覧権限必須

### ページ構成

```
- App
  - / (最初に表示)
    - /works/[id] (コンテンツページ)
    - /about
    - /artists
    - /not-found (Nextではこれが404)
    - + ハンバーガーメニュー
```

## エラーが出た？ ここを見てみよう 

- ⨯ Internal error: Error: Could not find the module "/home/ps/v-collection-app/node_modules/@mantine/core/esm/components/List/List.mjs#List#Item" in the React
  - → コンポーネントの一番最初に「'use client';」を追加してみるといいかも [詳細](https://ramble.impl.co.jp/4935/)
- term expectedcss(css-termexpected)
  - ～.module.cssでMantineのbreakpoint使ってると出てくるけど正常に動作するので無視してヨシ

