import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@redux': path.resolve(__dirname, './src/redux')
    }
  },
  preview: {
    port: 5550
  }
})
