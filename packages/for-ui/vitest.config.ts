import { mergeConfig } from 'vite';
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import viteConfig from './vite.config';

// eslint-disable-next-line import/no-default-export
export default mergeConfig(
  viteConfig,
  defineConfig({
    plugins: [react()],
    test: {
      environment: 'jsdom',
      globals: true, // TODO: globals should be false, but cannot resolve `ReferenceError: expect is not defined` error.
      setupFiles: ['./vitest.setup.ts'],
    },
  }),
);
