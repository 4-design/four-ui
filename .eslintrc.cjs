module.exports = {
  root: true,
  extends: ['@3design', '@3design/eslint-config/react'],
  env: {
    node: true,
  },
  settings: {
    tailwindcss: {
      // NOTE: eslint の設定はデフォルトに合わせる
      config: 'packages/3design-ui/tailwindcss.config.js',
    },
  },
  rules: {},
};
