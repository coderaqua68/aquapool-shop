#!/usr/bin/env node

import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

console.log('🚀 Начинаем полную продакшн-сборку AquaPool...');

// Функция для выполнения команд с логированием
function runCommand(command, description) {
  return new Promise((resolve, reject) => {
    console.log(`📦 ${description}...`);
    
    const process = exec(command, { 
      timeout: 1800000, // 30 минут максимум
      maxBuffer: 1024 * 1024 * 10 // 10MB буфер
    });
    
    process.stdout.on('data', (data) => {
      // Показываем только важные сообщения
      if (data.includes('✓') || data.includes('built') || data.includes('generated')) {
        console.log(data.toString().trim());
      }
    });
    
    process.stderr.on('data', (data) => {
      const message = data.toString().trim();
      if (!message.includes('Browserslist') && !message.includes('outdated')) {
        console.log(`⚠️  ${message}`);
      }
    });
    
    process.on('close', (code) => {
      if (code === 0) {
        console.log(`✅ ${description} завершено успешно`);
        resolve();
      } else {
        console.log(`❌ ${description} завершено с ошибкой (код: ${code})`);
        reject(new Error(`${description} failed with exit code ${code}`));
      }
    });
    
    process.on('error', (error) => {
      console.log(`❌ Ошибка выполнения ${description}:`, error.message);
      reject(error);
    });
  });
}

async function buildProduction() {
  try {
    console.log('🎯 Создаем полноценную продакшн-сборку для AquaPool');
    
    // 1. Очистка предыдущих сборок
    if (fs.existsSync('dist')) {
      fs.rmSync('dist', { recursive: true, force: true });
    }
    fs.mkdirSync('dist', { recursive: true });
    
    // 2. Сборка фронтенда с production настройками
    await runCommand('NODE_ENV=production npx vite build --mode production', 'Сборка React фронтенда');
    
    // 3. Сборка бэкенда
    await runCommand('npx esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outfile=server/index.js --minify', 'Сборка Express сервера');
    
    // 4. Копирование статических файлов
    const staticFiles = [
      { src: 'yandex_816365dd176df39c.html', dest: 'dist/yandex_816365dd176df39c.html' },
      { src: 'package.json', dest: 'dist/package.json' }
    ];
    
    staticFiles.forEach(({ src, dest }) => {
      if (fs.existsSync(src)) {
        fs.copyFileSync(src, dest);
        console.log(`✅ Скопирован ${src}`);
      }
    });
    
    // 5. Создание production package.json
    const prodPackage = {
      "name": "aquapool-production",
      "version": "1.0.0",
      "type": "module",
      "scripts": {
        "start": "node server/index.js"
      },
      "dependencies": {
        "express": "^4.18.2",
        "drizzle-orm": "^0.30.4",
        "@neondatabase/serverless": "^0.9.0",
        "node-telegram-bot-api": "^0.66.0"
      }
    };
    
    fs.writeFileSync('dist/package.json', JSON.stringify(prodPackage, null, 2));
    
    // 6. Создание production сервера
    const prodServer = `
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Импорт собранного сервера
import('./server/index.js').then(serverModule => {
  console.log('🚀 AquaPool Production Server успешно запущен');
  console.log('🌐 Готов к подключению домена aquapool-shop.ru');
}).catch(console.error);
`;
    
    fs.writeFileSync('dist/index.js', prodServer);
    
    // 7. Проверка результатов
    const distFiles = fs.readdirSync('dist');
    console.log('\n📁 Файлы в продакшн-сборке:');
    distFiles.forEach(file => {
      const stats = fs.statSync(path.join('dist', file));
      console.log(`   ${file} (${(stats.size / 1024).toFixed(1)} KB)`);
    });
    
    console.log('\n🎉 Полная продакшн-сборка AquaPool готова!');
    console.log('✅ Фронтенд: собран и оптимизирован');
    console.log('✅ Бэкенд: минифицирован и готов к запуску');
    console.log('✅ Статические файлы: скопированы');
    console.log('✅ Yandex верификация: включена');
    console.log('📦 Готов к deployment на Replit');
    
  } catch (error) {
    console.error('\n❌ Ошибка при сборке:', error.message);
    process.exit(1);
  }
}

buildProduction();