import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  root: './client',
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client/src"),
      "@shared": path.resolve(__dirname, "./shared"),
      "@assets": path.resolve(__dirname, "./attached_assets"),
    },
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks: {
          // Разделяем большие библиотеки на отдельные чанки для быстрой сборки
          vendor: ['react', 'react-dom'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu', '@radix-ui/react-select'],
          query: ['@tanstack/react-query'],
          // Группируем только используемые иконки
          icons: ['lucide-react']
        }
      }
    },
    // Увеличиваем лимит размера чанка для продакшена
    chunkSizeWarningLimit: 1000,
    // Включаем минификацию для продакшена
    minify: 'esbuild',
    // Отключаем sourcemaps для быстрой сборки
    sourcemap: false
  },
  // Оптимизация для продакшена
  define: {
    'process.env.NODE_ENV': '"production"'
  }
});