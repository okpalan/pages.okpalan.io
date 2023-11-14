import { defineConfig } from 'vite';
import path from 'path';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: '/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      'scss': path.resolve(__dirname, 'src', 'scss')
    },
  },
  plugins: [
    VitePWA(),
  ],
});
