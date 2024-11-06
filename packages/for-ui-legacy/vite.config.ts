import path from 'path';
import { defineConfig, PluginOption } from 'vite';
import react from '@vitejs/plugin-react';
import pkg from './package.json';

const externalPackages = Object.keys(pkg.peerDependencies || {});

const regexesOfPackages = externalPackages.map((packageName) => new RegExp(`^${packageName}(/.*)?`));

export default defineConfig(({ mode }) => ({
  plugins: [react() as PluginOption],
  build: {
    sourcemap: mode === 'production' ? false : 'inline',
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'for-ui',
      fileName: (format) => `for-ui${format === 'esm' ? '.esm' : ''}.js`,
    },
    rollupOptions: {
      external: regexesOfPackages,
      output: [
        {
          preserveModulesRoot: 'src',
          exports: 'named',
          sourcemap: mode === 'production' ? false : 'inline',
          dir: 'dist/commonjs',
          format: 'cjs',
        },
        {
          preserveModulesRoot: 'src',
          sourcemap: mode === 'production' ? false : 'inline',
          exports: 'named',
          dir: 'dist/esm',
          format: 'esm',
        },
      ],
    },
  },
}));
