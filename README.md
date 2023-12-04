# VOCALOID CLUB COLLECTION

VOCALOID CLUB COLLECTION の専用ページです。

## 仕様

- Next.js v14
  - App Router
- Mantine
- TypeScript

## npm

### インストール

- `npm install`

### 開発

- `npm run dev` – 開発用にサーバーを起動
- `npm run build` – 本番用アプリケーションのバンドル
- `npm run analyze` – アプリケーションバンドルの解析 with [@next/bundle-analyzer](https://www.npmjs.com/package/@next/bundle-analyzer)

### そのほか

- `typecheck` – TSの型チェック
- `lint` – ESLintを実行
- `prettier:check` – Prettierでファイル確認
- `jest` – Jestテストを実行
- `jest:watch` – Jestを監視
- `test` – `jest`、`prettier:check`、`lint`、`typecheck` スクリプトを実行
- `storybook` – StoryBookの開発サーバーを開始
- `prettier:write` – formats all files with Prettier

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

