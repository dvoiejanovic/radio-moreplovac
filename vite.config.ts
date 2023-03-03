import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const path = require('path');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData (source, fp) {
          if (fp.endsWith('index.scss')) {
            return source;
          }
          return `@import "~/index.scss"; ${source}`;
        }
      }
    }
  }
})
