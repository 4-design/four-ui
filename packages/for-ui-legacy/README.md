<h1 align="center">
  <img width="240" src="/.github/assets/fui_logo_logotype_light.svg#gh-light-mode-only" alt="For UI" title="For UI">
  <img width="240" src="/.github/assets/fui_logo_logotype_dark.svg#gh-dark-mode-only">
</h1>

<div align="center">

[![npm version](https://badge.fury.io/js/@4design%2Ffor-ui.svg)](https://badge.fury.io/js/@4design%2Ffor-ui)
[![CI](https://github.com/4-design/for-ui/actions/workflows/ci.yml/badge.svg)](https://github.com/4-design/for-ui/actions/workflows/ci.yml)

</div>

For UI は <a href="https://3-shake.com">株式会社スリーシェイク</a>のデザインシステム「For Design System」のデザイントークンとコンポーネントライブラリを実装したパッケージです。

React と MUI と Tailwind CSS で作られています。

## インストール

```
npm i @4design/for-ui
```

Peer dependencies のインストール

```
npm i tailwindcss @mui/lab @mui/material @mui/base react-icons react @tanstack/react-table
npm i --save-dev @types/react
```

## セットアップ

### 1. Tailwind CSS を導入

#### Tailwind CSS の CSS を読み込む

- `global.css` (名前は任意) を作成

  - 以下の内容を置く

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
@tailwind variants;

@layer base {
  body {
    @apply text-shade-dark-default text-r font-sans antialiased;
  }
}
```

- `app.tsx` で `global.css` を読み込む

#### `postcss.config.js` の作成

- `postcss.config.js` が存在しない場合は作成する。

  - デフォルトの構成を自分で定義する必要があることに注意 ([参考](https://nextjs.org/docs/advanced-features/customizing-postcss-config#customizing-plugins))

- 以下を追加

```js
plugins: {
  tailwindcss: {},
  autoprefixer: {},
  // ...
}
```

### 2. For UI の設定を読み込む

#### preset の読み込み

```js
preset: [require('@4design/for-ui/tailwind.config.base.js')],
```

#### 共通フォントの読み込み

```html
<link
  href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;700&family=Inter:wght@400;700&family=Noto+Sans+JP:wght@400;700&display=swap"
  rel="stylesheet"
/>
```

またはこれに相当するものを置いてください

#### MUI のスタイル上書きのための important 設定

```js
important: #root, // 任意の上位セレクタを指定する
```

または

```js
important: true;
```

を指定

(複数の important が必要な場合は[こちら](https://github.com/4-design/for-ui/discussions/1093)を参考にしてください)

#### `tailwind.config.js` 設定例

```js
module.exports = {
  important: ':is(#__next, .MuiPopover-root)',
  presets: [require('@4design/for-ui/tailwind.config.base.js')],
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './node_modules/@4design/for-ui/dist/**/*.js',
  ],
  plugins: [],
};
```

詳細は `/example` 以下に実装例があるので参考にしてください。

## License

MIT License

## Author

4 design (3-shake Inc.)
