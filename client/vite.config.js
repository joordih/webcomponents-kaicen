import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  assetsInclude: ['**/icons/*.svg', 'assets/*.css'],
  build: {
    assetsInlineLimit: 0
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@redux': path.resolve(__dirname, './src/redux'),
      '@icons': path.resolve(__dirname, './src/assets/icons'),
      '@assets': path.resolve(__dirname, './src/assets')
    }
  },
  preview: {
    port: 5550
  }
})
