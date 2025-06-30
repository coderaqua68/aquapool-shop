#!/usr/bin/env node

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Начинаем продакшн-сборку AquaPool...');

// Создаем оптимизированную Vite конфигурацию
const optimizedViteConfig = `
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  root: 'client',
  base: '/',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    minify: true,
    sourcemap: false,
    target: 'es2020',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          query: ['@tanstack/react-query'],
          ui: ['lucide-react']
        }
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'client/src'),
      '@assets': path.resolve(__dirname, 'attached_assets')
    }
  }
});
`;

fs.writeFileSync('vite.config.prod.js', optimizedViteConfig);

function runCommand(command, args, description) {
  return new Promise((resolve, reject) => {
    console.log(`📦 ${description}...`);
    const process = spawn(command, args, { 
      stdio: 'inherit', 
      shell: true,
      timeout: 180000 // 3 минуты максимум
    });
    
    process.on('close', (code) => {
      if (code === 0) {
        console.log(`✅ ${description} завершено`);
        resolve();
      } else {
        reject(new Error(`${description} failed with code ${code}`));
      }
    });
    
    process.on('error', reject);
  });
}

async function build() {
  try {
    // 1. Сборка фронтенда
    await runCommand('npx', ['vite', 'build', '--config', 'vite.config.prod.js'], 'Сборка React приложения');
    
    // 2. Сборка бэкенда
    await runCommand('npx', ['esbuild', 'server/index.ts', '--platform=node', '--packages=external', '--bundle', '--format=esm', '--outfile=server/index.js'], 'Сборка Express сервера');
    
    // 3. Копируем важные файлы
    if (fs.existsSync('yandex_816365dd176df39c.html')) {
      fs.copyFileSync('yandex_816365dd176df39c.html', 'dist/yandex_816365dd176df39c.html');
      console.log('✅ Yandex верификация скопирована');
    }
    
    // 4. Создаем production сервер
    const prodServer = `
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));

// Import routes после того как express настроен
async function startServer() {
  const { routes } = await import('./routes.js');
  const { connectToDatabase } = await import('./db.js');
  
  // Подключение к базе
  await connectToDatabase();
  
  // API роуты
  app.use('/api', routes);
  
  // Yandex верификация
  app.get('/yandex_816365dd176df39c.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'yandex_816365dd176df39c.html'));
  });
  
  // Статические файлы
  app.use(express.static(path.join(__dirname, 'public')));
  
  // React роуты
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });
  
  app.listen(PORT, '0.0.0.0', () => {
    console.log(\`🚀 AquaPool production server на порту \${PORT}\`);
  });
}

startServer().catch(console.error);
`;
    
    fs.writeFileSync('server/production.js', prodServer);
    
    console.log('🎉 Продакшн-сборка готова!');
    console.log('📁 Файлы: dist/ (фронтенд), server/index.js (API), server/production.js (сервер)');
    
  } catch (error) {
    console.error('❌ Ошибка сборки:', error.message);
    process.exit(1);
  } finally {
    // Очистка
    if (fs.existsSync('vite.config.prod.js')) {
      fs.unlinkSync('vite.config.prod.js');
    }
  }
}

build();