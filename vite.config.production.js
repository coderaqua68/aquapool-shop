import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// Оптимизированная конфигурация для быстрой production сборки
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(process.cwd(), "client", "src"),
      "@shared": path.resolve(process.cwd(), "shared"),
      "@assets": path.resolve(process.cwd(), "attached_assets"),
    },
  },
  root: path.resolve(process.cwd(), "client"),
  build: {
    outDir: path.resolve(process.cwd(), "server/public"),
    emptyOutDir: true,
    // Оптимизация для быстрой сборки
    minify: 'esbuild',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['lucide-react', '@radix-ui/react-slot'],
        }
      }
    },
    // Увеличиваем лимиты для больших приложений
    chunkSizeWarningLimit: 1000,
  },
  server: {
    fs: {
      strict: false, // Разрешаем доступ к файлам выше корня
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'wouter'],
    exclude: ['lucide-react'] // Исключаем тяжелые иконки из pre-bundling
  }
});