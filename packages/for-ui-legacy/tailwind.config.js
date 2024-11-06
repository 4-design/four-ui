module.exports = {
  important: ':is(#root, #docs-root)',
  presets: [require('./tailwind.config.base.js')],
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
};
