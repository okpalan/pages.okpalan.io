import { defineConfig } from 'vite';
import path from 'path';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: '/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    rollupOptions: {
      external: [
        // Specify any other external modules if needed
      ],
    },
  },
  plugins: [
    VitePWA(),
  ],
  optimizeDeps: {
    include: ['workerize-loader'],
  },
  server: {
    // You might need to adjust this depending on your project structure
    proxy: {
      // '/src/utils/index.js': {
      //   target: 'http://localhost', // Adjust the target URL as needed
      //   changeOrigin: true,
      // },
    },
  },
});
