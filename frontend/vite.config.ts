/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,         // describe, it, expectなどをグローバルで使う
    environment: 'jsdom',  // DOM環境 (JSDOM)
    setupFiles: ['./tests/setup.ts'], // グローバルセットアップ
    // coverageの設定など、必要に応じて
  },
})
