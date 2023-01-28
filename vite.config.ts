import { defineConfig } from 'vite';
import * as path from 'path';

export default defineConfig({
  clearScreen: false,
  server: {
    strictPort: true,
  },
  envPrefix: ['VITE_', 'TAURI_'],
  build: {
    target: process.env.TAURI_PLATFORM == 'windows' ? 'chrome105' : 'safari13',
    minify: !process.env.TAURI_DEBUG ? 'esbuild' : false,
    sourcemap: !!process.env.TAURI_DEBUG,
  },
  resolve: {
    alias: [
      {
        find: 'components',
        replacement: path.resolve(__dirname, 'src/components'),
      },
      {
        find: 'hooks',
        replacement: path.resolve(__dirname, 'src/hooks'),
      },
      {
        find: 'utils',
        replacement: path.resolve(__dirname, 'src/utils'),
      },
    ],
  },
});
